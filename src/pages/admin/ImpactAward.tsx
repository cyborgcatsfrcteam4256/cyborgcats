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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Image must be smaller than 20MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file (JPG, PNG, etc.)");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let documentationUrl = formData.documentation_url;

      // Upload file if selected
      if (selectedFile) {
        setUploadingFile(true);
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('impact-documentation')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('impact-documentation')
          .getPublicUrl(fileName);

        documentationUrl = publicUrl;
        setUploadingFile(false);
      }
      
      const entryData = {
        documentation_id: editingEntry ? editingEntry.documentation_id : generateNextDocId(),
        team_number: formData.team_number || null,
        activity_description: formData.activity_description,
        activity_location: formData.activity_location || null,
        activity_date: formData.activity_date,
        impact_category: formData.impact_category,
        documentation_type: formData.documentation_type,
        documentation_url: documentationUrl || null,
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
    setSelectedFile(null);
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

  const handleBulkImport = async () => {
    const bulkData = [
      { documentation_id: 'ID-001', team_number: '4256', activity_description: 'Lobbying Trip to Missouri Capitol (HB33 SB256) for FIRST Funding', activity_location: 'Missouri Capitol', activity_date: 'January 2025', impact_category: 'Advocacy', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-002', team_number: '4256', activity_description: 'Participated in STEM Advocacy Day at the Missouri Capitol, Invited FRC Team Laser Of Camdenton Missouri To Lobby With Us (Raising STEM Awareness, Inviting Legislators to FIRST Regionals)', activity_location: 'Missouri Capitol', activity_date: 'March 2025', impact_category: 'Advocacy', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-003', team_number: '4256', activity_description: 'Planted and Sustained STEM Companion Initiative (STEM for Children with Special Needs)', activity_location: null, activity_date: '2022-Present', impact_category: 'Hosted, Ran', documentation_type: 'Social Media Post', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-004', team_number: '4256', activity_description: 'Launched STEM Companion Website', activity_location: null, activity_date: '2022', impact_category: 'Provided Published Resources', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-005', team_number: '4256', activity_description: 'Hosted Easter Egg Hunt and Other Events for STEM Companion Initiative Students', activity_location: null, activity_date: '2022', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-006', team_number: '4256', activity_description: 'FIRST Promotion and Demonstration at Spirit of St. Louis Expo, Reaching <2,000 People', activity_location: 'Spirit of St. Louis Expo', activity_date: 'June 2022 and 2024', impact_category: 'Ran, Reached', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-007', team_number: '4256', activity_description: 'Coordinated and Participated in Museum of Transportation Demonstration, Hosting Robotics Oriented Students From Multiple Elementary Schools', activity_location: 'Museum of Transportation', activity_date: 'Fall 2024', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-008', team_number: '4256', activity_description: 'Annual Westminster Open House Demonstration', activity_location: 'Westminster', activity_date: 'Past Three Years', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-009', team_number: '4256', activity_description: 'Hosted Annual St. Louis Area FIRST LEGO League Season Kickoff', activity_location: 'St. Louis Area', activity_date: 'Past Three Years', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-010', team_number: '4256', activity_description: 'Annual FIRST Robotics Class at Camp Westminster (Elementary Students)', activity_location: 'Camp Westminster', activity_date: 'Past Three Years', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-011', team_number: '4256', activity_description: 'Planned and Hosted Multiple FIRST LEGO League Team Planting Workshops', activity_location: null, activity_date: 'February and March 2025', impact_category: 'Hosted', documentation_type: 'Photo & Flyer', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-012', team_number: '4256', activity_description: 'Coordinates and Hosts Annual Women in STEM Workshop', activity_location: null, activity_date: 'Past Eight Years+', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-013', team_number: '4256', activity_description: 'Female Cyborg Cats Toured FSI (Foam Supply Company)', activity_location: 'FSI', activity_date: 'Febuary 2025', impact_category: 'Supported', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-014', team_number: '4256', activity_description: 'Mentors Hedgehog Hackers FIRST Lego League Challenge Team', activity_location: null, activity_date: '2024-Present', impact_category: 'Mentored', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-015', team_number: '4256', activity_description: 'Team Members Volunteer Thursday Mornings at a FIRST Robotics Class (Twin Oaks Christian School)', activity_location: 'Twin Oaks Christian School', activity_date: 'Past Three Years', impact_category: 'Mentored', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-016', team_number: '4256', activity_description: 'Aided Hedgehog Hackers FLL Challenge Team in Champions Award Advancement', activity_location: null, activity_date: 'January 2025', impact_category: 'Mentored', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-017', team_number: '4256', activity_description: 'Attended a Patent Consultation with Hedgehog Hackers FLL Challenge Team', activity_location: null, activity_date: 'Febuary 2025', impact_category: 'Mentored', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-018', team_number: '4256', activity_description: 'STEM Outreach in South Korea (Samuel School)', activity_location: 'South Korea', activity_date: '2023', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-019', team_number: '4256', activity_description: 'Ethiopian STEM Outreach', activity_location: 'Ethiopia', activity_date: '2023', impact_category: 'Ran', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-020', team_number: '4256', activity_description: 'Atlanta Coral Project at Westminster Christian Academy', activity_location: 'Westminster Christian Academy', activity_date: 'September 2024 - Present', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-021', team_number: '4256', activity_description: 'Participated in GRC Offseason Competition With Other FRC Teams', activity_location: 'GRC', activity_date: 'All Five+ Years (since Begining (10 years)', impact_category: 'Supported', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-022', team_number: '4256', activity_description: 'Shared Their Practice Field With Other Teams at St. Louis and GRC Regional, Reaching 70+ FRC Teams', activity_location: 'St. Louis and GRC Regional', activity_date: 'All Five+ Years (Since 2018)', impact_category: 'Assisted, Reached', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-023', team_number: '4256', activity_description: 'Supports Team Broncobots FRC Team\'s Pro-STEM, Pro-FIRST Legislation', activity_location: null, activity_date: 'December 2024- Present', impact_category: 'Advocacy', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-024', team_number: '4256', activity_description: 'Annually Compiles Game & Rules Overview PPT from Game Manual on Kickoff and Shares with all teams on Chief Delphi As a Resource For Other FRC Teams to help with Strategy Planning and Discussion', activity_location: null, activity_date: 'Past Three Years (2022+) and previous Shared with local teams and Boeing Teams since 2017', impact_category: 'Provided Published Resources', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-025', team_number: '4256', activity_description: 'Offered Facility Tours and Robot Demonstrations', activity_location: null, activity_date: 'Past Three Years', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-026', team_number: '4256', activity_description: 'Hosted Laura Roth, Executive Director of FIRST in Missouri, at Our Build Facilities, Engaging With Her To Brainstorm Ways To Further FIRST in Missouri', activity_location: 'Build Facilities', activity_date: 'Febuary 2025 March 2025', impact_category: 'Hosted', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-027', team_number: '4256', activity_description: 'Annual Westminster Homecoming Carnival Demonstration', activity_location: 'Westminster', activity_date: 'Annually Since 2012, Past 5 years+', impact_category: 'Hosted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-028', team_number: '4256', activity_description: 'Initiated a Letter Writing Campaign to Raise Awareness About Pro-STEM, Pro-FIRST Bills (HB 33 and SB 256) With Handwritten Letters and Emails Campaigns (Contacted other FRC Teams and Students Engaged in STEM)', activity_location: null, activity_date: 'Febuary 2025', impact_category: 'Hosted', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-029', team_number: '4256', activity_description: 'Members Are On Westminster\'s STEM Leadership Team', activity_location: 'Westminster', activity_date: 'September 2024 - Present', impact_category: 'Supported', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-030', team_number: '4256', activity_description: 'Cyborg Cats Mentor Assists Electric Eagles FIRST LEGO League Challenge Team', activity_location: null, activity_date: 'All Three Years', impact_category: 'Assisted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-031', team_number: '4256', activity_description: 'Cyborg Cat Team Members and Mentors Volunteer at Local Regionals and FLL Events', activity_location: 'Local Regionals and FLL Events', activity_date: 'Past Five+ years, Since 2014', impact_category: 'Supported', documentation_type: 'Screenshot and Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-032', team_number: '4256', activity_description: 'Cyborg Cats Team Members Planned, Coordinated, and Participated in a Field Trip to Shaw Nature Reserve Engaging in Nature Preservation Efforts', activity_location: 'Shaw Nature Reserve', activity_date: 'November 2024', impact_category: 'Ran', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-033', team_number: '4256', activity_description: 'Reached Out to Local Magazines and School Paper About Our STEM Advocacy Efforts', activity_location: null, activity_date: 'March 2025', impact_category: 'Advocacy & Provided Published Resources', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-034', team_number: '4256', activity_description: 'Hosted Other FRC Teams at Their Facilities, Allowing Them to Use Their Practice Field', activity_location: 'Team Facilities', activity_date: 'Past Five+ Years (since 2014)', impact_category: 'Hosted, Assisted', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-035', team_number: '4256', activity_description: 'Cyborg Cat Founded the Westminster STEM Leadership Team', activity_location: 'Westminster', activity_date: 'September 2024', impact_category: 'Hosted, Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-036', team_number: '4256', activity_description: 'Created STEM Resources and Curriculum For Students With Disabilities Utilized By Promise Academy', activity_location: 'Promise Academy', activity_date: '2022', impact_category: 'Provided Published Resources', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-037', team_number: '4256', activity_description: 'Funded, Designed, and Created Saint Louis Academy\'s STEM Curriculum', activity_location: 'Saint Louis Academy', activity_date: '2022', impact_category: 'Provided Published Resources', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-038', team_number: '4256', activity_description: 'Partnered With Nonprofits Such As The Down Syndrome Association of Greater St. Louis and The St. Louis Arc Foundation to Advocate For Individuals With Disabilities', activity_location: 'St. Louis', activity_date: '2022', impact_category: 'Advocacy', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-039', team_number: '4256', activity_description: 'Personally Reached Out To Over 100 FRC Teams In Our Outreach Iniatives', activity_location: null, activity_date: '2022-Present', impact_category: 'Advocacy, Reached', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-040', team_number: '4256', activity_description: 'Contributed To FTC 5119 Baryon\'s Recycling Program To Reduce Waste and Make More Filament', activity_location: null, activity_date: '2022', impact_category: 'Supported', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-041', team_number: '4256', activity_description: 'Partnered With Team 4191 From Turkey and Participated in an "International Talks" Project Via Zoom', activity_location: 'Turkey (via Zoom)', activity_date: '2022', impact_category: 'Supported', documentation_type: 'Social Media Post', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-042', team_number: '4256', activity_description: 'Repeatedly Visited a Predomenintly Spanish Speaking Trailer Park In Chesterfeild Missouri, Did STEM Activities With The Children', activity_location: 'Chesterfield, Missouri', activity_date: 'Winter 2022', impact_category: 'Ran', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-043', team_number: '4256', activity_description: 'Robot Demonstration at Coeur Academy', activity_location: 'Coeur Academy', activity_date: 'Winter 2022', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-044', team_number: '4256', activity_description: 'Robot Demonstration at Academy of STL', activity_location: 'Academy of STL', activity_date: 'March 2022', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-045', team_number: '4256', activity_description: 'Robot Demonstration at Grace Chapel', activity_location: 'Grace Chapel', activity_date: 'Winter 2022', impact_category: 'Ran', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-046', team_number: '4256', activity_description: 'Robot Demonstration at Promise Christian Academy', activity_location: 'Promise Christian Academy', activity_date: 'Winter 2022', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-047', team_number: '4256', activity_description: 'Robot Demonstration at Central Daycare', activity_location: 'Central Daycare', activity_date: 'Winter 2022', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-048', team_number: '4256', activity_description: 'Partnered With Down Syndrome Association To Put Together a 2-Week Long After School STEM Program For Kids and Teens With Disabilities', activity_location: null, activity_date: 'May 2022', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-049', team_number: '4256', activity_description: 'Robot Demonstration at Kirk Day School', activity_location: 'Kirk Day School', activity_date: 'Spring 2022', impact_category: 'Ran', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-050', team_number: '4256', activity_description: 'St. Louis Arc Foundation Advocacy Zoom', activity_location: 'Zoom', activity_date: 'March 2022', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-051', team_number: '4256', activity_description: 'Reached Over 10k With Our Advocacy Efforts Through Social Media', activity_location: 'Social Media', activity_date: 'As of March 2025', impact_category: 'Reached', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-052', team_number: '4256', activity_description: 'Hosted a Gamefield Event', activity_location: null, activity_date: 'Winter 2022', impact_category: 'Hosted', documentation_type: 'Flyer', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-053', team_number: '4256', activity_description: 'Ladue Middle School Demo', activity_location: 'Ladue Middle School', activity_date: 'Winter 2020', impact_category: 'Ran', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-054', team_number: '4256', activity_description: 'Created Flyers To Hand Out To Legislators and FLL Teams at STEM Day At The Capitol, Raising Awareness for HB 33, SB 256, and Inviting Legislators and FLL Teams To Our FRC Regionals', activity_location: 'The Capitol', activity_date: 'March 2025', impact_category: 'Advocacy', documentation_type: 'Flyers', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-055', team_number: '4256', activity_description: 'Had Team Members Volunteer As FIRST Ambassadors To Further Connect With Legislators At FIRST Events', activity_location: 'FIRST Events', activity_date: 'Spring 2025', impact_category: 'Advocacy', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-056', team_number: '4256', activity_description: 'Hosts Annual Team Bonding Ice Skating Event', activity_location: null, activity_date: 'Past Three Years', impact_category: 'Ran', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-057', team_number: '4256', activity_description: 'Robot Demonstration At Covenant Christian School', activity_location: 'Covenant Christian School', activity_date: 'Fall 2022', impact_category: 'Ran', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-058', team_number: '4256', activity_description: 'Sent out Personalized Handwritten Letters to Teams Attending St. Louis Regional to Cultivate a Stronger FIRST Community Reaching 45 FRC Teams', activity_location: 'St. Louis Regional', activity_date: 'March 2025', impact_category: 'Advocacy, Reached', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-059', team_number: '4256', activity_description: 'Sent out Personalized Letters to Teams Attending Kansas City Regional to Cultivate a Stronger FIRST Community Reaching 36 FRC Teams', activity_location: 'Kansas City Regional', activity_date: 'April 2025', impact_category: 'Advocacy, Reached', documentation_type: 'Screenshot', documentation_url: null, notes: '📸 Upload proof image' },
      { documentation_id: 'ID-060', team_number: '4256', activity_description: 'Cyborg Cats Volunteered with Feed My Starving Children—Nourishing Vulnerable Children Worldwide', activity_location: null, activity_date: 'April 2025', impact_category: 'Volunteered', documentation_type: 'Photo', documentation_url: null, notes: '📸 Upload proof image' }
    ];

    try {
      setLoading(true);
      toast.info('Starting bulk import of 60 entries...');
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to import entries');
        return;
      }

      const { error } = await supabase
        .from('impact_award_entries')
        .insert(bulkData.map(entry => ({
          ...entry,
          created_by: user.id
        })));

      if (error) {
        console.error('Bulk import error:', error);
        toast.error('Failed to import entries: ' + error.message);
      } else {
        toast.success(`Successfully imported ${bulkData.length} entries! Now upload proof images for each entry by clicking Edit.`);
        await fetchEntries();
      }
    } catch (error) {
      console.error('Bulk import error:', error);
      toast.error('Failed to import entries');
    } finally {
      setLoading(false);
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
              <Button variant="outline" onClick={handleBulkImport}>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
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
                      <Label htmlFor="file_upload">Upload Image (Optional, max 20MB)</Label>
                      <Input
                        id="file_upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="cursor-pointer"
                      />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="documentation_url">Or enter Documentation URL</Label>
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
                      <Button type="submit" disabled={uploadingFile}>
                        {uploadingFile ? "Uploading..." : editingEntry ? "Update Entry" : "Create Entry"}
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
