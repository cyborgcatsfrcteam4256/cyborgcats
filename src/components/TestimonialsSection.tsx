import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, Star, Users, Award, Lightbulb, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Thompson",
      title: "Parent & Community Volunteer",
      organization: "Westminster Christian Academy",
      quote: "The Cyborg Cats team has transformed how our children view STEM education. My daughter joined with no engineering background and now leads the programming subteam. The mentorship and hands-on learning environment they provide is extraordinary.",
      type: "Community Impact",
      icon: Lightbulb,
      image: "/lovable-uploads/40d68d3b-ba42-4e64-a83f-cb602561d4db.png"
    },
    {
      name: "Emma Rodriguez",
      title: "Team Captain & Lead Engineer",
      organization: "Westminster Christian Academy",
      quote: "Being part of the Cyborg Cats has taught me that engineering isn't just about building robots—it's about building solutions for real problems in our community. Our legislative advocacy and international outreach programs have shown me how STEM can create positive change worldwide.",
      type: "Student Leadership",
      icon: Users,
      image: "/lovable-uploads/2bef5729-53ec-4330-baa1-ac4ba5367ce2.png"
    },
    {
      name: "Dr. Michael Chen",
      title: "STEM Education Specialist",
      organization: "Missouri Department of Education",
      quote: "The Cyborg Cats' approach to combining technical excellence with community impact is a model for robotics programs statewide. Their work with legislators and international partnerships demonstrates the global potential of Missouri students.",
      type: "Educational Impact",
      icon: Award,
      image: "/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-card/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 particle-background opacity-40" />
      <div className="absolute inset-0 data-stream opacity-25" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center space-x-3 gradient-premium rounded-full px-8 py-4 mb-8 backdrop-blur-lg border border-primary/20">
            <MessageCircle className="w-6 h-6 text-primary animate-pulse" />
            <span className="font-orbitron text-base text-primary font-bold">Community Voices</span>
            <Sparkles className="w-5 h-5 text-primary-glow animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 leading-tight">
            <span className="text-shimmer">What People Are Saying</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            Hear from <span className="text-primary font-semibold">educators</span>, <span className="text-primary-glow font-semibold">industry leaders</span>, 
            and <span className="text-primary-electric font-semibold">team members</span> about the transformative impact 
            of the Cyborg Cats program.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {testimonials.map((testimonial, index) => (
            <PremiumCard 
              key={index} 
              variant="glass"
              className="group/testimonial p-10 hover:scale-105 transition-all duration-700"
              interactive
              glowEffect
            >
              {/* Background image with overlay */}
              {testimonial.image && (
                <div className="absolute inset-0 opacity-5 rounded-xl overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt="" 
                    className="w-full h-full object-cover group-hover/testimonial:scale-110 transition-transform duration-700"
                  />
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center glow-subtle group-hover/testimonial:glow-electric transition-all duration-500">
                    <testimonial.icon className="w-6 h-6 text-primary group-hover/testimonial:scale-110 transition-transform duration-500" />
                  </div>
                  <Badge variant="outline" className="font-orbitron text-xs px-3 py-1">
                    {testimonial.type}
                  </Badge>
                </div>
                
                <Quote className="w-10 h-10 text-primary mb-6 glow-subtle group-hover/testimonial:rotate-12 transition-transform duration-500" />
                
                <blockquote className="text-xl font-inter text-muted-foreground mb-8 leading-relaxed group-hover/testimonial:text-foreground transition-colors duration-500">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-primary/20 pt-8">
                  <div className="space-y-2">
                    <div className="font-orbitron font-bold text-xl text-glow">
                      {testimonial.name}
                    </div>
                    <div className="text-base text-primary font-inter font-medium">
                      {testimonial.title}
                    </div>
                    <div className="text-sm text-muted-foreground font-inter">
                      {testimonial.organization}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-20 group-hover/testimonial:opacity-60 transition-opacity duration-500">
                <Star className="w-5 h-5 text-primary-glow animate-pulse" />
              </div>
            </PremiumCard>
          ))}
        </div>

        <div className="text-center">
          <div className="gradient-premium border border-primary/20 rounded-2xl p-10 backdrop-blur-xl max-w-3xl mx-auto hover:shadow-luxury transition-all duration-700">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Star className="w-8 h-8 text-primary fill-primary animate-glow-pulse" />
              <Heart className="w-6 h-6 text-red-400 animate-pulse" />
              <Star className="w-8 h-8 text-primary-glow fill-primary-glow animate-glow-pulse" />
            </div>
            <h3 className="text-3xl font-orbitron font-bold mb-4 text-glow">
              Join Our Growing Community
            </h3>
            <p className="text-muted-foreground font-inter mb-8 text-lg leading-relaxed">
              Ready to be part of something bigger? Connect with us and see how you can contribute 
              to our mission of building robots and building futures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" className="group">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                Connect With Us
              </Button>
              <Button variant="glass" size="lg" className="group">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};