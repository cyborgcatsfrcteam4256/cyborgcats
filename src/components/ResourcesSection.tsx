import { useEffect, useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { FloatingParticles } from '@/components/FloatingParticles';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { 
  BookOpen, 
  Code, 
  Wrench, 
  Users, 
  FileText, 
  GraduationCap,
  ExternalLink
} from 'lucide-react';

export const ResourcesSection = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      programming: Code,
      cad_design: Wrench,
      team_management: Users,
      stem_curriculum: GraduationCap
    };
    return icons[category] || FileText;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      programming: "Programming Resources",
      cad_design: "CAD & Design",
      team_management: "Team Management",
      stem_curriculum: "STEM Curriculum"
    };
    return labels[category] || category;
  };

  const resourceCategories = [
    {
      title: "Programming Resources",
      description: resources.filter(r => r.category === "programming").length > 0 
        ? "Tutorials and guides for robot programming" 
        : "Coming Soon - Programming tutorials and guides",
      icon: Code,
      category: "programming",
      count: resources.filter(r => r.category === "programming").length
    },
    {
      title: "CAD & Design",
      description: resources.filter(r => r.category === "cad_design").length > 0
        ? "3D modeling and design resources"
        : "Coming Soon - Design files and tutorials",
      icon: Wrench,
      category: "cad_design",
      count: resources.filter(r => r.category === "cad_design").length
    },
    {
      title: "Team Management",
      description: resources.filter(r => r.category === "team_management").length > 0
        ? "Tools for organizing and managing the team"
        : "Coming Soon - Leadership and organizational resources",
      icon: Users,
      category: "team_management",
      count: resources.filter(r => r.category === "team_management").length
    },
    {
      title: "STEM Curriculum",
      description: resources.filter(r => r.category === "stem_curriculum").length > 0
        ? "Educational materials and lesson plans"
        : "Coming Soon - Educational materials for schools",
      icon: GraduationCap,
      category: "stem_curriculum",
      count: resources.filter(r => r.category === "stem_curriculum").length
    }
  ];

  const featuredResources = resources.filter(r => r.is_featured).slice(0, 6);

  return (
    <section className="relative py-32 overflow-hidden">
      <FloatingParticles />
      
      {/* Dramatic Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-[20s] hover:scale-105"
        style={{
          backgroundImage: `url('/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png')`
        }}
      />
      
      {/* Layered overlays for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-cyber-float" />
      
      {/* Accent gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.2),transparent_50%)]" />
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      <div className="container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 bg-card/60 backdrop-blur-md border-accent/30 px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2 text-accent" />
              Free Resources & Curriculum
            </Badge>
            <h2 className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow">
              Knowledge for 
              <br />
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-300% animate-gradient">
                Everyone
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access our comprehensive library of robotics resources, STEM curriculum, and educational materials. 
              All resources are free and designed to help teams, educators, and students succeed.
            </p>
          </div>
        </ScrollReveal>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {resourceCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 100}>
              <PremiumCard className="h-full p-8 hover:scale-105 transition-transform duration-500" variant="glass" glowEffect>
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6 shadow-glow">
                    <category.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl mb-3">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">{category.description}</p>
                  <div className="text-sm font-semibold text-accent bg-accent/10 rounded-xl px-4 py-2 inline-block">
                    {category.count > 0 ? `${category.count} ${category.count === 1 ? 'resource' : 'resources'}` : 'Coming Soon'}
                  </div>
                </div>
              </PremiumCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured Resources */}
        <ScrollReveal delay={200}>
          <div className="mb-24">
            <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-center mb-12 text-glow">
              {featuredResources.length > 0 ? 'Featured Resources' : 'Resources Coming Soon'}
            </h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : featuredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource, index) => {
                  const CategoryIcon = getCategoryIcon(resource.category);
                  return (
                    <ScrollReveal key={resource.id} delay={index * 100}>
                      <PremiumCard 
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                        variant="luxury" 
                        glowEffect
                        onClick={() => {
                          if (resource.external_url) {
                            window.open(resource.external_url, "_blank");
                          }
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center flex-shrink-0">
                            <CategoryIcon className="w-6 h-6 text-accent" />
                          </div>
                          {resource.external_url && (
                            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        <h4 className="font-orbitron font-bold text-lg mb-2">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryLabel(resource.category).split(' ')[0]}
                          </Badge>
                          {resource.tags && resource.tags.length > 0 && (
                            <div className="flex gap-1">
                              {resource.tags.slice(0, 2).map((tag: string, i: number) => (
                                <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </PremiumCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            ) : (
              <div className="text-center">
                <PremiumCard className="max-w-2xl mx-auto p-10" variant="luxury" glowEffect>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center flex-shrink-0 shadow-luxury">
                      <FileText className="w-10 h-10 text-accent" />
                    </div>
                    <div className="text-center md:text-left flex-grow">
                      <h4 className="font-orbitron font-bold text-2xl mb-3">Resources in Development</h4>
                      <p className="text-base text-muted-foreground leading-relaxed">We're working on creating comprehensive resources for the community. Check back soon for tutorials, guides, and educational materials!</p>
                    </div>
                  </div>
                </PremiumCard>
              </div>
            )}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
