import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Loader2, Save, BarChart3 } from "lucide-react";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: settings, isLoading: settingsLoading, refetch } = useSiteSettings();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    team_members_count: "",
    years_active: "",
    legislators_met: "",
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (settings) {
      setFormData({
        team_members_count: settings.teamMembersCount.toString(),
        years_active: settings.yearsActive.toString(),
        legislators_met: settings.legislatorsMet.toString(),
      });
    }
  }, [settings]);

  const checkAdminStatus = async () => {
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

      setIsLoading(false);
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updates = [
        { key: "team_members_count", value: formData.team_members_count, label: "Team Members" },
        { key: "years_active", value: formData.years_active, label: "Years of Excellence" },
        { key: "legislators_met", value: formData.legislators_met, label: "Legislators Met" },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({
            setting_value: update.value,
            display_label: update.label,
          })
          .eq("setting_key", update.key);

        if (error) throw error;
      }

      await refetch();

      toast({
        title: "Settings Updated",
        description: "Site statistics have been updated successfully.",
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

  if (isLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Site Settings - Admin"
        description="Manage site-wide settings and statistics"
      />
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-orbitron font-bold mb-2 text-glow">Site Settings</h1>
            <p className="text-muted-foreground">
              Manage site-wide statistics and settings that appear throughout the website
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Site Statistics
              </CardTitle>
              <CardDescription>
                Update the key statistics displayed on the homepage and throughout the site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="team_members_count">Team Members Count</Label>
                  <Input
                    id="team_members_count"
                    type="number"
                    min="0"
                    value={formData.team_members_count}
                    onChange={(e) => setFormData({ ...formData, team_members_count: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Current number of active team members
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="years_active">Years Active</Label>
                  <Input
                    id="years_active"
                    type="number"
                    min="0"
                    value={formData.years_active}
                    onChange={(e) => setFormData({ ...formData, years_active: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of years the team has been active
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legislators_met">Legislators Met</Label>
                  <Input
                    id="legislators_met"
                    type="number"
                    min="0"
                    value={formData.legislators_met}
                    onChange={(e) => setFormData({ ...formData, legislators_met: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of legislators the team has met with
                  </p>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/dashboard")}
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
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                How these statistics will appear on the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-orbitron font-bold text-primary mb-2">
                    {formData.team_members_count}
                  </div>
                  <div className="text-muted-foreground">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-orbitron font-bold text-primary mb-2">
                    {formData.years_active}+
                  </div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-orbitron font-bold text-primary mb-2">
                    {formData.legislators_met}
                  </div>
                  <div className="text-muted-foreground">Legislators Met</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
