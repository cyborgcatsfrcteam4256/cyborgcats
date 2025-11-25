import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Award, Calendar, FileText, Image, ChevronLeft, ChevronRight, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import cyborgCatsLogo from "@/assets/cyborg-cats-logo.png";

interface ImpactEntry {
  id: string;
  documentation_id: string;
  team_number: string | null;
  activity_description: string;
  activity_location: string | null;
  activity_date: string;
  impact_category: string;
  documentation_type: string;
  documentation_url: string | null;
  notes: string | null;
}

export default function ImpactDocumentation() {
  const [entries, setEntries] = useState<ImpactEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const hiddenPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("impact_award_entries")
        .select("*")
        .eq("is_active", true)
        .order("activity_date", { ascending: true });

      if (error) throw error;
      if (data) setEntries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter to only show past 3 years
  const parseYear = (dateStr: string): number => {
    const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) return parseInt(yearMatch[0]);
    if (dateStr.toLowerCase().includes('present')) return new Date().getFullYear();
    return 0;
  };

  const filteredEntries = entries.filter(entry => {
    const currentYear = new Date().getFullYear();
    const entryYear = parseYear(entry.activity_date);
    return entryYear >= currentYear - 3 && entryYear <= currentYear;
  });

  const currentEntry = filteredEntries[currentPage];
  const totalPages = filteredEntries.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const exportToPDF = async () => {
    if (!hiddenPageRef.current) return;
    
    toast.info("Generating PDF... This may take a moment");
    
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < filteredEntries.length; i++) {
        const entry = filteredEntries[i];
        
        // Render the entry in the hidden div
        if (hiddenPageRef.current) {
          hiddenPageRef.current.innerHTML = '';
          
          // Create the page structure
          const pageDiv = document.createElement('div');
          pageDiv.style.width = '1240px'; // A4 width at 150 DPI
          pageDiv.style.minHeight = '1754px'; // A4 height at 150 DPI
          pageDiv.style.padding = '80px';
          pageDiv.style.backgroundColor = 'white';
          pageDiv.style.position = 'relative';
          
          pageDiv.innerHTML = `
            <div style="position: relative; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%); border-radius: 24px; box-shadow: 0 20px 60px -15px rgba(0,0,0,0.3); border: 1px solid rgba(226, 232, 240, 0.5); overflow: hidden; min-height: 1000px; padding: 60px;">
              <!-- Corner decorations -->
              <div style="position: absolute; top: 0; left: 0; width: 128px; height: 128px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%); border-radius: 0 0 100% 0;"></div>
              <div style="position: absolute; bottom: 0; right: 0; width: 128px; height: 128px; background: linear-gradient(315deg, rgba(251, 191, 36, 0.1) 0%, transparent 100%); border-radius: 100% 0 0 0;"></div>
              
              <!-- Page Content -->
              <div style="position: relative; z-index: 1;">
                <!-- Official Header -->
                <div style="margin-bottom: 48px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                      <img src="${cyborgCatsLogo}" alt="Cyborg Cats Logo" style="width: 64px; height: 64px; object-fit: contain;" />
                      <div>
                        <h3 style="font-size: 14px; font-weight: 500; color: #64748b; margin: 0;">FIRST Impact Award</h3>
                        <p style="font-size: 24px; font-weight: bold; color: #3b82f6; margin: 4px 0 0 0; font-family: 'Orbitron', sans-serif;">Cyborg Cats 4256</p>
                      </div>
                    </div>
                    <div style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; font-weight: bold; padding: 12px 20px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3); font-family: monospace; font-size: 18px;">
                      ${entry.documentation_id}
                    </div>
                  </div>
                  <div style="height: 4px; background: linear-gradient(to right, #3b82f6 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%); border-radius: 2px;"></div>
                </div>

                <!-- Metadata Bar -->
                <div style="display: flex; gap: 12px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(226, 232, 240, 0.5);">
                  <span style="background: white; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
                    <span style="color: #3b82f6;">📄</span> ${entry.documentation_type}
                  </span>
                  <span style="background: white; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
                    <span style="color: #fbbf24;">📅</span> ${entry.activity_date}
                  </span>
                </div>

                <!-- Main Content Grid -->
                <div style="display: grid; grid-template-columns: 2fr 3fr; gap: 48px; margin-bottom: 48px;">
                  <!-- Left - Image -->
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="position: relative; border-radius: 16px; overflow: hidden; background: linear-gradient(135deg, rgba(226, 232, 240, 0.5) 0%, rgba(226, 232, 240, 0.3) 100%); border: 2px solid rgba(226, 232, 240, 0.5); aspect-ratio: 3/4; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.2);">
                      ${entry.documentation_url ? `
                        <img src="${entry.documentation_url}" alt="Documentation" style="width: 100%; height: 100%; object-fit: cover;" />
                      ` : `
                        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(148, 163, 184, 0.4);">
                          <div style="padding: 24px; border-radius: 50%; background: rgba(0, 0, 0, 0.05); margin-bottom: 16px;">
                            <span style="font-size: 64px;">📷</span>
                          </div>
                          <p style="font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">Proof Image Pending</p>
                          <p style="font-size: 12px; margin: 0; text-align: center; padding: 0 24px;">Documentation photo will be uploaded soon</p>
                        </div>
                      `}
                    </div>
                    
                    <!-- Category Tags -->
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                      ${entry.impact_category.split(',').map(cat => `
                        <span style="background: linear-gradient(to right, rgba(59, 130, 246, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;">
                          ${cat.trim()}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Right - Description -->
                  <div style="display: flex; flex-direction: column; gap: 32px;">
                    <div>
                      <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #3b82f6; margin: 0 0 8px 0;">Activity Description</h3>
                      <div style="height: 2px; width: 64px; background: linear-gradient(to right, #3b82f6 0%, transparent 100%); margin-bottom: 16px;"></div>
                      <h2 style="font-size: 28px; font-weight: bold; color: #1e293b; margin: 0; line-height: 1.3;">
                        ${entry.activity_description}
                      </h2>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 16px;">
                      ${entry.activity_location ? `
                        <div style="padding: 20px; background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(251, 191, 36, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(251, 191, 36, 0.2);">
                          <div style="display: flex; align-items: flex-start; gap: 16px;">
                            <div style="padding: 10px; border-radius: 8px; background: rgba(251, 191, 36, 0.1);">
                              <span style="font-size: 20px;">🏆</span>
                            </div>
                            <div style="flex: 1;">
                              <p style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #92400e; margin: 0 0 6px 0;">Location</p>
                              <p style="font-size: 16px; font-weight: 600; color: #1e293b; margin: 0;">${entry.activity_location}</p>
                            </div>
                          </div>
                        </div>
                      ` : ''}

                      ${entry.team_number && entry.team_number !== '4256' ? `
                        <div style="padding: 20px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.2);">
                          <div style="display: flex; align-items: flex-start; gap: 16px;">
                            <div style="padding: 10px; border-radius: 8px; background: rgba(59, 130, 246, 0.1);">
                              <span style="font-size: 20px;">📖</span>
                            </div>
                            <div style="flex: 1;">
                              <p style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #1e40af; margin: 0 0 6px 0;">Collaboration</p>
                              <p style="font-size: 16px; font-weight: 600; color: #1e293b; margin: 0;">With Team ${entry.team_number}</p>
                            </div>
                          </div>
                        </div>
                      ` : ''}

                      ${entry.notes && !entry.notes.includes('📸') ? `
                        <div style="padding: 20px; background: linear-gradient(135deg, rgba(226, 232, 240, 0.3) 0%, rgba(226, 232, 240, 0.5) 100%); border-radius: 12px; border: 1px solid rgba(226, 232, 240, 0.5);">
                          <p style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 8px 0;">Additional Notes</p>
                          <p style="font-size: 14px; line-height: 1.6; color: rgba(30, 41, 59, 0.9); margin: 0; font-style: italic;">
                            ${entry.notes}
                          </p>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div style="padding-top: 32px; margin-top: 32px; border-top: 1px solid rgba(226, 232, 240, 0.3);">
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #64748b;">
                      <div style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></div>
                      <span style="font-weight: 500;">Cyborg Cats 4256</span>
                    </div>
                    <span style="font-size: 14px; font-family: monospace; color: #64748b; font-weight: 500;">
                      ${i + 1} / ${filteredEntries.length}
                    </span>
                    <span style="font-size: 12px; color: #64748b;">
                      FIRST Impact Award
                    </span>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          hiddenPageRef.current.appendChild(pageDiv);
          
          // Wait for images to load
          const images = pageDiv.querySelectorAll('img');
          await Promise.all(
            Array.from(images).map(img => {
              if (img.complete) return Promise.resolve();
              return new Promise(resolve => {
                img.onload = () => resolve(true);
                img.onerror = () => resolve(true);
              });
            })
          );
          
          // Small delay for rendering
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Capture with html2canvas
          const canvas = await html2canvas(pageDiv, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            imageTimeout: 0,
            allowTaint: true
          });
          
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          
          if (i > 0) {
            pdf.addPage();
          }
          
          // Add the captured image to PDF
          const imgWidth = pageWidth;
          const imgHeight = (canvas.height * pageWidth) / canvas.width;
          
          pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
      }

      const year = new Date().getFullYear();
      pdf.save(`Cyborg_Cats_4256_Impact_Award_${year}.pdf`);
      toast.success("PDF exported successfully!");
      
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <>
      <PageMeta 
        title="FIRST Impact Award Documentation | Cyborg Cats 4256"
        description="Explore our comprehensive documentation of community impact, outreach programs, and STEM initiatives for the FIRST Impact Award."
        keywords="FIRST Impact Award, FRC documentation, STEM outreach, community impact, robotics programs"
      />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-background">
        <Navigation />
        
        {/* Hidden rendering area for PDF generation */}
        <div 
          ref={hiddenPageRef}
          style={{
            position: 'fixed',
            left: '-9999px',
            top: 0,
            width: '1240px',
            visibility: 'hidden'
          }}
          aria-hidden="true"
        />
        
        <main id="main-content" className="flex-1 pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">FIRST Impact Award</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-glow">
                Impact Documentation
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
                Documenting our journey of community impact from the past three years
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  {totalPages} {totalPages === 1 ? 'entry' : 'entries'} • Oldest to Most Recent
                </p>
                {totalPages > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={exportToPDF}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF
                  </Button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading documentation...</p>
              </div>
            ) : totalPages === 0 ? (
              <div className="text-center py-24">
                <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No entries found</h3>
                <p className="text-muted-foreground">No documentation entries from the past three years.</p>
              </div>
            ) : (
              <>
                {/* Book Page */}
                <div className="relative mb-8">
                  {/* Professional shadow and border effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl blur-2xl" />
                  
                  <div className="relative bg-gradient-to-br from-background via-card to-background rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-border/50 overflow-hidden backdrop-blur-sm min-h-[700px]">
                    {/* Elegant corner decorations */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full" />
                    
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNTAsMTUwLDE1MCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none" />
                    
                    {/* Page Content */}
                    <div className="relative p-10 md:p-14">
                      {/* Official Header Bar with Logo */}
                      <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <img 
                              src={cyborgCatsLogo} 
                              alt="Cyborg Cats Logo" 
                              className="w-16 h-16 object-contain"
                            />
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">FIRST Impact Award</h3>
                              <p className="text-xl font-bold font-orbitron text-primary">Cyborg Cats 4256</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-base font-mono px-4 py-2 bg-primary/10 text-primary border-primary/30 shadow-md">
                              {currentEntry?.documentation_id}
                            </Badge>
                          </div>
                        </div>
                        <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full" />
                      </div>

                      {/* Metadata Bar */}
                      <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-border/50">
                        <Badge variant="outline" className="text-sm px-4 py-1.5 gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          {currentEntry?.documentation_type}
                        </Badge>
                        <Badge variant="outline" className="text-sm px-4 py-1.5 gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          {currentEntry?.activity_date}
                        </Badge>
                      </div>

                      {/* Main Content Area */}
                      <div className="grid md:grid-cols-5 gap-10 mb-10">
                        {/* Left Side - Image (2 columns) */}
                        <div className="md:col-span-2 space-y-4">
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-border/50 aspect-[3/4] shadow-xl group">
                            {currentEntry?.documentation_url ? (
                              <>
                                <img 
                                  src={currentEntry.documentation_url} 
                                  alt={`Documentation for ${currentEntry.documentation_id}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40 bg-gradient-to-br from-muted/30 to-background/50">
                                <div className="p-6 rounded-full bg-background/50 mb-4">
                                  <Image className="w-16 h-16" />
                                </div>
                                <p className="text-sm font-semibold mb-1">Proof Image Pending</p>
                                <p className="text-xs px-6 text-center leading-relaxed">Documentation photo will be uploaded soon</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Category Tags */}
                          <div className="flex flex-wrap gap-2">
                            {currentEntry?.impact_category.split(',').map((cat, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className="text-xs font-medium px-3 py-1.5 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/30"
                              >
                                {cat.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Right Side - Description (3 columns) */}
                        <div className="md:col-span-3 space-y-8">
                          <div className="space-y-4">
                            <div className="inline-block">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Activity Description</h3>
                              <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-transparent" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-tight">
                              {currentEntry?.activity_description}
                            </h2>
                          </div>

                          <div className="grid gap-4">
                            {currentEntry?.activity_location && (
                              <div className="group p-5 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 hover:border-accent/40 transition-all hover:shadow-md">
                                <div className="flex items-start gap-4">
                                  <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                    <Award className="w-5 h-5 text-accent" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1.5">Location</p>
                                    <p className="text-base font-semibold text-foreground">{currentEntry.activity_location}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentEntry?.team_number && currentEntry.team_number !== '4256' && (
                              <div className="group p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all hover:shadow-md">
                                <div className="flex items-start gap-4">
                                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Collaboration</p>
                                    <p className="text-base font-semibold text-foreground">With Team {currentEntry.team_number}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentEntry?.notes && !currentEntry.notes.includes('📸') && (
                              <div className="p-5 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl border border-border/50">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Additional Notes</p>
                                <p className="text-sm leading-relaxed text-foreground/90 italic">
                                  {currentEntry.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Professional Footer */}
                      <div className="pt-8 mt-8 border-t border-border/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="font-medium">Cyborg Cats 4256</span>
                          </div>
                          <span className="text-sm font-mono text-muted-foreground font-medium">
                            {currentPage + 1} / {totalPages}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            FIRST Impact Award
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    className="group"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Previous
                  </Button>

                  <div className="flex-1 flex justify-center">
                    <div className="flex gap-2 flex-wrap justify-center">
                      {filteredEntries.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentPage 
                              ? 'bg-primary w-8' 
                              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                          }`}
                          aria-label={`Go to page ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="group"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-xl p-8 text-center">
                  <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold mb-3">Request Changes or Additions</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Team members and students can submit requests to add new documentation entries or suggest edits.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/impact-award-request')}
                    className="hover-glow"
                  >
                    Submit a Request
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
