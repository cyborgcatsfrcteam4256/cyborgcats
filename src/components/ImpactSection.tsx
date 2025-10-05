import { Button } from '@/components/ui/button';
import { StatCounter } from '@/components/StatCounter';
import { Heart, Globe, Users, Trophy, Star, Target, Lightbulb, Award } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { PhotoShowcase } from '@/components/PhotoShowcase';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const ImpactSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Full-screen background accent photo - REMOVED */}
      <div className="absolute inset-0 z-0">
        {/* Background image removed per user request */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent" />
      </div>
      
      <div className="absolute inset-0 circuit-pattern opacity-5 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-transparent z-[1]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-3 bg-gradient-premium rounded-full px-6 py-3 mb-6 backdrop-blur-lg border border-primary/20">
            <img src={cyborgCatsLogo} alt="" className="w-5 h-5" />
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-orbitron text-sm text-primary font-medium">Making a Difference</span>
            <Star className="w-4 h-4 text-primary-glow animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            <span className="text-holographic">Our Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
            From our home base in St. Louis, Missouri, we are building more than robots—we are building 
            a better future through STEM education, community outreach, and advocacy across the Gateway State and beyond,
            <span className="text-primary font-semibold"> all while serving God</span> and demonstrating 
            <span className="text-primary-glow font-semibold"> Christian love</span> in everything we do.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-20">
          <StatCounter value={48} label="Passionate Students" />
          <StatCounter value={14} label="Years of Excellence" suffix="+" />
        </div>

        {/* Enhanced Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <ScrollReveal delay={100}>
            <PremiumCard variant="luxury" className="p-8 group/card" interactive glowEffect>
              <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-xl flex items-center justify-center mb-6 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                <Heart className="w-8 h-8 text-primary group-hover/card:scale-110 group-hover/card:text-red-400 transition-all duration-500" />
              </div>
              <h3 className="font-orbitron font-bold text-xl mb-4 text-glow">STEM Companion Initiative</h3>
               <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                 Connecting children with special needs to STEM education through innovative programs and dedicated outreach.
               </p>
              <div className="mt-6 flex items-center text-sm text-primary font-orbitron font-semibold">
                <Target className="w-4 h-4 mr-2" />
                Accessibility Focus
              </div>
            </PremiumCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <PremiumCard variant="cyber" className="p-8 group/card" interactive glowEffect>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-glow/30 to-primary-electric/20 rounded-xl flex items-center justify-center mb-6 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                <Users className="w-8 h-8 text-primary group-hover/card:scale-110 transition-all duration-500" />
              </div>
              <h3 className="font-orbitron font-bold text-xl mb-4 text-glow">Women in STEM Leadership</h3>
               <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                 Empowering young women through STEM education and leadership opportunities in robotics and engineering.
               </p>
              <div className="mt-6 flex items-center text-sm text-primary font-orbitron font-semibold">
                <Award className="w-4 h-4 mr-2" />
                Leadership Excellence
              </div>
            </PremiumCard>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <PremiumCard variant="glass" className="p-8 group/card" interactive glowEffect>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-electric/30 to-primary/20 rounded-xl flex items-center justify-center mb-6 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                <Globe className="w-8 h-8 text-primary group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-500" />
              </div>
              <h3 className="font-orbitron font-bold text-xl mb-4 text-glow">Global STEM Outreach</h3>
               <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                 Expanding STEM education globally through international partnerships and collaborative robotics programs.
               </p>
              <div className="mt-6 flex items-center text-sm text-primary font-orbitron font-semibold">
                <Globe className="w-4 h-4 mr-2" />
                International Impact
              </div>
            </PremiumCard>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <PremiumCard variant="neon" className="p-8 group/card" interactive glowEffect>
              <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-xl flex items-center justify-center mb-6 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                <Lightbulb className="w-8 h-8 text-primary group-hover/card:scale-110 group-hover/card:text-yellow-400 transition-all duration-500" />
              </div>
              <h3 className="font-orbitron font-bold text-xl mb-4 text-glow">Legislative Advocacy</h3>
               <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                 Advocating for STEM education through legislative engagement and policy support initiatives.
               </p>
              <div className="mt-6 flex items-center text-sm text-primary font-orbitron font-semibold">
                <Trophy className="w-4 h-4 mr-2" />
                Policy Leadership
              </div>
            </PremiumCard>
          </ScrollReveal>
        </div>

        {/* Team Photo & Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left" className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 gradient-premium rounded-full px-6 py-3 backdrop-blur-xl border border-primary/20">
                <Star className="w-4 h-4 text-primary animate-pulse" />
                <span className="font-orbitron text-sm text-primary font-medium">Our Mission</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-orbitron font-black text-glow leading-tight">
                Empowering the Next Generation
              </h3>
              <p className="text-xl text-muted-foreground font-inter leading-relaxed">
                Based in <span className="text-primary font-semibold">St. Louis, Missouri</span>, our team continues growing and making 
                community impact throughout the <span className="text-primary-glow font-semibold">Show-Me State</span> through 
                STEM education and advocacy for students across Missouri, while always seeking to 
                <span className="text-primary font-semibold"> honor God</span> and demonstrate 
                <span className="text-primary-electric font-semibold"> Christ-like service</span> in our community.
              </p>
              <div className="grid grid-cols-2 gap-6 py-6">
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-primary-glow">2025</div>
                  <div className="text-sm text-muted-foreground">Impact Award Winners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-primary-electric">14+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="premium" size="lg" className="group">
                <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                Learn More About Our Mission
              </Button>
              <Button variant="glass" size="lg" className="group">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                Meet Our Team
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="relative">
            <div className="relative animate-scale-in">
              <PhotoShowcase 
                images={[
                  "/lovable-uploads/impact-award-winning-photo.jpg",
                  "/lovable-uploads/team-advocacy-capitol.jpg",
                  "/lovable-uploads/2bef5729-53ec-4330-baa1-ac4ba5367ce2.png"
                ]}
                className="shadow-luxury hover:shadow-cyber transition-all duration-700"
              />
              {/* Floating achievement badges */}
              <div className="absolute -top-4 -right-4 gradient-premium border border-primary/30 rounded-full p-4 backdrop-blur-xl animate-cyber-float">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 gradient-premium border border-primary-glow/30 rounded-full p-3 backdrop-blur-xl animate-cyber-float" style={{animationDelay: '1s'}}>
                <Star className="w-5 h-5 text-primary-glow" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};