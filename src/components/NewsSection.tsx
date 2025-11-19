import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Trophy, Award, Users, ExternalLink, Newspaper, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { LiquidButton } from '@/components/LiquidButton';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export const NewsSection = () => {
  const { t } = useTranslation();
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      
      // If we have posts from database, use them. Otherwise, use default posts
      if (data && data.length > 0) {
        setNewsItems(data);
      } else {
        // Default fallback news items
        setNewsItems([
          {
            id: "default-1",
            title: "2025 FIRST Impact Award Winners",
            content: "We are thrilled to announce that the Cyborg Cats have been selected as recipients of the prestigious FIRST Impact Award, recognizing our outstanding community outreach and STEM advocacy work throughout Missouri.",
            excerpt: null,
            image_url: "/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png",
            published_at: "2025-03-15",
            author: "Team 4256"
          },
          {
            id: "default-2",
            title: "Legislative Advocacy Milestone",
            content: "Our team continues to make waves in Missouri politics, having now met with 20 state legislators and the Lieutenant Governor to advocate for increased STEM education funding and opportunities.",
            excerpt: null,
            image_url: "/lovable-uploads/2bef5729-53ec-4330-baa1-ac4ba5367ce2.png",
            published_at: "2025-03-10",
            author: "Team 4256"
          },
          {
            id: "default-3",
            title: "Global STEM Impact Expansion",
            content: "Building on our international work, we've helped establish a fourth FRC team in South Korea and reached over 115 students in Ethiopia, demonstrating the global reach of Missouri's STEM initiatives.",
            excerpt: null,
            image_url: "/lovable-uploads/40d68d3b-ba42-4e64-a83f-cb602561d4db.png",
            published_at: "2025-02-28",
            author: "Team 4256"
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <EnhancedBackground variant="particles" className="opacity-30" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <EnhancedBackground variant="particles" className="opacity-30" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8">
            <Newspaper className="w-6 h-6 text-primary" />
            <span className="font-orbitron text-base text-primary font-bold">Latest Updates</span>
            <Star className="w-5 h-5 text-primary-glow animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
            <span className="text-holographic">Team News</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            Stay up-to-date with our latest <span className="text-primary font-semibold">achievements</span>, 
            <span className="text-primary-glow font-semibold"> competitions</span>, and 
            <span className="text-primary-electric font-semibold"> community events</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {newsItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 100}>
              <div className="morphic-card h-full group overflow-hidden relative">
                {/* Enhanced hover effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Image with advanced effects */}
                {item.image_url && (
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Enhanced Date Badge */}
                    <div className="absolute top-6 right-6 glass-morphism rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-inter">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-foreground">
                          {format(new Date(item.published_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-orbitron font-bold mb-4 text-foreground group-hover:text-glow transition-all duration-500">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-inter text-lg leading-relaxed mb-8 group-hover:text-foreground transition-colors duration-500 line-clamp-3">
                    {item.excerpt || item.content.substring(0, 150) + "..."}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-primary/20 pt-6">
                    {item.author && (
                      <div className="text-sm text-muted-foreground">
                        By {item.author}
                      </div>
                    )}
                    
                    <LiquidButton 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn hover:text-primary font-orbitron font-semibold ml-auto"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-2 transition-transform duration-500" />
                    </LiquidButton>
                  </div>
                </div>

                {/* Enhanced glow border */}
                <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition-all duration-700 pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced Newsletter CTA */}
        <ScrollReveal delay={400}>
          <div className="text-center">
            <div className="glass-morphism rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden group">
              <EnhancedBackground variant="subtle" className="opacity-20" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center animate-cyber-float">
                    <Newspaper className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-orbitron font-bold mb-6 text-glow">
                  Stay in the Loop
                </h3>
                <p className="text-xl text-muted-foreground font-inter mb-10 leading-relaxed max-w-2xl mx-auto">
                  Get the latest updates on our competitions, achievements, and community impact 
                  delivered straight to your inbox.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <LiquidButton variant="premium" size="lg" glowIntensity="high" className="group">
                    <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                    Subscribe to Newsletter
                  </LiquidButton>
                  <LiquidButton variant="glass" size="lg" className="group">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    View All News
                  </LiquidButton>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
