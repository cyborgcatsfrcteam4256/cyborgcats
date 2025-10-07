import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Trophy, Calendar, MapPin, Award, TrendingUp, Medal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Competition {
  id: string;
  name: string;
  event_date: string;
  location: string;
  rank: number | null;
  points: number;
  awards: string[] | null;
  notes: string | null;
  image_url: string | null;
}

const Competitions = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setCompetitions(data || []);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentSeason = {
    year: '2024-2025',
    game: 'REEFSCAPE',
    theme: 'Ocean conservation and coral reef restoration',
    regionals: 2,
    championships: 1
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Competitions"
        description="Cyborg Cats 4256 competition history and achievements in FIRST Robotics Competition. View our tournament results, awards, and championship journey from 2010 to present."
        keywords="FRC competitions, robotics tournaments, St. Louis regional, FIRST Championship, competition results, FRC 4256 achievements"
        canonicalPath="/competitions"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 font-orbitron">
                <Trophy className="w-4 h-4 mr-2" />
                Competition History
              </Badge>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                Our <span className="text-holographic">Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                14 years of competitive excellence, continuous improvement, 
                and unforgettable moments in FIRST Robotics Competition.
              </p>
            </div>
          </ScrollReveal>

          {/* Current Season Info */}
          <ScrollReveal>
            <Card className="p-8 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 mb-16">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-orbitron font-bold mb-4">
                    {currentSeason.year} Season
                  </h2>
                  <p className="text-xl mb-2">{currentSeason.game}</p>
                  <p className="text-muted-foreground mb-6">{currentSeason.theme}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>Season Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>Building & Competing</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-orbitron font-bold text-holographic mb-1">
                      {currentSeason.regionals}
                    </div>
                    <div className="text-sm text-muted-foreground">Regional Events</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-orbitron font-bold text-holographic mb-1">
                      {currentSeason.championships}
                    </div>
                    <div className="text-sm text-muted-foreground">Championship</div>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Competition Results */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-muted-foreground mt-4">Loading competitions...</p>
            </div>
          ) : competitions.length > 0 ? (
            <div className="space-y-6">
              {competitions.map((comp, index) => (
                <ScrollReveal key={comp.id} delay={index * 50}>
                  <Card className="p-6 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber">
                    <div className="flex flex-col md:flex-row gap-6">
                      {comp.image_url && (
                        <img 
                          src={comp.image_url} 
                          alt={comp.name}
                          className="w-full md:w-48 h-48 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-orbitron font-bold mb-2">{comp.name}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(comp.event_date), 'MMMM d, yyyy')}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {comp.location}
                              </div>
                            </div>
                          </div>
                          {comp.rank && (
                            <Badge variant="outline" className="font-orbitron text-lg px-4 py-2">
                              <Medal className="w-4 h-4 mr-2" />
                              Rank #{comp.rank}
                            </Badge>
                          )}
                        </div>

                        {comp.awards && comp.awards.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {comp.awards.map((award, i) => (
                                <Badge key={i} variant="secondary" className="flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  {award}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {comp.notes && (
                          <p className="text-muted-foreground">{comp.notes}</p>
                        )}

                        {comp.points > 0 && (
                          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="font-semibold">{comp.points} Points</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <Card className="p-12 bg-card/80 backdrop-blur-lg border-border/50 text-center">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-orbitron font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Competition results will be posted here as we participate in events this season.
              </p>
            </Card>
          )}

          {/* Legacy Stats */}
          <ScrollReveal>
            <Card className="p-12 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 mt-16">
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
                14 Years of Excellence
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { label: 'Competitions', value: '50+' },
                  { label: 'Regional Wins', value: '8' },
                  { label: 'World Championships', value: '3' },
                  { label: 'Awards Won', value: '45+' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-5xl font-orbitron font-bold text-holographic mb-2">
                      {stat.value}
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Competitions;
