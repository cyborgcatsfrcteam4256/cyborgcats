import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BrandSettings {
  primaryColor: string;
  primaryGlowColor: string;
  primaryElectricColor: string;
  secondaryColor: string;
  accentColor: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
}

export const useBrandSettings = () => {
  return useQuery({
    queryKey: ["brand-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .in("setting_key", [
          "brand_primary_color",
          "brand_primary_glow_color",
          "brand_primary_electric_color",
          "brand_secondary_color",
          "brand_accent_color",
          "brand_font_display",
          "brand_font_body",
          "brand_font_mono"
        ]);

      if (error) throw error;

      const settings: Record<string, string> = {};
      data?.forEach((setting) => {
        settings[setting.setting_key] = setting.setting_value;
      });

      return {
        primaryColor: settings.brand_primary_color || "#0082C9",
        primaryGlowColor: settings.brand_primary_glow_color || "#33BBFF",
        primaryElectricColor: settings.brand_primary_electric_color || "#00FFD5",
        secondaryColor: settings.brand_secondary_color || "#1E293B",
        accentColor: settings.brand_accent_color || "#0082C9",
        fontDisplay: settings.brand_font_display || "Orbitron",
        fontBody: settings.brand_font_body || "Inter",
        fontMono: settings.brand_font_mono || "Audiowide",
      } as BrandSettings;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};