import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Zap, Star, Cpu, Heart } from 'lucide-react';
import { FloatingParticles } from '@/components/FloatingParticles';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FloatingLogo } from '@/components/FloatingLogo';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingLogo />
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
        
        {/* Integrated brand elements */}
        <div className="absolute top-20 right-20 opacity-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl scale-150"></div>
            <div className="bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-lg rounded-full p-4 border border-primary/15 shadow-subtle">
              <img src={cyborgCatsLogo} alt="" className="w-10 h-10 opacity-70 animate-cyber-float" />
            </div>
            {/* Hero connection lines */}
            <div className="absolute top-1/2 left-full ml-3 w-20 h-px bg-gradient-to-r from-primary/15 to-transparent"></div>
            <div className="absolute left-1/2 top-full mt-3 w-px h-20 bg-gradient-to-b from-primary/15 to-transparent"></div>
          </div>
        </div>
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
              <span className="text-shimmer">Cyborg Cats</span>
              <span className="block text-holographic bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-glow to-primary-electric">4256</span>
            </h1>

            <p className="text-xl md:text-2xl font-orbitron font-light text-muted-foreground">
              Building Robots, Building Futures
            </p>

            <p className="text-lg text-muted-foreground font-inter max-w-2xl">
              From Westminster Christian Academy in the heart of St. Louis, Missouri, we're 48 passionate students 
              representing the Gateway City while engineering the future through robotics and making a lasting impact 
              in our Missouri community and beyond.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Meet Our Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </Button>
              <Button variant="cyber" size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Support Our Mission</span>
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
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
              <div className="grid grid-cols-2 gap-2 h-[600px]">
                <img 
                  src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
                  alt="Cyborg Cats team celebrating at competition" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <img 
                  src="/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png" 
                  alt="Cyborg Cats team photo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-primary/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Enhanced floating elements */}
              <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-lg rounded-lg p-4 glow-interactive hover:scale-110 transition-transform duration-300 cursor-pointer group/element">
                <Zap className="w-8 h-8 text-primary group-hover/element:rotate-12 transition-transform duration-300" />
              </div>
              
              <div className="absolute top-6 left-6 bg-primary-glow/15 backdrop-blur-lg rounded-lg p-3">
                <Cpu className="w-6 h-6 text-primary-glow" />
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300 cursor-pointer border border-primary/20">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-orbitron font-semibold text-glow">Team 4256</div>
                    <div className="text-sm text-muted-foreground">St. Louis, Missouri</div>
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