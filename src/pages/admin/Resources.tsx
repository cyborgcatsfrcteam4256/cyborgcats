import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Check, X, Download, Eye, ExternalLink, FileText } from "lucide-react";
import { PageMeta } from "@/components/SEO/PageMeta";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  resource_type: string;
  file_url: string | null;
  external_url: string | null;
  downloads_count: number;
  views_count: number;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  tags: string[];
}

export default function AdminResources() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deleteResourceId, setDeleteResourceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "programming",
    resource_type: "link",
    external_url: "",
    is_featured: false,
    tags: ""
  });

  useEffect(() => {
    checkAdminAndFetchResources();
  }, []);

  const checkAdminAndFetchResources = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role, approved")
        .eq("user_id", user.id);

      const isAdmin = roles?.some(r => r.role === "admin" && r.approved);

      if (!isAdmin) {
        toast.error("Admin access required");
        navigate("/dashboard");
        return;
      }

      await fetchResources();
    } catch (error) {
      console.error("Error:", error);
      navigate("/dashboard");
    }
  };

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
      
      const resourceData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        resource_type: formData.resource_type,
        external_url: formData.external_url || null,
        file_url: null,
        is_featured: formData.is_featured,
        is_approved: true,
        tags: tagsArray,
        created_by: (await supabase.auth.getUser()).data.user?.id
      };

      if (editingResource) {
        const { error } = await supabase
          .from("resources")
          .update(resourceData)
          .eq("id", editingResource.id);

        if (error) throw error;
        toast.success("Resource updated successfully");
      } else {
        const { error } = await supabase
          .from("resources")
          .insert([resourceData]);

        if (error) throw error;
        toast.success("Resource created successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchResources();
    } catch (error) {
      console.error("Error saving resource:", error);
      toast.error("Failed to save resource");
    }
  };

  const handleApprove = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("resources")
        .update({ is_approved: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success(currentStatus ? "Resource unapproved" : "Resource approved");
      fetchResources();
    } catch (error) {
      console.error("Error updating approval:", error);
      toast.error("Failed to update approval status");
    }
  };

  const handleDelete = async () => {
    if (!deleteResourceId) return;

    try {
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", deleteResourceId);

      if (error) throw error;
      toast.success("Resource deleted successfully");
      setDeleteResourceId(null);
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    }
  };

  const openEditDialog = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      resource_type: resource.resource_type,
      external_url: resource.external_url || "",
      is_featured: resource.is_featured,
      tags: resource.tags.join(", ")
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingResource(null);
    setFormData({
      title: "",
      description: "",
      category: "programming",
      resource_type: "link",
      external_url: "",
      is_featured: false,
      tags: ""
    });
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "approved" && resource.is_approved) ||
                         (filterStatus === "pending" && !resource.is_approved);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      programming: "Programming",
      cad_design: "CAD & Design",
      team_management: "Team Management",
      stem_curriculum: "STEM Curriculum"
    };
    return labels[category] || category;
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
      <PageMeta title="Manage Resources" description="Admin resource management" />
      
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Resources</h1>
              <p className="text-muted-foreground">Create and manage learning resources</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
                  <DialogDescription>
                    {editingResource ? "Update resource information" : "Create a new learning resource"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      maxLength={200}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      maxLength={2000}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="cad_design">CAD & Design</SelectItem>
                          <SelectItem value="team_management">Team Management</SelectItem>
                          <SelectItem value="stem_curriculum">STEM Curriculum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="resource_type">Resource Type *</Label>
                      <Select value={formData.resource_type} onValueChange={(value) => setFormData({ ...formData, resource_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="link">Link</SelectItem>
                          <SelectItem value="file">File</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="external_url">URL</Label>
                    <Input
                      id="external_url"
                      type="url"
                      value={formData.external_url}
                      onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                      placeholder="https://example.com/resource"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="python, beginner, tutorial"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded border-border"
                    />
                    <Label htmlFor="is_featured" className="cursor-pointer">Featured Resource</Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingResource ? "Update" : "Create"} Resource
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Search</Label>
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="cad_design">CAD & Design</SelectItem>
                      <SelectItem value="team_management">Team Management</SelectItem>
                      <SelectItem value="stem_curriculum">STEM Curriculum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Stats</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {resource.description}
                          </div>
                          {resource.is_featured && (
                            <Badge variant="secondary" className="mt-1">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryLabel(resource.category)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.resource_type}</Badge>
                      </TableCell>
                      <TableCell>
                        {resource.is_approved ? (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center justify-end gap-1">
                            <Eye className="h-3 w-3" />
                            {resource.views_count}
                          </div>
                          <div className="flex items-center justify-end gap-1">
                            <Download className="h-3 w-3" />
                            {resource.downloads_count}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {resource.external_url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(resource.external_url!, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(resource.id, resource.is_approved)}
                          >
                            {resource.is_approved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(resource)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteResourceId(resource.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredResources.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No resources found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={!!deleteResourceId} onOpenChange={() => setDeleteResourceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resource.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
