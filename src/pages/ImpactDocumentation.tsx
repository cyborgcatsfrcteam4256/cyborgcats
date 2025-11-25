import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Breadcrumbs } from "@/components/UI/Breadcrumbs";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Award, Search, Calendar, MapPin, FileText, Image, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AnimatedNumber } from "@/components/AnimatedNumber";

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

interface Category {
  category_name: string;
}

export default function ImpactDocumentation() {
  const [entries, setEntries] = useState<ImpactEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [entriesResult, categoriesResult] = await Promise.all([
        supabase
          .from("impact_award_entries")
          .select("*")
          .eq("is_active", true)
          .order("activity_date", { ascending: false }),
        supabase
          .from("impact_award_categories")
          .select("category_name")
          .eq("is_active", true)
          .order("display_order")
      ]);

      if (entriesResult.data) setEntries(entriesResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseYear = (dateStr: string): number => {
    const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) return parseInt(yearMatch[0]);
    if (dateStr.toLowerCase().includes('present')) return new Date().getFullYear();
    return 0;
  };

  const isWithinPastThreeYears = (dateStr: string): boolean => {
    const currentYear = new Date().getFullYear();
    const year = parseYear(dateStr);
    return year >= currentYear - 3 && year <= currentYear;
  };

  const filteredEntries = entries
    .filter(entry => {
      const matchesSearch = entry.activity_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           entry.documentation_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (entry.activity_location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesCategory = filterCategory === "all" || entry.impact_category.toLowerCase().includes(filterCategory.toLowerCase());
      
      let matchesSort = true;
      if (sortBy === "past3years") {
        matchesSort = isWithinPastThreeYears(entry.activity_date);
      }
      
      return matchesSearch && matchesCategory && matchesSort;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return parseYear(b.activity_date) - parseYear(a.activity_date);
        case "oldest":
          return parseYear(a.activity_date) - parseYear(b.activity_date);
        case "category":
          return a.impact_category.localeCompare(b.impact_category);
        case "past3years":
          return parseYear(b.activity_date) - parseYear(a.activity_date);
        default:
          return 0;
      }
    });

  const stats = [
    { label: "Activities", value: 62, icon: Award, color: "text-primary" },
    { label: "Categories", value: 15, icon: FileText, color: "text-accent" }
  ];

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs />
            
            {/* Header */}
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">FIRST Impact Award</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4 text-glow">
                  Impact Documentation
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our comprehensive collection of community outreach, STEM advocacy, and educational programs that demonstrate our commitment to FIRST values.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-card via-card/95 to-card/90 border-border/50 hover:shadow-xl transition-all hover:scale-[1.02]">
                    <CardContent className="pt-8 pb-8">
                      <stat.icon className={`w-12 h-12 mx-auto mb-3 ${stat.color}`} />
                      <div className="text-5xl font-orbitron font-bold text-glow mb-2">
                        <AnimatedNumber value={stat.value} />
                      </div>
                      <div className="text-base font-medium text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>

            {/* Filters and Sorting */}
            <ScrollReveal>
              <Card className="mb-8 bg-gradient-to-r from-card via-card/95 to-card/90 border-border/50">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Search activities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="advocacy">Advocacy</SelectItem>
                        <SelectItem value="hosted">Hosted</SelectItem>
                        <SelectItem value="mentored">Mentored</SelectItem>
                        <SelectItem value="ran">Ran</SelectItem>
                        <SelectItem value="reached">Reached</SelectItem>
                        <SelectItem value="supported">Supported</SelectItem>
                        <SelectItem value="assisted">Assisted</SelectItem>
                        <SelectItem value="provided published resources">Provided Resources</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-11">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="past3years">Past 3 Years</SelectItem>
                        <SelectItem value="category">By Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {filteredEntries.length} {filteredEntries.length === 1 ? 'activity' : 'activities'}</span>
                    {(searchQuery || filterCategory !== "all" || sortBy !== "recent") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setFilterCategory("all");
                          setSortBy("recent");
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Entries Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading documentation...</p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">No entries found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredEntries.map((entry, index) => (
                  <ScrollReveal key={entry.id} delay={Math.min(index * 0.03, 0.5)}>
                    <Card className="h-full hover:shadow-2xl transition-all hover:scale-[1.03] group bg-gradient-to-br from-card via-card/98 to-card/95 border-border/50">
                      {entry.documentation_url && (
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img 
                            src={entry.documentation_url} 
                            alt={`Documentation for ${entry.documentation_id}`}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="text-xs font-mono backdrop-blur-sm bg-background/80">
                              {entry.documentation_id}
                            </Badge>
                          </div>
                        </div>
                      )}
                      <CardHeader className={!entry.documentation_url ? 'pt-6' : 'pt-4'}>
                        {!entry.documentation_url && (
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant="secondary" className="text-xs font-mono">
                              {entry.documentation_id}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {entry.documentation_type}
                            </Badge>
                          </div>
                        )}
                        <CardTitle className="text-lg leading-tight line-clamp-3 group-hover:text-primary transition-colors">
                          {entry.activity_description}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{entry.activity_date}</span>
                        </div>
                        {entry.activity_location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span className="line-clamp-1">{entry.activity_location}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {entry.impact_category.split(',').slice(0, 3).map((cat, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {cat.trim()}
                            </Badge>
                          ))}
                        </div>
                        {!entry.documentation_url && entry.notes?.includes('📸') && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground/70 italic pt-2">
                            <Image className="w-3.5 h-3.5" />
                            <span>Proof image pending upload</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* CTA for Logged-in Users */}
            <ScrollReveal>
              <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
                <CardContent className="text-center py-12">
                  <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold mb-4">Request Changes or Additions</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Team members and students can submit requests to add new documentation entries or suggest edits to existing ones.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/impact-award-request')}
                    className="hover-glow"
                  >
                    Submit a Request
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
