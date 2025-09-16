import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Zap, Star, Cpu, Heart, Sparkles, Rocket } from 'lucide-react';
import { FloatingParticles } from '@/components/FloatingParticles';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FloatingLogo } from '@/components/FloatingLogo';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingLogo />
      <InteractiveBackground />
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
          alt="Cyborg Cats robot in competition" 
          className="w-full h-full object-cover opacity-25 transition-opacity duration-1000 hover:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-primary-glow/12" />
        <div className="absolute inset-0 circuit-pattern opacity-20 animate-pulse" />
        <FloatingParticles />
        
        {/* Enhanced animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/15 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-pink/20 rounded-full blur-3xl animate-cyber-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent-green/5 to-accent-cyan/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-60 h-60 bg-accent-orange/10 rounded-full blur-2xl animate-cyber-float" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-accent-yellow/8 rounded-full blur-2xl animate-glow-pulse" style={{animationDelay: '0.5s'}} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="space-y-8" delay={200}>
            {/* Enhanced Hero Badge */}
            <div className="inline-flex items-center space-x-3 gradient-rainbow-pop border border-accent-purple/30 rounded-full px-8 py-4 glow-interactive hover:scale-110 transition-all duration-500 cursor-pointer group backdrop-blur-xl">
              <Award className="w-6 h-6 text-white group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
              <span className="font-orbitron text-sm text-white font-bold tracking-wide">
                2025 FIRST IMPACT AWARD WINNERS
              </span>
              <Sparkles className="w-5 h-5 text-white animate-pulse group-hover:animate-spin" />
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-orbitron font-black leading-tight tracking-tight">
              <span className="text-shimmer animate-slide-up">Cyborg Cats</span>
              <span className="block text-holographic bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-glow to-primary-electric animate-slide-up" style={{animationDelay: '0.2s'}}>4256</span>
            </h1>

            <p className="text-2xl md:text-3xl font-orbitron font-light text-glow animate-slide-up" style={{animationDelay: '0.4s'}}>
              Building Robots, Building Futures
            </p>

            <p className="text-xl text-muted-foreground font-inter max-w-3xl leading-relaxed animate-slide-up" style={{animationDelay: '0.6s'}}>
              From Westminster Christian Academy in the heart of St. Louis, Missouri, we're{' '}
              <span className="text-primary font-semibold">48 passionate students</span>{' '}
              representing the Gateway City while engineering the future through robotics and making a{' '}
              <span className="text-primary-glow font-semibold">lasting impact</span>{' '}
              in our Missouri community and beyond.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <Button variant="premium" size="lg" className="group relative overflow-hidden bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple">
                <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 relative z-10" />
                <span className="relative z-10">Explore Our Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
              <Button variant="glass" size="lg" className="group relative overflow-hidden bg-gradient-to-r from-accent-green to-accent-cyan hover:from-accent-cyan hover:to-accent-green">
                <Heart className="w-5 h-5 group-hover:scale-125 group-hover:text-white transition-all duration-500 relative z-10" />
                <span className="relative z-10">Support Our Mission</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/20 relative">
              <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-accent-purple group-hover:text-accent-pink transition-colors duration-300 group-hover:scale-110 transform transition-transform">48</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Team Members</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-accent-green group-hover:text-accent-cyan transition-colors duration-300 group-hover:scale-110 transform transition-transform">20</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Legislators Met</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-accent-orange group-hover:text-accent-yellow transition-colors duration-300 group-hover:scale-110 transform transition-transform">14</div>
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
              <div className="absolute top-6 right-6 bg-gradient-to-br from-accent-purple/30 to-accent-pink/20 backdrop-blur-lg rounded-lg p-4 glow-interactive hover:scale-110 transition-transform duration-300 cursor-pointer group/element border border-accent-purple/20">
                <Zap className="w-8 h-8 text-accent-purple group-hover/element:rotate-12 transition-transform duration-300" />
              </div>
              
              <div className="absolute top-6 left-6 bg-gradient-to-br from-accent-green/30 to-accent-cyan/20 backdrop-blur-lg rounded-lg p-3 border border-accent-green/20">
                <Cpu className="w-6 h-6 text-accent-green" />
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300 cursor-pointer border border-primary/20">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-orbitron font-semibold text-glow flex items-center space-x-2">
                      <img src={cyborgCatsLogo} alt="" className="w-6 h-6" />
                      <span>Team 4256</span>
                    </div>
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