import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/SEO/PageMeta";
import { CheckCircle2, XCircle, Star, StarOff, Trash2, Eye } from "lucide-react";

interface Photo {
  id: string;
  photo_url: string;
  caption: string | null;
  category: string | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  user_id: string;
  display_order: number | null;
  updated_at: string | null;
}

const AdminPhotos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    checkAdminAndFetchPhotos();
  }, []);

  const checkAdminAndFetchPhotos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role, approved")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .eq("approved", true)
        .maybeSingle();

      if (!roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      await fetchPhotos();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify permissions");
      navigate("/");
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("user_photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast.error("Failed to load photos");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (photoId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("user_photos")
        .update({ is_approved: !currentStatus })
        .eq("id", photoId);

      if (error) throw error;

      toast.success(currentStatus ? "Photo unapproved" : "Photo approved");
      await fetchPhotos();
    } catch (error) {
      console.error("Error updating photo:", error);
      toast.error("Failed to update photo");
    }
  };

  const handleFeature = async (photoId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("user_photos")
        .update({ is_featured: !currentStatus })
        .eq("id", photoId);

      if (error) throw error;

      toast.success(currentStatus ? "Photo unfeatured" : "Photo featured");
      await fetchPhotos();
    } catch (error) {
      console.error("Error updating photo:", error);
      toast.error("Failed to update photo");
    }
  };

  const handleDelete = async () => {
    if (!photoToDelete) return;

    try {
      const photo = photos.find(p => p.id === photoToDelete);
      if (!photo) return;

      // Delete from storage
      const filePath = photo.photo_url.split("/").pop();
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("user-photos")
          .remove([filePath]);
        
        if (storageError) console.error("Storage deletion error:", storageError);
      }

      // Delete from database
      const { error } = await supabase
        .from("user_photos")
        .delete()
        .eq("id", photoToDelete);

      if (error) throw error;

      toast.success("Photo deleted successfully");
      await fetchPhotos();
      setPhotoToDelete(null);
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete photo");
    }
  };

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch = photo.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photo.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "pending") return !photo.is_approved && matchesSearch;
    if (activeTab === "approved") return photo.is_approved && matchesSearch;
    if (activeTab === "featured") return photo.is_featured && matchesSearch;
    return matchesSearch;
  });

  const stats = {
    total: photos.length,
    pending: photos.filter(p => !p.is_approved).length,
    approved: photos.filter(p => p.is_approved).length,
    featured: photos.filter(p => p.is_featured).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Photo Management - Admin"
        description="Manage user-submitted photos"
      />
      <Navigation />
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Photo Management</h1>
            <p className="text-muted-foreground">Review and manage user-submitted photos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total Photos</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Pending</div>
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Approved</div>
              <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Featured</div>
              <div className="text-2xl font-bold text-blue-500">{stats.featured}</div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="mb-4">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by caption or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
                <TabsTrigger value="featured">Featured ({stats.featured})</TabsTrigger>
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredPhotos.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No photos found in this category
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPhotos.map((photo) => (
                      <Card key={photo.id} className="overflow-hidden">
                        <div className="relative aspect-video">
                          <img
                            src={photo.photo_url}
                            alt={photo.caption || "User photo"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            {photo.is_approved && (
                              <Badge className="bg-green-500">Approved</Badge>
                            )}
                            {photo.is_featured && (
                              <Badge className="bg-blue-500">Featured</Badge>
                            )}
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="font-medium line-clamp-2">{photo.caption || "No caption"}</p>
                            {photo.category && (
                              <p className="text-sm text-muted-foreground">{photo.category}</p>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedPhoto(photo)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant={photo.is_approved ? "secondary" : "default"}
                              onClick={() => handleApprove(photo.id, photo.is_approved)}
                            >
                              {photo.is_approved ? (
                                <><XCircle className="w-4 h-4 mr-1" /> Unapprove</>
                              ) : (
                                <><CheckCircle2 className="w-4 h-4 mr-1" /> Approve</>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant={photo.is_featured ? "secondary" : "outline"}
                              onClick={() => handleFeature(photo.id, photo.is_featured)}
                            >
                              {photo.is_featured ? (
                                <><StarOff className="w-4 h-4 mr-1" /> Unfeature</>
                              ) : (
                                <><Star className="w-4 h-4 mr-1" /> Feature</>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setPhotoToDelete(photo.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
      <Footer />

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Photo Details</DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <div className="space-y-4">
              <img
                src={selectedPhoto.photo_url}
                alt={selectedPhoto.caption || "Photo"}
                className="w-full rounded-lg"
              />
              <div className="space-y-2">
                <p><strong>Caption:</strong> {selectedPhoto.caption || "No caption"}</p>
                <p><strong>Category:</strong> {selectedPhoto.category || "Uncategorized"}</p>
                <p><strong>Date:</strong> {new Date(selectedPhoto.created_at).toLocaleDateString()}</p>
                <div className="flex gap-2">
                  <Badge variant={selectedPhoto.is_approved ? "default" : "secondary"}>
                    {selectedPhoto.is_approved ? "Approved" : "Pending"}
                  </Badge>
                  {selectedPhoto.is_featured && <Badge>Featured</Badge>}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!photoToDelete} onOpenChange={() => setPhotoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this photo? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminPhotos;