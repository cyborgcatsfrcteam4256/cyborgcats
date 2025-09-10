import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Users, Award, Lightbulb } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Maria Rodriguez",
      title: "STEM Education Director",
      organization: "Missouri Department of Education",
      quote: "The Cyborg Cats have set a new standard for community impact in FIRST Robotics. Their Women in STEM seminars and legislative advocacy work demonstrate what happens when young people are empowered to create change.",
      type: "Education Leader",
      icon: Lightbulb
    },
    {
      name: "Sarah Kim",
      title: "Software Engineer",
      organization: "Former Team Member, Class of 2023",
      quote: "Being part of the Cyborg Cats transformed my perspective on what I could achieve. The mentorship, technical challenges, and community focus prepared me not just for college, but for a career in tech where I can make a difference.",
      type: "Alumni Success",
      icon: Users
    },
    {
      name: "James Mitchell",
      title: "VP of Corporate Relations",
      organization: "Emerson Electric Co.",
      quote: "Partnering with Team 4256 has been incredibly rewarding. Their professionalism, innovation, and commitment to inclusive STEM education make them ideal ambassadors for the future of engineering.",
      type: "Industry Partner",
      icon: Award
    },
    {
      name: "Coach Amanda Chen",
      title: "Lead Mentor",
      organization: "Westminster Christian Academy",
      quote: "In my 10 years of coaching robotics, I've never seen a team so dedicated to both technical excellence and social impact. These students don't just build robots - they build better communities.",
      type: "Mentor Perspective",
      icon: Star
    }
  ];

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 particle-background opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="outline" className="mb-4 font-orbitron">
            Community Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-glow">
            What People Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
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
              2025 FIRST Impact Award Recipients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};