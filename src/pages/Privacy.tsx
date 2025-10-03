import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Eye, Cookie, Mail } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6 text-glow">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Information We Collect</h2>
                    <p className="text-muted-foreground mb-4">
                      When you interact with our website, we may collect certain information to improve your experience:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Contact information (name, email, phone) when you submit forms</li>
                      <li>Usage data and analytics to understand how visitors use our site</li>
                      <li>Cookie data for site functionality and preferences</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">How We Use Your Information</h2>
                    <p className="text-muted-foreground mb-4">
                      We use the information we collect for the following purposes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>To respond to your inquiries and requests</li>
                      <li>To send team updates and newsletters (with your consent)</li>
                      <li>To improve our website and user experience</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Cookies and Tracking</h2>
                    <p className="text-muted-foreground mb-4">
                      We use cookies and similar tracking technologies to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Remember your preferences and settings</li>
                      <li>Understand website usage patterns</li>
                      <li>Improve site functionality and performance</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      You can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Data Security</h2>
                    <p className="text-muted-foreground">
                      We implement appropriate technical and organizational measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction. However, 
                      no method of transmission over the internet is 100% secure.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Third-Party Services</h2>
                    <p className="text-muted-foreground mb-4">
                      Our website may contain links to third-party websites or services. We are not responsible 
                      for the privacy practices of these external sites. We encourage you to review their privacy 
                      policies.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Your Rights</h2>
                    <p className="text-muted-foreground mb-4">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Access the personal information we hold about you</li>
                      <li>Request correction of inaccurate information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Object to processing of your personal information</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Children's Privacy</h2>
                    <p className="text-muted-foreground">
                      As a youth robotics team, we take special care with information from individuals under 18. 
                      We do not knowingly collect personal information from children without parental consent. 
                      If you believe we have inadvertently collected such information, please contact us immediately.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={700}>
              <Card className="p-8 bg-card/80 border-primary/30">
                <h2 className="text-2xl font-orbitron font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <a href="mailto:cyborgcatsfrcteam4256@gmail.com" className="text-primary hover:underline font-semibold">
                  cyborgcatsfrcteam4256@gmail.com
                </a>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
