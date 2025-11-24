import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, BarChart3, Users, Share2, MapPin, FileText, ToggleLeft } from "lucide-react";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    // Team Info
    team_name: "",
    team_number: "",
    team_email: "",
    team_phone: "",
    team_location: "",
    current_season: "",
    current_game: "",
    
    // Social Media
    instagram_url: "",
    twitter_url: "",
    facebook_url: "",
    youtube_url: "",
    github_url: "",
    tiktok_url: "",
    
    // Meeting Info
    meeting_location: "",
    meeting_schedule: "",
    meeting_description: "",
    
    // Recruitment
    recruitment_open: "false",
    application_deadline: "",
    join_form_url: "",
    
    // Content
    hero_title: "",
    hero_subtitle: "",
    about_excerpt: "",
    mission_statement: "",
    
    // Statistics
    team_members_count: "",
    years_active: "",
    legislators_met: "",
    total_awards: "",
    competitions_attended: "",
    community_hours: "",
    
    // Features
    enable_alumni_network: "true",
    enable_resources: "true",
    enable_news: "true",
    enable_contact_form: "true",
  });

  useEffect(() => {
    checkAdminAndLoadSettings();
  }, []);

  const checkAdminAndLoadSettings = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("approved", true);

      const isAdmin = roles?.some(r => r.role === "admin");
      
      if (!isAdmin) {
        navigate("/");
        toast({
          title: "Access Denied",
          description: "You must be an admin to access this page.",
          variant: "destructive",
        });
        return;
      }

      await loadSettings();
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value");

      if (error) throw error;

      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((setting) => {
          settingsMap[setting.setting_key] = setting.setting_value;
        });

        setFormData({
          team_name: settingsMap.team_name || "",
          team_number: settingsMap.team_number || "",
          team_email: settingsMap.team_email || "",
          team_phone: settingsMap.team_phone || "",
          team_location: settingsMap.team_location || "",
          current_season: settingsMap.current_season || "",
          current_game: settingsMap.current_game || "",
          instagram_url: settingsMap.instagram_url || "",
          twitter_url: settingsMap.twitter_url || "",
          facebook_url: settingsMap.facebook_url || "",
          youtube_url: settingsMap.youtube_url || "",
          github_url: settingsMap.github_url || "",
          tiktok_url: settingsMap.tiktok_url || "",
          meeting_location: settingsMap.meeting_location || "",
          meeting_schedule: settingsMap.meeting_schedule || "",
          meeting_description: settingsMap.meeting_description || "",
          recruitment_open: settingsMap.recruitment_open || "false",
          application_deadline: settingsMap.application_deadline || "",
          join_form_url: settingsMap.join_form_url || "",
          hero_title: settingsMap.hero_title || "",
          hero_subtitle: settingsMap.hero_subtitle || "",
          about_excerpt: settingsMap.about_excerpt || "",
          mission_statement: settingsMap.mission_statement || "",
          team_members_count: settingsMap.team_members_count || "",
          years_active: settingsMap.years_active || "",
          legislators_met: settingsMap.legislators_met || "",
          total_awards: settingsMap.total_awards || "",
          competitions_attended: settingsMap.competitions_attended || "",
          community_hours: settingsMap.community_hours || "",
          enable_alumni_network: settingsMap.enable_alumni_network || "true",
          enable_resources: settingsMap.enable_resources || "true",
          enable_news: settingsMap.enable_news || "true",
          enable_contact_form: settingsMap.enable_contact_form || "true",
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const settingsArray = Object.entries(formData).map(([key, value]) => ({
        setting_key: key,
        setting_value: value,
        display_label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      }));

      for (const setting of settingsArray) {
        const { data: existing } = await supabase
          .from("site_settings")
          .select("id")
          .eq("setting_key", setting.setting_key)
          .single();

        if (existing) {
          await supabase
            .from("site_settings")
            .update({
              setting_value: setting.setting_value,
              display_label: setting.display_label,
              updated_at: new Date().toISOString(),
            })
            .eq("setting_key", setting.setting_key);
        } else {
          await supabase
            .from("site_settings")
            .insert({
              setting_key: setting.setting_key,
              setting_value: setting.setting_value,
              display_label: setting.display_label,
            });
        }
      }

      toast({
        title: "Settings Updated",
        description: "All site settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout 
      title="Site Settings" 
      description="Manage site-wide settings, statistics, and configurations"
    >
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="team-info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="team-info">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="meeting">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Meeting</span>
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="features">
              <ToggleLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Features</span>
            </TabsTrigger>
          </TabsList>

          {/* Team Info Tab */}
          <TabsContent value="team-info">
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
                <CardDescription>Basic team details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team_name">Team Name</Label>
                    <Input
                      id="team_name"
                      value={formData.team_name}
                      onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                      placeholder="Cyborg Cats"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team_number">Team Number</Label>
                    <Input
                      id="team_number"
                      value={formData.team_number}
                      onChange={(e) => setFormData({ ...formData, team_number: e.target.value })}
                      placeholder="4256"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team_email">Team Email</Label>
                    <Input
                      id="team_email"
                      type="email"
                      value={formData.team_email}
                      onChange={(e) => setFormData({ ...formData, team_email: e.target.value })}
                      placeholder="contact@team4256.org"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team_phone">Team Phone</Label>
                    <Input
                      id="team_phone"
                      type="tel"
                      value={formData.team_phone}
                      onChange={(e) => setFormData({ ...formData, team_phone: e.target.value })}
                      placeholder="(314) 555-0100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team_location">Team Location</Label>
                  <Input
                    id="team_location"
                    value={formData.team_location}
                    onChange={(e) => setFormData({ ...formData, team_location: e.target.value })}
                    placeholder="St. Louis, Missouri"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_season">Current Season</Label>
                    <Input
                      id="current_season"
                      value={formData.current_season}
                      onChange={(e) => setFormData({ ...formData, current_season: e.target.value })}
                      placeholder="2024-2025"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current_game">Current Game</Label>
                    <Input
                      id="current_game"
                      value={formData.current_game}
                      onChange={(e) => setFormData({ ...formData, current_game: e.target.value })}
                      placeholder="CRESCENDO"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Update your team's social media presence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input
                    id="instagram_url"
                    type="url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/cyborgcats4256"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter_url">Twitter/X URL</Label>
                  <Input
                    id="twitter_url"
                    type="url"
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    placeholder="https://twitter.com/cyborgcats4256"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook URL</Label>
                  <Input
                    id="facebook_url"
                    type="url"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/cyborgcats4256"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube_url">YouTube URL</Label>
                  <Input
                    id="youtube_url"
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    placeholder="https://youtube.com/@cyborgcats4256"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/cyborgcats4256"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok_url">TikTok URL</Label>
                  <Input
                    id="tiktok_url"
                    type="url"
                    value={formData.tiktok_url}
                    onChange={(e) => setFormData({ ...formData, tiktok_url: e.target.value })}
                    placeholder="https://tiktok.com/@cyborgcats4256"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meeting Info Tab */}
          <TabsContent value="meeting">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Information</CardTitle>
                <CardDescription>Details about team meetings and recruitment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting_location">Meeting Location</Label>
                  <Input
                    id="meeting_location"
                    value={formData.meeting_location}
                    onChange={(e) => setFormData({ ...formData, meeting_location: e.target.value })}
                    placeholder="Westminster Christian Academy"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meeting_schedule">Meeting Schedule</Label>
                  <Input
                    id="meeting_schedule"
                    value={formData.meeting_schedule}
                    onChange={(e) => setFormData({ ...formData, meeting_schedule: e.target.value })}
                    placeholder="Tuesdays & Thursdays, 3:30 PM - 6:30 PM"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meeting_description">Meeting Description</Label>
                  <Textarea
                    id="meeting_description"
                    value={formData.meeting_description}
                    onChange={(e) => setFormData({ ...formData, meeting_description: e.target.value })}
                    placeholder="Join us for hands-on robotics experience..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="recruitment_open">Recruitment Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable when actively recruiting new members
                      </p>
                    </div>
                    <Switch
                      id="recruitment_open"
                      checked={formData.recruitment_open === "true"}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, recruitment_open: checked ? "true" : "false" })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Input
                    id="application_deadline"
                    type="date"
                    value={formData.application_deadline}
                    onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="join_form_url">Join Form URL</Label>
                  <Input
                    id="join_form_url"
                    type="url"
                    value={formData.join_form_url}
                    onChange={(e) => setFormData({ ...formData, join_form_url: e.target.value })}
                    placeholder="https://forms.google.com/..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>Customize homepage and about section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_title">Hero Section Title</Label>
                  <Input
                    id="hero_title"
                    value={formData.hero_title}
                    onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                    placeholder="Building Tomorrow's Innovators"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero_subtitle">Hero Section Subtitle</Label>
                  <Textarea
                    id="hero_subtitle"
                    value={formData.hero_subtitle}
                    onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                    placeholder="St. Louis-based FIRST Robotics team inspiring students..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_excerpt">About Section Excerpt</Label>
                  <Textarea
                    id="about_excerpt"
                    value={formData.about_excerpt}
                    onChange={(e) => setFormData({ ...formData, about_excerpt: e.target.value })}
                    placeholder="Team 4256, the Cyborg Cats, is a FIRST Robotics Competition team..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mission_statement">Mission Statement</Label>
                  <Textarea
                    id="mission_statement"
                    value={formData.mission_statement}
                    onChange={(e) => setFormData({ ...formData, mission_statement: e.target.value })}
                    placeholder="Our mission is to inspire young minds through robotics..."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Team Statistics</CardTitle>
                <CardDescription>Update key metrics displayed throughout the site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team_members_count">Team Members</Label>
                    <Input
                      id="team_members_count"
                      type="number"
                      min="0"
                      value={formData.team_members_count}
                      onChange={(e) => setFormData({ ...formData, team_members_count: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years_active">Years Active</Label>
                    <Input
                      id="years_active"
                      type="number"
                      min="0"
                      value={formData.years_active}
                      onChange={(e) => setFormData({ ...formData, years_active: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="legislators_met">Legislators Met</Label>
                    <Input
                      id="legislators_met"
                      type="number"
                      min="0"
                      value={formData.legislators_met}
                      onChange={(e) => setFormData({ ...formData, legislators_met: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_awards">Total Awards</Label>
                    <Input
                      id="total_awards"
                      type="number"
                      min="0"
                      value={formData.total_awards}
                      onChange={(e) => setFormData({ ...formData, total_awards: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competitions_attended">Competitions Attended</Label>
                    <Input
                      id="competitions_attended"
                      type="number"
                      min="0"
                      value={formData.competitions_attended}
                      onChange={(e) => setFormData({ ...formData, competitions_attended: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="community_hours">Community Hours</Label>
                    <Input
                      id="community_hours"
                      type="number"
                      min="0"
                      value={formData.community_hours}
                      onChange={(e) => setFormData({ ...formData, community_hours: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Feature Toggles</CardTitle>
                <CardDescription>Enable or disable site features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable_alumni_network">Alumni Network</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable the alumni networking features
                    </p>
                  </div>
                  <Switch
                    id="enable_alumni_network"
                    checked={formData.enable_alumni_network === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, enable_alumni_network: checked ? "true" : "false" })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable_resources">Resources Section</Label>
                    <p className="text-sm text-muted-foreground">
                      Show the resources and learning materials section
                    </p>
                  </div>
                  <Switch
                    id="enable_resources"
                    checked={formData.enable_resources === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, enable_resources: checked ? "true" : "false" })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable_news">News Section</Label>
                    <p className="text-sm text-muted-foreground">
                      Display team news and updates
                    </p>
                  </div>
                  <Switch
                    id="enable_news"
                    checked={formData.enable_news === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, enable_news: checked ? "true" : "false" })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable_contact_form">Contact Form</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow visitors to submit contact inquiries
                    </p>
                  </div>
                  <Switch
                    id="enable_contact_form"
                    checked={formData.enable_contact_form === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, enable_contact_form: checked ? "true" : "false" })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save All Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
