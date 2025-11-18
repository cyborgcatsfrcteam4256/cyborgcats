import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  display_label: string;
  created_at: string;
  updated_at: string;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("setting_key");

      if (error) throw error;

      // Convert to a more usable format
      const settings: Record<string, string> = {};
      data?.forEach((setting) => {
        settings[setting.setting_key] = setting.setting_value;
      });

      return {
        raw: data as SiteSetting[],
        teamMembersCount: parseInt(settings.team_members_count || "48"),
        yearsActive: parseInt(settings.years_active || "14"),
        legislatorsMet: parseInt(settings.legislators_met || "19"),
      };
    },
  });
};
