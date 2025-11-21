import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Newspaper, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const NewsSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();

    // Subscribe to real-time updates for news posts
    const channel = supabase
      .channel('news_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news_posts'
        },
        (payload) => {
          console.log('NewsSection: Real-time update received:', payload);
          fetchNews(); // Refetch when any change occurs
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNews = async () => {
    try {
      console.log("NewsSection: Fetching news posts...");
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("NewsSection: Error fetching news:", error);
        throw error;
      }
      
      console.log("NewsSection: Fetched posts:", data?.length || 0, data);
      setNewsItems(data || []);
    } catch (error: any) {
      console.error("NewsSection: Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <EnhancedBackground variant="particles" className="opacity-30" />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Beautiful Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <EnhancedBackground variant="particles" className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 transition-all duration-500 px-6 py-3 text-sm font-orbitron">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('news.badge')}
            </Badge>
            
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                {t('news.title')}
              </span>{' '}
              <span className="text-foreground">{t('news.subtitle')}</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-inter">
              {t('news.description')}
            </p>
          </div>
        </ScrollReveal>

        {newsItems.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20 glass-morphism rounded-3xl border border-border/50">
              <Newspaper className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-30" />
              <p className="text-muted-foreground text-lg font-inter">{t('news.noNews')}</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {newsItems.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 100}>
                <Card 
                  className="group relative h-full glass-morphism border-2 border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-primary/20 cursor-pointer flex flex-col"
                  onClick={() => navigate(`/news/${item.id}`)}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Featured Image */}
                  {item.image_url && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                      
                      {/* Featured Badge for first item */}
                      {index === 0 && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-primary to-primary-glow text-white font-orbitron px-4 py-2 shadow-lg shadow-primary/30 border-0">
                            <Newspaper className="w-3.5 h-3.5 mr-2 inline" />
                            {t('news.featured')}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <CardContent className="relative p-6 flex-1 flex flex-col">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-inter">{format(new Date(item.published_at), 'MMMM d, yyyy')}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-orbitron font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-2 flex-grow">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-base text-muted-foreground mb-6 line-clamp-3 leading-relaxed font-inter">
                      {item.excerpt || truncateText(item.content, 120)}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-primary font-orbitron font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto">
                      <span>{t('news.readMore')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* View All Button */}
        {newsItems.length > 0 && (
          <ScrollReveal>
            <div className="text-center">
              <Button 
                variant="default"
                size="lg"
                onClick={() => navigate('/news')}
                className="group relative font-orbitron font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-500 px-8"
              >
                <span>{t('news.allNews')}</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
