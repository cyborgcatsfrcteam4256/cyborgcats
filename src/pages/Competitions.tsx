import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, MapPin, Award, Zap, Users, Target } from 'lucide-react';

const Competitions = () => {
  const competitions = [
    {
      event: "FIRST World Championship",
      location: "Houston, TX",
      date: "April 2025",
      status: "Qualified",
      rank: "TBD",
      highlight: true,
      description: "The ultimate robotics competition featuring teams from around the world."
    },
    {
      event: "FIRST Missouri State Championship",
      location: "St. Louis, MO", 
      date: "March 2025",
      status: "Impact Award Winner",
      rank: "1st Place Impact",
      highlight: true,
      description: "Won the prestigious FIRST Impact Award for our community outreach programs."
    },
    {
      event: "Greater St. Louis Regional",
      location: "St. Charles, MO",
      date: "February 2025",
      status: "Regional Finalist",
      rank: "Top 8",
      highlight: false,
      description: "Strong performance earning qualification for state championship."
    },
    {
      event: "Midwest Regional",
      location: "Chicago, IL",
      date: "March 2024",
      status: "Completed",
      rank: "Top 16",
      highlight: false,
      description: "Valuable experience competing against top-tier teams."
    }
  ];

  const achievements = [
    {
      year: "2025",
      award: "FIRST Impact Award",
      level: "State Championship",
      description: "Recognized for comprehensive community outreach and STEM advocacy programs."
    },
    {
      year: "2025", 
      award: "World Championship Qualification",
      level: "Houston, Texas",
      description: "Earned qualification to compete at the highest level of FIRST Robotics."
    },
    {
      year: "2024",
      award: "Engineering Excellence Award",
      level: "Regional Competition",
      description: "Honored for innovative robot design and engineering documentation."
    },
    {
      year: "2023",
      award: "Gracious Professionalism Award",
      level: "Regional Competition", 
      description: "Recognized for embodying FIRST values of cooperation and respect."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="text-glow">Our</span>
              <span className="block text-primary-glow">Competitions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              From regional competitions to the World Championship - tracking our journey 
              to the top of FIRST Robotics Competition.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-subtle">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">2025</div>
              <div className="text-muted-foreground font-inter">Impact Award</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-subtle">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">4+</div>
              <div className="text-muted-foreground font-inter">Competitions</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-subtle">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">Top 8</div>
              <div className="text-muted-foreground font-inter">Best Rank</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-subtle">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground font-inter">Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Competition Results</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Our journey through the 2024-2025 FIRST Robotics Competition season.
            </p>
          </div>

          <div className="space-y-6">
            {competitions.map((comp, index) => (
              <div 
                key={index}
                className={`bg-card border border-border rounded-xl p-6 hover-glow transition-cyber ${
                  comp.highlight ? 'ring-2 ring-primary/20 glow-subtle' : ''
                }`}
              >
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-orbitron font-bold mb-2">{comp.event}</h3>
                    <div className="flex items-center space-x-2 text-muted-foreground font-inter text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{comp.location}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-orbitron font-medium">{comp.date}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge 
                      variant={comp.highlight ? "default" : "secondary"}
                      className={comp.highlight ? "gradient-cyber text-primary-foreground" : ""}
                    >
                      {comp.status}
                    </Badge>
                    {comp.rank && (
                      <div className="text-sm text-muted-foreground mt-1 font-inter">{comp.rank}</div>
                    )}
                  </div>

                  <div>
                    <p className="text-muted-foreground font-inter text-sm">{comp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Awards & Recognition</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Recognition for technical excellence, community impact, and gracious professionalism.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-subtle">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-orbitron font-bold">{achievement.award}</h3>
                      <Badge variant="outline" className="font-orbitron text-xs">
                        {achievement.year}
                      </Badge>
                    </div>
                    <div className="text-primary font-orbitron font-medium text-sm mb-3">
                      {achievement.level}
                    </div>
                    <p className="text-muted-foreground font-inter">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">What's Next</h2>
            <p className="text-xl text-muted-foreground font-inter">
              Following our team's journey to the World Championship in Houston.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center hover-glow transition-cyber">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-primary animate-glow-pulse">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-3xl font-orbitron font-bold mb-4">FIRST World Championship 2025</h3>
            <p className="text-xl text-muted-foreground font-inter mb-6">
              Houston, Texas • April 2025
            </p>
            <p className="text-lg text-muted-foreground font-inter mb-8 max-w-2xl mx-auto">
              After winning the FIRST Impact Award, we're heading to Houston to compete against 
              the best robotics teams from around the world. This is the culmination of years 
              of hard work and dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Follow Our Journey
              </Button>
              <Button variant="silver" size="lg">
                Support Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Competitions;