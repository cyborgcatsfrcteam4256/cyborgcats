import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Trophy, Heart, Star, Zap, DollarSign, HandshakeIcon } from 'lucide-react';

const Sponsors = () => {
  const navigate = useNavigate();

  const sponsorTiers = [
    {
      tier: 'Foundational Partner',
      icon: Trophy,
      color: 'from-purple-400 to-indigo-600',
      benefits: [
        'Makes team competition entry possible',
        'Name on robot, banners, team shirts',
        'Featured on website',
        'All written communications',
        'Recognition with Feb 6th donation'
      ],
      sponsors: [
        { name: 'Westminster Christian Academy', logo: '/lovable-uploads/westminster-logo.png', website: 'https://wcastl.org' },
        { name: 'Boeing', logo: '/lovable-uploads/boeing-logo.png', website: 'https://www.boeing.com' },
        { name: 'FSI', logo: '/lovable-uploads/fsi-logo.png', website: 'https://www.fsipolyurethanes.com' },
      ]
    },
    {
      tier: 'Sustainable Partner',
      icon: Star,
      color: 'from-blue-400 to-cyan-500',
      benefits: [
        'Names and logos on robot and banner',
        'Featured on website and team shirts',
        'All written communications',
        'Recognition with Feb 6th donation'
      ],
      sponsors: [
        { name: 'TAC Air', logo: '/lovable-uploads/tac-air-logo.jpeg', website: 'https://www.tacair.com' },
      ]
    },
    {
      tier: 'Development Partner',
      icon: Heart,
      color: 'from-green-400 to-emerald-500',
      benefits: [
        'Name and logo on banner and shirts',
        'Website feature',
        'All written communications',
        'Supports outreach programs'
      ],
      sponsors: [
        { name: 'TierPoint', logo: '/lovable-uploads/tierpoint-logo.webp', website: 'https://www.tierpoint.com' },
        { name: 'LinMark Machine Products', logo: '/lovable-uploads/linmark-logo.jpeg', website: 'https://www.linmarkmachine.com' },
      ]
    },
    {
      tier: 'Competition Partner',
      icon: Zap,
      color: 'from-orange-400 to-red-500',
      benefits: [
        'Logo on website and team shirts',
        'All written communications',
        'Supports materials and competition'
      ],
      sponsors: [
        { name: 'Agilix Solutions', logo: '/lovable-uploads/agilix-logo.webp', website: 'https://www.agilixsolutions.com' },
        { name: 'Simons PLM Software', logo: '/lovable-uploads/siemens-plm-logo.svg', website: 'https://plm.sw.siemens.com' },
        { name: 'Jemco Components & Fabrication, Inc.', logo: '/lovable-uploads/jemco-logo.png', website: 'https://www.jemcoinc.com' },
      ]
    },
    {
      tier: 'Associate Partner',
      icon: HandshakeIcon,
      color: 'from-gray-400 to-slate-500',
      benefits: [
        'Logo and name on website',
        'All written communications',
        'In-kind donation recognition'
      ],
      sponsors: [
        { name: 'Ace Hardware', logo: '/lovable-uploads/ace-hardware-logo.svg', website: 'https://www.acehardware.com' },
      ]
    }
  ];

  const sponsorshipPackages = [
    {
      amount: '$10,000/year+',
      tier: 'Foundational Partner',
      description: 'Enable competition entry & maximum visibility',
      icon: Trophy
    },
    {
      amount: '$5,000/year',
      tier: 'Sustainable Partner',
      description: 'Prominent recognition across all platforms',
      icon: Star
    },
    {
      amount: '$2,500/year',
      tier: 'Development Partner',
      description: 'Support outreach & community impact',
      icon: Heart
    },
    {
      amount: '$1,000/year',
      tier: 'Competition Partner',
      description: 'Contribute to materials & competitions',
      icon: Zap
    },
    {
      amount: 'Materials/Services',
      tier: 'Associate Partner',
      description: 'In-kind donations valued partnership',
      icon: HandshakeIcon
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 font-orbitron">
                <HandshakeIcon className="w-4 h-4 mr-2" />
                Our Sponsors
              </Badge>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                Powered by <span className="text-holographic">Partners</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our success wouldn't be possible without the generous support of our sponsors. 
                Together, we're inspiring the next generation of STEM leaders.
              </p>
            </div>
          </ScrollReveal>

          {/* Current Sponsors by Tier */}
          <div className="space-y-12 mb-20">
            {sponsorTiers.map((tier, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-lg flex items-center justify-center`}>
                      <tier.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-orbitron font-bold">{tier.tier} Sponsors</h2>
                      <p className="text-muted-foreground">Supporting excellence in robotics</p>
                    </div>
                  </div>

                  {tier.sponsors.length > 0 ? (
                     <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {tier.sponsors.map((sponsor, i) => (
                        <a 
                          key={i} 
                          href={sponsor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-6 bg-background/50 rounded-lg border border-border/50 flex items-center justify-center min-h-[160px] hover:bg-background/70 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                        >
                          {sponsor.logo ? (
                            <img 
                              src={sponsor.logo} 
                              alt={`${sponsor.name} logo`}
                              className="max-h-28 max-w-full object-contain"
                            />
                          ) : (
                            <h3 className="text-xl font-semibold text-center">{sponsor.name}</h3>
                          )}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 bg-background/50 rounded-lg border border-dashed border-border/50 text-center mb-6">
                      <p className="text-muted-foreground">Join us as a {tier.tier} sponsor!</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Sponsorship Packages */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-orbitron font-bold mb-4">
                Become a <span className="text-holographic">Sponsor</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your investment in our team helps students gain hands-on STEM experience 
                and develop skills that will serve them for life.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sponsorshipPackages.map((pkg, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-6 bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber text-center h-full flex flex-col">
                  <pkg.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-orbitron font-bold mb-2 text-holographic">
                    {pkg.amount}
                  </div>
                  <h3 className="font-orbitron font-bold text-xl mb-2">{pkg.tier}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{pkg.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* What Your Sponsorship Funds */}
          <ScrollReveal>
            <Card className="p-12 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
                Where Your Investment Goes
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { label: 'Robot Materials & Parts', percentage: 45 },
                  { label: 'Competition Registration & Travel', percentage: 30 },
                  { label: 'Tools, Equipment & Outreach', percentage: 25 }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-5xl font-orbitron font-bold text-holographic mb-2">
                      {item.percentage}%
                    </div>
                    <p className="text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <div className="text-center mt-16">
              <h2 className="text-3xl font-orbitron font-bold mb-4">
                Ready to Support Innovation?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact us to discuss sponsorship opportunities and how we can create 
                a partnership that works for your organization.
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/contact?subject=sponsor')}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Become a Sponsor
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsors;
