import { useEffect, useState } from "react";
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
    toast.info("Generating PDF...");
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    for (let i = 0; i < filteredEntries.length; i++) {
      const entry = filteredEntries[i];
      
      if (i > 0) {
        pdf.addPage();
      }

      let yPos = margin;

      // Header with Documentation ID
      pdf.setFillColor(59, 130, 246); // primary color
      pdf.rect(margin, yPos, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text(entry.documentation_id, margin + 5, yPos + 10);
      pdf.setFontSize(10);
      pdf.text(entry.documentation_type, pageWidth - margin - 5, yPos + 10, { align: 'right' });
      
      yPos += 20;

      // Date
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Date: ${entry.activity_date}`, margin, yPos);
      yPos += 10;

      // Title/Description
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      const descriptionLines = pdf.splitTextToSize(entry.activity_description, contentWidth);
      pdf.text(descriptionLines, margin, yPos);
      yPos += (descriptionLines.length * 7) + 5;

      // Location
      if (entry.activity_location) {
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(80, 80, 80);
        pdf.text(`Location: ${entry.activity_location}`, margin, yPos);
        yPos += 8;
      }

      // Team Number
      if (entry.team_number) {
        pdf.text(`Team: FRC ${entry.team_number}`, margin, yPos);
        yPos += 8;
      }

      // Impact Categories
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      const categories = entry.impact_category.split(',').map(c => c.trim()).join(' • ');
      const categoryLines = pdf.splitTextToSize(`Categories: ${categories}`, contentWidth);
      pdf.text(categoryLines, margin, yPos);
      yPos += (categoryLines.length * 5) + 10;

      // Image placeholder or actual image
      if (entry.documentation_url) {
        try {
          const img = document.createElement('img');
          img.crossOrigin = 'anonymous';
          
          await new Promise((resolve, reject) => {
            img.onload = () => {
              try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL('image/jpeg', 0.8);
                
                const imgWidth = contentWidth;
                const imgHeight = (img.height * imgWidth) / img.width;
                const maxImgHeight = pageHeight - yPos - margin - 15;
                
                if (imgHeight <= maxImgHeight) {
                  pdf.addImage(imgData, 'JPEG', margin, yPos, imgWidth, imgHeight);
                  yPos += imgHeight + 5;
                } else {
                  const scaledHeight = maxImgHeight;
                  const scaledWidth = (img.width * scaledHeight) / img.height;
                  pdf.addImage(imgData, 'JPEG', margin, yPos, scaledWidth, scaledHeight);
                  yPos += scaledHeight + 5;
                }
                resolve(true);
              } catch (error) {
                console.error('Error processing image:', error);
                resolve(false);
              }
            };
            img.onerror = () => {
              console.error('Failed to load image');
              resolve(false);
            };
            img.src = entry.documentation_url;
          });
        } catch (error) {
          console.error('Image load error:', error);
          // Draw placeholder box
          pdf.setDrawColor(200, 200, 200);
          pdf.setFillColor(245, 245, 245);
          pdf.rect(margin, yPos, contentWidth, 80, 'FD');
          pdf.setTextColor(150, 150, 150);
          pdf.setFontSize(10);
          pdf.text('Documentation Image', pageWidth / 2, yPos + 40, { align: 'center' });
          yPos += 85;
        }
      } else {
        // Draw placeholder box
        pdf.setDrawColor(200, 200, 200);
        pdf.setFillColor(245, 245, 245);
        pdf.rect(margin, yPos, contentWidth, 80, 'FD');
        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(10);
        pdf.text('Proof Image Pending', pageWidth / 2, yPos + 35, { align: 'center' });
        pdf.text('Documentation photo will be uploaded soon', pageWidth / 2, yPos + 45, { align: 'center' });
        yPos += 85;
      }

      // Notes
      if (entry.notes && !entry.notes.includes('📸')) {
        pdf.setFontSize(9);
        pdf.setTextColor(80, 80, 80);
        pdf.setFont(undefined, 'italic');
        const notesLines = pdf.splitTextToSize(`Notes: ${entry.notes}`, contentWidth);
        if (yPos + (notesLines.length * 5) < pageHeight - margin) {
          pdf.text(notesLines, margin, yPos);
          yPos += (notesLines.length * 5);
        }
      }

      // Footer
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(8);
      pdf.setFont(undefined, 'normal');
      pdf.text('Cyborg Cats 4256 - FIRST Impact Award Documentation', margin, pageHeight - 8);
      pdf.text(`Page ${i + 1} of ${filteredEntries.length}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    }

    const year = new Date().getFullYear();
    pdf.save(`FIRST_Impact_Award_Documentation_${year}.pdf`);
    toast.success("PDF exported successfully!");
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
                      {/* Official Header Bar */}
                      <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                              <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">FIRST Impact Award</h3>
                              <p className="text-lg font-bold font-orbitron text-primary">Cyborg Cats 4256</p>
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

                            {currentEntry?.team_number && (
                              <div className="group p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all hover:shadow-md">
                                <div className="flex items-start gap-4">
                                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">Team Number</p>
                                    <p className="text-base font-semibold text-foreground">FRC {currentEntry.team_number}</p>
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
