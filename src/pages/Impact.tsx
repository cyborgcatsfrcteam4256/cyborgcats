import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Users, Heart, Award, TrendingUp, GraduationCap, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '@/components/AnimatedNumber';

const Impact = () => {
  const impactStats = [
    { value: 2000, label: 'People Reached at Airshow', icon: Users, suffix: '+' },
    { value: 19, label: 'Legislators Met', icon: Award, suffix: '+' },
    { value: 115, label: 'Students in Ethiopia', icon: GraduationCap, suffix: '+' },
    { value: 1500, label: 'Westminster Open House Attendees', icon: Users, suffix: '+' },
    { value: 120, label: 'Camp Westminster Students', icon: GraduationCap, suffix: '+' },
    { value: 100, label: 'Women in STEM Attendees', icon: Sparkles, suffix: '+' },
  ];

  const programs = [
    {
      icon: Users,
      title: 'STEM Companion Initiative',
      description: 'A program connecting children with special needs to STEM through robot demonstrations and interactive activities. Visit stemcompanion.org for publicly accessible resources.',
      achievements: ['5+ demonstrations and events', 'Easter egg hunt for participants', 'Dedicated website with resources']
    },
    {
      icon: GraduationCap,
      title: 'Legislative Advocacy',
      description: 'Met with 19 representatives and the Lieutenant Governor at Missouri Capitol to advocate for FIRST funding through HB 33 and SB 265.',
      achievements: ['STEM Day at The Capitol', 'Partnership with legislators', 'Supporting $5M annual grant program']
    },
    {
      icon: Sparkles,
      title: 'Community Events',
      description: 'Host the St. Louis Area FLL Season Kickoff, Camp Westminster FIRST Robotics class, Women in STEM Seminar, and coordinate major demonstrations.',
      achievements: ['900+ FLL Kickoff attendees (3 years)', '120 Camp Westminster students', '100+ Women in STEM attendees']
    },
    {
      icon: Award,
      title: 'Team Mentorship',
      description: 'Mentor younger FIRST teams including Covenant Christian\'s Hedgehog Hackers and Twin Oaks\' Electric Eagles, helping teams advance to regionals and beyond.',
      achievements: ['Year-round FLL mentorship', 'Champion\'s Award winners', 'Patent assistance for innovations']
    }
  ];

  const internationalImpact = [
    {
      location: 'South Korea',
      description: 'Traveled to Samuel School, conducted egg-drop experiments and STEM activities, inspiring the establishment of South Korea\'s 4th-ever FRC team.',
      icon: '🇰🇷'
    },
    {
      location: 'Ethiopia',
      description: 'Led STEM activity for 115 elementary students, teaching sustainability through water bottle car projects. Students received robotics jerseys.',
      icon: '🇪🇹'
    },
    {
      location: 'St. Louis Partnership',
      description: 'Partnered with U-City Robolions to address underserved communities through hand-written letters to all regional teams, promoting collaboration and resource sharing.',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Our Impact"
        description="Cyborg Cats 4256 community outreach and STEM education impact. 10,000+ students reached through robotics demonstrations, mentorship programs, and advocacy initiatives across Missouri and beyond."
        keywords="STEM education, community outreach, robotics mentorship, STEM advocacy, FRC impact, Missouri STEM programs"
        canonicalPath="/impact"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
        </div>
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
                "Carry each other's burdens, and in this way, you will fulfill the law of Christ." - Galatians 6:2. 
                We embody Christian values through service, advocating for STEM education so every child can join a FIRST team—in Missouri, across the U.S., and around the world.
              </p>
            </div>
          </ScrollReveal>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
            {impactStats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber text-center">
                  <stat.icon className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-4xl font-orbitron font-bold mb-1 md:mb-2 text-holographic">
                    <AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground font-inter">{stat.label}</p>
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

          {/* International Impact */}
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-4xl font-orbitron font-bold mb-4 text-center">
                Global <span className="text-holographic">Impact</span>
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Our mission extends beyond Missouri to inspire STEM education worldwide
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {internationalImpact.map((impact, index) => (
                  <Card key={index} className="p-6 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber text-center">
                    <div className="text-5xl mb-4">{impact.icon}</div>
                    <h3 className="font-orbitron font-bold text-xl mb-3">{impact.location}</h3>
                    <p className="text-muted-foreground text-sm">{impact.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Special Initiatives */}
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <Card className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber">
                <h3 className="font-orbitron font-bold text-2xl mb-4">Major Events</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Spirit of St. Louis Airshow & STEM Expo</strong> - Organized FIRST space, showcased robot, hosted other FRC teams, reached 2,000+ people over two years (2022, 2024)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Westminster Open House</strong> - Annual demonstration event engaging 1,500+ attendees (past three years)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Museum of Transportation Demo</strong> - Coordinated demonstration hosting Electric Eagles FLL team and elementary students (Fall 2024)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>FLL Team Planting Workshops</strong> - Multiple workshops training parents and educators to start FLL teams (Feb & Mar 2025)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Group Facility Tours</strong> - Led tours of Westminster robotics facilities, hosted 5+ demonstrations this year
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber">
                <h3 className="font-orbitron font-bold text-2xl mb-4">Team Collaboration</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>70+ FRC Teams Supported</strong> - Annually provide practice field for St. Louis and GRC regionals</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>Team Partnerships</strong> - Regular collaboration with Ratchet Rockers, Lutheran Roboteers, and Oakville Dynamics at GRC offseason</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>Chief Delphi Resources</strong> - Annually compile rules and key drawings as resources for other teams</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>Legislative Training</strong> - Training fellow FRC teams in lobbying techniques in Jefferson City</div>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>

          {/* Additional Achievements Section */}
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <Card className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber">
                <h3 className="font-orbitron font-bold text-2xl mb-4">Our Team Composition</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>48 Students</strong> - Including all-female business and engineering upper leadership</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>22 Mentors</strong> - Dedicated volunteers guiding our mission</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>8 Corporate Sponsors</strong> + 2 Foundations + Westminster Christian Academy</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>14 Years Strong</strong> - Building robots and making positive impact since our founding</div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber">
                <h3 className="font-orbitron font-bold text-2xl mb-4">Unique Achievements</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>Coral Conservation</strong> - World's only high school licensed to grow Atlanta coral, with dedicated cultivation room</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>Patent Assistance</strong> - Helped Hedgehog Hackers meet with patent lawyer and FSI for foam buoyancy insert invention</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>Industry Tours</strong> - Female team members toured FSI chemical company specializing in foam manufacturing</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><strong>Comprehensive Documentation</strong> - Recorded workshops, photographed meetings, preserved flyers for replication and knowledge sharing</div>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>

          {/* Call to Action */}
          <ScrollReveal>
            <Card className="p-12 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 text-center">
              <h2 className="text-3xl font-orbitron font-bold mb-4">
                Shaping the Future of STEM
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven." - Matthew 5:16. 
                Join us in ensuring every Missouri child can access FIRST Robotics programs.
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
