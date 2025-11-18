import { Bot, Users, Trophy, Target, Zap, Rocket } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumCard } from './PremiumCard';
import { useTranslation } from 'react-i18next';

export const AboutFIRSTSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: t('features.designBuild'),
      description: t('features.designBuildDesc')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('features.collaboration'),
      description: t('features.collaborationDesc')
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: t('features.competition'),
      description: t('features.competitionDesc')
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('features.realWorldSkills'),
      description: t('features.realWorldSkillsDesc')
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Championship venue background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/robot-action-1.jpg" 
          alt="Championship venue" 
          className="w-full h-full object-cover opacity-50 transition-opacity duration-1000 hover:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/10 to-transparent" />
      </div>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-background/5 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,theme(colors.primary/0.10),transparent_70%)] z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,theme(colors.secondary/0.10),transparent_70%)] z-[1]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 border border-primary/30 hover:border-primary/50 transition-all duration-500 group hover:scale-105 shadow-morphic hover:shadow-luxury">
              <Rocket className="w-6 h-6 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
              <span className="font-orbitron text-base text-primary font-bold tracking-wide">{t('first.inspiring')}</span>
              <Zap className="w-6 h-6 text-primary-glow animate-pulse group-hover:animate-spin" />
            </div>
          </div>
            
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
              {t('first.title')}
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed mb-12">
              {t('first.description')}
            </p>
            
            <div className="bg-glass-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-5xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-inter text-white/90 italic leading-relaxed">
                {t('first.quote')}
              </blockquote>
              <cite className="block mt-6 text-lg text-primary font-semibold">- {t('first.founder')}</cite>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <PremiumCard className="h-full p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 flex-shrink-0">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-orbitron font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </PremiumCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-8 rounded-3xl border border-white/10">
              <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6">
                More Than Robots - Serving God
              </h3>
              <p className="text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
                FIRST programs inspire students to pursue careers in STEM fields while developing 
                <span className="text-primary font-semibold"> leadership</span>, 
                <span className="text-primary font-semibold"> teamwork</span>, and 
                <span className="text-primary-glow font-semibold"> problem-solving</span> skills 
                that extend far beyond the competition arena, all while we seek to glorify God through our work and witness.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};