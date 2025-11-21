import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { ScrollReveal } from '@/components/ScrollReveal';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowRight, Newspaper, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewsPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  author: string | null;
  published_at: string;
}

const News = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log("News page: Fetching news posts...");
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error("News page: Error fetching posts:", error);
        throw error;
      }
      
      console.log("News page: Fetched posts:", data?.length || 0, data);
      setPosts(data || []);
    } catch (error: any) {
      console.error('News page: Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="News & Updates | Cyborg Cats"
        description="Stay updated with the latest news, achievements, and stories from the Cyborg Cats robotics team."
      />
      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          
          <div className="container mx-auto px-6 relative">
            <Breadcrumbs />
            
            <ScrollReveal>
              <div className="text-center mt-8 mb-16">
                <Badge variant="outline" className="mb-4 font-orbitron">
                  <Newspaper className="w-4 h-4 mr-2" />
                  Latest Updates
                </Badge>
                <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                  News & <span className="text-holographic">Updates</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Follow our journey as we innovate, compete, and make an impact in STEM education
                </p>
              </div>
            </ScrollReveal>

            {/* News Grid */}
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No news posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {posts.map((post, index) => (
                  <ScrollReveal key={post.id} delay={index * 100}>
                    <Card className="group h-full flex flex-col bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber cursor-pointer overflow-hidden">
                      {post.image_url && (
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                      )}
                      
                      <CardContent className="flex-1 flex flex-col p-6">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(new Date(post.published_at), 'MMM d, yyyy')}
                          </div>
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.author}
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl font-orbitron font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
                          {post.excerpt || truncateContent(post.content)}
                        </p>

                        <Button
                          variant="ghost"
                          className="w-full group/btn"
                          onClick={() => navigate(`/news/${post.id}`)}
                        >
                          Read Full Story
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
