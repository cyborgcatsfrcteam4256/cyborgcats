import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const DownloadLogos = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

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
          title: "No logos found",
          description: "There are no active sponsors with logos",
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
        title: "Success",
        description: `Downloaded ${sponsors.length} sponsor logos`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to download logos",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Download Sponsor Logos</CardTitle>
          <CardDescription>
            Download all active sponsor logos as a ZIP file
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
                Preparing Download...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download All Logos
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadLogos;
