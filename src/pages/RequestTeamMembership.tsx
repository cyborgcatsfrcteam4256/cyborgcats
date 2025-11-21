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
import { Users, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const requestSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  role: z.string().trim().min(2, 'Role must be at least 2 characters').max(100, 'Role must be less than 100 characters'),
  bio: z.string().trim().optional(),
  github_url: z.string().trim().url('Invalid GitHub URL').optional().or(z.literal('')),
  linkedin_url: z.string().trim().url('Invalid LinkedIn URL').optional().or(z.literal(''))
});

type RequestFormData = z.infer<typeof requestSchema>;

export default function RequestTeamMembership() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RequestFormData>({
    name: '',
    role: '',
    bio: '',
    github_url: '',
    linkedin_url: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = requestSchema.parse(formData);
      setIsSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to request team membership');
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('team_member_requests')
        .insert([{
          user_id: user.id,
          name: validatedData.name,
          role: validatedData.role,
          bio: validatedData.bio || null,
          github_url: validatedData.github_url || null,
          linkedin_url: validatedData.linkedin_url || null
        }]);

      if (error) {
        if (error.code === '23505') {
          toast.error('You already have a pending request');
        } else {
          throw error;
        }
        return;
      }

      toast.success('Request submitted successfully! An admin will review it soon.');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof RequestFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RequestFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error submitting request:', error);
        toast.error('Failed to submit request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Request Team Membership | Cyborg Cats 4256"
        description="Request to be featured as a team member on our website"
      />
      <Navigation />

      <main className="container mx-auto px-6 py-24">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 border border-primary/30 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <span className="font-orbitron text-base text-primary font-bold tracking-wide">
                  JOIN THE SHOWCASE
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-orbitron font-black mb-4 text-glow">
                Request Team Membership
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Submit your information to be featured on our team page. An admin will review your request.
              </p>
            </div>

            <Card className="glass-morphism border-primary/20">
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl">Your Information</CardTitle>
                <CardDescription>
                  Fill out the form below to request to be featured on our team page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role *</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Lead Programmer, Mechanical Lead, Team Captain"
                      className={errors.role ? 'border-destructive' : ''}
                    />
                    {errors.role && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.role}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself, your experience, and what you bring to the team..."
                      rows={4}
                      className={errors.bio ? 'border-destructive' : ''}
                    />
                    {errors.bio && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.bio}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github_url">GitHub URL (Optional)</Label>
                    <Input
                      id="github_url"
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                      placeholder="https://github.com/yourusername"
                      className={errors.github_url ? 'border-destructive' : ''}
                    />
                    {errors.github_url && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.github_url}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin_url">LinkedIn URL (Optional)</Label>
                    <Input
                      id="linkedin_url"
                      type="url"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className={errors.linkedin_url ? 'border-destructive' : ''}
                    />
                    {errors.linkedin_url && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.linkedin_url}
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
                          Submit Request
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