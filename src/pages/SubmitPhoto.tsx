import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { photoSubmissionSchema } from "@/lib/validations/photo";

const PHOTO_CATEGORIES = [
  "Competition",
  "Outreach",
  "Team Event",
  "Robot Build",
  "Awards",
  "Community Service",
  "Behind the Scenes",
  "Other"
];

export default function SubmitPhoto() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    caption?: string;
    category?: string;
    file?: string;
  }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);
    setLoading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = photoSubmissionSchema.safeParse({
      caption: caption || '',
      category,
      file: selectedFile,
    });

    if (!validation.success) {
      const errors: typeof validationErrors = {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof typeof validationErrors;
        errors[field] = error.message;
      });
      setValidationErrors(errors);
      
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    setValidationErrors({});
    setUploading(true);

    try {
      // Upload to storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from("user-photos")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Save to database - store just the file path, not the full URL
      const { error: dbError } = await supabase
        .from("user_photos")
        .insert({
          user_id: user.id,
          photo_url: fileName,
          caption: caption || null,
        });

      if (dbError) throw dbError;

      toast({
        title: "Photo submitted successfully!",
        description: "Thank you for sharing your photo with the team.",
      });

      // Reset form
      setCaption("");
      setCategory("");
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Redirect to profile
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Submit Photo - Cyborg Cats FRC 4256"
        description="Share your Cyborg Cats memories! Submit photos from competitions, outreach events, and team activities."
        keywords="FRC photo submission, robotics team photos, team gallery"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <Camera className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl font-bold mb-4">Submit a Photo</h1>
              <p className="text-muted-foreground text-lg">
                Share your favorite Cyborg Cats moments with the team! Your photos help tell our story.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upload Photo</CardTitle>
                <CardDescription>
                  Submit photos from competitions, outreach events, or team activities. All submissions will be reviewed before appearing in the gallery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>Photo *</Label>
                    {!previewUrl ? (
                      <div className={`border-2 border-dashed rounded-lg p-12 text-center hover:border-primary/50 transition-colors ${
                        validationErrors.file ? 'border-destructive' : 'border-muted-foreground/25'
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleFileSelect(e);
                            setValidationErrors(prev => ({ ...prev, file: undefined }));
                          }}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={clearSelection}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {validationErrors.file && (
                      <div className="flex items-center gap-1 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{validationErrors.file}</span>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={category} 
                      onValueChange={(value) => {
                        setCategory(value);
                        setValidationErrors(prev => ({ ...prev, category: undefined }));
                      }}
                    >
                      <SelectTrigger 
                        id="category"
                        className={validationErrors.category ? 'border-destructive' : ''}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {PHOTO_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.category && (
                      <div className="flex items-center gap-1 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{validationErrors.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="space-y-2">
                    <Label htmlFor="caption">Caption (Optional)</Label>
                    <Textarea
                      id="caption"
                      placeholder="Describe the photo, event, or moment captured..."
                      value={caption}
                      onChange={(e) => {
                        setCaption(e.target.value);
                        setValidationErrors(prev => ({ ...prev, caption: undefined }));
                      }}
                      rows={4}
                      maxLength={500}
                      className={validationErrors.caption ? 'border-destructive' : ''}
                    />
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex-1">
                        {validationErrors.caption && (
                          <div className="flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            <span>{validationErrors.caption}</span>
                          </div>
                        )}
                      </div>
                      <span className={caption.length > 500 ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                        {caption.length}/500 characters
                      </span>
                    </div>
                  </div>

                  {/* Info Card */}
                  <Card className="bg-muted">
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <ImageIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">Submission Guidelines:</p>
                          <ul className="space-y-1 list-disc list-inside">
                            <li>Photos should be appropriate and team-related</li>
                            <li>Ensure you have permission from people in the photo</li>
                            <li>High-quality images are preferred</li>
                            <li>All submissions are reviewed before publication</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={uploading || !selectedFile || !category}
                      className="flex-1"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Photo
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
