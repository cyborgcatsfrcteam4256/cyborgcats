import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/Admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Users, Search, Shield, UserCog, MoreVertical, AlertTriangle, CheckCircle, XCircle, Ban } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserWithProfile {
  id: string;
  email: string;
  created_at: string;
  profile: {
    full_name: string;
    avatar_url: string | null;
    graduation_year: number | null;
  } | null;
  roles: Array<{
    role: string;
    approved: boolean;
  }>;
}

interface Report {
  id: string;
  reporter_id: string;
  reported_user_id: string | null;
  reported_message_id: string | null;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  reason: string;
  description: string | null;
  status: string;
  reporter_profile: {
    full_name: string;
    avatar_url: string | null;
  } | null;
  reported_profile: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

export default function AdminUsers() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithProfile[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [selectedUserToBlock, setSelectedUserToBlock] = useState<string | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [showRemoveRoleDialog, setShowRemoveRoleDialog] = useState(false);
  const [selectedUserForRoleRemoval, setSelectedUserForRoleRemoval] = useState<UserWithProfile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, roleFilter, users]);

  useEffect(() => {
    filterReports();
  }, [statusFilter, reports]);

  const checkAdminAccess = async () => {
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
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    setCurrentUser(user);
    await Promise.all([loadUsers(), loadReports()]);
  };

  const loadUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, graduation_year");

      if (profilesError) throw profilesError;

      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role, approved");

      if (rolesError) throw rolesError;

      const usersWithEmails = await Promise.all(
        profiles.map(async (profile) => {
          const { data: emailData } = await supabase
            .rpc('get_user_email', { _user_id: profile.id });
          
          return {
            id: profile.id,
            email: emailData || "No email",
            created_at: "",
            profile: {
              full_name: profile.full_name,
              avatar_url: profile.avatar_url,
              graduation_year: profile.graduation_year,
            },
            roles: userRoles?.filter(r => r.user_id === profile.id) || [],
          };
        })
      );

      setUsers(usersWithEmails);
      setFilteredUsers(usersWithEmails);
    } catch (error: any) {
      toast({
        title: "Error loading users",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadReports = async () => {
    try {
      const { data: reportsData, error } = await supabase
        .from("reports")
        .select(`
          *,
          reporter_profile:profiles!reports_reporter_id_fkey(full_name, avatar_url),
          reported_profile:profiles!reports_reported_user_id_fkey(full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReports(reportsData || []);
      setFilteredReports(reportsData || []);
    } catch (error: any) {
      toast({
        title: "Error loading reports",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.profile?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user =>
        user.roles.some(r => r.role === roleFilter && r.approved)
      );
    }

    setFilteredUsers(filtered);
  };

  const filterReports = () => {
    let filtered = reports;

    if (statusFilter !== "all") {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  };

  const handleAssignRole = async (userId: string, role: "admin" | "alumni" | "mentor" | "parent" | "student") => {
    try {
      const { error } = await supabase.rpc("admin_assign_role", {
        target_user_id: userId,
        target_role: role,
      });

      if (error) throw error;

      toast({
        title: "Role assigned",
        description: `Successfully assigned ${role} role`,
      });

      loadUsers();
    } catch (error: any) {
      toast({
        title: "Error assigning role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReviewReport = async (reportId: string, action: "resolved" | "dismissed") => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({
          status: action,
          reviewed_at: new Date().toISOString(),
          reviewed_by: currentUser?.id,
        })
        .eq("id", reportId);

      if (error) throw error;

      toast({
        title: action === "resolved" ? "Report Resolved" : "Report Dismissed",
        description: `Report has been ${action} successfully.`,
      });

      setShowReportDialog(false);
      setSelectedReport(null);
      setReviewNotes("");
      loadReports();
    } catch (error: any) {
      toast({
        title: "Error reviewing report",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role as Database["public"]["Enums"]["app_role"]);

      if (error) throw error;

      toast({
        title: "Role removed",
        description: `Successfully removed ${role} role`,
      });

      setShowRemoveRoleDialog(false);
      setSelectedUserForRoleRemoval(null);
      loadUsers();
    } catch (error: any) {
      toast({
        title: "Error removing role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleBlockUser = async () => {
    if (!selectedUserToBlock || !blockReason) return;

    try {
      const { error } = await supabase
        .from("blocked_users")
        .insert({
          blocker_id: currentUser?.id,
          blocked_id: selectedUserToBlock,
          reason: blockReason,
        });

      if (error) throw error;

      toast({
        title: "User Blocked",
        description: "User has been blocked successfully.",
      });

      setShowBlockDialog(false);
      setSelectedUserToBlock(null);
      setBlockReason("");
    } catch (error: any) {
      toast({
        title: "Error blocking user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRoleBadge = (role: string, approved: boolean) => {
    const variant = approved ? "default" : "secondary";
    return (
      <Badge key={role} variant={variant} className="text-xs">
        {role}
        {!approved && " (pending)"}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      resolved: "default",
      dismissed: "destructive",
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AdminLayout
      title="User Management & Reports"
      description="Manage users, roles, and review community reports"
    >
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="reports">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.roles.some(r => r.role === "admin" && r.approved)).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.roles.some(r => r.role === "student" && r.approved)).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                    <SelectItem value="mentor">Mentors</SelectItem>
                    <SelectItem value="parent">Parents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Manage user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">User</TableHead>
                      <TableHead className="min-w-[120px]">Graduation Year</TableHead>
                      <TableHead className="min-w-[150px]">Roles</TableHead>
                      <TableHead className="text-right min-w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={user.profile?.avatar_url || undefined} />
                              <AvatarFallback>
                                {user.profile?.full_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium truncate">{user.profile?.full_name}</p>
                              <p className="text-sm text-muted-foreground truncate">{user.email || "No email"}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.profile?.graduation_year || "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.roles.length > 0 ? (
                              user.roles.map((r) => getRoleBadge(r.role, r.approved))
                            ) : (
                              <Badge variant="outline">No roles</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuItem onClick={() => navigate(`/profile?user=${user.id}`)}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignRole(user.id, "student")}>
                                Assign Student Role
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignRole(user.id, "alumni")}>
                                Assign Alumni Role
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignRole(user.id, "mentor")}>
                                Assign Mentor Role
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignRole(user.id, "parent")}>
                                Assign Parent Role
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignRole(user.id, "admin")}>
                                Assign Admin Role
                              </DropdownMenuItem>
                              {user.roles.length > 0 && (
                                <DropdownMenuItem 
                                  className="text-orange-600"
                                  onClick={() => {
                                    setSelectedUserForRoleRemoval(user);
                                    setShowRemoveRoleDialog(true);
                                  }}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Remove Role
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => {
                                  setSelectedUserToBlock(user.id);
                                  setShowBlockDialog(true);
                                }}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Block User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.status === "pending").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.status === "resolved").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <Card>
            <CardContent className="pt-6">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Community Reports</CardTitle>
              <CardDescription>
                Review and moderate user reports
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No reports found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={report.reporter_profile?.avatar_url || undefined} />
                                <AvatarFallback>
                                  {report.reporter_profile?.full_name?.[0] || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{report.reporter_profile?.full_name || "Unknown"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {report.reported_user_id ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={report.reported_profile?.avatar_url || undefined} />
                                  <AvatarFallback>
                                    {report.reported_profile?.full_name?.[0] || "?"}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{report.reported_profile?.full_name || "Unknown"}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Message</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{report.reason}</TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(report.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedReport(report);
                                setShowReportDialog(true);
                              }}
                            >
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Review Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Report</DialogTitle>
            <DialogDescription>
              Review the details and take appropriate action
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Reporter</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedReport.reporter_profile?.avatar_url || undefined} />
                      <AvatarFallback>
                        {selectedReport.reporter_profile?.full_name?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedReport.reporter_profile?.full_name || "Unknown"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Reported User</p>
                  {selectedReport.reported_user_id ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedReport.reported_profile?.avatar_url || undefined} />
                        <AvatarFallback>
                          {selectedReport.reported_profile?.full_name?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedReport.reported_profile?.full_name || "Unknown"}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Message Report</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Reason</p>
                <p className="text-sm text-muted-foreground">{selectedReport.reason}</p>
              </div>

              {selectedReport.description && (
                <div>
                  <p className="text-sm font-medium mb-1">Description</p>
                  <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-1">Status</p>
                {getStatusBadge(selectedReport.status)}
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Reported On</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedReport.created_at).toLocaleString()}
                </p>
              </div>

              {selectedReport.status === "pending" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Review Notes (Optional)</p>
                  <Textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add any notes about this review..."
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedReport?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReviewReport(selectedReport.id, "dismissed")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Dismiss
                </Button>
                <Button
                  onClick={() => handleReviewReport(selectedReport.id, "resolved")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Role Dialog */}
      <Dialog open={showRemoveRoleDialog} onOpenChange={setShowRemoveRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove User Role</DialogTitle>
            <DialogDescription>
              Select which role to remove from {selectedUserForRoleRemoval?.profile?.full_name}
            </DialogDescription>
          </DialogHeader>
          {selectedUserForRoleRemoval && (
            <div className="space-y-3">
              {selectedUserForRoleRemoval.roles.map((userRole) => (
                <Card key={userRole.role} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={userRole.approved ? "default" : "secondary"}>
                        {userRole.role}
                      </Badge>
                      {!userRole.approved && (
                        <span className="text-sm text-muted-foreground">(pending)</span>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveRole(selectedUserForRoleRemoval.id, userRole.role)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveRoleDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block User Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block User</AlertDialogTitle>
            <AlertDialogDescription>
              This will prevent the user from interacting with other members. Please provide a reason.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Textarea
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Reason for blocking..."
              rows={3}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBlockUser}
              disabled={!blockReason}
              className="bg-destructive hover:bg-destructive/90"
            >
              Block User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
