import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, Award, Users, Heart, Sparkles, Trophy } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PremiumCard } from '@/components/PremiumCard';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { LiquidButton } from '@/components/LiquidButton';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The Cyborg Cats have revolutionized STEM education in our community. Watching my daughter grow from a hesitant freshman to a confident programming leader has been incredible. The team's emphasis on real-world problem solving and community impact has shaped her future career aspirations.",
      author: "Sarah Thompson",
      role: "Parent & Community Volunteer",
      icon: Heart,
    },
    {
      quote: "Our collaboration with the Cyborg Cats on legislative advocacy has been remarkable. Their professional approach and deep understanding of STEM education policy has made them invaluable partners in advancing Missouri's educational initiatives. They represent the best of student leadership.",
      author: "Dr. Michael Chen", 
      role: "STEM Education Specialist",
      icon: Award,
    },
    {
      quote: "Being part of Team 4256 has taught me that robotics isn't just about building machines—it's about building solutions to global challenges. From our work in South Korea to Ethiopia, I've learned how STEM can create positive change across continents.",
      author: "Emma Rodriguez",
      role: "Team Captain & Lead Engineer", 
      icon: Users,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <EnhancedBackground variant="dynamic" className="opacity-40" />
      
      {/* Enhanced floating elements with photos */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-glow-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-primary-glow/20 rounded-full animate-cyber-float" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary-electric/40 rounded-full animate-glow-pulse" style={{animationDelay: '1s'}} />
      
      {/* Testimonial-themed accent photos */}
      <div className="absolute top-32 right-12 w-48 h-32 opacity-8 hover:opacity-15 transition-opacity duration-1000">
        <img 
          src="/lovable-uploads/0ed115c9-c65c-485d-a648-96ef646179b3.png" 
          alt="" 
          className="w-full h-full object-cover rounded-2xl blur-sm animate-cyber-float"
        />
      </div>
      
      <div className="absolute bottom-40 left-16 w-40 h-28 opacity-6 hover:opacity-12 transition-opacity duration-1000">
        <img 
          src="/lovable-uploads/cc77039e-e81b-423a-a408-b9246289beeb.png" 
          alt="" 
          className="w-full h-full object-cover rounded-xl blur-sm animate-glow-pulse"
          style={{animationDelay: '2.5s'}}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8">
            <Quote className="w-6 h-6 text-primary" />
            <span className="font-orbitron text-base text-primary font-bold">Community Voices</span>
            <Sparkles className="w-5 h-5 text-primary-glow animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
            <span className="text-holographic">Inspiring Stories</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            Hear from the <span className="text-primary font-semibold">students</span>, 
            <span className="text-primary-glow font-semibold"> mentors</span>, and 
            <span className="text-primary-electric font-semibold"> community members</span> who make our mission possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="morphic-card p-10 h-full group/testimonial relative">
                {/* Enhanced background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover/testimonial:opacity-100 transition-opacity duration-700" />
                
                {/* Floating quote marks */}
                <div className="absolute top-4 right-4 text-primary/20 text-6xl font-serif leading-none select-none">"</div>
                <div className="absolute bottom-4 left-4 text-primary/20 text-6xl font-serif leading-none rotate-180 select-none">"</div>

                {/* Quote Icon with enhanced effects */}
                <div className="mb-8 relative z-10">
                  <div className="w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center group-hover/testimonial:scale-110 transition-all duration-500 relative">
                    <Quote className="w-8 h-8 text-primary group-hover/testimonial:rotate-12 transition-transform duration-500" />
                    
                    {/* Floating particles */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/40 rounded-full animate-glow-pulse" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-glow/60 rounded-full animate-cyber-float" />
                  </div>
                </div>

                {/* Testimonial Content with better typography */}
                <blockquote className="text-xl font-inter leading-relaxed text-foreground mb-10 relative z-10 group-hover/testimonial:text-glow transition-all duration-500">
                  {testimonial.quote}
                </blockquote>

                {/* Enhanced Author Info */}
                <div className="flex items-center space-x-4 border-t border-primary/20 pt-6 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-full flex items-center justify-center group-hover/testimonial:scale-110 group-hover/testimonial:rotate-6 transition-all duration-500 shadow-morphic">
                    <testimonial.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-orbitron font-bold text-lg text-foreground group-hover/testimonial:text-primary transition-colors duration-500">{testimonial.author}</h4>
                    <p className="text-muted-foreground font-inter group-hover/testimonial:text-foreground transition-colors duration-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Enhanced Star Rating */}
                <div className="flex mt-6 space-x-1 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-primary text-primary transition-all duration-500 group-hover/testimonial:scale-110 group-hover/testimonial:drop-shadow-glow" 
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        transitionDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-glow/5 opacity-0 group-hover/testimonial:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};