import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, Instagram, Globe, Users } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="text-glow">Get In</span>
              <span className="block text-primary-glow">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Ready to join our St. Louis-based mission or support our Missouri team? We'd love to hear from you 
              and explore how we can work together in the Gateway City and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Join Our Team</h3>
              <p className="text-muted-foreground font-inter mb-6">
                Interested in becoming a Cyborg Cat? Learn about joining our St. Louis robotics team.
              </p>
              <Button variant="hero" size="sm">
                Learn More
              </Button>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Sponsor Us</h3>
              <p className="text-muted-foreground font-inter mb-6">
                Support our mission and gain exposure through our outreach programs.
              </p>
              <Button variant="cyber" size="sm">
                Sponsorship Info
              </Button>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Collaborate</h3>
              <p className="text-muted-foreground font-inter mb-6">
                Partner with us on outreach programs and STEM initiatives.
              </p>
              <Button variant="silver" size="sm">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-glow">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="join">Joining the Team</SelectItem>
                      <SelectItem value="sponsor">Sponsorship Opportunities</SelectItem>
                      <SelectItem value="collaborate">Collaboration</SelectItem>
                      <SelectItem value="media">Media Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..." 
                    rows={6}
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-scale-in">
              <div>
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-glow">Connect With Us</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-subtle">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orbitron font-semibold mb-1">Location</h4>
                      <p className="text-muted-foreground font-inter">
                        Westminster Christian Academy<br />
                        St. Louis, Missouri
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-subtle">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                  <h4 className="font-orbitron font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground font-inter">
                    Contact available upon request
                  </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-subtle">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                  <h4 className="font-orbitron font-semibold mb-1">Social Media</h4>
                  <p className="text-muted-foreground font-inter">
                    Follow us online
                  </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-orbitron font-semibold text-lg mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">
                    → Sponsor Packet Download
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">
                    → Team Application Form
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">
                    → Outreach Partnership Info
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">
                    → Media Resources
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;