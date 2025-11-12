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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Link as LinkIcon, Upload, FileText, X } from "lucide-react";

const RESOURCE_CATEGORIES = [
  "Programming",
  "Mechanical Design",
  "Electrical",
  "CAD Tutorials",
  "Strategy Guide",
  "Team Management",
  "Fundraising",
  "Outreach Ideas",
  "Other"
];

const RESOURCE_TYPES = [
  { value: "link", label: "External Link", icon: LinkIcon },
  { value: "file", label: "File Upload", icon: Upload },
];

export default function SubmitResource() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resourceType, setResourceType] = useState<"link" | "file">("link");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

    // Validate file size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 25MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (resourceType === "link" && !link) {
      toast({
        title: "Link required",
        description: "Please provide a link to the resource",
        variant: "destructive",
      });
      return;
    }

    if (resourceType === "file" && !selectedFile) {
      toast({
        title: "File required",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      let resourceUrl = link;

      // If file upload, upload to storage first
      if (resourceType === "file" && selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${user.id}/resources/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        // Store only the file path, not the full URL
        resourceUrl = fileName;
      }

      // Use the proper resources table with approval workflow
      const { error } = await supabase.from("resources").insert({
        title,
        description,
        category,
        resource_type: resourceType,
        file_url: resourceType === "file" ? resourceUrl : null,
        external_url: resourceType === "link" ? resourceUrl : null,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        created_by: user.id,
      });

      if (error) throw error;

      toast({
        title: "Resource submitted successfully!",
        description: "Thank you for contributing to the team knowledge base.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setLink("");
      setTags("");
      setSelectedFile(null);
      
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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
        title="Submit Resource - Cyborg Cats FRC 4256"
        description="Share educational resources, tutorials, and guides with the Cyborg Cats team. Help build our knowledge base."
        keywords="FRC resources, robotics tutorials, team knowledge base"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl font-bold mb-4">Submit a Resource</h1>
              <p className="text-muted-foreground text-lg">
                Share tutorials, guides, and educational materials to help the team learn and grow.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resource Details</CardTitle>
                <CardDescription>
                  Submit links to helpful resources or upload files to share with the team. All submissions are reviewed before being added to the resource library.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Resource Type */}
                  <div className="space-y-3">
                    <Label>Resource Type *</Label>
                    <RadioGroup value={resourceType} onValueChange={(v) => setResourceType(v as "link" | "file")}>
                      <div className="grid grid-cols-2 gap-4">
                        {RESOURCE_TYPES.map((type) => (
                          <div key={type.value}>
                            <RadioGroupItem
                              value={type.value}
                              id={type.value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={type.value}
                              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <type.icon className="mb-2 h-6 w-6" />
                              <span className="text-sm font-medium">{type.label}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Intro to PID Controllers"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={200}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {title.length}/200 characters
                    </p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {RESOURCE_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Link or File */}
                  {resourceType === "link" ? (
                    <div className="space-y-2">
                      <Label htmlFor="link">Resource Link *</Label>
                      <Input
                        id="link"
                        type="url"
                        placeholder="https://example.com/tutorial"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>Upload File *</Label>
                      {!selectedFile ? (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <FileText className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF, DOC, PPT, ZIP up to 25MB
                            </p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-medium text-sm">{selectedFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedFile(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Briefly describe what this resource covers and why it's helpful..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      maxLength={2000}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {description.length}/2000 characters
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., beginner, java, sensors (comma separated)"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Add comma-separated tags to help others find this resource
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Resource
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
