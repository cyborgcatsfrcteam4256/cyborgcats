import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Users, Award, Lightbulb } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Community Member",
      title: "Parent",
      organization: "Westminster Christian Academy",
      quote: "The Cyborg Cats team has made a positive impact on our school and community. Their dedication to STEM education and outreach programs benefits students and families throughout the area.",
      type: "Community",
      icon: Lightbulb
    },
    {
      name: "Team Member",
      title: "Student",
      organization: "Westminster Christian Academy",
      quote: "Being part of the Cyborg Cats has taught me valuable skills in engineering, teamwork, and community service. The mentorship and hands-on experience prepare us for future STEM careers.",
      type: "Student Voice",
      icon: Users
    }
  ];

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 particle-background opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-3 bg-gradient-premium rounded-full px-6 py-3 mb-6 backdrop-blur-lg border border-primary/20">
            <Quote className="w-5 h-5 text-primary" />
            <span className="font-orbitron text-sm text-primary font-medium">Community Voices</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            <span className="text-shimmer">What People Are Saying</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
            Hear from educators, industry leaders, and alumni about the impact 
            of the Cyborg Cats program.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber interactive-card relative"
            >
              <div className="absolute top-4 right-4">
                <testimonial.icon className="w-6 h-6 text-primary/40" />
              </div>
              
              <Quote className="w-8 h-8 text-primary mb-4 glow-subtle" />
              
              <blockquote className="text-lg font-inter text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-orbitron font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground font-inter">
                      {testimonial.title}
                    </div>
                    <div className="text-sm text-primary font-inter font-medium">
                      {testimonial.organization}
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-orbitron text-xs">
                    {testimonial.type}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 glow-subtle">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="font-orbitron text-sm text-primary font-medium">
              FRC Team 4256 - Cyborg Cats
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};