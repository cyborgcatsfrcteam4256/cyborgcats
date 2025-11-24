import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Calendar, User, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

interface NewsPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  author: string | null;
  published_at: string;
}

const NewsPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      console.log("NewsPost: Fetching post with id:", id);
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error("NewsPost: Error fetching post:", error);
        throw error;
      }
      
      console.log("NewsPost: Fetched post:", data);
      setPost(data);
    } catch (error: any) {
      console.error('NewsPost: Error fetching post:', error);
      toast.error('Post not found or unavailable');
      navigate('/news');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt || post?.content.substring(0, 200),
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${post.title} | Cyborg Cats News`}
        description={post.excerpt || post.content.substring(0, 160)}
      />
      <Navigation />

      <main id="main-content">
        <article className="pt-24">
          {/* Hero Image */}
          {post.image_url && (
            <div className="relative h-[60vh] w-full overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="container mx-auto px-6 -mt-32 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs />

              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => navigate('/news')}
                className="mb-6 mt-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>

              {/* Article Header */}
              <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-8 md:p-12 mb-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <Badge variant="outline" className="font-orbitron">
                    Latest News
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                  </div>
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="ml-auto"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <h1 className="text-4xl md:text-5xl font-orbitron font-black mb-6 text-glow leading-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div 
                  className="prose prose-invert prose-lg max-w-none prose-headings:font-orbitron prose-headings:text-glow prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80 prose-blockquote:border-l-primary prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(post.content, {
                      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'a'],
                      ALLOWED_ATTR: ['href', 'target', 'rel']
                    })
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => navigate('/news')} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View All News
                </Button>
                <Button onClick={handleShare} variant="hero">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share This Story
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPost;
