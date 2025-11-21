import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageMeta } from '@/components/SEO/PageMeta';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Newspaper, Send, AlertCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const newsSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
  excerpt: z.string().trim().min(10, 'Excerpt must be at least 10 characters').max(300, 'Excerpt must be less than 300 characters'),
  content: z.string().trim().min(50, 'Content must be at least 50 characters').max(10000, 'Content must be less than 10000 characters'),
  author_name: z.string().trim().optional(),
  image_url: z.string().url('Invalid image URL').optional().or(z.literal(''))
});

type NewsFormData = z.infer<typeof newsSchema>;

export default function SubmitNews() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    excerpt: '',
    content: '',
    author_name: '',
    image_url: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewsFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('File must be an image');
      return;
    }

    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `news-submission-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('public-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public-images')
        .getPublicUrl(fileName);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = newsSchema.parse(formData);
      setIsSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to submit news');
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('news_submissions')
        .insert([{
          user_id: user.id,
          title: validatedData.title,
          excerpt: validatedData.excerpt,
          content: validatedData.content,
          author_name: validatedData.author_name || null,
          image_url: validatedData.image_url || null
        }]);

      if (error) throw error;

      toast.success('News article submitted successfully! An admin will review it soon.');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof NewsFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof NewsFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error submitting news:', error);
        toast.error('Failed to submit news article. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Submit News Article | Cyborg Cats 4256"
        description="Submit news articles and updates for the team"
      />
      <Navigation />

      <main className="container mx-auto px-6 py-24">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 border border-primary/30 mb-6">
                <Newspaper className="w-6 h-6 text-primary" />
                <span className="font-orbitron text-base text-primary font-bold tracking-wide">
                  SHARE YOUR STORY
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-orbitron font-black mb-4 text-glow">
                Submit News Article
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Share team updates, achievements, or stories. An admin will review and publish your submission.
              </p>
            </div>

            <Card className="glass-morphism border-primary/20">
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl">Article Details</CardTitle>
                <CardDescription>
                  Fill out the form below to submit a news article for review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Team Wins Regional Championship"
                      className={errors.title ? 'border-destructive' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt (Summary) *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief summary that appears in news previews..."
                      rows={2}
                      className={errors.excerpt ? 'border-destructive' : ''}
                    />
                    <p className="text-xs text-muted-foreground">This appears in preview cards (10-300 characters)</p>
                    {errors.excerpt && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Full Article *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your full news article here..."
                      rows={10}
                      className={errors.content ? 'border-destructive' : ''}
                    />
                    <p className="text-xs text-muted-foreground">Minimum 50 characters, maximum 10,000 characters</p>
                    {errors.content && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.content}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author_name">Author Name (Optional)</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      placeholder="Your name or team role"
                      className={errors.author_name ? 'border-destructive' : ''}
                    />
                    {errors.author_name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.author_name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Featured Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                      {formData.image_url && (
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="h-20 w-32 rounded object-cover border border-border"
                        />
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        disabled={uploadingImage}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      </Button>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Max 5MB, JPG or PNG recommended</p>
                    {errors.image_url && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.image_url}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      variant="premium"
                      size="lg"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit for Review
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}