import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Code, Briefcase, Heart, Zap, Award } from 'lucide-react';
import { PhotoShowcase } from '@/components/PhotoShowcase';
import { FloatingLogo } from '@/components/FloatingLogo';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

const Team = () => {
  const subteams = [
    {
      name: "Engineering",
      icon: Code,
      members: 20,
      color: "bg-blue-500/20 text-blue-400",
      description: "Designing and building our competitive robot with cutting-edge technology.",
      responsibilities: [
        "Mechanical Design & CAD",
        "Electrical Systems & Programming", 
        "Robot Assembly & Testing",
        "Technical Documentation"
      ]
    },
    {
      name: "Business",
      icon: Briefcase,
      members: 15,
      color: "bg-green-500/20 text-green-400",
      description: "Managing operations, finances, and strategic partnerships.",
      responsibilities: [
        "Sponsor Relations & Fundraising",
        "Project Management", 
        "Financial Planning & Budgeting",
        "Marketing & Communications"
      ]
    },
    {
      name: "Outreach", 
      icon: Heart,
      members: 13,
      color: "bg-purple-500/20 text-purple-400",
      description: "Expanding STEM opportunities and building community connections.",
      responsibilities: [
        "Community STEM Programs",
        "Women in STEM Seminars",
        "Legislative Advocacy",
        "International Partnerships"
      ]
    }
  ];

  const leadership = [
    {
      name: "Sarah Chen",
      role: "Team CEO",
      subteam: "Leadership",
      year: "Senior",
      bio: "Leading our team's strategic vision and fostering our culture of innovation and inclusion."
    },
    {
      name: "Marcus Johnson", 
      role: "Head of Engineering",
      subteam: "Engineering",
      year: "Junior",
      bio: "Overseeing robot design and ensuring technical excellence in all our projects."
    },
    {
      name: "Emma Rodriguez",
      role: "Business Director",
      subteam: "Business", 
      year: "Senior",
      bio: "Managing sponsor relationships and driving our fundraising initiatives."
    },
    {
      name: "David Kim",
      role: "Outreach Coordinator", 
      subteam: "Outreach",
      year: "Junior", 
      bio: "Expanding our community impact through STEM education and advocacy programs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingLogo />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        
        {/* Floating mini logos */}
        <div className="absolute top-32 right-20 opacity-20">
          <img src={cyborgCatsLogo} alt="" className="w-10 h-10 animate-cyber-float" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-15">
          <img src={cyborgCatsLogo} alt="" className="w-8 h-8 animate-cyber-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="text-glow">Meet Our</span>
              <span className="block text-primary-glow">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              48 passionate students and 22 dedicated mentors from St. Louis, Missouri working together 
              across engineering, business, and outreach to build robots and build futures in the Gateway City.
            </p>
          </div>

          {/* Team Photo */}
          <div className="relative max-w-4xl mx-auto mb-16 animate-scale-in">
            <PhotoShowcase 
              images={[
                "/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png",
                "/lovable-uploads/cc77039e-e81b-423a-a408-b9246289beeb.png",
                "/lovable-uploads/dbbb0403-e985-4641-9473-fd3bcb5cc74b.png",
                "/lovable-uploads/e3cf82cd-0326-4b2e-94d5-3d34ef99d632.png"
              ]}
              className="shadow-elevated h-[400px]"
            />
            
            {/* Team Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card/80 backdrop-blur-lg rounded-lg p-4 text-center">
                  <div className="text-2xl font-orbitron font-bold text-primary">48</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="bg-card/80 backdrop-blur-lg rounded-lg p-4 text-center">
                  <div className="text-2xl font-orbitron font-bold text-primary">60%</div>
                  <div className="text-sm text-muted-foreground">Female</div>
                </div>
                <div className="bg-card/80 backdrop-blur-lg rounded-lg p-4 text-center">
                  <div className="text-2xl font-orbitron font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Subteams</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Meet the students leading our mission to make STEM accessible to all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover-glow transition-cyber text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-subtle">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-1">{leader.name}</h3>
                <div className="text-primary font-orbitron font-medium text-sm mb-2">{leader.role}</div>
                <Badge variant="outline" className="mb-4 font-inter text-xs">
                  {leader.year} • {leader.subteam}
                </Badge>
                <p className="text-muted-foreground font-inter text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subteams */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Our Subteams</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Three specialized teams working together toward a common goal.
            </p>
          </div>

          <div className="space-y-8">
            {subteams.map((subteam, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center glow-subtle ${subteam.color}`}>
                        <subteam.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-orbitron font-bold">{subteam.name}</h3>
                        <Badge variant="outline" className="font-orbitron text-xs">
                          {subteam.members} Members
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-inter">{subteam.description}</p>
                  </div>

                  <div className="lg:col-span-2">
                    <h4 className="font-orbitron font-semibold text-lg mb-4">Key Responsibilities</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {subteam.responsibilities.map((responsibility, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="font-inter text-muted-foreground">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Culture */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Our Culture</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              The St. Louis values that unite us and drive our success in representing Missouri's innovation spirit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover-glow transition-cyber">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-subtle group-hover:glow-electric">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Inclusion First</h3>
              <p className="text-muted-foreground font-inter">
                We believe diversity of thought and background makes us stronger. 
                Every voice matters on our team.
              </p>
            </div>

            <div className="text-center group hover-glow transition-cyber">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-subtle group-hover:glow-electric">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Innovation Driven</h3>
              <p className="text-muted-foreground font-inter">
                We're not afraid to take risks and try new approaches. 
                Innovation comes from bold thinking.
              </p>
            </div>

            <div className="text-center group hover-glow transition-cyber">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-subtle group-hover:glow-electric">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Community Impact</h3>
              <p className="text-muted-foreground font-inter">
                Our success is measured not just by trophies, but by the 
                positive impact we have on our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-12 hover-glow transition-cyber">
            <Award className="w-16 h-16 text-primary mx-auto mb-6 glow-primary" />
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Join the Cyborg Cats</h2>
            <p className="text-xl text-muted-foreground mb-8 font-inter">
              Ready to be part of something bigger? Join our team and help us build 
              the future through robotics and community impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Apply to Join
              </Button>
              <Button variant="silver" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;