import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X, Camera, Award, Users, Wrench } from 'lucide-react';

export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const photos = [
    {
      id: 1,
      title: "2025 Impact Award Ceremony",
      category: "awards",
      description: "Team celebration after winning the FIRST Impact Award at Missouri State Championship",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Robot in Action",
      category: "competition",
      description: "Our 2025 robot performing at the Greater St. Louis Regional",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Women in STEM Seminar",
      category: "outreach",
      description: "Students participating in our monthly Women in STEM workshop",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 4,
      title: "Team Building Session",
      category: "team",
      description: "Engineering subteam collaborating on robot design",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Legislative Meeting",
      category: "outreach",
      description: "Team members presenting STEM advocacy to Missouri legislators",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 6,
      title: "Competition Alliance",
      category: "competition",
      description: "Strategic alliance meeting during regional competition",
      imageUrl: "/api/placeholder/400/300"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Photos', icon: Camera },
    { key: 'awards', label: 'Awards', icon: Award },
    { key: 'competition', label: 'Competition', icon: Wrench },
    { key: 'outreach', label: 'Outreach', icon: Users },
    { key: 'team', label: 'Team Life', icon: Users }
  ];

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredPhotos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 particle-background opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="outline" className="mb-4 font-orbitron">
            <Camera className="w-4 h-4 mr-2" />
            Team Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-glow">
            Behind the Scenes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Take a look at our journey - from intense competition moments to community 
            outreach and team bonding experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "hero" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.key)}
              className="transition-cyber"
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
          {filteredPhotos.map((photo, index) => (
            <Card 
              key={photo.id}
              className="group cursor-pointer overflow-hidden hover-glow transition-cyber interactive-card"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-electric/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-primary/40" />
                </div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Badge 
                    variant="secondary" 
                    className="mb-2 text-xs font-orbitron capitalize"
                  >
                    {photo.category}
                  </Badge>
                  <h3 className="font-orbitron font-semibold text-white mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-white/80 font-inter text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6 text-white" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </Button>

              {/* Image and Details */}
              <div className="bg-card rounded-xl overflow-hidden shadow-elevated">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-electric/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-24 h-24 text-primary/40" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="font-orbitron capitalize">
                      {filteredPhotos[selectedImage].category}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-inter">
                      {selectedImage + 1} of {filteredPhotos.length}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-orbitron font-bold mb-2">
                    {filteredPhotos[selectedImage].title}
                  </h3>
                  
                  <p className="text-muted-foreground font-inter">
                    {filteredPhotos[selectedImage].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
            <Camera className="w-12 h-12 text-primary mx-auto mb-4 glow-primary" />
            <h3 className="text-2xl font-orbitron font-bold mb-4 text-glow">
              Follow Our Journey
            </h3>
            <p className="text-muted-foreground font-inter mb-6">
              Want to see more? Follow us on social media for daily updates, 
              behind-the-scenes content, and live competition coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Follow on Instagram
              </Button>
              <Button variant="silver" size="lg">
                Join Our Newsletter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};