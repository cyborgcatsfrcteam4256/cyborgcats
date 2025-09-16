import { ArrowRight, Award, Users, Zap, Star, Cpu, Heart, Sparkles, Rocket } from 'lucide-react';
import { FloatingParticles } from '@/components/FloatingParticles';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FloatingLogo } from '@/components/FloatingLogo';
import { GlitchText } from '@/components/GlitchText';
import { CyberButton } from '@/components/CyberButton';
import { HolographicCard } from '@/components/HolographicCard';
import { TerminalWindow } from '@/components/TerminalWindow';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingLogo />
      <InteractiveBackground />
      
      {/* Ultimate Y2K Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
          alt="Cyborg Cats robot in competition" 
          className="w-full h-full object-cover opacity-20 transition-opacity duration-1000 hover:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-cyan-400/10" />
        <div className="absolute inset-0 circuit-pattern opacity-30" />
        <FloatingParticles />
        
        {/* Holographic gradient orbs with Y2K styling */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/15 rounded-full blur-3xl animate-[holographic-pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-400/20 rounded-full blur-3xl animate-cyber-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/8 to-purple-500/5 rounded-full blur-3xl animate-[y2k-shift_6s_ease-in-out_infinite]" />
        
        {/* Digital grid overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'matrix-fall 20s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="space-y-8" delay={200}>
            {/* Ultimate Y2K Hero Badge */}
            <HolographicCard variant="neon" className="inline-flex items-center space-x-3 px-8 py-4 hover:scale-110 transition-all duration-500 cursor-pointer group">
              <Award className="w-6 h-6 text-cyan-400 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
              <span className="font-orbitron text-sm text-cyan-400 font-bold tracking-wide">
                2025 FIRST IMPACT AWARD WINNERS
              </span>
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse group-hover:animate-spin" />
            </HolographicCard>

            {/* Glitch Main Headline */}
            <h1 className="text-6xl md:text-8xl font-orbitron font-black leading-tight tracking-tight">
              <GlitchText className="block animate-slide-up" intensity="low">
                Cyborg Cats
              </GlitchText>
              <span className="block text-holographic animate-slide-up" style={{animationDelay: '0.2s'}}>4256</span>
            </h1>

            <p className="text-2xl md:text-3xl font-orbitron font-light text-glow animate-slide-up" style={{animationDelay: '0.4s'}}>
              <GlitchText intensity="low" color="cyan">
                Building Robots, Building Futures
              </GlitchText>
            </p>

            <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
              <TerminalWindow 
                autoType={true}
                content={[
                  "Initializing CYBORG_CATS protocol...",
                  "Team: 4256 | Location: St. Louis, MO",
                  "Members: 48 passionate students",
                  "Mission: Engineering the future through robotics",
                  "Status: Making lasting impact in Missouri & beyond",
                  "System ready. Welcome to the future."
                ]}
                className="max-w-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <CyberButton cyberVariant="neon" className="px-8 py-4 text-lg group">
                <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                <span>Explore Our Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </CyberButton>
              <CyberButton cyberVariant="hologram" className="px-8 py-4 text-lg group">
                <Heart className="w-5 h-5 group-hover:scale-125 group-hover:text-pink-400 transition-all duration-500" />
                <span>Support Our Mission</span>
              </CyberButton>
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

          {/* Ultimate Y2K Robot Showcase */}
          <ScrollReveal direction="scale" delay={400} className="relative">
            <HolographicCard 
              variant="cyber" 
              className="relative rounded-2xl overflow-hidden hover:scale-105 transition-all duration-700 group cursor-pointer"
              glitchEffect={true}
            >
              <img 
                src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
                alt="Cyborg Cats team celebrating at competition" 
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-cyan-400/20" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Y2K Enhanced floating elements */}
              <HolographicCard variant="matrix" className="absolute top-6 right-6 p-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Zap className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
              </HolographicCard>
              
              <HolographicCard variant="neon" className="absolute top-6 left-6 p-3">
                <Cpu className="w-6 h-6 text-cyan-400 animate-[matrix-glow_2s_ease-in-out_infinite]" />
              </HolographicCard>
              
              <HolographicCard variant="ghost" className="absolute bottom-6 left-6 p-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div className="font-orbitron font-semibold text-glow flex items-center space-x-2">
                      <img src={cyborgCatsLogo} alt="" className="w-6 h-6" />
                      <GlitchText intensity="low" className="text-sm">Team 4256</GlitchText>
                    </div>
                    <div className="text-sm text-cyan-400/70">St. Louis, Missouri</div>
                  </div>
                </div>
              </HolographicCard>

              {/* Digital corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/30 to-transparent" />
            </HolographicCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};