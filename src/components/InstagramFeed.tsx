import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: string;
}

export const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder data for now - will be replaced with real API calls
  const placeholderPosts: InstagramPost[] = [
    {
      id: '1',
      caption: 'Working hard in the workshop! Building our robot for the upcoming competition. #FRC #CyborgCats #Robotics',
      media_url: '/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/p/example1',
      timestamp: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      caption: 'Team meeting planning our strategy for regionals! #TeamWork #FRC4256',
      media_url: '/src/assets/team-photo.jpg',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/p/example2',
      timestamp: '2024-01-10T15:30:00Z'
    },
    {
      id: '3',
      caption: 'Our robot in action at the competition! So proud of our team. #Competition #Robotics',
      media_url: '/src/assets/competition-action.jpg',
      media_type: 'IMAGE',
      permalink: 'https://instagram.com/p/example3',
      timestamp: '2024-01-05T18:45:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPosts(placeholderPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Instagram className="w-5 h-5 text-primary" />
              <span className="font-orbitron text-sm text-primary font-medium">
                Follow Our Journey
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              <span className="text-glow">@cyborgcats4256</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Instagram className="w-5 h-5 text-primary" />
            <span className="font-orbitron text-sm text-primary font-medium">
              Follow Our Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            <span className="text-glow">@cyborgcats4256</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto mb-8">
            Stay connected with our latest updates, behind-the-scenes moments, and competition highlights.
          </p>
          <Button variant="hero" asChild>
            <a 
              href="https://instagram.com/cyborgcats4256" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow on Instagram
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-cyber transition-all duration-300 group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={post.media_url} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.timestamp)}
                  </span>
                  <a 
                    href={post.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-glow transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <a 
              href="https://instagram.com/cyborgcats4256" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View More on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};