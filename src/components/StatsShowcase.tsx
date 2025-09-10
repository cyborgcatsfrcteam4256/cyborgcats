import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Globe, Award, TrendingUp, Zap } from 'lucide-react';

export const StatsShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-showcase');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 48,
      label: "Active Team Members",
      description: "Passionate students across all subteams",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      suffix: ""
    },
    {
      value: 2025,
      label: "Impact Award Winners",
      description: "FIRST's most prestigious award",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      suffix: ""
    },
    {
      value: 1000,
      label: "Students Reached",
      description: "Through our outreach programs",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      suffix: "+"
    },
    {
      value: 20,
      label: "Legislators Engaged",
      description: "STEM education advocates",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      suffix: "+"
    },
    {
      value: 100,
      label: "Women in STEM Participants",
      description: "Inspiring future engineers",
      icon: Zap,
      color: "from-indigo-500 to-purple-500",
      suffix: "+"
    },
    {
      value: 5,
      label: "Competition Awards",
      description: "Regional and state recognition",
      icon: Trophy,
      color: "from-red-500 to-pink-500",
      suffix: "+"
    }
  ];

  const AnimatedCounter = ({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const duration = 2000;
        const steps = 60;
        const stepValue = value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += stepValue;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }, [isVisible, value]);

    return (
      <span className="text-4xl md:text-5xl font-orbitron font-bold">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section id="stats-showcase" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 data-stream opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="outline" className="mb-4 font-orbitron">
            <Trophy className="w-4 h-4 mr-2" />
            Impact by the Numbers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-glow">
            Our Growing Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            These numbers represent more than achievements - they represent lives touched, 
            opportunities created, and futures inspired.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber interactive-card"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl glow-subtle group-hover:glow-electric transition-all" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Animated Number */}
                <div className={`mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    isVisible={isVisible} 
                  />
                </div>

                {/* Label */}
                <h3 className="text-xl font-orbitron font-bold mb-3 text-foreground group-hover:text-glow transition-colors">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          ))}
        </div>

        {/* Achievement Timeline */}
        <div className="mt-20 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 hover-glow transition-cyber">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-glow">
              Our Journey of Impact
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">2022</div>
                <div className="text-sm text-muted-foreground font-inter">Team Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">2023</div>
                <div className="text-sm text-muted-foreground font-inter">First Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">2024</div>
                <div className="text-sm text-muted-foreground font-inter">100 Women Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">2025</div>
                <div className="text-sm text-muted-foreground font-inter">Impact Award & Worlds</div>
              </div>
            </div>
            
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
              From a small team with big dreams to FIRST Impact Award winners - 
              our journey continues to expand STEM opportunities for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};