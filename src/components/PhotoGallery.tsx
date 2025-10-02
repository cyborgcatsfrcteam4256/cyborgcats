import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X, Camera, Award, Users, Wrench, Star, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { LiquidButton } from '@/components/LiquidButton';

export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const photos = [
    {
      id: 1,
      title: "World Championship Venue",
      category: "competition",
      description: "The massive FIRST World Championship venue filled with thousands of spectators and teams",
      imageUrl: "/lovable-uploads/d26af35d-de5b-4479-94bb-919c4897cca9.png"
    },
    {
      id: 2,
      title: "Team Celebration",
      category: "team",
      description: "Cyborg Cats team members celebrating and high-fiving during competition",
      imageUrl: "/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png"
    },
    {
      id: 3,
      title: "Robot Demonstration",
      category: "competition",
      description: "Team 4256 explaining their robot design and strategy to judges and visitors",
      imageUrl: "/lovable-uploads/cc77039e-e81b-423a-a408-b9246289beeb.png"
    },
    {
      id: 4,
      title: "Pit Area Collaboration",
      category: "team",
      description: "Team members working together in the pit area during competition",
      imageUrl: "/lovable-uploads/2bef5729-53ec-4330-baa1-ac4ba5367ce2.png"
    },
    {
      id: 5,
      title: "Victory Celebration",
      category: "awards",
      description: "Cyborg Cats team members waving to the crowd after a successful match",
      imageUrl: "/lovable-uploads/40d68d3b-ba42-4e64-a83f-cb602561d4db.png"
    },
    {
      id: 6,
      title: "Robot Interview",
      category: "competition",
      description: "Team members being interviewed about their robot and competition strategy",
      imageUrl: "/lovable-uploads/e3cf82cd-0326-4b2e-94d5-3d34ef99d632.png"
    },
    {
      id: 7,
      title: "Match Action",
      category: "competition",
      description: "Our robot 4256 in action during an intense competition match",
      imageUrl: "/lovable-uploads/dbbb0403-e985-4641-9473-fd3bcb5cc74b.png"
    },
    {
      id: 8,
      title: "Drive Team",
      category: "team",
      description: "Our skilled drive team operating the robot controls during competition",
      imageUrl: "/lovable-uploads/0ed115c9-c65c-485d-a648-96ef646179b3.png"
    },
    {
      id: 9,
      title: "Team Workspace",
      category: "team",
      description: "Behind the scenes in our pit area with sponsors and team organization",
      imageUrl: "/lovable-uploads/82ee81cc-26a5-4be3-b3af-d056fdb28767.png"
    },
    {
      id: 10,
      title: "Community Robot Demo",
      category: "outreach",
      description: "Our robot performing at a community outreach event with team members and attendees",
      imageUrl: "/lovable-uploads/robot-demo-1.jpg"
    },
    {
      id: 11,
      title: "Robot in Community Action",
      category: "outreach",
      description: "Team 4256 robot demonstrating capabilities at a local community event",
      imageUrl: "/lovable-uploads/robot-demo-2.jpg"
    },
    {
      id: 12,
      title: "Community Engagement",
      category: "outreach",
      description: "Families and community members watching our robot demonstration",
      imageUrl: "/lovable-uploads/community-event-1.jpg"
    },
    {
      id: 13,
      title: "Youth Outreach Event",
      category: "outreach",
      description: "Young students excited to see our robot in action at a community event",
      imageUrl: "/lovable-uploads/community-event-2.jpg"
    },
    {
      id: 14,
      title: "Robot Performance",
      category: "competition",
      description: "Our robot showcasing its abilities with spectators watching",
      imageUrl: "/lovable-uploads/robot-action-1.jpg"
    },
    {
      id: 15,
      title: "Competition Action",
      category: "competition",
      description: "Team 4256 robot in action during a competitive demonstration",
      imageUrl: "/lovable-uploads/robot-action-2.jpg"
    },
    {
      id: 16,
      title: "Team Operations",
      category: "team",
      description: "Team members working together to operate the robot controls",
      imageUrl: "/lovable-uploads/team-operating.jpg"
    },
    {
      id: 17,
      title: "Sponsor Recognition",
      category: "competition",
      description: "Our robot displaying sponsor banners during demonstration",
      imageUrl: "/lovable-uploads/robot-sponsors.jpg"
    },
    {
      id: 18,
      title: "Mentor Collaboration",
      category: "team",
      description: "Team mentors and community members sharing knowledge and ideas",
      imageUrl: "/lovable-uploads/mentor-meeting.jpg"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Photos', icon: Camera },
    { key: 'team', label: 'Team Life', icon: Users },
    { key: 'competition', label: 'Competition', icon: Award },
    { key: 'outreach', label: 'Outreach', icon: Wrench },
    { key: 'awards', label: 'Awards', icon: Star }
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

        {/* Enhanced Category Filter */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <LiquidButton
                key={category.key}
                variant={activeCategory === category.key ? "premium" : "glass"}
                size="lg"
                onClick={() => setActiveCategory(category.key)}
                className="group font-orbitron font-semibold"
                glowIntensity={activeCategory === category.key ? "high" : "low"}
              >
                <category.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                {category.label}
              </LiquidButton>
            ))}
          </div>
        </ScrollReveal>

        {/* Enhanced Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <ScrollReveal key={photo.id} delay={index * 50}>
              <div 
                className="morphic-card group cursor-pointer overflow-hidden relative hover:scale-105 transition-all duration-700"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-electric/20 relative overflow-hidden">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/80 rounded-full animate-glow-pulse" />
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary-glow/90 rounded-full animate-cyber-float" />
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary-electric/60 rounded-full animate-glow-pulse" style={{animationDelay: '0.5s'}} />
                  </div>
                  
                  {/* Enhanced content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Badge 
                        className={`mb-3 glass-morphism font-orbitron font-bold capitalize text-white bg-black/50 border-white/30 backdrop-blur-md shadow-lg`}
                      >
                        {photo.category}
                      </Badge>
                      <h3 className="font-orbitron font-bold text-white mb-2 text-xl drop-shadow-lg text-shadow-lg">
                        {photo.title}
                      </h3>
                      <p className="text-white font-inter text-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 drop-shadow-md">
                        {photo.description}
                      </p>
                    </div>
                  </div>

                  {/* Corner glow effect */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full animate-scale-in">
              {/* Enhanced Close Button */}
              <LiquidButton
                variant="glass"
                size="icon"
                className="absolute top-4 right-4 z-10 w-12 h-12"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </LiquidButton>

              {/* Enhanced Navigation Buttons */}
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

              {/* Enhanced Image and Details */}
              <div className="glass-morphism rounded-3xl overflow-hidden shadow-glow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-electric/20 relative overflow-hidden">
                  <img 
                    src={filteredPhotos[selectedImage].imageUrl} 
                    alt={filteredPhotos[selectedImage].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Badge 
                      className={`glass-morphism font-orbitron font-bold capitalize text-lg px-4 py-2 ${
                        filteredPhotos[selectedImage].category === 'competition' ? 'text-primary border-primary/30' :
                        filteredPhotos[selectedImage].category === 'awards' ? 'text-yellow-400 border-yellow-400/30' :
                        'text-green-400 border-green-400/30'
                      }`}
                    >
                      {filteredPhotos[selectedImage].category}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-inter glass-morphism px-3 py-1 rounded-lg">
                      {selectedImage + 1} of {filteredPhotos.length}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-orbitron font-bold mb-4 text-glow">
                    {filteredPhotos[selectedImage].title}
                  </h3>
                  
                  <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                    {filteredPhotos[selectedImage].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};