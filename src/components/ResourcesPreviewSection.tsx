import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink, ArrowRight, BookOpen, Sparkles, Zap, Rocket, Code, Wrench, Users, Trophy, GraduationCap, ChevronRight, Heart } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { PremiumCard } from '@/components/PremiumCard';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { StatCounter } from '@/components/StatCounter';

export const ResourcesPreviewSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResources, setTotalResources] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    '/lovable-uploads/robot-action-1.jpg',
    '/lovable-uploads/robot-demo-1.jpg',
    '/lovable-uploads/team-operating.jpg',
    '/lovable-uploads/robot-action-2.jpg',
  ];

  useEffect(() => {
    fetchResources();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchResources = async () => {
    try {
      const [featuredRes, countRes] = await Promise.all([
        supabase
          .from("resources")
          .select("*")
          .eq("is_approved", true)
          .eq("is_featured", true)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("resources")
          .select("*", { count: 'exact', head: true })
          .eq("is_approved", true)
      ]);

      if (featuredRes.error) throw featuredRes.error;
      setResources(featuredRes.data || []);
      setTotalResources(countRes.count || 0);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      id: 'programming',
      title: 'Programming',
      icon: Code,
      description: 'Code libraries, tutorials & automation scripts',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/30',
      bgImage: '/lovable-uploads/robot-demo-2.jpg'
    },
    {
      id: 'cad',
      title: 'CAD & Design',
      icon: Wrench,
      description: '3D models, blueprints & design files',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      bgImage: '/lovable-uploads/robot-demo-1.jpg'
    },
    {
      id: 'team',
      title: 'Team Management',
      icon: Users,
      description: 'Templates, workflows & collaboration tools',
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      bgImage: '/lovable-uploads/team-operating.jpg'
    },
    {
      id: 'competition',
      title: 'Competition',
      icon: Trophy,
      description: 'Strategy guides, rules & match analysis',
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
      bgImage: '/lovable-uploads/robot-action-1.jpg'
    },
    {
      id: 'stem',
      title: 'STEM Learning',
      icon: GraduationCap,
      description: 'Educational resources & curriculum materials',
      gradient: 'from-indigo-500/20 to-violet-500/20',
      borderColor: 'border-indigo-500/30',
      bgImage: '/lovable-uploads/robot-action-2.jpg'
    },
    {
      id: 'outreach',
      title: 'Outreach',
      icon: Heart,
      description: 'Community engagement, events & impact initiatives',
      gradient: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'border-rose-500/30',
      bgImage: '/lovable-uploads/community-event-1.jpg'
    },
  ];

  if (loading) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Cinematic Hero Banner with Slideshow */}
      <div className="absolute inset-0 z-0">
        {/* Image Slideshow */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </div>
        ))}
        
        {/* Circuit Board Overlay */}
        <div className="absolute inset-0 circuit-pattern opacity-20 animate-pulse" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-electric/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <EnhancedBackground variant="particles" className="opacity-50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-24">
            {/* Holographic Title */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8 border-2 border-primary/30 shadow-[0_0_30px_rgba(0,217,255,0.3)] animate-float">
                <Rocket className="w-6 h-6 text-primary animate-pulse" />
                <span className="font-orbitron text-sm tracking-wider bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent font-bold">
                  INTERACTIVE RESOURCE HUB
                </span>
                <Sparkles className="w-5 h-5 text-primary-glow animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-orbitron font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary-electric bg-clip-text text-transparent animate-gradient bg-300% drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]">
                Fuel Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-electric via-primary-glow to-primary bg-clip-text text-transparent animate-gradient bg-300%">
                Robotics Journey
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter mb-12">
              Access cutting-edge resources, tutorials, and tools to power your team's success
            </p>
            
            {/* Floating Stats Cards */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="glass-morphism px-8 py-4 rounded-2xl border-2 border-primary-glow/30 shadow-luxury hover:shadow-cyber transition-all duration-500 group hover:scale-105">
                <StatCounter value={categories.length} label="Categories" />
              </div>
              <div className="glass-morphism px-8 py-4 rounded-2xl border-2 border-primary-electric/30 shadow-luxury hover:shadow-cyber transition-all duration-500 group hover:scale-105">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-orbitron font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground font-inter">Free Access</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Showcase Grid */}
        <ScrollReveal>
          <div className="mb-24">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-4 text-glow">
              Explore by Category
            </h3>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Interactive resource collections tailored for every aspect of robotics
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <ScrollReveal key={category.id} delay={idx * 100}>
                    <div 
                      className="group relative overflow-hidden rounded-2xl border-2 hover:border-primary/60 transition-all duration-700 cursor-pointer hover:scale-105 hover:-rotate-1"
                      style={{ borderColor: `hsl(var(--primary) / 0.3)` }}
                      onClick={() => navigate('/resources')}
                    >
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0">
                        <img 
                          src={category.bgImage} 
                          alt="" 
                          className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
                        <div className="absolute inset-0 circuit-pattern opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                      </div>
                      
                      {/* Glowing Border Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-primary-electric/20 animate-gradient bg-300%" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative p-8 min-h-[280px] flex flex-col">
                        {/* Icon */}
                        <div className="mb-4 inline-flex">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/30 to-primary-glow/20 border-2 border-primary/40 group-hover:border-primary/70 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-luxury">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h4 className="text-2xl font-orbitron font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-500 text-glow">
                          {category.title}
                        </h4>
                        
                        {/* Description */}
                        <p className="text-muted-foreground mb-6 flex-1 font-inter leading-relaxed">
                          {category.description}
                        </p>
                        
                        {/* Hover Arrow */}
                        <div className="flex items-center text-primary font-orbitron text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          Explore Resources
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      
                      {/* Corner Glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Resources Carousel (only if resources exist) */}
        {resources.length > 0 && (
          <ScrollReveal>
            <div className="mb-24">
              <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-4 text-glow">
                Featured Resources
              </h3>
              <p className="text-center text-muted-foreground mb-12 text-lg">
                Handpicked premium resources from our library
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {resources.map((resource, index) => (
                  <ScrollReveal key={resource.id} delay={index * 150}>
                    <PremiumCard 
                      variant={index === 0 ? "luxury" : index === 1 ? "cyber" : "glass"}
                      className="group h-full flex flex-col relative overflow-hidden hover:scale-105 transition-transform duration-500"
                      interactive
                      glowEffect
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-electric/10" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                      </div>

                      <CardContent className="flex-1 flex flex-col p-8 relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <Badge className="font-orbitron bg-gradient-to-r from-primary/20 to-primary-glow/20 border-2 border-primary/30 text-primary hover:border-primary/60 transition-all duration-500 group-hover:scale-110">
                            {resource.category}
                          </Badge>
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/30 group-hover:border-primary/60 transition-all duration-500 group-hover:rotate-12">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                        </div>

                        <h3 className="text-2xl font-orbitron font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-2 text-glow">
                          {resource.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 flex-1 line-clamp-3 leading-relaxed font-inter">
                          {resource.description}
                        </p>

                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-primary/20">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Download className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-muted-foreground">
                              <span className="text-primary font-bold font-orbitron">{resource.downloads_count}</span> downloads
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="premium"
                          className="w-full group/btn"
                          onClick={() => {
                            if (resource.file_url) {
                              window.open(resource.file_url, '_blank');
                            } else if (resource.external_url) {
                              window.open(resource.external_url, '_blank');
                            }
                          }}
                        >
                          {resource.file_url ? (
                            <>
                              <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                              Download
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-45 transition-transform duration-500" />
                              View Resource
                            </>
                          )}
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                        </Button>
                      </CardContent>
                    </PremiumCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Epic CTA Section */}
        <ScrollReveal>
          <div className="relative">
            {/* Ambient Glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-primary-electric/20 rounded-3xl blur-3xl opacity-50" />
            
            <div className="relative glass-morphism rounded-3xl p-12 md:p-16 border-2 border-primary/40 hover:border-primary/70 transition-all duration-700 shadow-luxury hover:shadow-cyber group overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-electric/10 rounded-3xl" />
              <div className="absolute inset-0 circuit-pattern opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
              
              {/* Animated Particles */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-ping" />
              <div className="absolute bottom-10 right-10 w-2 h-2 bg-primary-glow rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              
              <div className="relative z-10 text-center">
                <div className="mb-8 inline-block">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/20 border-2 border-primary/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-luxury">
                    <Rocket className="w-16 h-16 text-primary group-hover:translate-y-[-8px] transition-transform duration-500" />
                  </div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-orbitron font-black mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary-electric bg-clip-text text-transparent animate-gradient bg-300%">
                  Ready to Explore?
                </h3>
                
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-inter leading-relaxed">
                  Dive into our complete resource library with programming guides, CAD files, competition strategies, and educational materials
                </p>
                
                <Button
                  variant="premium"
                  size="lg"
                  className="group/btn text-lg px-12 py-7 h-auto shadow-luxury hover:shadow-cyber"
                  onClick={() => navigate('/resources')}
                >
                  <Sparkles className="w-6 h-6 mr-2 group-hover/btn:rotate-180 transition-transform duration-700" />
                  Explore All Resources
                  <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover/btn:translate-x-2" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
