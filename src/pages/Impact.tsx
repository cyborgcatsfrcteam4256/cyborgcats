import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Users, Heart, Award, TrendingUp, GraduationCap, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '@/components/AnimatedNumber';

const Impact = () => {
  const impactStats = [
    { value: 10000, label: 'Students Reached', icon: Users, suffix: '+' },
    { value: 500, label: 'Volunteer Hours', icon: Heart, suffix: '+' },
    { value: 25, label: 'STEM Events', icon: Sparkles, suffix: '+' },
    { value: 15, label: 'School Visits', icon: GraduationCap, suffix: '+' },
  ];

  const programs = [
    {
      icon: Users,
      title: 'Community Outreach',
      description: 'We regularly visit local schools to introduce students to robotics and STEM careers through interactive demonstrations and hands-on activities.',
      achievements: ['15+ school visits annually', '1000+ students inspired', 'Partnership with 8 local schools']
    },
    {
      icon: GraduationCap,
      title: 'Mentorship Programs',
      description: 'Our team mentors younger FIRST robotics teams and runs workshops teaching programming, mechanical design, and teamwork skills.',
      achievements: ['Mentored 5 FLL teams', '20+ technical workshops', 'Year-round mentorship']
    },
    {
      icon: Sparkles,
      title: 'STEM Advocacy',
      description: 'We advocate for STEM education funding and participate in community events to promote science and technology literacy.',
      achievements: ['Capitol advocacy visits', 'STEM fair exhibitions', 'Technology demonstrations']
    },
    {
      icon: Award,
      title: 'Competition Excellence',
      description: 'Our competitive success inspires other teams and demonstrates what dedication to STEM can achieve.',
      achievements: ['Regional champions', 'Impact Award winners', 'World Championship qualifiers']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 font-orbitron">
                <Heart className="w-4 h-4 mr-2" />
                Community Impact
              </Badge>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                Making a <span className="text-holographic">Difference</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Beyond building robots, we're building futures. Our commitment to STEM education 
                and community outreach creates lasting impact in St. Louis and beyond.
              </p>
            </div>
          </ScrollReveal>

          {/* Impact Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {impactStats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-6 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber text-center">
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-orbitron font-bold mb-2 text-holographic">
                    <AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground font-inter">{stat.label}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {programs.map((program, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <program.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-2xl mb-2">{program.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  <div className="space-y-2">
                    {program.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to Action */}
          <ScrollReveal>
            <Card className="p-12 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 text-center">
              <h2 className="text-3xl font-orbitron font-bold mb-4">
                Join Our Mission
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're interested in sponsoring our programs, volunteering your time, 
                or partnering with us for community events, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact?subject=partnership"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Partner With Us
                </a>
                <a 
                  href="/sponsors"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
                >
                  View Sponsors
                </a>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;
