import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/UI/Breadcrumbs";
import { Loader2, Upload, X, FileText, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear());
  const [userPhotos, setUserPhotos] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);
    await loadProfile(user.id);
  };

  const loadProfile = async (userId: string) => {
    try {
      // @ts-ignore - Supabase type inference issue
      const result: any = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      const data = result.data;
      const error = result.error;

      if (error) throw error;

      if (data) {
        setFullName(data.full_name || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatar_url || "");
        setResumeUrl(data.resume_url || "");
        setSkills(data.skills || []);
        setInterests(data.interests || []);
        setLinkedinUrl(data.linkedin_url || "");
        setGithubUrl(data.github_url || "");
        setGraduationYear(data.graduation_year || new Date().getFullYear());
      }

      // Load user photos
      await loadUserPhotos(userId);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const loadUserPhotos = async (userId: string) => {
    try {
      // @ts-ignore
      const { data, error } = await supabase
        .from("user_photos")
        .select("*")
        .eq("user_id", userId)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setUserPhotos(data || []);
    } catch (error) {
      console.error("Error loading photos:", error);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file (JPG, PNG, or WEBP)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setAvatarUrl(publicUrl);
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10485760) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/resume.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      setResumeUrl(publicUrl);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !user) return;

    // Validate number of photos (max 10 total)
    if (userPhotos.length + files.length > 10) {
      toast.error("You can upload a maximum of 10 photos");
      return;
    }

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (5MB)
        if (file.size > 5242880) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('user-photos')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('user-photos')
          .getPublicUrl(fileName);

        // Add to database
        const { error: dbError } = await supabase
          .from('user_photos')
          .insert({
            user_id: user.id,
            photo_url: publicUrl,
            display_order: userPhotos.length + i
          });

        if (dbError) throw dbError;
      }

      await loadUserPhotos(user.id);
      toast.success("Photos uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast.error("Failed to upload photos");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string, photoUrl: string) => {
    if (!user) return;

    try {
      // Extract file path from URL
      const urlParts = photoUrl.split('/user-photos/');
      if (urlParts.length === 2) {
        const filePath = urlParts[1];
        await supabase.storage.from('user-photos').remove([filePath]);
      }

      // Delete from database
      const { error } = await supabase
        .from('user_photos')
        .delete()
        .eq('id', photoId);

      if (error) throw error;

      await loadUserPhotos(user.id);
      toast.success("Photo deleted successfully!");
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete photo");
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          bio,
          avatar_url: avatarUrl,
          skills,
          interests,
          linkedin_url: linkedinUrl,
          github_url: githubUrl,
          graduation_year: graduationYear,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="My Profile"
        description="View and edit your profile information"
        canonicalPath="/profile"
      />
      <Navigation />
      <main id="main-content" className="relative min-h-screen pt-20 overflow-hidden">
        {/* Stunning animated background */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          
          {/* User photo background with blur effect */}
          {userPhotos.length > 0 && (
            <div className="absolute inset-0 opacity-10">
              <img 
                src={userPhotos[0].photo_url} 
                alt="Background" 
                className="w-full h-full object-cover blur-3xl scale-110"
              />
            </div>
          )}
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px]" />
          
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          <Breadcrumbs />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertDescription>
                  Upload a professional headshot for your profile picture. Supported formats: JPG, PNG, WEBP (max 5MB)
                </AlertDescription>
              </Alert>

              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-2xl">{fullName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="avatar_upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-3 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                      <Upload className="h-5 w-5" />
                      <span>{uploading ? "Uploading..." : "Upload Profile Picture"}</span>
                    </div>
                    <Input
                      id="avatar_upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </Label>
                  {avatarUrl && (
                    <p className="text-sm text-muted-foreground">Current: Professional Headshot</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="graduation_year">Graduation Year</Label>
                <Input
                  id="graduation_year"
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(parseInt(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={skills.join(", ")}
                  onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                  placeholder="Programming, Design, Marketing"
                />
              </div>

              <div>
                <Label htmlFor="resume_upload">Resume / CV</Label>
                <Alert className="mb-3">
                  <AlertDescription>
                    Upload your resume in PDF or Word format (max 10MB)
                  </AlertDescription>
                </Alert>
                <Label htmlFor="resume_upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 p-3 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                    <FileText className="h-5 w-5" />
                    <span>{uploading ? "Uploading..." : resumeUrl ? "Replace Resume" : "Upload Resume"}</span>
                  </div>
                  <Input
                    id="resume_upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </Label>
                {resumeUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <a 
                      href={resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View Current Resume
                      <Download className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="photos_upload">Photo Gallery</Label>
                <Alert className="mb-3">
                  <AlertDescription>
                    Upload photos to showcase your work and experiences (max 10 photos, 5MB each)
                  </AlertDescription>
                </Alert>
                <Label htmlFor="photos_upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 p-3 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                    <Upload className="h-5 w-5" />
                    <span>{uploading ? "Uploading..." : "Upload Photos"}</span>
                  </div>
                  <Input
                    id="photos_upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </Label>
                
                {userPhotos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userPhotos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <img 
                          src={photo.photo_url} 
                          alt={photo.caption || "User photo"} 
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleDeletePhoto(photo.id, photo.photo_url)}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  {userPhotos.length} / 10 photos uploaded
                </p>
              </div>

              <div>
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input
                  id="interests"
                  value={interests.join(", ")}
                  onChange={(e) => setInterests(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                  placeholder="Robotics, AI, Music"
                />
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
