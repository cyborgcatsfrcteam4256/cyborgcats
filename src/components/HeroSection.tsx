import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Zap, Star, Cpu } from 'lucide-react';
import { FloatingParticles } from '@/components/FloatingParticles';
import { ScrollReveal } from '@/components/ScrollReveal';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
          alt="Cyborg Cats robot in competition" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 circuit-pattern opacity-15" />
        <FloatingParticles />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/15 rounded-full blur-3xl animate-cyber-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="space-y-8" delay={200}>
            {/* Enhanced Hero Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 to-primary-glow/10 border border-primary/30 rounded-full px-6 py-3 glow-interactive hover:scale-105 transition-all duration-300 cursor-pointer group">
              <Award className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-orbitron text-sm text-primary font-medium">
                FRC Team 4256
              </span>
              <Star className="w-4 h-4 text-primary-glow animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold leading-tight">
              <span className="text-glow">Cyborg Cats</span>
              <span className="block text-primary-glow">4256</span>
            </h1>

            <p className="text-xl md:text-2xl font-orbitron font-light text-muted-foreground">
              Building Robots, Building Futures
            </p>

            <p className="text-lg text-muted-foreground font-inter max-w-2xl">
              From Westminster Christian Academy in St. Louis, Missouri, we're 48 passionate students 
              engineering the future through robotics while making a lasting impact in our community 
              and beyond.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group relative overflow-hidden shadow-luxury hover:shadow-glow">
                <span className="relative z-10">Meet Our Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
              <Button variant="silver" size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Support Our Mission</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/20 relative">
              <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary group-hover:text-primary-glow transition-colors duration-300 group-hover:scale-110 transform transition-transform">48</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Team Members</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary group-hover:text-primary-glow transition-colors duration-300 group-hover:scale-110 transform transition-transform">20</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Legislators Met</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary group-hover:text-primary-glow transition-colors duration-300 group-hover:scale-110 transform transition-transform">14</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Years Active</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Enhanced Right side - Robot showcase */}
          <ScrollReveal direction="scale" delay={400} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-luxury glow-luxury hover:glow-primary transition-all duration-700 group cursor-pointer">
              <img 
                src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
                alt="Cyborg Cats team celebrating at competition" 
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-primary/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Enhanced floating elements */}
              <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-lg rounded-lg p-4 animate-cyber-float glow-interactive hover:scale-110 transition-transform duration-300 cursor-pointer group/element">
                <Zap className="w-8 h-8 text-primary group-hover/element:rotate-12 transition-transform duration-300" />
              </div>
              
              <div className="absolute top-6 left-6 bg-primary-glow/15 backdrop-blur-lg rounded-lg p-3 animate-pulse">
                <Cpu className="w-6 h-6 text-primary-glow" />
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300 cursor-pointer border border-primary/20">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-orbitron font-semibold text-glow">Team 4256</div>
                    <div className="text-sm text-muted-foreground">Westminster Christian Academy</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};