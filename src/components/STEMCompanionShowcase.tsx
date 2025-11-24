import { useTranslation } from 'react-i18next';
import { LiquidButton } from './LiquidButton';
import { PremiumCard } from './PremiumCard';
import { StatCounter } from './StatCounter';
import { Heart, Users, Sparkles, BookOpen, Network, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';

export const STEMCompanionShowcase = () => {
  const { t } = useTranslation();

  const programs = [
    {
      icon: Sparkles,
      title: t('stemCompanion.programs.demonstrations.title'),
      description: t('stemCompanion.programs.demonstrations.description'),
      highlight: t('stemCompanion.programs.demonstrations.highlight'),
    },
    {
      icon: BookOpen,
      title: t('stemCompanion.programs.resources.title'),
      description: t('stemCompanion.programs.resources.description'),
      highlight: t('stemCompanion.programs.resources.highlight'),
    },
    {
      icon: Network,
      title: t('stemCompanion.programs.movement.title'),
      description: t('stemCompanion.programs.movement.description'),
      highlight: t('stemCompanion.programs.movement.highlight'),
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 w-8 h-8 text-primary/20 animate-float" style={{ animationDelay: '0s' }} />
        <Users className="absolute top-40 right-20 w-10 h-10 text-accent/20 animate-float" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-40 left-20 w-6 h-6 text-primary/30 animate-float" style={{ animationDelay: '2s' }} />
        <Network className="absolute bottom-20 right-40 w-12 h-12 text-accent/20 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 px-6 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground border-none shadow-glow">
            🤝 {t('stemCompanion.badge')}
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            {t('stemCompanion.title')}
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            {t('stemCompanion.subtitle')}
          </p>
          
          <p className="text-base md:text-lg text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {t('stemCompanion.description')}
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <StatCounter value={5} label={t('stemCompanion.stats.schools')} suffix="+" />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <StatCounter value={3} label={t('stemCompanion.stats.categories')} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <StatCounter value={100} label={t('stemCompanion.stats.reach')} suffix="+" />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="animate-fade-in"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <PremiumCard
                variant="glass"
                className="h-full p-8 hover:scale-105 transition-all duration-500 group"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-500">
                    <program.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-orbitron font-bold mb-3 text-foreground">
                    {program.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    {program.highlight}
                  </Badge>
                </div>
              </PremiumCard>
            </div>
          ))}
        </div>

        {/* Origin Story Section */}
        <PremiumCard
          variant="luxury"
          className="p-8 md:p-12 mb-12 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Badge className="mb-4 px-4 py-2 text-sm font-semibold bg-accent/20 text-accent-foreground border-accent/50">
                2012 → Present
              </Badge>
            </div>
            
            <div className="flex-1">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed italic">
                "{t('stemCompanion.story')}"
              </p>
            </div>
          </div>
        </PremiumCard>

        {/* Call to Action */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LiquidButton
              size="lg"
              glowIntensity="high"
              onClick={() => window.open('https://stemcompanion.org', '_blank')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
            >
              {t('stemCompanion.cta.primary')}
              <ExternalLink className="w-5 h-5" />
            </LiquidButton>
            
            <LiquidButton
              size="lg"
              variant="outline"
              liquidEffect={false}
              onClick={() => window.open('https://stemcompanion.org', '_blank')}
              className="border-2 border-primary hover:bg-primary/10 px-8 py-6 text-lg"
            >
              {t('stemCompanion.cta.secondary')}
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
};
