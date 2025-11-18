import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Zap, Star, Cpu, Heart, Sparkles, Rocket } from 'lucide-react';
import { FloatingParticles } from '@/components/FloatingParticles';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section aria-label="Hero section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InteractiveBackground />
      {/* Enhanced Background with multiple accent images */}
      <div className="absolute inset-0 z-0">
        {/* Primary background image with enhanced effects */}
        <img 
          src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
          alt="Cyborg Cats FRC Team 4256 robot competing at FIRST Robotics Competition event" 
          className="w-full h-full object-cover opacity-25 transition-opacity duration-1000 hover:opacity-30 hover:scale-105 duration-[10s]"
        />
        
        {/* Accent images as background elements */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-15 hover:opacity-25 transition-opacity duration-1000">
          <img 
            src="/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png" 
            alt="" 
            className="w-full h-full object-cover rounded-xl blur-sm hover:blur-none transition-all duration-1000 animate-cyber-float"
          />
        </div>
        
        <div className="absolute bottom-20 left-10 w-40 h-24 opacity-12 hover:opacity-20 transition-opacity duration-1000">
          <img 
            src="/lovable-uploads/2bef5729-53ec-4330-baa1-ac4ba5367ce2.png" 
            alt="" 
            className="w-full h-full object-cover rounded-lg blur-sm hover:blur-none transition-all duration-1000 animate-cyber-float"
            style={{animationDelay: '2s'}}
          />
        </div>
        
        <div className="absolute top-1/3 left-1/4 w-28 h-28 opacity-8 hover:opacity-15 transition-opacity duration-1000">
          <img 
            src="/lovable-uploads/cc77039e-e81b-423a-a408-b9246289beeb.png" 
            alt="" 
            className="w-full h-full object-cover rounded-full blur-sm hover:blur-none transition-all duration-1000 animate-glow-pulse"
          />
        </div>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-primary-glow/12" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-electric/5 via-transparent to-primary/5" />
        <div className="absolute inset-0 circuit-pattern opacity-20 animate-pulse" />
        <FloatingParticles />
        
        {/* Enhanced animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/20 rounded-full blur-3xl animate-cyber-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-electric/5 to-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="space-y-8" delay={200}>
            {/* Enhanced Hero Badge */}
            <div className="inline-flex items-center space-x-3 glass-morphism border border-primary/30 rounded-full px-8 py-4 hover:border-primary/50 transition-all duration-500 group hover:scale-105 shadow-morphic hover:shadow-luxury cursor-pointer backdrop-blur-xl">
              <Award className="w-6 h-6 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
              <span className="font-orbitron text-base text-primary font-bold tracking-wide">
                2025 FIRST IMPACT AWARD WINNERS
              </span>
              <Sparkles className="w-5 h-5 text-primary-glow animate-pulse group-hover:animate-spin" />
            </div>

            {/* Enhanced Main Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-10xl font-orbitron font-black leading-tight tracking-tight">
              <span className="text-holographic hover:text-shimmer transition-all duration-1000 cursor-default animate-slide-up">Cyborg Cats</span>
              <span className="block text-6xl md:text-7xl lg:text-9xl text-glow hover:text-primary-electric transition-all duration-1000 cursor-default animate-slide-up" style={{animationDelay: '0.2s'}}>4256</span>
            </h1>

            <p className="text-2xl md:text-3xl font-orbitron font-light text-glow animate-slide-up" style={{animationDelay: '0.4s'}}>
              {t('hero.description')}
            </p>

            <p className="text-xl text-muted-foreground font-inter max-w-3xl leading-relaxed animate-slide-up" style={{animationDelay: '0.6s'}}>
              From Westminster Christian Academy in the heart of St. Louis, Missouri, we are{' '}
              <span className="text-primary font-semibold">48 passionate students</span>{' '}
              representing the Gateway City while engineering the future through robotics with a mission to{' '}
              <span className="text-primary-glow font-semibold">serve God and impact our community</span>{' '}
              through STEM education and Christian values.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <Button 
                variant="premium" 
                size="lg" 
                className="group relative overflow-hidden"
                onClick={() => {
                  const element = document.querySelector('#what-is-first');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 relative z-10" />
                <span className="relative z-10">{t('hero.learnMore')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                className="group relative overflow-hidden"
                onClick={() => navigate('/contact?subject=sponsor')}
              >
                <Heart className="w-5 h-5 group-hover:scale-125 group-hover:text-red-400 transition-all duration-500 relative z-10" />
                <span className="relative z-10">{t('hero.getInvolved')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
            <div className="relative rounded-3xl overflow-hidden shadow-luxury glow-luxury hover:glow-primary transition-all duration-700 group cursor-pointer border border-primary/20">
              <img 
                src="/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png" 
                alt="Cyborg Cats robot showcasing engineering excellence" 
                className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-700 brightness-105 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-primary/20" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Enhanced floating elements with better positioning */}
              <div className="absolute top-6 right-6 bg-gradient-to-br from-primary/30 to-primary-glow/20 backdrop-blur-xl rounded-xl p-4 glow-interactive hover:scale-110 transition-all duration-300 cursor-pointer group/element border border-primary/30 shadow-luxury">
                <Zap className="w-8 h-8 text-primary group-hover/element:rotate-12 transition-transform duration-300" />
              </div>
              
              <div className="absolute top-6 left-6 bg-gradient-to-br from-primary-electric/25 to-primary-glow/15 backdrop-blur-xl rounded-xl p-3 border border-primary-electric/20 shadow-glow">
                <Cpu className="w-6 h-6 text-primary-glow" />
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-xl rounded-xl p-5 hover:scale-105 transition-all duration-300 cursor-pointer border border-primary/30 shadow-luxury">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-orbitron font-semibold text-glow flex items-center space-x-2">
                      <img src={cyborgCatsLogo} alt="" className="w-6 h-6 object-contain" />
                      <span>Team 4256</span>
                    </div>
                    <div className="text-sm text-muted-foreground">St. Louis, Missouri</div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced decorative corner elements with glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary-glow/30 to-transparent opacity-50" />
              
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};