import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Newspaper } from 'lucide-react';
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
      setNewsItems(data || []);
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8">
            <Newspaper className="w-6 h-6 text-primary" />
            <span className="font-orbitron text-sm tracking-wider">{t('news.title')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-orbitron font-black mb-6 text-glow">
            {t('news.subtitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 100}>
              <Card className="group h-full flex flex-col bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber overflow-hidden">
                {item.image_url && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                )}
                
                <CardContent className="flex-1 flex flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(item.published_at), 'MMM d, yyyy')}
                    </div>
                    {item.author && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.author}
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-orbitron font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
                    {item.excerpt || item.content.substring(0, 150)}
                  </p>

                  <Button
                    variant="ghost"
                    className="w-full group/btn hover:bg-primary/10"
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    {t('news.readMore')}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/news')}
          >
            {t('news.viewAll')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
