import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Globe, Award, TrendingUp, Zap, Target, Rocket, Lightbulb } from 'lucide-react';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { PremiumCard } from '@/components/PremiumCard';

export const StatsShowcase = () => {
  const stats = [
    {
      value: 48,
      label: "Team Members",
      description: "Passionate students across all subteams",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-primary/20 to-primary-glow/10",
      suffix: ""
    },
    {
      value: 14,
      label: "Years Competing",
      description: "Years of excellence in FIRST Robotics",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/10",
      suffix: ""
    },
    {
      value: 2000,
      label: "Students Reached",
      description: "Through our comprehensive outreach programs",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/10",
      suffix: "+"
    },
    {
      value: 19,
      label: "Legislators Engaged",
      description: "Plus Lieutenant Governor for STEM advocacy",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/10",
      suffix: "+"
    },
    {
      value: 100,
      label: "Women in STEM Participants",
      description: "Inspiring future female engineers",
      icon: Lightbulb,
      color: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/20 to-purple-500/10",
      suffix: "+"
    },
    {
      value: 22,
      label: "Mentors",
      description: "Dedicated adult mentors and advisors",
      icon: Target,
      color: "from-red-500 to-pink-500",
      bgGradient: "from-red-500/20 to-pink-500/10",
      suffix: ""
    }
  ];

  return (
    <section id="stats-showcase" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 data-stream opacity-15" />
      <div className="absolute inset-0 particle-background opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-slide-up">
          <Badge variant="outline" className="mb-6 font-orbitron px-6 py-2 text-base">
            <Trophy className="w-5 h-5 mr-2" />
            Impact by the Numbers
          </Badge>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
            Our Growing Impact
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            These numbers represent more than achievements - they represent <span className="text-primary font-semibold">lives touched</span>, 
            <span className="text-primary-glow font-semibold"> opportunities created</span>, and <span className="text-primary-electric font-semibold">futures inspired</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <PremiumCard 
              key={index}
              variant="luxury"
              className="group/stat relative overflow-hidden p-10 text-center hover:scale-110 transition-all duration-700"
              interactive
              glowEffect
            >
              {/* Enhanced Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-30 group-hover/stat:opacity-50 transition-opacity duration-500`} />
              
              {/* Icon with enhanced effects */}
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl glow-subtle group-hover/stat:glow-electric transition-all duration-500 animate-glow-pulse" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <stat.icon className="w-10 h-10 text-primary group-hover/stat:scale-125 group-hover/stat:rotate-12 transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Animated Number with enhanced styling */}
              <div className={`mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent relative z-10`}>
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  className="text-5xl md:text-6xl font-orbitron font-black"
                />
              </div>

              {/* Label with glow effect */}
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-foreground group-hover/stat:text-glow transition-all duration-500 relative z-10">
                {stat.label}
              </h3>

              {/* Enhanced Description */}
              <p className="text-muted-foreground font-inter text-lg leading-relaxed relative z-10 group-hover/stat:text-foreground transition-colors duration-500">
                {stat.description}
              </p>

              {/* Enhanced Decorative Elements */}
              <div className="absolute top-6 right-6 opacity-30 group-hover/stat:opacity-70 transition-opacity duration-500">
                <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
              
              {/* Corner accent */}
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
            </PremiumCard>
          ))}
        </div>

        {/* Enhanced call-to-action */}
        <div className="text-center mt-20">
          <div className="gradient-premium border border-primary/20 rounded-2xl p-10 backdrop-blur-xl hover:shadow-luxury transition-all duration-700 max-w-2xl mx-auto">
            <Rocket className="w-12 h-12 text-primary mx-auto mb-6 animate-cyber-float" />
            <h3 className="text-3xl font-orbitron font-bold mb-4 text-glow">
              Ready to Make an Impact?
            </h3>
            <p className="text-muted-foreground font-inter mb-8 text-lg">
              Join us in building the future through robotics, STEM education, and community outreach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" className="group">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                Join Our Team
              </Button>
              <Button variant="glass" size="lg" className="group">
                <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                Support Our Mission
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};