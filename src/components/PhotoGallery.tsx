import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X, Camera, Award, Users, Wrench, Star, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { LiquidButton } from '@/components/LiquidButton';
import { useTranslation } from 'react-i18next';

interface Photo {
  id: string;
  photo_url: string;
  caption: string | null;
  category: string | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export const PhotoGallery = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>(['all']);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('user_photos')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPhotos(data || []);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(data?.map(p => p.category).filter(Boolean) as string[])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredPhotos.findIndex(p => p.id === selectedImage);
      const nextIndex = (currentIndex + 1) % filteredPhotos.length;
      setSelectedImage(filteredPhotos[nextIndex].id);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredPhotos.findIndex(p => p.id === selectedImage);
      const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setSelectedImage(filteredPhotos[prevIndex].id);
    }
  };

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  const categoryIcons: Record<string, typeof Camera> = {
    all: Camera,
    team: Users,
    competition: Award,
    outreach: Wrench,
    awards: Star,
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <EnhancedBackground variant="particles" className="opacity-25" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8">
              <Camera className="w-6 h-6 text-primary" />
              <span className="font-orbitron text-base text-primary font-bold">Photo Gallery</span>
              <Sparkles className="w-5 h-5 text-primary-glow animate-pulse" />
            </div>
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
              <span className="text-white">Behind the Scenes</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
              Experience our journey through <span className="text-primary font-semibold">competition moments</span>, 
              <span className="text-primary-glow font-semibold"> team bonding</span>, and 
              <span className="text-primary-electric font-semibold"> achievement celebrations</span>.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Camera;
              return (
                <LiquidButton
                  key={category}
                  variant={activeCategory === category ? "premium" : "glass"}
                  size="lg"
                  onClick={() => setActiveCategory(category)}
                  className="group font-orbitron font-semibold"
                  glowIntensity={activeCategory === category ? "high" : "low"}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </LiquidButton>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <ScrollReveal key={photo.id} delay={index * 50}>
              <div 
                className="morphic-card group cursor-pointer overflow-hidden relative hover:scale-105 transition-all duration-700"
                onClick={() => setSelectedImage(photo.id)}
              >
                {photo.is_featured && (
                  <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-electric/20 relative overflow-hidden">
                  <img 
                    src={photo.photo_url} 
                    alt={photo.caption || 'Gallery photo'}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/80 rounded-full animate-glow-pulse" />
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary-glow/90 rounded-full animate-cyber-float" />
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary-electric/60 rounded-full animate-glow-pulse" style={{animationDelay: '0.5s'}} />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {photo.category && (
                        <Badge 
                          className="mb-3 glass-morphism font-orbitron font-bold capitalize text-white bg-black/50 border-white/30 backdrop-blur-md shadow-lg"
                        >
                          {photo.category}
                        </Badge>
                      )}
                      {photo.caption && (
                        <p className="text-white font-inter text-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 drop-shadow-md">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (() => {
          const photo = filteredPhotos.find(p => p.id === selectedImage);
          if (!photo) return null;
          
          return (
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
                      src={photo.photo_url} 
                      alt={photo.caption || 'Gallery photo'}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      {photo.category && (
                        <Badge className="glass-morphism font-orbitron font-bold capitalize text-lg px-4 py-2 text-primary border-primary/30">
                          {photo.category}
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground font-inter glass-morphism px-3 py-1 rounded-lg">
                        {filteredPhotos.findIndex(p => p.id === selectedImage) + 1} of {filteredPhotos.length}
                      </span>
                    </div>
                    
                    {photo.caption && (
                      <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};