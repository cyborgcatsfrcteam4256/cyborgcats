import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Newspaper, UsersIcon, HandshakeIcon, AlertTriangle, TrendingUp, ArrowRight, Mail, Download, Images, Palette, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageMeta } from "@/components/SEO/PageMeta";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRoles: 0,
    totalResources: 0,
    pendingResources: 0,
    totalTeamMembers: 0,
    activeTeamMembers: 0,
    totalNews: 0,
    publishedNews: 0,
    totalSponsors: 0,
    activeSponsors: 0
  });

  useEffect(() => {
    checkAdminAndFetchStats();
  }, []);

  const checkAdminAndFetchStats = async () => {
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

      await fetchStats();
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast.error("Failed to verify admin access");
      navigate("/dashboard");
    }
  };

  const fetchStats = async () => {
    try {
      const [
        usersCount,
        pendingRolesCount,
        resourcesData,
        teamData,
        newsData,
        sponsorsData
      ] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("approved", false),
        supabase.from("resources").select("id, is_approved", { count: "exact" }),
        supabase.from("team_members").select("id, is_active", { count: "exact" }),
        supabase.from("news_posts").select("id, is_published", { count: "exact" }),
        supabase.from("sponsors").select("id, is_active", { count: "exact" })
      ]);

      setStats({
        totalUsers: usersCount.count || 0,
        pendingRoles: pendingRolesCount.count || 0,
        totalResources: resourcesData.count || 0,
        pendingResources: resourcesData.data?.filter(r => !r.is_approved).length || 0,
        totalTeamMembers: teamData.count || 0,
        activeTeamMembers: teamData.data?.filter(t => t.is_active).length || 0,
        totalNews: newsData.count || 0,
        publishedNews: newsData.data?.filter(n => n.is_published).length || 0,
        totalSponsors: sponsorsData.count || 0,
        activeSponsors: sponsorsData.data?.filter(s => s.is_active).length || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  const managementCards = [
    {
      title: "Manage Users",
      description: "User roles and permissions",
      icon: Users,
      path: "/admin/users",
      stat: `${stats.pendingRoles} pending requests`,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Site Settings",
      description: "Configure site-wide statistics",
      icon: TrendingUp,
      path: "/admin/settings",
      stat: "Team stats & numbers",
      color: "from-cyan-500/20 to-cyan-600/20"
    },
    {
      title: "Brand Kit",
      description: "Manage brand identity & guidelines",
      icon: Palette,
      path: "/admin/brand-kit",
      stat: "Colors, fonts, voice",
      color: "from-teal-500/20 to-teal-600/20"
    },
    {
      title: "Sponsor Tiers",
      description: "Manage sponsorship tiers",
      icon: Trophy,
      path: "/admin/sponsor-tiers",
      stat: "Tier levels & benefits",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      title: "Manage Sponsors",
      description: "Sponsor information and logos",
      icon: HandshakeIcon,
      path: "/admin/sponsors",
      stat: `${stats.activeSponsors} active sponsors`,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Download Logos",
      description: "Download all sponsor logos",
      icon: Download,
      path: "/admin/download-logos",
      stat: "Export as ZIP file",
      color: "from-violet-500/20 to-violet-600/20"
    },
    {
      title: "Manage Resources",
      description: "Learning materials and downloads",
      icon: BookOpen,
      path: "/admin/resources",
      stat: `${stats.pendingResources} pending approvals`,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Manage Team",
      description: "Team member profiles",
      icon: UsersIcon,
      path: "/admin/team",
      stat: `${stats.activeTeamMembers} active members`,
      color: "from-orange-500/20 to-orange-600/20"
    },
    {
      title: "Team Requests",
      description: "Review membership requests",
      icon: Users,
      path: "/admin/team-requests",
      stat: "Pending showcase requests",
      color: "from-yellow-500/20 to-yellow-600/20"
    },
    {
      title: "Manage Photos",
      description: "Approve and feature photos",
      icon: Images,
      path: "/admin/photos",
      stat: "Gallery management",
      color: "from-indigo-500/20 to-indigo-600/20"
    },
    {
      title: "Manage News",
      description: "News posts and updates",
      icon: Newspaper,
      path: "/admin/news",
      stat: `${stats.publishedNews} published posts`,
      color: "from-pink-500/20 to-pink-600/20"
    },
    {
      title: "News Submissions",
      description: "Review user news articles",
      icon: Newspaper,
      path: "/admin/news-submissions",
      stat: "Pending articles",
      color: "from-rose-500/20 to-rose-600/20"
    },
    {
      title: "Contact Inquiries",
      description: "View contact form submissions",
      icon: Mail,
      path: "/admin/contact-inquiries",
      stat: "Messages & Support",
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      title: "View Reports",
      description: "User reports and moderation",
      icon: AlertTriangle,
      path: "/admin/users",
      stat: "Reports & Safety",
      color: "from-red-500/20 to-red-600/20"
    }
  ];

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
        title="Admin Control Center"
        description="Manage your robotics team website"
      />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
          
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-12 space-y-6">
              <Badge variant="outline" className="mb-4 font-orbitron border-primary/50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Admin Portal
              </Badge>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Control Center
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Manage your team's digital presence with powerful tools
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 hover-glow transition-cyber">
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-orbitron font-black text-holographic mb-1">
                    {stats.totalUsers}
                  </div>
                  {stats.pendingRoles > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {stats.pendingRoles} pending
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 hover-glow transition-cyber">
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <BookOpen className="w-8 h-8 text-green-400" />
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Resources</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-orbitron font-black text-holographic mb-1">
                    {stats.totalResources}
                  </div>
                  {stats.pendingResources > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {stats.pendingResources} pending
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30 hover-glow transition-cyber">
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <UsersIcon className="w-8 h-8 text-orange-400" />
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-orbitron font-black text-holographic mb-1">
                    {stats.totalTeamMembers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats.activeTeamMembers} active
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30 hover-glow transition-cyber">
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <Newspaper className="w-8 h-8 text-pink-400" />
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">News Posts</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-orbitron font-black text-holographic mb-1">
                    {stats.totalNews}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats.publishedNews} published
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {managementCards.map((card, index) => (
              <Card 
                key={card.path}
                className={`group relative overflow-hidden bg-gradient-to-br ${card.color} border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
                onClick={() => navigate(card.path)}
              >
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-background/50 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-all duration-500">
                      <card.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="font-orbitron text-xs">
                      Active
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-orbitron mb-2">{card.title}</CardTitle>
                  <CardDescription className="text-sm">{card.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="relative">
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground font-medium">{card.stat}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group-hover:bg-primary/20 group-hover:text-primary transition-all"
                    >
                      Manage
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
