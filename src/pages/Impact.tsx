import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { StatCounter } from '@/components/StatCounter';
import { Heart, Globe, Users, Target, Calendar, MapPin, Award, Lightbulb } from 'lucide-react';
import { FloatingLogo } from '@/components/FloatingLogo';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

const Impact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingLogo />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        
        {/* Impact-themed brand integration */}
        <div className="absolute top-36 left-20 opacity-18">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl scale-150"></div>
            <div className="relative bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-lg rounded-full p-4 border border-primary/20 shadow-cyber">
              <img src={cyborgCatsLogo} alt="" className="w-11 h-11 animate-cyber-float" />
            </div>
            {/* Impact ripple effect */}
            <div className="absolute inset-0 border border-primary/10 rounded-full scale-125 animate-ping"></div>
            <div className="absolute inset-0 border border-primary-glow/10 rounded-full scale-150 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        <div className="absolute bottom-36 right-24 opacity-14">
          <div className="relative">
            <div className="bg-gradient-to-tl from-primary-glow/12 to-primary/8 rounded-lg p-3 backdrop-blur-sm border border-primary-glow/20 rotate-12 shadow-glow">
              <img src={cyborgCatsLogo} alt="" className="w-9 h-9 animate-cyber-float" style={{ animationDelay: '0.8s' }} />
            </div>
            {/* Global impact indicators */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary-glow/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="text-glow">Our Impact</span>
              <span className="block text-primary-glow">& Outreach</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              From our home in St. Louis, Missouri, we're building more than robots—we're building 
              a better future through STEM education, community outreach, and advocacy across the Show-Me State and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={48} label="Team Members" />
            <StatCounter value={19} label="Legislators Met" suffix="+" />
            <StatCounter value={2000} label="Students Reached" suffix="+" />
            <StatCounter value={115} label="Ethiopian Students" />
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Our Programs</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Comprehensive initiatives designed to make STEM accessible to all.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* STEM Companion Initiative */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-subtle">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold">STEM Companion Initiative</h3>
              </div>
              <p className="text-muted-foreground font-inter text-lg mb-6">
                Our flagship program connecting children with special needs to STEM through robot demonstrations, 
                STEM games, and activities including Easter egg hunts. Over 5 demonstrations and events held, 
                with resources available at stemcompanion.org.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Robot demonstrations and activities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Special events including Easter egg hunts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Website: stemcompanion.org</span>
                </div>
              </div>
            </div>

            {/* Women in STEM */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-subtle">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold">Women in STEM Seminars</h3>
              </div>
              <p className="text-muted-foreground font-inter text-lg mb-6">
                Hosting public seminars at Westminster Christian Academy in St. Louis with industry professionals. 
                Over 100 attendees in the past three years. All of our business and engineering upper leadership is female, 
                demonstrating our commitment to women in STEM across Missouri.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Monthly career workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Industry professional speakers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Female leadership development</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Global Outreach */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-subtle">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold">International Partnerships</h3>
              </div>
              <p className="text-muted-foreground font-inter text-lg mb-6">
                International impact spanning continents. Helped establish South Korea's 4th FRC team 
                at Samuel School, and conducted STEM activities for 115 students in Ethiopia, 
                providing robotics jerseys and promoting sustainability in STEM.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">South Korea: Samuel School FRC team founding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Ethiopia: 115 students sustainability projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Only 2 active FRC teams in all of Africa before our work</span>
                </div>
              </div>
            </div>

            {/* Legislative Advocacy */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-subtle">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold">STEM Advocacy</h3>
              </div>
              <p className="text-muted-foreground font-inter text-lg mb-6">
                Met with 19 representatives and the Lieutenant Governor at the Missouri State Capitol 
                supporting HB 256 for STEM education funding. Our St. Louis-based team actively advocates 
                for Missouri students and STEM education funding across the state.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Missouri Capitol meetings with 19+ officials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">STEM Day at The Capitol participation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">HB 256 advocacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Events & Partnerships */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Major Events & Partnerships</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Annual events and collaborations that amplify our impact across the STEM community.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* St. Louis Events */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-subtle">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold">St. Louis Area Events</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-orbitron font-semibold text-lg mb-2">St. Louis FLL Season Kickoff</h4>
                  <p className="text-muted-foreground font-inter text-sm mb-2">
                    Annual event hosted at Westminster for 4 years
                  </p>
                  <div className="text-2xl font-orbitron font-bold text-primary">900+ Attendees</div>
                  <div className="text-sm text-muted-foreground">Over 3 years</div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-orbitron font-semibold text-lg mb-2">Westminster Open House</h4>
                  <p className="text-muted-foreground font-inter text-sm mb-2">
                    Annual demonstration event for 3 years
                  </p>
                  <div className="text-2xl font-orbitron font-bold text-primary">1,500+</div>
                  <div className="text-sm text-muted-foreground">Total attendees</div>
                </div>
              </div>
            </div>

            {/* Regional Outreach */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center glow-subtle">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold">Regional Impact</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-orbitron font-semibold text-lg mb-2">Spirit of St. Louis Airshow</h4>
                  <p className="text-muted-foreground font-inter text-sm mb-2">
                    Organized FIRST space, showcased robot with other FRC teams
                  </p>
                  <div className="text-2xl font-orbitron font-bold text-primary">2,000+</div>
                  <div className="text-sm text-muted-foreground">People reached over 2 years</div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-orbitron font-semibold text-lg mb-2">Camp Westminster</h4>
                  <p className="text-muted-foreground font-inter text-sm mb-2">
                    Annual FIRST Robotics class
                  </p>
                  <div className="text-2xl font-orbitron font-bold text-primary">120</div>
                  <div className="text-sm text-muted-foreground">Students over 3 years</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Mentoring & Partnerships */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 hover-glow transition-cyber">
              <h4 className="font-orbitron font-semibold text-lg mb-4">Team Mentoring</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Covenant Christian: Hedgehog Hackers (Champion's Award winners)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Twin Oaks: Electric Eagles FLL Challenge</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Thursday morning robotics classes</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover-glow transition-cyber">
              <h4 className="font-orbitron font-semibold text-lg mb-4">Special Projects</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Only high school licensed to grow Atlanta coral</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Patent assistance for Hedgehog Hackers invention</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">FSI chemical company partnerships</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover-glow transition-cyber">
              <h4 className="font-orbitron font-semibold text-lg mb-4">Team Partnerships</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">U-City Robolions collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Practice field for 70+ FRC teams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Hand-written letter campaigns at regionals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Impact Timeline</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Key milestones in our 14-year journey to make STEM accessible to all.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30"></div>

            <div className="space-y-12">
              <div className="flex items-start space-x-8 animate-slide-up">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-primary relative z-10">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-orbitron font-bold">Growing Community Impact</h3>
                    <span className="text-primary font-orbitron text-sm">2025</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    Continuing to expand outreach programs, reaching over 2,000 students and meeting with 19+ legislators.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8 animate-slide-up">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-primary relative z-10">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-orbitron font-bold">Team Planting Workshops</h3>
                    <span className="text-primary font-orbitron text-sm">2025</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    Successful FLL Team Planting Workshops in February and March, helping establish new teams.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8 animate-slide-up">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-primary relative z-10">
                  <Globe className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-orbitron font-bold">International Expansion</h3>
                    <span className="text-primary font-orbitron text-sm">2023-2024</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    Helped establish South Korea's 4th FRC team and conducted STEM activities for 115 students in Ethiopia.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8 animate-slide-up">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-primary relative z-10">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-orbitron font-bold">Legislative Advocacy Launch</h3>
                    <span className="text-primary font-orbitron text-sm">2020-2025</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    14-year team history culminating in strong advocacy work for STEM education policy in Missouri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Join Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-8 font-inter">
            Ready to make a difference? Partner with us to expand STEM opportunities for all students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Partner With Us
            </Button>
            <Button variant="silver" size="lg">
              Support Our Programs
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;