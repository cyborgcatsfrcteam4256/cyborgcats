import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Instagram, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LiquidButton } from './LiquidButton';

export const MediaGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos = [
    {
      id: 1,
      title: "World Championship Venue",
      category: "competition",
      imageUrl: "/lovable-uploads/d26af35d-de5b-4479-94bb-919c4897cca9.png"
    },
    {
      id: 2,
      title: "Team Celebration",
      category: "team",
      imageUrl: "/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png"
    },
    {
      id: 3,
      title: "Drive Team",
      category: "team",
      imageUrl: "/lovable-uploads/0ed115c9-c65c-485d-a648-96ef646179b3.png"
    },
    {
      id: 4,
      title: "Community Robot Demo",
      category: "outreach",
      imageUrl: "/lovable-uploads/robot-demo-1.jpg"
    },
    {
      id: 5,
      title: "Community Engagement",
      category: "outreach",
      imageUrl: "/lovable-uploads/community-event-1.jpg"
    },
    {
      id: 6,
      title: "Impact Award Winners",
      category: "awards",
      imageUrl: "/lovable-uploads/impact-award-winning-photo.jpg"
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-5 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-6 text-glow">
              <span className="text-holographic">Media</span> Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Photos from competitions and follow us on Instagram
            </p>
          </div>
        </ScrollReveal>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 gap-2 p-1">
            <TabsTrigger value="photos" className="text-base font-orbitron">Photo Gallery</TabsTrigger>
            <TabsTrigger value="instagram" className="text-base font-orbitron">Instagram</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <ScrollReveal key={photo.id} delay={index * 50}>
                  <div 
                    className="morphic-card group cursor-pointer overflow-hidden relative hover:scale-105 transition-all duration-500"
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-electric/20 relative overflow-hidden">
                      <img 
                        src={photo.imageUrl} 
                        alt={photo.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <Badge className="mb-2 glass-morphism font-orbitron capitalize text-white bg-black/50 border-white/30">
                          {photo.category}
                        </Badge>
                        <h3 className="font-orbitron font-bold text-white text-lg">
                          {photo.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="instagram" className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Instagram className="w-5 h-5 text-primary" />
                <span className="font-orbitron text-sm text-primary font-medium">
                  Follow Our Journey
                </span>
              </div>
              <h3 className="text-3xl font-orbitron font-bold mb-4 text-glow">
                @cyborgcats4256
              </h3>
              <p className="text-muted-foreground mb-6">
                Stay connected with our latest updates, behind-the-scenes moments, and competition highlights.
              </p>
              <Button variant="hero" asChild className="mb-8">
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

              <div className="bg-card rounded-lg p-6 shadow-cyber">
                <iframe
                  src="https://www.instagram.com/cyborgcats4256/embed/"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  scrolling="yes"
                  className="rounded-lg"
                  title="Instagram Feed for @cyborgcats4256"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full animate-scale-in">
              <LiquidButton
                variant="glass"
                size="icon"
                className="absolute top-4 right-4 z-10 w-12 h-12"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </LiquidButton>

              <LiquidButton
                variant="glass"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </LiquidButton>
              
              <LiquidButton
                variant="glass"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </LiquidButton>

              <div className="glass-morphism rounded-3xl overflow-hidden shadow-glow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-electric/20 relative overflow-hidden">
                  <img 
                    src={photos[selectedImage].imageUrl} 
                    alt={photos[selectedImage].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="glass-morphism font-orbitron font-bold capitalize text-lg px-4 py-2">
                      {photos[selectedImage].category}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-inter glass-morphism px-3 py-1 rounded-lg">
                      {selectedImage + 1} of {photos.length}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-orbitron font-bold text-glow">
                    {photos[selectedImage].title}
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
