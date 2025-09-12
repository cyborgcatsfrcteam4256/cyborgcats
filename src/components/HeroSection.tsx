import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
          alt="Cyborg Cats robot in competition" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 circuit-pattern opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 glow-subtle">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-orbitron text-sm text-primary font-medium">
                2025 FIRST Impact Award Winners
              </span>
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Meet Our Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="silver" size="lg">
                Support Our Mission
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary">48</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Legislators Met</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary">2025</div>
                <div className="text-sm text-muted-foreground">Worlds Qualified</div>
              </div>
            </div>
          </div>

          {/* Right side - Robot showcase */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated glow-primary">
              <img 
                src="/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" 
                alt="Cyborg Cats team celebrating at competition" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              
              {/* Floating elements */}
              <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-lg rounded-lg p-4 animate-cyber-float">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/80 backdrop-blur-lg rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-orbitron font-semibold">Team 4256</div>
                    <div className="text-sm text-muted-foreground">Westminster Christian Academy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};