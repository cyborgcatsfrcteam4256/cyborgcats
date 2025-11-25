import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Award, Calendar, FileText, Image, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
            <div className="text-center mb-12">
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
              <p className="text-sm text-muted-foreground">
                {totalPages} {totalPages === 1 ? 'entry' : 'entries'} • Oldest to Most Recent
              </p>
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
                  <div className="bg-gradient-to-br from-card/90 via-card to-card/95 rounded-2xl shadow-2xl border-2 border-border/50 overflow-hidden backdrop-blur-sm min-h-[600px] relative">
                    {/* Page texture overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
                    
                    {/* Page Content */}
                    <div className="relative p-8 md:p-12">
                      {/* Page Header */}
                      <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-primary/20">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-base font-mono px-4 py-1.5 bg-primary/10 text-primary border-primary/30">
                            {currentEntry?.documentation_id}
                          </Badge>
                          <Badge variant="outline" className="text-sm px-3 py-1">
                            <FileText className="w-3.5 h-3.5 mr-1.5" />
                            {currentEntry?.documentation_type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-medium">{currentEntry?.activity_date}</span>
                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Left Side - Image */}
                        <div className="space-y-4">
                          <div className="relative rounded-xl overflow-hidden bg-muted/30 border-2 border-border/50 aspect-[4/3] shadow-lg">
                            {currentEntry?.documentation_url ? (
                              <img 
                                src={currentEntry.documentation_url} 
                                alt={`Documentation for ${currentEntry.documentation_id}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/50">
                                <Image className="w-20 h-20 mb-4" />
                                <p className="text-sm font-medium">Proof Image Pending</p>
                                <p className="text-xs mt-2 px-4 text-center">Documentation photo will be uploaded soon</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Category Tags */}
                          <div className="flex flex-wrap gap-2">
                            {currentEntry?.impact_category.split(',').map((cat, i) => (
                              <Badge key={i} variant="outline" className="text-xs font-medium px-3 py-1">
                                {cat.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Right Side - Description */}
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground leading-tight">
                              {currentEntry?.activity_description}
                            </h2>
                          </div>

                          {currentEntry?.activity_location && (
                            <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
                              <Award className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                                <p className="text-base font-medium">{currentEntry.activity_location}</p>
                              </div>
                            </div>
                          )}

                          {currentEntry?.team_number && (
                            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                              <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Team</p>
                                <p className="text-base font-medium">FRC {currentEntry.team_number}</p>
                              </div>
                            </div>
                          )}

                          {currentEntry?.notes && !currentEntry.notes.includes('📸') && (
                            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                              <p className="text-sm leading-relaxed text-muted-foreground italic">
                                {currentEntry.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Page Footer */}
                      <div className="pt-6 mt-6 border-t-2 border-border/30 flex items-center justify-center text-sm text-muted-foreground">
                        <span className="font-mono">
                          Page {currentPage + 1} of {totalPages}
                        </span>
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
