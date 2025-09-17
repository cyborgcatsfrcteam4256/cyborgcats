import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle, Zap, Users, Award } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would integrate with your newsletter service
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: Award,
      title: "Competition Updates",
      description: "Get notified about our latest competition results and achievements"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Learn about our outreach programs and how you can get involved"
    },
    {
      icon: Zap,
      title: "Behind the Scenes",
      description: "Exclusive content about our robot development and team activities"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Full-screen background accent photo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/2bef5729-53ec-4330-baa1-ac4ba5367ce2.png" 
          alt="" 
          className="w-full h-full object-cover opacity-30 transition-opacity duration-1000 hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent" />
      </div>
      
      <div className="absolute inset-0 gradient-cyber opacity-10 z-[1]" />
      <div className="absolute inset-0 circuit-pattern opacity-20 z-[1]" />
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 animate-slide-up">
            <Badge variant="outline" className="mb-4 font-orbitron">
              <Mail className="w-4 h-4 mr-2" />
              Stay Connected
            </Badge>
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-glow">
              Join Our Newsletter
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
              Stay up to date with our latest achievements, upcoming events, 
              and behind-the-scenes content from the Cyborg Cats team.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl p-8 mb-12 hover-glow transition-cyber holographic-border">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg"
                    className="sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground font-inter">
                  No spam, just robotics updates. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center animate-scale-in">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-orbitron font-bold text-green-500 mb-2">
                  Welcome to the Team!
                </h3>
                <p className="text-muted-foreground font-inter">
                  You're now subscribed to Cyborg Cats updates. Check your email for confirmation.
                </p>
              </div>
            )}
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card/60 backdrop-blur-lg border border-border/30 rounded-xl p-6 hover-glow transition-cyber text-center"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 glow-subtle">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-orbitron font-semibold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground font-inter">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Social Stats */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-muted-foreground font-inter mb-6">
              Join our community of supporters following our robotics journey
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-primary">48</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-primary">22</div>
                <div className="text-sm text-muted-foreground">Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-primary">14</div>
                <div className="text-sm text-muted-foreground">Years Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};