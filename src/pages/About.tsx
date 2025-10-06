import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { Award, Users, Heart, Target, Lightbulb, Trophy, Calendar, TrendingUp } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';
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
    year: '2011',
    event: 'Team Founded',
    description: 'Cyborg Cats established at Westminster Christian Academy'
  }, {
    year: '2015',
    event: 'First Regional Win',
    description: 'Won our first regional competition in St. Louis'
  }, {
    year: '2018',
    event: 'World Championship',
    description: 'Competed at FIRST Championship in Detroit'
  }, {
    year: '2021',
    event: 'Innovation Award',
    description: 'Recognized for STEM Companion Initiative'
  }, {
    year: '2023',
    event: 'International Expansion',
    description: 'Helped establish FRC team in South Korea'
  }, {
    year: '2025',
    event: 'Impact Award',
    description: 'Won prestigious FIRST Impact Award'
  }];
  const leadership = [{
    role: 'Engineering Lead',
    name: 'Coming Soon',
    department: 'Mechanical & Design'
  }, {
    role: 'Programming Lead',
    name: 'Coming Soon',
    department: 'Software & Controls'
  }, {
    role: 'Business Lead',
    name: 'Coming Soon',
    department: 'Operations & Outreach'
  }, {
    role: 'Head Mentor',
    name: 'Coming Soon',
    department: 'Team Guidance'
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
              <img src={teamPhoto} alt="Cyborg Cats Team Photo" className="w-full rounded-2xl shadow-2xl border border-border/50" />
            </div>
          </ScrollReveal>

          {/* Mission Statement */}
          <ScrollReveal delay={200}>
            <PremiumCard className="max-w-4xl mx-auto p-12 text-center mb-20">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-orbitron font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">To inspire and equip young people to become leaders in STEM while demonstrating Christian values through innovative robotics, community outreach, and gracious professionalism. We believe that every student has the potential to change the world through STEM, and we're committed to providing the tools, mentorship, and opportunities to make that happen.</p>
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
                  <PremiumCard className="h-full text-center">
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

          {/* Leadership Team */}
          <div className="mb-20">
            <ScrollReveal>
              <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-glow">
                Leadership Team
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {leadership.map((leader, index) => <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-orbitron font-bold text-lg mb-1">{leader.role}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{leader.name}</p>
                    <p className="text-xs text-muted-foreground">{leader.department}</p>
                  </PremiumCard>
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
              value: '14',
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