import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { StatCounter } from '@/components/StatCounter';
import { Heart, Globe, Users, Target, Calendar, MapPin, Award, Lightbulb } from 'lucide-react';

const Impact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="text-glow">Our Impact</span>
              <span className="block text-primary-glow">& Outreach</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Beyond building robots, we're building a better future through STEM education, 
              community outreach, and advocacy for inclusive engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={48} label="Team Members" />
            <StatCounter value={20} label="Legislators Met" suffix="+" />
            <StatCounter value={1000} label="Students Reached" suffix="+" />
            <StatCounter value={100} label="Participants in Seminars" suffix="+" />
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
                Our flagship program supporting special-needs students through hands-on STEM activities, 
                mentorship, and inclusive learning environments. We believe every student deserves access 
                to quality STEM education.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Weekly hands-on STEM workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">One-on-one mentorship programs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Adaptive learning technologies</span>
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
                Empowering the next generation of female engineers through seminars, workshops, 
                and mentorship. Over 100 participants have joined our programs, learning from 
                industry professionals and our own female team leaders.
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
                Building bridges across continents through STEM education. Our partnerships with 
                teams in South Korea and Ethiopia demonstrate that innovation knows no borders.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">South Korean robotics collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Ethiopian STEM education support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Virtual exchange programs</span>
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
                Advocating for STEM education policy with over 20 Missouri state legislators. 
                Supporting bills SB 33 and HB 256 to expand STEM opportunities statewide.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Capitol Hill presentations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Policy research and development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter">Educational impact studies</span>
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
              Key milestones in our journey to make STEM accessible to all.
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
                    <h3 className="text-xl font-orbitron font-bold">FIRST Impact Award Win</h3>
                    <span className="text-primary font-orbitron text-sm">2025</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    Recognized for our comprehensive community impact and outreach programs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8 animate-slide-up">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-primary relative z-10">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-orbitron font-bold">100+ Women in STEM Participants</h3>
                    <span className="text-primary font-orbitron text-sm">2024</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    Reached our goal of engaging over 100 young women in our STEM seminars.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8 animate-slide-up">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-primary relative z-10">
                  <Globe className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-orbitron font-bold">International Partnerships</h3>
                    <span className="text-primary font-orbitron text-sm">2023</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    Established partnerships with robotics teams in South Korea and Ethiopia.
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
                    <span className="text-primary font-orbitron text-sm">2022</span>
                  </div>
                  <p className="text-muted-foreground font-inter">
                    Began our advocacy work with Missouri state legislators for STEM education policy.
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