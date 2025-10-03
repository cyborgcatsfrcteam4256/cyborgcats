import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Card } from '@/components/ui/card';
import { FileText, AlertCircle, Scale, UserCheck } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6 text-glow">
                Terms of Service
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
                  <UserCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing and using the Cyborg Cats FRC Team 4256 website, you accept and agree to be 
                      bound by these Terms of Service. If you do not agree to these terms, please do not use 
                      our website.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Use of Website</h2>
                    <p className="text-muted-foreground mb-4">
                      You agree to use this website only for lawful purposes and in a way that does not:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Infringe upon the rights of others</li>
                      <li>Restrict or inhibit anyone's use of the website</li>
                      <li>Attempt to gain unauthorized access to the website or its systems</li>
                      <li>Transmit any harmful or malicious code</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Intellectual Property</h2>
                    <p className="text-muted-foreground mb-4">
                      All content on this website, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Text, graphics, logos, images, and videos</li>
                      <li>Design, layout, and look-and-feel</li>
                      <li>Software and code</li>
                      <li>Compilation of content</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      is owned by or licensed to Cyborg Cats FRC Team 4256 and is protected by copyright, 
                      trademark, and other intellectual property laws.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">User Submissions</h2>
                    <p className="text-muted-foreground">
                      When you submit content to our website (such as contact forms, comments, or feedback), 
                      you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, 
                      modify, and display such content for team-related purposes. You represent that you own 
                      or have the necessary rights to any content you submit.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Disclaimer of Warranties</h2>
                    <p className="text-muted-foreground">
                      This website is provided "as is" without any warranties, express or implied. We do not 
                      guarantee that the website will be error-free, uninterrupted, or free from viruses or 
                      other harmful components. Use of this website is at your own risk.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Limitation of Liability</h2>
                    <p className="text-muted-foreground">
                      To the fullest extent permitted by law, Cyborg Cats FRC Team 4256 shall not be liable 
                      for any indirect, incidental, special, consequential, or punitive damages arising from 
                      your use of this website or any linked websites.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">External Links</h2>
                    <p className="text-muted-foreground">
                      Our website may contain links to external websites. We are not responsible for the 
                      content, privacy policies, or practices of these external sites. The inclusion of any 
                      link does not imply endorsement by Cyborg Cats FRC Team 4256.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={700}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Modifications to Terms</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to modify these Terms of Service at any time. Changes will be 
                      effective immediately upon posting to this website. Your continued use of the website 
                      after any changes constitutes acceptance of the new terms.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={800}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <UserCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold mb-4">Governing Law</h2>
                    <p className="text-muted-foreground">
                      These Terms of Service shall be governed by and construed in accordance with the laws 
                      of the State of Missouri, United States, without regard to its conflict of law provisions.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={900}>
              <Card className="p-8 bg-card/80 border-primary/30">
                <h2 className="text-2xl font-orbitron font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
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

export default Terms;
