import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { LazyImage } from '@/components/Performance/LazyImage';
import { Award, Users, Heart, Target, Lightbulb, Trophy, Calendar, TrendingUp } from 'lucide-react';
const teamPhoto = '/lovable-uploads/impact-award-winning-photo.jpg';
const About = () => {
  const coreValues = [{
    icon: Heart,
    title: 'Christian Values',
    description: 'We integrate our faith into everything we do, serving others with compassion and excellence.'
  }, {
    icon: Users,
    title: 'Gracious Professionalism',
    description: 'We compete with respect, collaboration, and sportsmanship at every level.'
  }, {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries through creative problem-solving and continuous learning.'
  }, {
    icon: Target,
    title: 'Community Impact',
    description: 'We believe in using STEM to serve and inspire our local and global communities.'
  }];
  const milestones = [{
    year: '2010',
    event: 'The Beginning',
    description: 'Science and Engineering Club formed by Westminster students passionate about STEM'
  }, {
    year: '2011',
    event: 'Team Founded',
    description: 'Mr. Paul DeGroot volunteers as mentor, Westminster joins FIRST as Team 4256 with Boeing sponsorship'
  }, {
    year: '2012',
    event: 'Rookie All-Star',
    description: 'Won Regional Rookie All-Star Award and competed at World Championship in our first season'
  }, {
    year: '2012-2024',
    event: 'Continued Excellence',
    description: 'Competed in numerous regionals, earned 25+ awards, and grew to 48+ team members'
  }, {
    year: '2021',
    event: 'STEM Companion',
    description: 'Launched innovative STEM Companion Initiative to mentor underserved communities'
  }, {
    year: '2023',
    event: 'Global Impact',
    description: 'Helped establish FRC team in South Korea, expanding international STEM education'
  }, {
    year: '2025',
    event: 'Impact Award',
    description: 'Won prestigious FIRST Impact Award for outstanding community outreach and team excellence'
  }];
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                About the <span className="text-holographic">Cyborg Cats</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Since 2011, FRC Team 4256 has been building more than robots—we're building futures, 
                inspiring communities, and changing lives through STEM education and Christian values.
              </p>
            </div>
          </ScrollReveal>

          {/* Team Photo */}
          <ScrollReveal delay={100}>
            <div className="max-w-5xl mx-auto mb-20">
              <LazyImage 
                src={teamPhoto} 
                alt="Cyborg Cats Team celebrating FIRST Impact Award win" 
                className="w-full rounded-2xl shadow-2xl border border-border/50" 
              />
            </div>
          </ScrollReveal>

          {/* Origin Story */}
          <ScrollReveal delay={200}>
            <PremiumCard className="max-w-4xl mx-auto p-12 mb-20" variant="glass">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-orbitron font-bold mb-6 text-center">Our Story</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  In September 2010, a small group of Westminster students passionate about STEM formed a Science and Engineering Club. What started as three students with a dream quickly evolved into something extraordinary. Through research and exploration of various robotics competitions, they discovered FIRST Robotics Competition.
                </p>
                <p>
                  In October 2011, Mr. Paul DeGroot, a Boeing engineer and Westminster father, volunteered to mentor a FRC team, and Westminster officially joined FIRST as Team 4256. After securing sponsorship from Boeing, the word spread rapidly through the school—those original 3 dreamers became a team of 27 dedicated members.
                </p>
                <p>
                  The team attended training at the St. Louis Science Center in December 2011, bringing the largest group that day. After the NASA kick-off, the race began to build a robot capable of shooting basketballs and balancing on bridges. Six intense weeks of late nights, caffeine, and determination followed as the team engineered, organized, and led Team 4256 into existence.
                </p>
                <p>
                  The results were remarkable. At the 2012 St. Louis Regional, our rookie team went 7-9 and advanced to the semi-finals as part of an alliance. We ranked 17th out of 43 teams and won the prestigious <strong>Regional Rookie All-Star Award</strong>—the highest honor for a first-year team. This achievement earned us a spot at the FIRST World Championship, where we competed in the Archimedes division at the Edward Jones Dome.
                </p>
                <p className="text-lg font-semibold text-foreground">
                  Since that incredible rookie season, the Cyborg Cats have continued to inspire, innovate, and impact our community through STEM education, gracious professionalism, and Christian values.
                </p>
              </div>
            </PremiumCard>
          </ScrollReveal>

          {/* Core Values */}
          <div className="mb-20">
            <ScrollReveal>
              <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-glow">
                Our Core Values
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="h-full text-center p-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-orbitron font-bold text-lg mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </PremiumCard>
                </ScrollReveal>)}
            </div>
          </div>

          {/* Team Timeline */}
          <div className="mb-20">
            <ScrollReveal>
              <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-glow">
                Our Journey
              </h2>
            </ScrollReveal>
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => <ScrollReveal key={index} delay={index * 100}>
                  <div className="flex gap-6 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary flex-shrink-0">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      {index !== milestones.length - 1 && <div className="w-0.5 h-full bg-gradient-to-b from-primary to-transparent mt-2" />}
                    </div>
                    <PremiumCard className="flex-1 p-6 mb-6">
                      <div className="text-2xl font-orbitron font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-orbitron font-bold mb-2">{milestone.event}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </PremiumCard>
                  </div>
                </ScrollReveal>)}
            </div>
          </div>


          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[{
              icon: Users,
              value: '48',
              label: 'Team Members'
            }, {
              icon: Award,
              value: '22',
              label: 'Mentors'
            }, {
              icon: TrendingUp,
              value: '14+',
              label: 'Years Active'
            }, {
              icon: Trophy,
              value: '25+',
              label: 'Awards Won'
            }].map((stat, index) => <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-orbitron font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;