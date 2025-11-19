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
        .limit(4); // Get 4 posts: 1 featured + 3 smaller

      if (error) throw error;
      setNewsItems(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
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
        <EnhancedBackground variant="particles" className="opacity-30" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  const featuredPost = newsItems[0];
  const sidebarPosts = newsItems.slice(1, 4);

  return (
    <section className="py-32 relative overflow-hidden">
      <EnhancedBackground variant="particles" className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8 border border-primary/20">
            <Newspaper className="w-6 h-6 text-primary" />
            <span className="font-orbitron text-sm tracking-wider text-primary">{t('news.badge')}</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              {t('news.title')}
            </span>{' '}
            <span className="text-holographic">{t('news.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        {newsItems.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">No news posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Post - Large Card */}
            {featuredPost && (
              <ScrollReveal className="lg:col-span-2">
                <Card 
                  className="group relative h-full bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-xl border-primary/30 hover:border-primary/60 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_60px_rgba(var(--primary-rgb),0.4)] cursor-pointer"
                  onClick={() => navigate(`/news/${featuredPost.id}`)}
                >
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Featured Image */}
                  {featuredPost.image_url && (
                    <div className="relative h-96 overflow-hidden">
                      <img
                        src={featuredPost.image_url}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      
                      {/* Featured Badge */}
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-primary/95 backdrop-blur-sm border-primary/50 text-primary-foreground font-orbitron px-4 py-2 text-sm shadow-lg">
                          <Newspaper className="w-4 h-4 mr-2 inline" />
                          Featured
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="relative p-8">
                    {/* Date & Author */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {format(new Date(featuredPost.published_at), 'MMMM d, yyyy')}
                      </div>
                      {featuredPost.author && (
                        <>
                          <span className="text-primary/50">•</span>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-accent" />
                            {featuredPost.author}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-orbitron font-black mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {featuredPost.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-lg text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt || truncateText(featuredPost.content, 200)}
                    </p>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      className="group/btn hover:bg-primary/10 border-2 border-primary/30 hover:border-primary/60 transition-all duration-300"
                    >
                      {t('news.readMore')}
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )}

            {/* Sidebar Posts - Smaller Cards */}
            <div className="flex flex-col gap-6">
              {sidebarPosts.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 100}>
                  <Card 
                    className="group relative bg-card/80 backdrop-blur-lg border-border/50 hover:border-primary/40 overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.2)] cursor-pointer h-full"
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <div className="flex gap-4 p-5">
                      {/* Thumbnail */}
                      {item.image_url && (
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3 text-primary" />
                          {format(new Date(item.published_at), 'MMM d, yyyy')}
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-orbitron font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h4>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.excerpt || truncateText(item.content, 80)}
                        </p>
                      </div>
                    </div>

                    {/* Hover Arrow Indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/news')}
            className="group relative overflow-hidden hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.6)] transition-all duration-500"
          >
            <span className="relative z-10 font-orbitron">{t('news.allNews')}</span>
            <ArrowRight className="ml-2 w-5 h-5 relative z-10 transition-transform group-hover:translate-x-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
