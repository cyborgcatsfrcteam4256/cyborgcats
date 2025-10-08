import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Quote, GraduationCap, Users, Award, MessageSquare, Wrench, Sparkles, Trophy } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumCard } from './PremiumCard';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const CommunitySection = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      quote: "When I joined robotics, I didn't even know how to hold a wrench but then the Cyborg Cats taught me how to not only hold a wrench but engineer the future. I am so thankful for all of my amazing mentors and the huge impact they have made on me and in the lives of others. Go Cyborg Cats!",
      author: "Salem Dawit",
      role: "Cyborg Cats Engineering Lead",
      icon: Wrench,
    },
    {
      quote: "Joining the Cyborg Cats has allowed me to discover my passion for STEM which is something I never thought I could get into originally. I'm so thankful to be apart of this team and so thankful that being a Cyborg Cat has allowed me to make an impact on my community and inspire more students to join the STEM field as well.",
      author: "Anna Siebers",
      role: "Cyborg Cats Programmer",
      icon: Sparkles,
    },
    {
      quote: "Robotics has trained me to think critically and solve problems, be confident in my abilities and discover how they could be used to innovate and create new things and has provided me with a community of people who I can learn from and learn alongside. Most of all, the Cyborg Cats have helped me realize that I could be a leader in STEM and inspire others to also take advantage of their skills to make a positive impact.",
      author: "Enoch Wong",
      role: "CAD and Design Lead",
      icon: Trophy,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/lovable-uploads/community-event-1.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-6 text-glow">
              <span className="text-holographic">Community</span> Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from our students and connect with our growing alumni network
            </p>
          </div>
        </ScrollReveal>

        <Tabs defaultValue="testimonials" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="testimonials" className="text-base font-orbitron">Student Stories</TabsTrigger>
            <TabsTrigger value="alumni" className="text-base font-orbitron">Alumni Network</TabsTrigger>
          </TabsList>

          <TabsContent value="testimonials" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="morphic-card p-8 h-full group/testimonial relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover/testimonial:opacity-100 transition-opacity duration-700" />
                    
                    <div className="mb-6 relative z-10">
                      <div className="w-12 h-12 glass-morphism rounded-2xl flex items-center justify-center group-hover/testimonial:scale-110 transition-all duration-500">
                        <Quote className="w-6 h-6 text-primary group-hover/testimonial:rotate-12 transition-transform duration-500" />
                      </div>
                    </div>

                    <blockquote className="text-base font-inter leading-relaxed text-foreground mb-6 relative z-10">
                      {testimonial.quote}
                    </blockquote>

                    <div className="flex items-center space-x-3 border-t border-primary/20 pt-4 relative z-10">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-full flex items-center justify-center group-hover/testimonial:scale-110 transition-all duration-500">
                        <testimonial.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-orbitron font-bold text-base text-foreground group-hover/testimonial:text-primary transition-colors duration-500">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alumni" className="space-y-8">
            <div className="text-center bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 max-w-2xl mx-auto">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold mb-4">Connect with Our Network</h3>
              <p className="text-muted-foreground mb-6">
                Join our thriving alumni community for mentorship, career opportunities, and lifelong connections. 
                Whether you're a current student or recent graduate, our network is here to support your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/contact?subject=alumni')}
                >
                  Join Alumni Network
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/contact?subject=mentor')}
                >
                  Find a Mentor
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
