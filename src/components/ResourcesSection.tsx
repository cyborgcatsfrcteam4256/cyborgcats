import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { FloatingParticles } from '@/components/FloatingParticles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Code, 
  Wrench, 
  Users, 
  Download, 
  Play, 
  FileText, 
  Zap,
  Globe,
  GraduationCap
} from 'lucide-react';

export const ResourcesSection = () => {
  const resourceCategories = [
    {
      title: "Programming Resources",
      description: "Java, Python, and C++ tutorials specifically for FRC robotics",
      icon: Code,
      count: "25+ Tutorials",
      resources: [
        "Command-Based Programming Guide",
        "Vision Processing Tutorials", 
        "Autonomous Path Planning",
        "PID Control Implementation"
      ]
    },
    {
      title: "CAD & Design",
      description: "SolidWorks models, design principles, and mechanical tutorials",
      icon: Wrench,
      count: "15+ Models",
      resources: [
        "Competition Robot CAD Files",
        "Design Process Documentation",
        "3D Printing Guidelines",
        "Manufacturing Best Practices"
      ]
    },
    {
      title: "Team Management",
      description: "Leadership guides, organizational tools, and team building resources",
      icon: Users,
      count: "12+ Guides",
      resources: [
        "Team Structure Templates",
        "Project Management Tools",
        "Fundraising Strategies",
        "Community Outreach Plans"
      ]
    },
    {
      title: "STEM Curriculum",
      description: "Educational materials for schools and community programs",
      icon: GraduationCap,
      count: "20+ Lessons",
      resources: [
        "Elementary STEM Activities",
        "Middle School Robotics Intro",
        "High School Engineering Projects",
        "Teacher Training Materials"
      ]
    }
  ];

  const featuredResources = [
    {
      title: "2024 Robot Code Repository",
      description: "Complete source code from our championship-winning robot",
      type: "Code",
      downloads: "2.3k",
      icon: Code,
      featured: true
    },
    {
      title: "FRC Rookie Team Handbook",
      description: "Everything new teams need to know to get started in FIRST",
      type: "Guide",
      downloads: "1.8k",
      icon: BookOpen,
      featured: true
    },
    {
      title: "CAD Training Workshop Series",
      description: "6-part video series teaching SolidWorks for robotics",
      type: "Video",
      downloads: "3.1k",
      icon: Play,
      featured: true
    }
  ];

  const communityPrograms = [
    {
      title: "Global STEM Exchange",
      description: "Collaborate with international teams and share resources across continents",
      icon: Globe,
      participants: "15 Countries"
    },
    {
      title: "Mentor Training Program",
      description: "Comprehensive training for adults wanting to mentor FRC teams",
      icon: Users,
      participants: "200+ Mentors"
    },
    {
      title: "Student Leadership Academy",
      description: "Leadership development program for current and future team captains",
      icon: Zap,
      participants: "50+ Students"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <FloatingParticles />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      <div className="container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-card/50 backdrop-blur-sm border-accent/20">
              <BookOpen className="w-4 h-4 mr-2 text-accent" />
              Free Resources & Curriculum
            </Badge>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-glow">
              Knowledge for 
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-300% animate-gradient">
                Everyone
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access our comprehensive library of robotics resources, STEM curriculum, and educational materials. 
              All resources are free and designed to help teams, educators, and students succeed.
            </p>
          </div>
        </ScrollReveal>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resourceCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 100}>
              <PremiumCard className="h-full">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <category.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-orbitron font-semibold text-lg mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <div className="text-xs font-medium text-accent bg-accent/10 rounded-full px-3 py-1 inline-block mb-4">
                    {category.count}
                  </div>
                  <ul className="space-y-2">
                    {category.resources.map((resource, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-accent rounded-full mr-2" />
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              </PremiumCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured Resources */}
        <ScrollReveal delay={200}>
          <div className="mb-16">
            <h3 className="font-orbitron text-2xl font-bold text-center mb-8 text-glow">
              Most Popular Downloads
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => (
                <PremiumCard key={resource.title} className="relative">
                  {resource.featured && (
                    <div className="absolute -top-3 -right-3">
                      <Badge variant="default" className="bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <resource.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-orbitron font-semibold text-lg mb-2">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          <Download className="w-3 h-3 inline mr-1" />
                          {resource.downloads} downloads
                        </span>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Community Programs */}
        <ScrollReveal delay={300}>
          <div className="mb-16">
            <h3 className="font-orbitron text-2xl font-bold text-center mb-8 text-glow">
              Community Programs
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {communityPrograms.map((program, index) => (
                <PremiumCard key={program.title} className="text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary mx-auto mb-4 flex items-center justify-center">
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-orbitron font-semibold text-lg mb-2">{program.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                    <div className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 inline-block">
                      {program.participants}
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={400}>
          <div className="text-center bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-accent/20">
            <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-orbitron text-xl font-bold mb-4">Contribute to Our Resources</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Help us expand our resource library! Share your team's knowledge, contribute tutorials, 
              or collaborate on educational content to benefit the entire FIRST community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Browse All Resources
              </Button>
              <Button variant="outline" size="lg">
                Submit Resource
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};