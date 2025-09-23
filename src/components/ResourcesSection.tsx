import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { FloatingParticles } from '@/components/FloatingParticles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <section className="relative py-20 overflow-hidden">
      <FloatingParticles />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      <div className="container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-card/50 backdrop-blur-sm border-accent/20">
              <BookOpen className="w-4 h-4 mr-2 text-accent" />
              Free Resources & Curriculum
            </Badge>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-glow">
              Knowledge for 
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-300% animate-gradient">
                Everyone
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access our comprehensive library of robotics resources, STEM curriculum, and educational materials. 
              All resources are free and designed to help teams, educators, and students succeed.
            </p>
          </div>
        </ScrollReveal>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resourceCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 100}>
              <PremiumCard className="h-full">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <category.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-orbitron font-semibold text-lg mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <div className="text-xs font-medium text-accent bg-accent/10 rounded-full px-3 py-1 inline-block">
                    {category.count}
                  </div>
                </div>
              </PremiumCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured Resources */}
        <ScrollReveal delay={200}>
          <div className="mb-16">
            <h3 className="font-orbitron text-2xl font-bold text-center mb-8 text-glow">
              Resources Coming Soon
            </h3>
            <div className="text-center">
              <PremiumCard className="max-w-md mx-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-orbitron font-semibold text-lg mb-2">Resources in Development</h4>
                    <p className="text-sm text-muted-foreground">We're working on creating comprehensive resources for the community.</p>
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={400}>
          <div className="text-center bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-accent/20">
            <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-orbitron text-xl font-bold mb-4">Contribute to Our Resources</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Help us expand our resource library! Share your team's knowledge, contribute tutorials, 
              or collaborate on educational content to benefit the entire FIRST community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Browse All Resources
              </Button>
              <Button variant="outline" size="lg">
                Submit Resource
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};