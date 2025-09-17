import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, ExternalLink } from 'lucide-react';

export const InstagramFeed = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // You can replace these with actual Instagram post URLs from @cyborgcats4256
  const instagramPosts = [
    'https://www.instagram.com/p/PLACEHOLDER1/',
    'https://www.instagram.com/p/PLACEHOLDER2/',
    'https://www.instagram.com/p/PLACEHOLDER3/',
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/cc77039e-e81b-423a-a408-b9246289beeb.png" 
          alt="" 
          className="w-full h-full object-cover opacity-20 transition-opacity duration-1000 hover:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-primary/5" />
        <div className="absolute inset-0 circuit-pattern opacity-10" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Instagram Embed Widget */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Latest posts from @cyborgcats4256
            </p>
            
            {/* Simple Instagram embed iframe */}
            <div className="bg-card rounded-lg p-6 shadow-cyber">
              <iframe
                src="https://www.instagram.com/cyborgcats4256/embed/"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="yes"
                allowTransparency={true}
                className="rounded-lg"
                title="Instagram Feed for @cyborgcats4256"
              />
            </div>
          </div>
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