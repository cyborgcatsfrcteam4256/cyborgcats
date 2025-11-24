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
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      title: t('admin.manageUsers'),
      description: t('admin.userRolesPermissions'),
      icon: Users,
      path: "/admin/users",
      stat: `${stats.pendingRoles} ${t('admin.pendingRequests')}`,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: t('admin.siteSettings'),
      description: t('admin.configureSiteWide'),
      icon: TrendingUp,
      path: "/admin/settings",
      stat: t('admin.teamStatsNumbers'),
      color: "from-cyan-500/20 to-cyan-600/20"
    },
    {
      title: t('admin.brandKit'),
      description: t('admin.manageBrandIdentity'),
      icon: Palette,
      path: "/admin/brand-kit",
      stat: t('admin.colorsFontsVoice'),
      color: "from-teal-500/20 to-teal-600/20"
    },
    {
      title: t('admin.sponsorTiers'),
      description: t('admin.manageSponsorshipTiers'),
      icon: Trophy,
      path: "/admin/sponsor-tiers",
      stat: t('admin.tierLevelsBenefits'),
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      title: t('admin.manageSponsors'),
      description: t('admin.sponsorInfoLogos'),
      icon: HandshakeIcon,
      path: "/admin/sponsors",
      stat: `${stats.activeSponsors} ${t('admin.activeSponsors')}`,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: t('admin.downloadLogos'),
      description: t('admin.downloadAllLogos'),
      icon: Download,
      path: "/admin/download-logos",
      stat: t('admin.exportZipFile'),
      color: "from-violet-500/20 to-violet-600/20"
    },
    {
      title: t('admin.manageResources'),
      description: t('admin.learningMaterialsDownloads'),
      icon: BookOpen,
      path: "/admin/resources",
      stat: `${stats.pendingResources} ${t('admin.pendingApprovals')}`,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: t('admin.manageTeam'),
      description: t('admin.teamMemberProfiles'),
      icon: UsersIcon,
      path: "/admin/team",
      stat: `${stats.activeTeamMembers} ${t('admin.activeMembers')}`,
      color: "from-orange-500/20 to-orange-600/20"
    },
    {
      title: t('admin.teamRequests'),
      description: t('admin.reviewMembershipRequests'),
      icon: Users,
      path: "/admin/team-requests",
      stat: t('admin.pendingShowcaseRequests'),
      color: "from-yellow-500/20 to-yellow-600/20"
    },
    {
      title: t('admin.managePhotos'),
      description: t('admin.approveFeaturePhotos'),
      icon: Images,
      path: "/admin/photos",
      stat: t('admin.galleryManagement'),
      color: "from-indigo-500/20 to-indigo-600/20"
    },
    {
      title: t('admin.manageNews'),
      description: t('admin.newsPostsUpdates'),
      icon: Newspaper,
      path: "/admin/news",
      stat: `${stats.publishedNews} ${t('admin.publishedPosts')}`,
      color: "from-pink-500/20 to-pink-600/20"
    },
    {
      title: t('admin.newsSubmissions'),
      description: t('admin.reviewUserNewsArticles'),
      icon: Newspaper,
      path: "/admin/news-submissions",
      stat: t('admin.pendingArticles'),
      color: "from-rose-500/20 to-rose-600/20"
    },
    {
      title: "Impact Award",
      description: "Manage FIRST Impact Award documentation",
      icon: Trophy,
      path: "/admin/impact-award",
      stat: "Documentation Management",
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      title: t('admin.contactInquiries'),
      description: t('admin.viewContactFormSubmissions'),
      icon: Mail,
      path: "/admin/contact-inquiries",
      stat: t('admin.messagesSupport'),
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      title: t('admin.viewReports'),
      description: t('admin.userReportsModeration'),
      icon: AlertTriangle,
      path: "/admin/users",
      stat: t('admin.reportsSafety'),
      color: "from-red-500/20 to-red-600/20"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse"></div>
          </div>
          <p className="text-muted-foreground font-orbitron">{t('admin.loadingControlCenter')}</p>
        </div>
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
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="circuit-pattern absolute inset-0 opacity-5"></div>
        </div>

        <div className="relative pt-24 pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
          
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16 space-y-6 animate-fade-in">
              <div className="inline-block">
                <Badge variant="outline" className="mb-4 font-orbitron border-primary/50 shadow-glow">
                  <TrendingUp className="w-4 h-4 mr-2 animate-pulse" />
                  {t('admin.portal')}
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4 animate-scale-in">
                <span className="text-holographic text-glow">
                  {t('admin.controlCenter')}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t('admin.managePresence')}
              </p>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-glow animate-fade-in cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Users className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{t('admin.totalUsers')}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-5xl font-orbitron font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stats.totalUsers}
                  </div>
                  {stats.pendingRoles > 0 && (
                    <Badge variant="secondary" className="text-xs animate-pulse">
                      <span className="relative flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      {stats.pendingRoles} {t('admin.pending')}
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-glow animate-fade-in cursor-pointer" style={{ animationDelay: '0.1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <BookOpen className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{t('admin.resources')}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-5xl font-orbitron font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stats.totalResources}
                  </div>
                  {stats.pendingResources > 0 && (
                    <Badge variant="secondary" className="text-xs animate-pulse">
                      <span className="relative flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      {stats.pendingResources} {t('admin.pending')}
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-glow animate-fade-in cursor-pointer" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <UsersIcon className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{t('admin.teamMembers')}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-5xl font-orbitron font-black bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stats.totalTeamMembers}
                  </div>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {stats.activeTeamMembers} {t('admin.active')}
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-glow animate-fade-in cursor-pointer" style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-pink-500/10 rounded-xl group-hover:bg-pink-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Newspaper className="w-8 h-8 text-pink-400 group-hover:text-pink-300 transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{t('admin.newsPosts')}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-5xl font-orbitron font-black bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stats.totalNews}
                  </div>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {stats.publishedNews} {t('admin.published')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 relative">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-holographic">
              {t('admin.managementTools')}
            </h2>
            <p className="text-muted-foreground">{t('admin.quickAccess')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {managementCards.map((card, index) => (
              <Card 
                key={card.path}
                className={`group relative overflow-hidden bg-gradient-to-br ${card.color} border-border/30 hover:border-primary/50 transition-all duration-500 hover:scale-[1.03] cursor-pointer animate-fade-in hover:shadow-luxury`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(card.path)}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-4 bg-background/60 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <card.icon className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors" />
                    </div>
                    <Badge variant="secondary" className="font-orbitron text-xs group-hover:bg-primary/20 transition-colors">
                      <span className="relative flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      {t('admin.active')}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-orbitron mb-2 group-hover:text-primary-glow transition-colors">{card.title}</CardTitle>
                  <CardDescription className="text-sm group-hover:text-foreground/80 transition-colors">{card.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="relative">
                  <div className="flex items-center justify-between pt-4 border-t border-border/30 group-hover:border-primary/30 transition-colors">
                    <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">{card.stat}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group-hover:bg-primary/20 group-hover:text-primary transition-all"
                    >
                      {t('admin.manage')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
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
