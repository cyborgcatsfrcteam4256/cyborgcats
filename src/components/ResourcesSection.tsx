import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { FloatingParticles } from '@/components/FloatingParticles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Code, 
  Wrench, 
  Users, 
  Download, 
  Play, 
  FileText, 
  Zap,
  Globe,
  GraduationCap
} from 'lucide-react';

export const ResourcesSection = () => {
  const { toast } = useToast();

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} will be available soon. Check back later for updates!`,
    });
  };

  const resourceCategories = [
    {
      title: "Programming Resources",
      description: "Coming Soon - Programming tutorials and guides",
      icon: Code,
      count: "Coming Soon"
    },
    {
      title: "CAD & Design",
      description: "Coming Soon - Design files and tutorials",
      icon: Wrench,
      count: "Coming Soon"
    },
    {
      title: "Team Management",
      description: "Coming Soon - Leadership and organizational resources",
      icon: Users,
      count: "Coming Soon"
    },
    {
      title: "STEM Curriculum",
      description: "Coming Soon - Educational materials for schools",
      icon: GraduationCap,
      count: "Coming Soon"
    }
  ];

  const featuredResources = [
    {
      title: "Coming Soon",
      description: "Resources will be available soon",
      type: "Coming Soon",
      downloads: "0",
      icon: FileText,
      featured: false
    }
  ];


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
                    {category.count}
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
              Resources Coming Soon
            </h3>
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
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={400}>
          <PremiumCard className="text-center p-12 max-w-4xl mx-auto" variant="cyber" glowEffect>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent via-primary to-accent p-1 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <Globe className="w-10 h-10 text-accent" />
              </div>
            </div>
            <h3 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">Contribute to Our Resources</h3>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Help us expand our resource library! Share your team's knowledge, contribute tutorials, 
              or collaborate on educational content to benefit the entire FIRST community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => handleComingSoon("Resource browsing")}
              >
                <Zap className="w-5 h-5 mr-2" />
                Browse All Resources
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => handleComingSoon("Resource submission")}
              >
                <FileText className="w-5 h-5 mr-2" />
                Submit Resource
              </Button>
            </div>
          </PremiumCard>
        </ScrollReveal>
      </div>
    </section>
  );
};