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
import { Plus, Download, Clock, CheckCircle2, XCircle } from "lucide-react";
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
}

interface MyRequest {
  id: string;
  entry_id: string | null;
  request_type: string;
  proposed_changes: any;
  reason: string;
  status: string;
  created_at: string;
  rejection_reason: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  requester_id: string;
}

interface Category {
  category_name: string;
}

export default function ImpactAwardRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<ImpactEntry[]>([]);
  const [myRequests, setMyRequests] = useState<MyRequest[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState<'add' | 'edit'>('add');
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
    notes: "",
    reason: ""
  });

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      await Promise.all([fetchEntries(), fetchMyRequests(), fetchCategories()]);
    } catch (error) {
      console.error("Error:", error);
      navigate("/auth");
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
        .eq("is_active", true)
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

  const fetchMyRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("impact_award_edit_requests")
        .select("*")
        .eq("requester_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMyRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const proposedChanges = {
        team_number: formData.team_number || null,
        activity_description: formData.activity_description,
        activity_location: formData.activity_location || null,
        activity_date: formData.activity_date,
        impact_category: formData.impact_category,
        documentation_type: formData.documentation_type,
        documentation_url: formData.documentation_url || null,
        notes: formData.notes || null
      };

      const { error } = await supabase
        .from("impact_award_edit_requests")
        .insert([{
          entry_id: null,
          requester_id: user.id,
          request_type: requestType,
          proposed_changes: proposedChanges,
          reason: formData.reason
        }]);

      if (error) throw error;
      
      toast.success("Request submitted successfully! Awaiting admin approval.");
      setIsDialogOpen(false);
      resetForm();
      fetchMyRequests();
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error(error.message || "Failed to submit request");
    }
  };

  const resetForm = () => {
    setFormData({
      team_number: "",
      activity_description: "",
      activity_location: "",
      activity_date: "",
      impact_category: categories[0]?.category_name || "",
      documentation_type: "Photo",
      documentation_url: "",
      notes: "",
      reason: ""
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
                         entry.documentation_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || entry.impact_category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
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
      <PageMeta title="Impact Award Documentation" description="View and request Impact Award documentation" />
      <Navigation />
      
      <div className="min-h-screen bg-background py-24 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Impact Award Documentation</h1>
              <p className="text-muted-foreground">View documentation and submit new entries</p>
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
                    Request New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Request New Entry</DialogTitle>
                    <DialogDescription>
                      Submit a new impact award entry for admin approval
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
                      <Label htmlFor="reason">Reason for Request *</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        required
                        rows={2}
                        placeholder="Why should this entry be added?"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Submit Request</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* My Requests */}
          {myRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>My Requests ({myRequests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(request.status)}
                              <Badge variant={
                                request.status === 'approved' ? 'default' :
                                request.status === 'pending' ? 'secondary' : 'destructive'
                              }>
                                {request.status.toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(request.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm">
                              <strong>Activity:</strong> {request.proposed_changes.activity_description}
                            </p>
                            <p className="text-sm text-muted-foreground">{request.reason}</p>
                            {request.rejection_reason && (
                              <p className="text-sm text-red-600">
                                <strong>Rejection reason:</strong> {request.rejection_reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Search</Label>
                  <Input
                    placeholder="Search documentation..."
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
    </>
  );
}
