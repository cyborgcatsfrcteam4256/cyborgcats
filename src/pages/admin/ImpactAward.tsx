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
import { Plus, Pencil, Trash2, Check, X, Download, FileText, Upload, AlertCircle } from "lucide-react";
import { PageMeta } from "@/components/SEO/PageMeta";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { exportToExcel } from "@/utils/exportImpactAward";

interface ImpactEntry {
  id: string;
  documentation_id: string;
  team_number: string | null;
  activity_description: string;
  activity_location: string | null;
  activity_date: string;
  impact_category: string;
  documentation_type: string;
  documentation_url: string | null;
  notes: string | null;
  created_at: string;
  is_active: boolean;
}

interface EditRequest {
  id: string;
  entry_id: string | null;
  requester_id: string;
  request_type: string;
  proposed_changes: any;
  reason: string;
  status: string;
  created_at: string;
  rejection_reason: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

interface Category {
  category_name: string;
}

export default function AdminImpactAward() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<ImpactEntry[]>([]);
  const [editRequests, setEditRequests] = useState<EditRequest[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ImpactEntry | null>(null);
  const [deleteEntryId, setDeleteEntryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const [formData, setFormData] = useState({
    team_number: "",
    activity_description: "",
    activity_location: "",
    activity_date: "",
    impact_category: "",
    documentation_type: "Photo",
    documentation_url: "",
    notes: ""
  });

  useEffect(() => {
    checkAdminAndFetchData();
  }, []);

  const checkAdminAndFetchData = async () => {
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

      await Promise.all([fetchEntries(), fetchEditRequests(), fetchCategories()]);
    } catch (error) {
      console.error("Error:", error);
      navigate("/dashboard");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("impact_award_categories")
        .select("category_name")
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("impact_award_entries")
        .select("*")
        .order("activity_date", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast.error("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  const fetchEditRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("impact_award_edit_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEditRequests(data || []);
    } catch (error) {
      console.error("Error fetching edit requests:", error);
    }
  };

  const generateNextDocId = () => {
    if (entries.length === 0) return "ID-001";
    
    const ids = entries
      .map(e => parseInt(e.documentation_id.replace("ID-", "")))
      .filter(n => !isNaN(n));
    
    const maxId = Math.max(...ids, 0);
    const nextId = maxId + 1;
    return `ID-${String(nextId).padStart(3, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const entryData = {
        documentation_id: editingEntry ? editingEntry.documentation_id : generateNextDocId(),
        team_number: formData.team_number || null,
        activity_description: formData.activity_description,
        activity_location: formData.activity_location || null,
        activity_date: formData.activity_date,
        impact_category: formData.impact_category,
        documentation_type: formData.documentation_type,
        documentation_url: formData.documentation_url || null,
        notes: formData.notes || null,
        created_by: user?.id
      };

      if (editingEntry) {
        const { error } = await supabase
          .from("impact_award_entries")
          .update(entryData)
          .eq("id", editingEntry.id);

        if (error) throw error;
        toast.success("Entry updated successfully");
      } else {
        const { error } = await supabase
          .from("impact_award_entries")
          .insert([entryData]);

        if (error) throw error;
        toast.success("Entry created successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchEntries();
    } catch (error: any) {
      console.error("Error saving entry:", error);
      toast.error(error.message || "Failed to save entry");
    }
  };

  const handleDelete = async () => {
    if (!deleteEntryId) return;

    try {
      const { error } = await supabase
        .from("impact_award_entries")
        .delete()
        .eq("id", deleteEntryId);

      if (error) throw error;
      toast.success("Entry deleted successfully");
      setDeleteEntryId(null);
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Failed to delete entry");
    }
  };

  const handleApproveRequest = async (request: EditRequest) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (request.request_type === 'add') {
        // Create new entry
        const { error: insertError } = await supabase
          .from("impact_award_entries")
          .insert([{
            ...request.proposed_changes,
            documentation_id: generateNextDocId(),
            created_by: request.requester_id
          }]);

        if (insertError) throw insertError;
      } else if (request.entry_id) {
        // Update existing entry
        const { error: updateError } = await supabase
          .from("impact_award_entries")
          .update(request.proposed_changes)
          .eq("id", request.entry_id);

        if (updateError) throw updateError;
      }

      // Update request status
      const { error } = await supabase
        .from("impact_award_edit_requests")
        .update({
          status: 'approved',
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq("id", request.id);

      if (error) throw error;
      
      toast.success("Request approved successfully");
      fetchEntries();
      fetchEditRequests();
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request");
    }
  };

  const handleRejectRequest = async (requestId: string, reason: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("impact_award_edit_requests")
        .update({
          status: 'rejected',
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          rejection_reason: reason
        })
        .eq("id", requestId);

      if (error) throw error;
      
      toast.success("Request rejected");
      fetchEditRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request");
    }
  };

  const openEditDialog = (entry: ImpactEntry) => {
    setEditingEntry(entry);
    setFormData({
      team_number: entry.team_number || "",
      activity_description: entry.activity_description,
      activity_location: entry.activity_location || "",
      activity_date: entry.activity_date,
      impact_category: entry.impact_category,
      documentation_type: entry.documentation_type,
      documentation_url: entry.documentation_url || "",
      notes: entry.notes || ""
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingEntry(null);
    setFormData({
      team_number: "",
      activity_description: "",
      activity_location: "",
      activity_date: "",
      impact_category: categories[0]?.category_name || "",
      documentation_type: "Photo",
      documentation_url: "",
      notes: ""
    });
  };

  const handleExport = async () => {
    const result = await exportToExcel(entries);
    if (result.success) {
      toast.success("Export completed successfully");
    } else {
      toast.error("Failed to export data");
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.activity_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.documentation_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (entry.team_number?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || entry.impact_category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Impact Award Documentation" description="Manage FIRST Impact Award documentation" />
      <Navigation />
      
      <div className="min-h-screen bg-background py-24 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Impact Award Documentation</h1>
              <p className="text-muted-foreground">Manage FIRST Impact Award entries and requests</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingEntry ? "Edit Entry" : "Add New Entry"}</DialogTitle>
                    <DialogDescription>
                      {editingEntry ? "Update entry information" : "Create a new impact award documentation entry"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="team_number">Team Number (Optional)</Label>
                        <Input
                          id="team_number"
                          value={formData.team_number}
                          onChange={(e) => setFormData({ ...formData, team_number: e.target.value })}
                          placeholder="4256"
                        />
                      </div>
                      <div>
                        <Label htmlFor="activity_date">Activity Date *</Label>
                        <Input
                          id="activity_date"
                          value={formData.activity_date}
                          onChange={(e) => setFormData({ ...formData, activity_date: e.target.value })}
                          placeholder="January 2025"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="activity_description">Activity Description *</Label>
                      <Textarea
                        id="activity_description"
                        value={formData.activity_description}
                        onChange={(e) => setFormData({ ...formData, activity_description: e.target.value })}
                        required
                        rows={3}
                        placeholder="Description of the activity"
                      />
                    </div>

                    <div>
                      <Label htmlFor="activity_location">Location (Optional)</Label>
                      <Input
                        id="activity_location"
                        value={formData.activity_location}
                        onChange={(e) => setFormData({ ...formData, activity_location: e.target.value })}
                        placeholder="Missouri Capitol"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="impact_category">Impact Category *</Label>
                        <Select 
                          value={formData.impact_category} 
                          onValueChange={(value) => setFormData({ ...formData, impact_category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.category_name} value={cat.category_name}>
                                {cat.category_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="documentation_type">Documentation Type *</Label>
                        <Select 
                          value={formData.documentation_type} 
                          onValueChange={(value) => setFormData({ ...formData, documentation_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Photo">Photo</SelectItem>
                            <SelectItem value="Social Media Post">Social Media Post</SelectItem>
                            <SelectItem value="Screenshot">Screenshot</SelectItem>
                            <SelectItem value="Video">Video</SelectItem>
                            <SelectItem value="Document">Document</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="documentation_url">Documentation URL (Optional)</Label>
                      <Input
                        id="documentation_url"
                        type="url"
                        value={formData.documentation_url}
                        onChange={(e) => setFormData({ ...formData, documentation_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingEntry ? "Update" : "Create"} Entry
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Edit Requests */}
          {editRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Pending Edit Requests ({editRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline">{request.request_type === 'add' ? 'New Entry' : 'Edit Entry'}</Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              Requested by user ID: {request.requester_id.substring(0, 8)}...
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleApproveRequest(request)}>
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                const reason = prompt("Rejection reason:");
                                if (reason) handleRejectRequest(request.id, reason);
                              }}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm font-medium mb-2">Proposed Changes:</p>
                          <pre className="text-xs overflow-auto">
                            {JSON.stringify(request.proposed_changes, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reason:</p>
                          <p className="text-sm text-muted-foreground">{request.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Search</Label>
                  <Input
                    placeholder="Search by description, ID, or team number..."
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
                      {categories.map((cat) => (
                        <SelectItem key={cat.category_name} value={cat.category_name}>
                          {cat.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Entries Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doc ID</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <Badge variant="outline">{entry.documentation_id}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            {entry.team_number && (
                              <Badge variant="secondary" className="mb-1">{entry.team_number}</Badge>
                            )}
                            <div className="font-medium">{entry.activity_description}</div>
                            {entry.activity_location && (
                              <div className="text-sm text-muted-foreground">{entry.activity_location}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{entry.activity_date}</TableCell>
                        <TableCell>
                          <Badge>{entry.impact_category}</Badge>
                        </TableCell>
                        <TableCell>{entry.documentation_type}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(entry)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDeleteEntryId(entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteEntryId} onOpenChange={(open) => !open && setDeleteEntryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
