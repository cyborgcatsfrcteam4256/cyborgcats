import { Bot, Users, Trophy, Target, Zap, Rocket } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumCard } from './PremiumCard';

export const AboutFIRSTSection = () => {
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
    <section className="py-32 relative overflow-hidden">
      {/* Enhanced Background with Accent Photos */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,theme(colors.primary/0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,theme(colors.secondary/0.1),transparent_70%)]" />
      
      {/* Subtle accent photos as background elements */}
      <div className="absolute top-20 right-16 w-32 h-32 opacity-10 hover:opacity-15 transition-opacity duration-1000">
        <img 
          src="/lovable-uploads/d26af35d-de5b-4479-94bb-919c4897cca9.png" 
          alt="" 
          className="w-full h-full object-cover rounded-2xl blur-md animate-cyber-float"
        />
      </div>
      
      <div className="absolute bottom-32 left-20 w-28 h-28 opacity-8 hover:opacity-12 transition-opacity duration-1000">
        <img 
          src="/lovable-uploads/40d68d3b-ba42-4e64-a83f-cb602561d4db.png" 
          alt="" 
          className="w-full h-full object-cover rounded-full blur-md animate-glow-pulse"
          style={{animationDelay: '1.5s'}}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 border border-primary/30 hover:border-primary/50 transition-all duration-500 group hover:scale-105 shadow-morphic hover:shadow-luxury">
              <Rocket className="w-6 h-6 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
              <span className="font-orbitron text-base text-primary font-bold tracking-wide">INSPIRING INNOVATION</span>
              <Zap className="w-6 h-6 text-primary-glow animate-pulse group-hover:animate-spin" />
            </div>
          </div>
            
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
              What is <span className="text-holographic">FIRST</span> Robotics?
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed mb-12">
              FIRST (For Inspiration and Recognition of Science and Technology) is a global robotics community 
              that prepares young people for the future through <span className="text-primary font-semibold">team-based robot-building</span> challenges,
              while we at Cyborg Cats integrate our <span className="text-primary-glow font-semibold">Christian faith and values</span> into everything we do.
            </p>
            
            <div className="bg-glass-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-5xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-inter text-white/90 italic leading-relaxed">
                "To transform our culture by creating a world where science and technology are celebrated 
                and where young people dream of becoming science and technology leaders, while we strive to honor God in all we do."
              </blockquote>
              <cite className="block mt-6 text-lg text-primary font-semibold">- Dean Kamen, FIRST Founder (adapted with our Christian mission)</cite>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <PremiumCard className="h-full">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex-shrink-0">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
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
                <span className="text-secondary font-semibold"> teamwork</span>, and 
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