import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { FloatingParticles } from '@/components/FloatingParticles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Award, Building, Lightbulb, MessageSquare } from 'lucide-react';

export const AlumniNetworkSection = () => {
  const navigate = useNavigate();

  const alumniHighlights = [
    {
      title: "Alumni Network",
      description: "Coming Soon - Connect with our graduates",
      icon: Building,
      stats: "Coming Soon"
    },
    {
      title: "Mentorship Program",
      description: "Coming Soon - Alumni mentorship opportunities",
      icon: Users,
      stats: "Coming Soon"
    },
    {
      title: "Career Support",
      description: "Coming Soon - Career guidance and opportunities",
      icon: Lightbulb,
      stats: "Coming Soon"
    },
    {
      title: "Success Stories",
      description: "Coming Soon - Alumni achievements and impact",
      icon: Award,
      stats: "Coming Soon"
    }
  ];

  const featuredAlumni = [
    {
      name: "Coming Soon",
      year: "Alumni Stories",
      achievement: "Coming Soon",
      quote: "Alumni success stories will be featured here soon."
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <FloatingParticles />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
      
      <div className="container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-card/50 backdrop-blur-sm border-primary/20">
              <GraduationCap className="w-4 h-4 mr-2 text-primary" />
              Alumni Network
            </Badge>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-glow">
              Building Careers, 
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-300% animate-gradient">
                Building Futures
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our alumni network spans across industries and continents, creating opportunities for current students 
              and continuing the legacy of excellence that defines the Cyborg Cats community.
            </p>
          </div>
        </ScrollReveal>

        {/* Alumni Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {alumniHighlights.map((highlight, index) => (
            <ScrollReveal key={highlight.title} delay={index * 100}>
              <PremiumCard className="h-full text-center">
                <div className="mb-6 p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-orbitron font-semibold text-lg mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{highlight.description}</p>
                  <div className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 inline-block">
                    {highlight.stats}
                  </div>
                </div>
              </PremiumCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured Alumni */}
        <ScrollReveal delay={200}>
          <div className="mb-16">
            <h3 className="font-orbitron text-2xl font-bold text-center mb-8 text-glow">
              Alumni Success Stories Coming Soon
            </h3>
            <div className="text-center">
              <PremiumCard className="max-w-md mx-auto">
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-orbitron font-semibold text-lg mb-1">Alumni Stories</h4>
                  <p className="text-xs text-muted-foreground mb-2">Coming Soon</p>
                  <p className="text-sm text-muted-foreground italic">
                    "Alumni success stories and achievements will be featured here soon."
                  </p>
                </div>
              </PremiumCard>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={300}>
          <div className="text-center bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-orbitron text-xl font-bold mb-4">Connect with Our Network</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our thriving alumni community for mentorship, career opportunities, and lifelong connections. 
              Whether you're a current student or recent graduate, our network is here to support your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/contact?subject=alumni')}
              >
                Join Alumni Network
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/contact?subject=mentor')}
              >
                Find a Mentor
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};