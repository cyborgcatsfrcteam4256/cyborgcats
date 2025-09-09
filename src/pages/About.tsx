import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Award, MapPin, Users, Zap, Target, Lightbulb } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="text-glow">About the</span>
              <span className="block text-primary-glow">Cyborg Cats</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              We are FRC Team 4256, a passionate group of 48 students from Westminster Christian Academy 
              in St. Louis, Missouri, dedicated to building robots and building futures.
            </p>
          </div>
        </div>
      </section>

      {/* Team Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 glow-subtle">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-4">Our Location</h3>
              <p className="text-muted-foreground font-inter mb-4">
                Based in St. Louis, Missouri at Westminster Christian Academy, we represent 
                the heart of American innovation and community spirit.
              </p>
              <div className="text-sm text-primary font-orbitron font-medium">
                St. Louis, Missouri
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 glow-subtle">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-4">Our Team</h3>
              <p className="text-muted-foreground font-inter mb-4">
                48 dedicated students working across engineering, business, and outreach, 
                supported by experienced mentors and strong female leadership.
              </p>
              <div className="text-sm text-primary font-orbitron font-medium">
                48 Active Members
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 glow-subtle">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-4">Our Achievements</h3>
              <p className="text-muted-foreground font-inter mb-4">
                2025 FIRST Impact Award winners and World Championship qualifiers, 
                recognized for our community impact and technical excellence.
              </p>
              <div className="text-sm text-primary font-orbitron font-medium">
                Impact Award Winners
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-up">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-orbitron font-bold text-glow">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground font-inter">
                  To inspire and empower the next generation of STEM leaders through hands-on robotics 
                  education, community outreach, and advocacy for inclusive engineering practices. 
                  We believe that when young people are given the tools and support to innovate, 
                  they can change the world.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-orbitron font-bold text-glow">Our Vision</h2>
                </div>
                <p className="text-lg text-muted-foreground font-inter">
                  A future where STEM education is accessible to all, where diversity drives innovation, 
                  and where young engineers are equipped not just with technical skills, but with the 
                  passion and commitment to use those skills for the betterment of their communities.
                </p>
              </div>

              <Button variant="cyber" size="lg">
                Join Our Mission
              </Button>
            </div>

            <div className="relative animate-scale-in">
              <img 
                src={teamPhoto} 
                alt="Cyborg Cats team collaboration" 
                className="w-full h-[500px] object-cover rounded-xl shadow-elevated"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-xl" />
              
              {/* Floating achievement badge */}
              <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-lg rounded-xl p-4 animate-glow-pulse">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-orbitron font-semibold text-sm">Impact Award</div>
                    <div className="text-xs text-muted-foreground">2025 Winners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              These principles guide everything we do, from robot design to community outreach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group hover-glow transition-cyber">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-subtle group-hover:glow-electric">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground font-inter">
                Pushing boundaries and finding creative solutions to complex challenges.
              </p>
            </div>

            <div className="text-center group hover-glow transition-cyber">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-subtle group-hover:glow-electric">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Inclusion</h3>
              <p className="text-muted-foreground font-inter">
                Creating opportunities for all students to thrive in STEM fields.
              </p>
            </div>

            <div className="text-center group hover-glow transition-cyber">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-subtle group-hover:glow-electric">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Excellence</h3>
              <p className="text-muted-foreground font-inter">
                Striving for the highest standards in everything we build and do.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;