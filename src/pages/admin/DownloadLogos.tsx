import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { AdminLayout } from "@/components/Admin/AdminLayout";
import { useTranslation } from "react-i18next";

const DownloadLogos = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const downloadAllLogos = async () => {
    setIsDownloading(true);
    try {
      const { data: sponsors, error } = await supabase
        .from("sponsors")
        .select("name, logo_url")
        .eq("is_active", true);

      if (error) throw error;

      if (!sponsors || sponsors.length === 0) {
        toast({
          title: t('downloadLogos.noLogos'),
          description: t('downloadLogos.noLogosDesc'),
          variant: "destructive",
        });
        return;
      }

      const zip = new JSZip();
      const logoFolder = zip.folder("sponsor-logos");

      for (const sponsor of sponsors) {
        if (sponsor.logo_url) {
          try {
            const response = await fetch(sponsor.logo_url);
            const blob = await response.blob();
            const extension = sponsor.logo_url.split(".").pop()?.split("?")[0] || "png";
            const sanitizedName = sponsor.name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
            logoFolder?.file(`${sanitizedName}.${extension}`, blob);
          } catch (err) {
            console.error(`Failed to download logo for ${sponsor.name}:`, err);
          }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `sponsor-logos-${new Date().toISOString().split("T")[0]}.zip`);

      toast({
        title: t('downloadLogos.success'),
        description: t('downloadLogos.successDesc', { count: sponsors.length }),
      });
    } catch (error: any) {
      toast({
        title: t('downloadLogos.error'),
        description: error.message || t('downloadLogos.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AdminLayout 
      title={t('downloadLogos.title')} 
      description={t('downloadLogos.description')}
    >
      <Card>
        <CardHeader>
          <CardTitle className="font-display">{t('downloadLogos.cardTitle')}</CardTitle>
          <CardDescription>
            {t('downloadLogos.cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={downloadAllLogos}
            disabled={isDownloading}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('downloadLogos.preparing')}
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                {t('downloadLogos.downloadButton')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default DownloadLogos;
