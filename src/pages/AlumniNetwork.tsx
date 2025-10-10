import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Briefcase, MessageSquare, Search, Award, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AlumniProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  graduation_year: number | null;
  skills: string[] | null;
  linkedin_url: string | null;
  github_url: string | null;
}

export default function AlumniNetwork() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<AlumniProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadAlumni();
  }, []);

  useEffect(() => {
    filterAlumni();
  }, [searchTerm, yearFilter, alumni]);

  const loadAlumni = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, bio, graduation_year, skills, linkedin_url, github_url")
        .not("graduation_year", "is", null)
        .order("graduation_year", { ascending: false });

      if (error) throw error;
      setAlumni(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading alumni",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAlumni = () => {
    let filtered = alumni;

    if (searchTerm) {
      filtered = filtered.filter(
        (alum) =>
          alum.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alum.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (yearFilter !== "all") {
      filtered = filtered.filter((alum) => alum.graduation_year === parseInt(yearFilter));
    }

    setFilteredAlumni(filtered);
  };

  const graduationYears = Array.from(new Set(alumni.map((a) => a.graduation_year).filter(Boolean)))
    .sort((a, b) => b! - a!);

  return (
    <>
      <PageMeta
        title="Alumni Network - Cyborg Cats FRC 4256"
        description="Connect with Cyborg Cats alumni. Find mentors, explore career paths, and stay connected with our robotics community."
        keywords="FRC alumni, robotics mentorship, STEM careers, student network"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
            <div className="container mx-auto max-w-6xl text-center">
              <GraduationCap className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Alumni Network</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Connect with former Cyborg Cats who are making an impact in STEM fields and beyond.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" onClick={() => navigate("/network")}>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Connect with Alumni
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
                  <Users className="mr-2 h-5 w-5" />
                  Join as Alumni
                </Button>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 px-4 border-b">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <Users className="w-10 h-10 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-3xl">{alumni.length}+</CardTitle>
                    <CardDescription>Active Alumni</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <Briefcase className="w-10 h-10 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-3xl">50+</CardTitle>
                    <CardDescription>Career Paths</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <Award className="w-10 h-10 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-3xl">15+</CardTitle>
                    <CardDescription>Years of Impact</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Mentorship Section */}
          <section className="py-16 px-4 bg-muted/50">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Mentorship Opportunities</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our alumni are passionate about giving back. Connect with mentors who can guide you in robotics, college applications, and career development.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <TrendingUp className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>Technical Mentorship</CardTitle>
                    <CardDescription>
                      Get guidance on programming, mechanical design, electrical systems, and CAD from alumni working in engineering fields.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <GraduationCap className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>College & Career Advice</CardTitle>
                    <CardDescription>
                      Learn from alumni who've navigated college applications, internships, and early career decisions in STEM.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Alumni Directory */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Alumni Directory</h2>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or bio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Graduation Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {graduationYears.map((year) => (
                      <SelectItem key={year} value={year!.toString()}>
                        Class of {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Alumni Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading alumni...</p>
                </div>
              ) : filteredAlumni.length === 0 ? (
                <Card className="p-12 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">No alumni found matching your criteria.</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAlumni.map((alum) => (
                    <Card key={alum.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={alum.avatar_url || undefined} />
                            <AvatarFallback>
                              {alum.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{alum.full_name}</CardTitle>
                            {alum.graduation_year && (
                              <Badge variant="secondary" className="mt-1">
                                Class of {alum.graduation_year}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {alum.bio && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {alum.bio}
                          </p>
                        )}
                        {alum.skills && alum.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {alum.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => navigate("/network")}>
                            Connect
                          </Button>
                          {(alum.linkedin_url || alum.github_url) && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={alum.linkedin_url || alum.github_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Profile
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
