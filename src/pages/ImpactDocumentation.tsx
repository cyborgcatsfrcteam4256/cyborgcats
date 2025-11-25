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
import { Award, Search, Calendar, MapPin, FileText, Image } from "lucide-react";
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

interface Category {
  category_name: string;
}

export default function ImpactDocumentation() {
  const [entries, setEntries] = useState<ImpactEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
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

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.activity_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.documentation_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (entry.activity_location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = filterCategory === "all" || entry.impact_category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: "Total Activities", value: entries.length, icon: Award },
    { label: "Categories", value: new Set(entries.map(e => e.impact_category)).size, icon: FileText },
    { label: "Locations", value: new Set(entries.map(e => e.activity_location).filter(Boolean)).size, icon: MapPin },
    { label: "With Documentation", value: entries.filter(e => e.documentation_url).length, icon: Image }
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-3xl font-bold text-glow mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>

            {/* Filters */}
            <ScrollReveal>
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search activities, locations, or documentation ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.category_name} value={cat.category_name}>
                            {cat.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <ScrollReveal key={entry.id} delay={index * 0.05}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02] group">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className="text-xs font-mono">
                            {entry.documentation_id}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {entry.documentation_type}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {entry.activity_description}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{entry.activity_date}</span>
                        </div>
                        {entry.activity_location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="line-clamp-1">{entry.activity_location}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {entry.impact_category.split(',').map((cat, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {cat.trim()}
                            </Badge>
                          ))}
                        </div>
                        {entry.documentation_url && (
                          <div className="pt-2">
                            <img 
                              src={entry.documentation_url} 
                              alt={`Documentation for ${entry.documentation_id}`}
                              className="w-full h-48 object-cover rounded-md"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {!entry.documentation_url && entry.notes?.includes('📸') && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                            <Image className="w-4 h-4" />
                            <span>Image documentation pending</span>
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
