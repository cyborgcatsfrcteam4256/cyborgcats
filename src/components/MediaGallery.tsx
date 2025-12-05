import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Instagram, X, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Zap, Loader2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LiquidButton } from './LiquidButton';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

interface Photo {
  id: string;
  photo_url: string;
  caption: string | null;
  category: string | null;
}

export const MediaGallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback photos if no database photos exist
  const fallbackPhotos = [
    {
      id: '1',
      photo_url: "/lovable-uploads/d26af35d-de5b-4479-94bb-919c4897cca9.png",
      caption: "World Championship Venue",
      category: "competition"
    },
    {
      id: '2',
      photo_url: "/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png",
      caption: "Team Celebration",
      category: "team"
    },
    {
      id: '3',
      photo_url: "/lovable-uploads/0ed115c9-c65c-485d-a648-96ef646179b3.png",
      caption: "Drive Team",
      category: "team"
    },
    {
      id: '4',
      photo_url: "/lovable-uploads/robot-demo-1.jpg",
      caption: "Community Robot Demo",
      category: "outreach"
    },
    {
      id: '5',
      photo_url: "/lovable-uploads/community-event-1.jpg",
      caption: "Community Engagement",
      category: "outreach"
    },
    {
      id: '6',
      photo_url: "/lovable-uploads/impact-award-winning-photo.jpg",
      caption: "Impact Award Winners",
      category: "awards"
    }
  ];

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('user_photos')
        .select('*')
        .eq('is_approved', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // If we have approved photos, use them; otherwise use fallbacks
      if (data && data.length > 0) {
        setPhotos(data.map(p => ({
          id: p.id,
          photo_url: p.photo_url,
          caption: p.caption,
          category: p.category
        })));
      } else {
        setPhotos(fallbackPhotos);
      }
    } catch (error) {
      console.error('Error loading photos:', error);
      setPhotos(fallbackPhotos);
    } finally {
      setLoading(false);
    }
  };

  const displayPhotos = photos.length > 0 ? photos : fallbackPhotos;

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % displayPhotos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? displayPhotos.length - 1 : selectedImage - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dramatic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] hover:scale-110"
        style={{
          backgroundImage: 'url(/lovable-uploads/robot-action-2.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-cyber-float" />
      
      {/* Stunning Grid Design */}
      <div className="absolute inset-0 z-[1]">
        {/* Primary grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(var(--primary-rgb),0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(var(--primary-rgb),0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Secondary diagonal grid */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(var(--primary-glow-rgb),0.05)_40px,rgba(var(--primary-glow-rgb),0.05)_41px)] opacity-60" />
        
        {/* Animated gradient accents on grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.15)_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(var(--primary-electric-rgb),0.12)_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* Circuit pattern overlay for texture */}
        <div className="absolute inset-0 circuit-pattern opacity-5" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 border border-primary/30 hover:border-primary/50 transition-all duration-500 group hover:scale-105 shadow-luxury">
                <Camera className="w-6 h-6 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                <span className="font-orbitron text-base text-primary font-bold tracking-wide">CAPTURED MOMENTS</span>
                <Sparkles className="w-6 h-6 text-primary-glow animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
              <span className="text-holographic">Media</span> Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our journey through stunning photography and stay connected on Instagram
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="inline-flex h-14 glass-morphism border-2 border-primary/30 shadow-lg">
                <TabsTrigger value="photos" className="text-base font-orbitron px-8">
                  <Camera className="w-5 h-5 mr-2" />
                  Photo Gallery
                </TabsTrigger>
                <TabsTrigger value="instagram" className="text-base font-orbitron px-8">
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </TabsTrigger>
              </TabsList>
            </div>

          <TabsContent value="photos" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPhotos.map((photo, index) => (
                <ScrollReveal key={photo.id} delay={index * 50}>
                  <div 
                    className="group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-2"
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-3xl shadow-luxury group-hover:shadow-cyber">
                      <img 
                        src={photo.photo_url} 
                        alt={photo.caption || 'Gallery photo'}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          {photo.category && (
                            <Badge className="mb-3 glass-morphism font-orbitron capitalize text-white bg-primary/30 border-primary/50 backdrop-blur-xl group-hover:bg-primary/50 transition-all duration-500">
                              <Zap className="w-3 h-3 mr-1" />
                              {photo.category}
                            </Badge>
                          )}
                          <h3 className="font-orbitron font-bold text-white text-xl mb-2 group-hover:text-glow transition-all duration-500">
                            {photo.caption || 'Team Photo'}
                          </h3>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <p className="text-sm text-white/80 flex items-center gap-2">
                              Click to view <ChevronRight className="w-4 h-4" />
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="instagram" className="space-y-8">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <div className="glass-morphism rounded-3xl p-12 border border-primary/20 shadow-luxury">
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-full px-6 py-3 mb-8">
                    <Instagram className="w-6 h-6 text-primary" />
                    <span className="font-orbitron text-base text-primary font-bold">
                      FOLLOW OUR JOURNEY
                    </span>
                    <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-glow">
                    @cyborgcats4256
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Stay connected with our latest updates, behind-the-scenes moments, and competition highlights. 
                    Join our growing community!
                  </p>
                  
                  <Button variant="hero" size="lg" asChild className="mb-10 group">
                    <a 
                      href="https://instagram.com/cyborgcats4256" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Follow on Instagram
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </Button>

                  <div className="rounded-2xl overflow-hidden shadow-cyber border border-primary/20">
                    <iframe
                      src="https://www.instagram.com/cyborgcats4256/embed/"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      scrolling="yes"
                      className="bg-background/50"
                      title="Instagram Feed for @cyborgcats4256"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </TabsContent>
        </Tabs>
        </ScrollReveal>

        {/* Enhanced Lightbox Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close button - Fixed positioning for visibility */}
              <LiquidButton
                variant="glass"
                size="icon"
                className="fixed top-6 right-6 z-[60] w-16 h-16 hover:rotate-90 transition-transform duration-500 shadow-luxury border-2 border-primary/40"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </LiquidButton>

              {/* Navigation buttons */}
              <LiquidButton
                variant="glass"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 hover:scale-110 transition-all duration-300"
                onClick={prevImage}
              >
                <ChevronLeft className="w-7 h-7" />
              </LiquidButton>
              
              <LiquidButton
                variant="glass"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 hover:scale-110 transition-all duration-300"
                onClick={nextImage}
              >
                <ChevronRight className="w-7 h-7" />
              </LiquidButton>

              {/* Image container */}
              <div className="glass-morphism rounded-3xl overflow-hidden shadow-glow border border-primary/30 animate-scale-in">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img 
                    src={displayPhotos[selectedImage].photo_url} 
                    alt={displayPhotos[selectedImage].caption || 'Gallery photo'}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
                
                {/* Info section */}
                <div className="p-8 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                    {displayPhotos[selectedImage].category && (
                      <Badge className="glass-morphism font-orbitron font-bold capitalize text-lg px-5 py-2 border-primary/30">
                        <Zap className="w-4 h-4 mr-2" />
                        {displayPhotos[selectedImage].category}
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground font-inter glass-morphism px-4 py-2 rounded-lg border border-primary/20">
                      {selectedImage + 1} of {displayPhotos.length}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-glow">
                    {displayPhotos[selectedImage].caption || 'Team Photo'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};