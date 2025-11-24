import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Palette, Type, Eye, Download, FileText } from "lucide-react";
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';
import jsPDF from 'jspdf';

interface BrandKitData {
  primary_color: string;
  primary_glow_color: string;
  primary_electric_color: string;
  secondary_color: string;
  accent_color: string;
  font_display: string;
  font_body: string;
  font_mono: string;
  brand_voice: string;
  tagline: string;
  mission_brief: string;
  logo_usage_guidelines: string;
}

export default function AdminBrandKit() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [brandData, setBrandData] = useState<BrandKitData>({
    primary_color: "#0082C9",
    primary_glow_color: "#33BBFF",
    primary_electric_color: "#00FFD5",
    secondary_color: "#1E293B",
    accent_color: "#0082C9",
    font_display: "Orbitron",
    font_body: "Electrolize",
    font_mono: "Audiowide",
    brand_voice: "Innovative, Technical, Inspiring, Community-Focused",
    tagline: "Building Tomorrow's Innovators Today",
    mission_brief: "FIRST Robotics Team 4256 Cyborg Cats empowers students through hands-on STEM education, competitive robotics, and community service.",
    logo_usage_guidelines: "Always maintain clear space around the logo equal to the height of the 'C'. Never stretch or distort. Use on dark backgrounds for best visibility."
  });

  useEffect(() => {
    checkAdminAndLoadBrandKit();
  }, []);

  const checkAdminAndLoadBrandKit = async () => {
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

      await loadBrandKit();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const loadBrandKit = async () => {
    try {
      const { data } = await supabase
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
          "brand_font_mono",
          "brand_voice",
          "brand_tagline",
          "brand_mission_brief",
          "brand_logo_usage_guidelines"
        ]);

      if (data && data.length > 0) {
        const settings: Record<string, string> = {};
        data.forEach(item => {
          settings[item.setting_key] = item.setting_value;
        });

        setBrandData({
          primary_color: settings.brand_primary_color || brandData.primary_color,
          primary_glow_color: settings.brand_primary_glow_color || brandData.primary_glow_color,
          primary_electric_color: settings.brand_primary_electric_color || brandData.primary_electric_color,
          secondary_color: settings.brand_secondary_color || brandData.secondary_color,
          accent_color: settings.brand_accent_color || brandData.accent_color,
          font_display: settings.brand_font_display || brandData.font_display,
          font_body: settings.brand_font_body || brandData.font_body,
          font_mono: settings.brand_font_mono || brandData.font_mono,
          brand_voice: settings.brand_voice || brandData.brand_voice,
          tagline: settings.brand_tagline || brandData.tagline,
          mission_brief: settings.brand_mission_brief || brandData.mission_brief,
          logo_usage_guidelines: settings.brand_logo_usage_guidelines || brandData.logo_usage_guidelines,
        });
      }
    } catch (error) {
      console.error("Error loading brand kit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const settingsToUpdate = [
        { setting_key: "brand_primary_color", setting_value: brandData.primary_color, display_label: "Brand Primary Color" },
        { setting_key: "brand_primary_glow_color", setting_value: brandData.primary_glow_color, display_label: "Brand Primary Glow Color" },
        { setting_key: "brand_primary_electric_color", setting_value: brandData.primary_electric_color, display_label: "Brand Primary Electric Color" },
        { setting_key: "brand_secondary_color", setting_value: brandData.secondary_color, display_label: "Brand Secondary Color" },
        { setting_key: "brand_accent_color", setting_value: brandData.accent_color, display_label: "Brand Accent Color" },
        { setting_key: "brand_font_display", setting_value: brandData.font_display, display_label: "Brand Display Font" },
        { setting_key: "brand_font_body", setting_value: brandData.font_body, display_label: "Brand Body Font" },
        { setting_key: "brand_font_mono", setting_value: brandData.font_mono, display_label: "Brand Mono Font" },
        { setting_key: "brand_voice", setting_value: brandData.brand_voice, display_label: "Brand Voice" },
        { setting_key: "brand_tagline", setting_value: brandData.tagline, display_label: "Brand Tagline" },
        { setting_key: "brand_mission_brief", setting_value: brandData.mission_brief, display_label: "Brand Mission Brief" },
        { setting_key: "brand_logo_usage_guidelines", setting_value: brandData.logo_usage_guidelines, display_label: "Logo Usage Guidelines" },
      ];

      const { error } = await supabase
        .from("site_settings")
        .upsert(settingsToUpdate, { 
          onConflict: "setting_key",
          ignoreDuplicates: false 
        });

      if (error) throw error;

      toast({
        title: "Brand Kit Updated",
        description: "Your brand guidelines have been saved. Reload the page to see changes.",
      });
      
      // Reload the page to apply new fonts
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error updating brand kit:", error);
      toast({
        title: "Error",
        description: "Failed to update brand kit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadBrandKitPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    // Helper to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    // Title
    pdf.setFontSize(24);
    pdf.setTextColor(0, 130, 201);
    pdf.text("CYBORG CATS", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;
    
    pdf.setFontSize(16);
    pdf.setTextColor(100, 100, 100);
    pdf.text("FRC TEAM 4256 - BRAND KIT", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 15;

    // Horizontal line
    pdf.setDrawColor(0, 130, 201);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 15;

    // COLOR PALETTE Section
    pdf.setFontSize(18);
    pdf.setTextColor(0, 130, 201);
    pdf.text("COLOR PALETTE", 20, yPosition);
    yPosition += 12;

    const colors = [
      { name: "Primary Color", value: brandData.primary_color },
      { name: "Primary Glow", value: brandData.primary_glow_color },
      { name: "Primary Electric", value: brandData.primary_electric_color },
      { name: "Secondary Color", value: brandData.secondary_color },
      { name: "Accent Color", value: brandData.accent_color }
    ];

    colors.forEach(color => {
      checkPageBreak(20);
      const rgb = hexToRgb(color.value);
      
      // Draw color swatch
      pdf.setFillColor(rgb.r, rgb.g, rgb.b);
      pdf.rect(20, yPosition - 5, 15, 10, 'F');
      
      // Draw border around swatch
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.1);
      pdf.rect(20, yPosition - 5, 15, 10, 'S');
      
      // Color name and hex
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);
      pdf.text(color.name, 40, yPosition);
      pdf.setTextColor(100, 100, 100);
      pdf.text(color.value.toUpperCase(), 40, yPosition + 5);
      
      yPosition += 18;
    });

    yPosition += 5;
    checkPageBreak(30);

    // TYPOGRAPHY Section
    pdf.setFontSize(18);
    pdf.setTextColor(0, 130, 201);
    pdf.text("TYPOGRAPHY", 20, yPosition);
    yPosition += 12;

    const fonts = [
      { name: "Display Font (Headers)", value: brandData.font_display },
      { name: "Body Font", value: brandData.font_body },
      { name: "Monospace Font", value: brandData.font_mono }
    ];

    fonts.forEach(font => {
      checkPageBreak(15);
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);
      pdf.text(`${font.name}:`, 20, yPosition);
      pdf.setTextColor(0, 130, 201);
      pdf.text(font.value, 70, yPosition);
      yPosition += 10;
    });

    yPosition += 10;
    checkPageBreak(30);

    // BRAND VOICE Section
    pdf.setFontSize(18);
    pdf.setTextColor(0, 130, 201);
    pdf.text("BRAND VOICE", 20, yPosition);
    yPosition += 12;

    pdf.setFontSize(11);
    pdf.setTextColor(50, 50, 50);
    const voiceLines = pdf.splitTextToSize(brandData.brand_voice, pageWidth - 40);
    voiceLines.forEach((line: string) => {
      checkPageBreak(10);
      pdf.text(line, 20, yPosition);
      yPosition += 7;
    });

    yPosition += 10;
    checkPageBreak(30);

    // TAGLINE Section
    pdf.setFontSize(18);
    pdf.setTextColor(0, 130, 201);
    pdf.text("TAGLINE", 20, yPosition);
    yPosition += 12;

    pdf.setFontSize(12);
    pdf.setTextColor(50, 50, 50);
    const taglineLines = pdf.splitTextToSize(brandData.tagline, pageWidth - 40);
    taglineLines.forEach((line: string) => {
      checkPageBreak(10);
      pdf.text(line, 20, yPosition);
      yPosition += 8;
    });

    yPosition += 10;
    checkPageBreak(30);

    // MISSION Section
    pdf.setFontSize(18);
    pdf.setTextColor(0, 130, 201);
    pdf.text("MISSION", 20, yPosition);
    yPosition += 12;

    pdf.setFontSize(11);
    pdf.setTextColor(50, 50, 50);
    const missionLines = pdf.splitTextToSize(brandData.mission_brief, pageWidth - 40);
    missionLines.forEach((line: string) => {
      checkPageBreak(10);
      pdf.text(line, 20, yPosition);
      yPosition += 7;
    });

    yPosition += 10;
    checkPageBreak(30);

    // LOGO USAGE GUIDELINES Section
    pdf.setFontSize(18);
    pdf.setTextColor(0, 130, 201);
    pdf.text("LOGO USAGE GUIDELINES", 20, yPosition);
    yPosition += 12;

    pdf.setFontSize(11);
    pdf.setTextColor(50, 50, 50);
    const guidelineLines = pdf.splitTextToSize(brandData.logo_usage_guidelines, pageWidth - 40);
    guidelineLines.forEach((line: string) => {
      checkPageBreak(10);
      pdf.text(line, 20, yPosition);
      yPosition += 7;
    });

    // Footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Generated: ${new Date().toLocaleDateString()} | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }

    // Save the PDF
    pdf.save("cyborg-cats-brand-kit.pdf");

    toast({
      title: "PDF Downloaded",
      description: "Brand kit has been exported as PDF successfully.",
    });
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
      title="Brand Kit" 
      description="Manage your team's brand identity, colors, fonts, and guidelines"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Preview */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Brand Preview
                </CardTitle>
                <CardDescription>See how your brand elements look together</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={downloadBrandKitPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-8 rounded-lg border border-border bg-gradient-to-br from-background via-background to-primary/5">
              <div className="flex items-center gap-6 mb-6">
                <img src={cyborgCatsLogo} alt="Cyborg Cats Logo" className="w-24 h-24 object-contain" />
                <div>
                  <h2 
                    className="text-4xl font-black mb-2"
                    style={{ fontFamily: brandData.font_display, color: brandData.primary_color }}
                  >
                    CYBORG CATS
                  </h2>
                  <p 
                    className="text-lg"
                    style={{ fontFamily: brandData.font_body, color: brandData.primary_glow_color }}
                  >
                    {brandData.tagline}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mt-6">
                <div className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg mb-2"
                    style={{ backgroundColor: brandData.primary_color }}
                  />
                  <p className="text-xs text-muted-foreground">Primary</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg mb-2"
                    style={{ backgroundColor: brandData.primary_glow_color }}
                  />
                  <p className="text-xs text-muted-foreground">Glow</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg mb-2"
                    style={{ backgroundColor: brandData.primary_electric_color }}
                  />
                  <p className="text-xs text-muted-foreground">Electric</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg mb-2"
                    style={{ backgroundColor: brandData.secondary_color }}
                  />
                  <p className="text-xs text-muted-foreground">Secondary</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg mb-2"
                    style={{ backgroundColor: brandData.accent_color }}
                  />
                  <p className="text-xs text-muted-foreground">Accent</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Brand Colors
            </CardTitle>
            <CardDescription>Define your team's color palette</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary_color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary_color"
                    type="color"
                    value={brandData.primary_color}
                    onChange={(e) => setBrandData({ ...brandData, primary_color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={brandData.primary_color}
                    onChange={(e) => setBrandData({ ...brandData, primary_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary_glow_color">Primary Glow Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary_glow_color"
                    type="color"
                    value={brandData.primary_glow_color}
                    onChange={(e) => setBrandData({ ...brandData, primary_glow_color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={brandData.primary_glow_color}
                    onChange={(e) => setBrandData({ ...brandData, primary_glow_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary_electric_color">Primary Electric Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary_electric_color"
                    type="color"
                    value={brandData.primary_electric_color}
                    onChange={(e) => setBrandData({ ...brandData, primary_electric_color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={brandData.primary_electric_color}
                    onChange={(e) => setBrandData({ ...brandData, primary_electric_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary_color">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary_color"
                    type="color"
                    value={brandData.secondary_color}
                    onChange={(e) => setBrandData({ ...brandData, secondary_color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={brandData.secondary_color}
                    onChange={(e) => setBrandData({ ...brandData, secondary_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent_color">Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="accent_color"
                    type="color"
                    value={brandData.accent_color}
                    onChange={(e) => setBrandData({ ...brandData, accent_color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={brandData.accent_color}
                    onChange={(e) => setBrandData({ ...brandData, accent_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Typography
            </CardTitle>
            <CardDescription>Configure your brand fonts (use Google Fonts names)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground mb-2">Popular Google Fonts:</p>
              <div className="flex flex-wrap gap-2">
                {['Orbitron', 'Audiowide', 'Rajdhani', 'Exo 2', 'Inter', 'Roboto', 'Poppins', 'Montserrat', 'Space Mono', 'IBM Plex Mono'].map(font => (
                  <span key={font} className="text-xs px-2 py-1 bg-background rounded border border-border">
                    {font}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="font_display">Display Font (Headers)</Label>
                <Input
                  id="font_display"
                  value={brandData.font_display}
                  onChange={(e) => setBrandData({ ...brandData, font_display: e.target.value })}
                  placeholder="Orbitron"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font_body">Body Font</Label>
                <Input
                  id="font_body"
                  value={brandData.font_body}
                  onChange={(e) => setBrandData({ ...brandData, font_body: e.target.value })}
                  placeholder="Inter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font_mono">Monospace Font</Label>
                <Input
                  id="font_mono"
                  value={brandData.font_mono}
                  onChange={(e) => setBrandData({ ...brandData, font_mono: e.target.value })}
                  placeholder="Space Mono"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Changes take effect immediately. Reload the page to see font updates.
            </p>
          </CardContent>
        </Card>

        {/* Brand Voice & Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Voice & Guidelines</CardTitle>
            <CardDescription>Define how your team communicates and uses brand assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand_voice">Brand Voice</Label>
              <Input
                id="brand_voice"
                value={brandData.brand_voice}
                onChange={(e) => setBrandData({ ...brandData, brand_voice: e.target.value })}
                placeholder="Innovative, Technical, Inspiring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={brandData.tagline}
                onChange={(e) => setBrandData({ ...brandData, tagline: e.target.value })}
                placeholder="Building Tomorrow's Innovators Today"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mission_brief">Mission Brief</Label>
              <Textarea
                id="mission_brief"
                value={brandData.mission_brief}
                onChange={(e) => setBrandData({ ...brandData, mission_brief: e.target.value })}
                placeholder="Brief description of your team's mission"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo_usage_guidelines">Logo Usage Guidelines</Label>
              <Textarea
                id="logo_usage_guidelines"
                value={brandData.logo_usage_guidelines}
                onChange={(e) => setBrandData({ ...brandData, logo_usage_guidelines: e.target.value })}
                placeholder="Guidelines for using your team's logo"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Brand Kit
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
