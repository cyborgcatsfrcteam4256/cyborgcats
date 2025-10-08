import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Users, Trophy, Target, Heart, Globe, Lightbulb, Award, Star, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumCard } from './PremiumCard';
import { PhotoShowcase } from './PhotoShowcase';
import { StatCounter } from './StatCounter';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const AboutImpactTabs = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Design & Build",
      description: "Teams design, build, and program industrial-sized robots to compete in challenging game scenarios"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Students work with adult mentors from engineering and technology companies"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competition",
      description: "Regional and world championship events bring teams together in exciting robot competitions"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Real-World Skills",
      description: "Develops engineering, programming, project management, and leadership abilities"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-5 z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-transparent z-[1]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-6 text-glow">
              About <span className="text-holographic">Us</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn about FIRST Robotics and our impact in the community
            </p>
          </div>
        </ScrollReveal>

        <Tabs defaultValue="first" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 gap-2 p-1">
            <TabsTrigger value="first" className="text-base font-orbitron">What is FIRST?</TabsTrigger>
            <TabsTrigger value="impact" className="text-base font-orbitron">Our Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="first" className="space-y-12">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="mb-8 animate-fade-in">
                  <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 border border-primary/30 hover:border-primary/50 transition-all duration-500 group hover:scale-105 shadow-morphic hover:shadow-luxury">
                    <Sparkles className="w-6 h-6 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                    <span className="font-orbitron text-base text-primary font-bold tracking-wide">INSPIRING INNOVATION</span>
                    <Trophy className="w-6 h-6 text-primary-glow animate-pulse group-hover:animate-bounce" />
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed mb-10">
                  FIRST (For Inspiration and Recognition of Science and Technology) is a global robotics community 
                  that prepares young people for the future through <span className="text-primary font-semibold">team-based robot-building</span> challenges,
                  while we at Cyborg Cats integrate our <span className="text-primary-glow font-semibold">Christian faith and values</span> into everything we do.
                </p>
                
                <div className="bg-glass-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-5xl mx-auto shadow-luxury">
                  <blockquote className="text-2xl md:text-3xl font-inter text-white/90 italic leading-relaxed">
                    "To transform our culture by creating a world where science and technology are celebrated 
                    and where young people dream of becoming science and technology leaders, while we strive to honor God in all we do."
                  </blockquote>
                  <cite className="block mt-6 text-lg text-primary font-semibold">- Dean Kamen, FIRST Founder (adapted with our Christian mission)</cite>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="h-full p-8">
                    <div className="flex items-start gap-5">
                      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex-shrink-0">
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
                <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-8 rounded-3xl border border-white/10 shadow-luxury">
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
          </TabsContent>

          <TabsContent value="impact" className="space-y-12">
            <div className="grid grid-cols-2 gap-6 mb-12">
              <StatCounter value={48} label="Passionate Students" />
              <StatCounter value={14} label="Years of Excellence" suffix="+" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ScrollReveal delay={100}>
                <PremiumCard variant="luxury" className="p-6 group/card" interactive glowEffect>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-xl flex items-center justify-center mb-4 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                    <Heart className="w-6 h-6 text-primary group-hover/card:scale-110 group-hover/card:text-red-400 transition-all duration-500" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg mb-3 text-glow">STEM Companion Initiative</h3>
                   <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                     Connecting children with special needs to STEM education through innovative programs and dedicated outreach.
                   </p>
                </PremiumCard>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <PremiumCard variant="cyber" className="p-6 group/card" interactive glowEffect>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-glow/30 to-primary-electric/20 rounded-xl flex items-center justify-center mb-4 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                    <Users className="w-6 h-6 text-primary group-hover/card:scale-110 transition-all duration-500" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg mb-3 text-glow">Women in STEM Leadership</h3>
                   <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                     Empowering young women through STEM education and leadership opportunities in robotics and engineering.
                   </p>
                </PremiumCard>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <PremiumCard variant="glass" className="p-6 group/card" interactive glowEffect>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-electric/30 to-primary/20 rounded-xl flex items-center justify-center mb-4 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                    <Globe className="w-6 h-6 text-primary group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-500" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg mb-3 text-glow">Global STEM Outreach</h3>
                   <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                     Expanding STEM education globally through international partnerships and collaborative robotics programs.
                   </p>
                </PremiumCard>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <PremiumCard variant="neon" className="p-6 group/card" interactive glowEffect>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-xl flex items-center justify-center mb-4 glow-subtle group-hover/card:glow-electric transition-all duration-500">
                    <Lightbulb className="w-6 h-6 text-primary group-hover/card:scale-110 group-hover/card:text-yellow-400 transition-all duration-500" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg mb-3 text-glow">Legislative Advocacy</h3>
                   <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                     Advocating for STEM education through legislative engagement and policy support initiatives.
                   </p>
                </PremiumCard>
              </ScrollReveal>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
              <ScrollReveal direction="left" className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-orbitron font-black text-glow leading-tight">
                  Empowering the Next Generation
                </h3>
                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  Based in <span className="text-primary font-semibold">St. Louis, Missouri</span>, our team continues growing and making 
                  community impact throughout the <span className="text-primary-glow font-semibold">Show-Me State</span> through 
                  STEM education and advocacy for students across Missouri, while always seeking to 
                  <span className="text-primary font-semibold"> honor God</span> and demonstrate 
                  <span className="text-primary-electric font-semibold"> Christ-like service</span> in our community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="premium" size="lg" className="group" onClick={() => navigate('/impact')}>
                    <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                    Learn More About Our Mission
                  </Button>
                  <Button variant="glass" size="lg" className="group" onClick={() => navigate('/team')}>
                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                    Meet Our Team
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <PhotoShowcase 
                  images={[
                    "/lovable-uploads/impact-award-winning-photo.jpg",
                    "/lovable-uploads/team-first-sign.jpg",
                    "/lovable-uploads/team-advocacy-capitol.jpg",
                    "/lovable-uploads/robot-action-1.jpg",
                    "/lovable-uploads/community-event-1.jpg"
                  ]}
                  className="shadow-luxury hover:shadow-cyber transition-all duration-700"
                  autoPlayInterval={4000}
                />
              </ScrollReveal>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
