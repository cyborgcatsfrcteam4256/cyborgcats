import { Button } from '@/components/ui/button';
import { StatCounter } from '@/components/StatCounter';
import { Heart, Globe, Users, Trophy } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedCard } from '@/components/EnhancedCard';

export const ImpactSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 circuit-pattern opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            <span className="text-glow">Our Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Beyond building robots, we're building a better future through STEM education, 
            community outreach, and advocacy for inclusive engineering.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <StatCounter value={48} label="Team Members" />
          <StatCounter value={19} label="Legislators Met" suffix="+" />
          <StatCounter value={2000} label="Students Reached" suffix="+" />
          <StatCounter value={22} label="Mentors" />
        </div>

        {/* Enhanced Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ScrollReveal delay={100}>
            <EnhancedCard className="p-6 hover-glow transition-cyber" interactive glowEffect>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 glow-subtle">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-orbitron font-semibold text-lg mb-2">STEM Companion Initiative</h3>
              <p className="text-muted-foreground font-inter">
                Connecting children with special needs to STEM through 5+ demonstrations and stemcompanion.org.
              </p>
            </EnhancedCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <EnhancedCard className="p-6 hover-glow transition-cyber" interactive glowEffect>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 glow-subtle">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-orbitron font-semibold text-lg mb-2">Women in STEM</h3>
              <p className="text-muted-foreground font-inter">
                Public seminars reaching 100+ attendees over 3 years. All upper leadership is female.
              </p>
            </EnhancedCard>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <EnhancedCard className="p-6 hover-glow transition-cyber" interactive glowEffect>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 glow-subtle">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-orbitron font-semibold text-lg mb-2">Global Outreach</h3>
              <p className="text-muted-foreground font-inter">
                Helped establish South Korea's 4th FRC team and reached 115 students in Ethiopia.
              </p>
            </EnhancedCard>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <EnhancedCard className="p-6 hover-glow transition-cyber" interactive glowEffect>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 glow-subtle">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-orbitron font-semibold text-lg mb-2">Legislative Advocacy</h3>
              <p className="text-muted-foreground font-inter">
                Met with 19 representatives and Lieutenant Governor supporting HB 256 advocacy.
              </p>
            </EnhancedCard>
          </ScrollReveal>
        </div>

        {/* Team Photo & Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-3xl font-orbitron font-bold text-glow">
              Empowering the Next Generation
            </h3>
            <p className="text-lg text-muted-foreground font-inter">
              Our team continues growing and making community impact through 
              STEM education and advocacy for students statewide.
            </p>
            <Button variant="cyber" size="lg">
              Learn More About Our Mission
            </Button>
          </div>

          <div className="relative animate-scale-in">
            <img 
              src="/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png" 
              alt="Cyborg Cats team members working together" 
              className="w-full h-[400px] object-cover rounded-xl shadow-elevated"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};