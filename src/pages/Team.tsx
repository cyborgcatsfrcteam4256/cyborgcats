import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Users, Wrench, Code, Briefcase, Heart, Lightbulb, Award, Github, Linkedin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  display_order: number | null;
}

const Team = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading team members',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = (category: string) => {
    if (category === 'all') return teamMembers;
    if (category === 'leadership') {
      return teamMembers.filter(m => 
        m.role.toLowerCase().includes('lead') || 
        m.role.toLowerCase().includes('captain')
      );
    }
    if (category === 'mentors') {
      return teamMembers.filter(m => m.role.toLowerCase().includes('mentor'));
    }
    if (category === 'students') {
      return teamMembers.filter(m => 
        !m.role.toLowerCase().includes('mentor')
      );
    }
    return teamMembers;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const departments = [
    {
      name: 'Mechanical Engineering',
      icon: Wrench,
      description: 'Design, fabrication, and assembly of our robot',
      skills: ['CAD Design', 'Machining', 'Fabrication', 'Prototyping'],
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      name: 'Electrical Engineering',
      icon: Lightbulb,
      description: 'Wiring, pneumatics, and power systems',
      skills: ['Circuit Design', 'Wiring', 'Pneumatics', 'Sensors'],
      color: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      name: 'Programming',
      icon: Code,
      description: 'Software development and robot control',
      skills: ['Java', 'Vision Processing', 'Autonomous', 'Teleoperated Control'],
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      name: 'Business & Marketing',
      icon: Briefcase,
      description: 'Sponsorships, outreach, and team operations',
      skills: ['Fundraising', 'Social Media', 'Community Outreach', 'Project Management'],
      color: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  const memberTypes = [
    {
      title: 'Student Members',
      description: 'High school students passionate about STEM, leadership, and community service',
      icon: Users,
      count: '48'
    },
    {
      title: 'Mentors',
      description: 'Professional engineers, teachers, and industry experts guiding our team',
      icon: Award,
      count: '22'
    },
    {
      title: 'Alumni Network',
      description: 'Former members continuing to support and inspire the next generation',
      icon: Heart,
      count: '100+'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Our Team"
        description="Meet the Cyborg Cats FRC Team 4256 members - students, mentors, and leaders driving innovation in robotics. Leadership, mechanical, electrical, programming, and business teams."
        keywords="FRC team members, robotics team, student engineers, mentors, team leadership, STEM students"
        canonicalPath="/team"
      />
      <Navigation />
      
      <main id="main-content">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                Meet the <span className="text-holographic">Team</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                48 passionate students, 22 dedicated mentors, and countless supporters 
                united by a shared mission to build robots and change lives.
              </p>
            </div>
          </ScrollReveal>

          {/* Team Composition */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            {memberTypes.map((type, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <PremiumCard className="text-center p-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-4xl font-orbitron font-bold text-primary mb-2">{type.count}</div>
                  <h3 className="font-orbitron font-bold text-xl mb-3">{type.title}</h3>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </PremiumCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Departments */}
          <div className="mb-20">
            <ScrollReveal>
              <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-glow">
                Our Departments
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {departments.map((dept, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-50 rounded-2xl`} />
                    <div className="relative p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-background/80 rounded-xl flex items-center justify-center">
                          <dept.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-orbitron font-bold text-2xl">{dept.name}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{dept.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-orbitron font-semibold text-sm text-primary mb-3">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {dept.skills.map((skill, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-background/60 backdrop-blur-sm rounded-full text-xs font-medium border border-border/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Team Members Section */}
          <div className="mb-20">
            <ScrollReveal>
              <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-glow">
                Meet Our Team
              </h2>
            </ScrollReveal>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all">All Members</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="mentors">Mentors</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading team members...</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterMembers(activeTab).map((member, index) => (
                      <ScrollReveal key={member.id} delay={index * 50}>
                        <PremiumCard 
                          className="cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => setSelectedMember(member)}
                        >
                          <div className="p-6 text-center">
                            <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/30">
                              <AvatarImage src={member.image_url || undefined} />
                              <AvatarFallback className="text-xl font-bold">
                                {getInitials(member.name)}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="font-orbitron font-bold text-lg mb-1">{member.name}</h3>
                            <Badge variant="secondary" className="mb-3">
                              {member.role}
                            </Badge>
                            {member.bio && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {member.bio}
                              </p>
                            )}
                          </div>
                        </PremiumCard>
                      </ScrollReveal>
                    ))}
                  </div>
                )}

                {!loading && filterMembers(activeTab).length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No team members found in this category.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Join CTA */}
          <ScrollReveal>
            <PremiumCard className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
              <Users className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-orbitron font-bold mb-4">Interested in Joining?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We welcome students from Westminster Christian Academy who are passionate about STEM, 
                robotics, and making a positive impact. No prior experience required!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/contact?subject=join')}
                >
                  Apply to Join
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
            </PremiumCard>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* Member Detail Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-20 h-20 border-2 border-primary/30">
                    <AvatarImage src={selectedMember.image_url || undefined} />
                    <AvatarFallback className="text-xl font-bold">
                      {getInitials(selectedMember.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-orbitron mb-1">
                      {selectedMember.name}
                    </DialogTitle>
                    <Badge variant="secondary">{selectedMember.role}</Badge>
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription asChild>
                <div className="space-y-4">
                  {selectedMember.bio && (
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">About</h4>
                      <p className="text-muted-foreground">{selectedMember.bio}</p>
                    </div>
                  )}
                  {(selectedMember.github_url || selectedMember.linkedin_url) && (
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Connect</h4>
                      <div className="flex gap-2">
                        {selectedMember.github_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={selectedMember.github_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {selectedMember.linkedin_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={selectedMember.linkedin_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="w-4 h-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
