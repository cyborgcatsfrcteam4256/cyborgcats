import { Building2, Handshake, Star, Users, Trophy, Target, ArrowRight, Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumCard } from './PremiumCard';
import { LiquidButton } from './LiquidButton';

export const SponsorsSection = () => {
  const currentSponsors = [
    { name: "Westminster Christian Academy", tier: "Foundational", logo: "/lovable-uploads/westminster-logo.png", website: "https://wcastl.org" },
    { name: "Boeing", tier: "Foundational", logo: "/lovable-uploads/boeing-logo.png", website: "https://www.boeing.com" },
    { name: "FSI", tier: "Foundational", logo: "/lovable-uploads/fsi-logo.png", website: "https://www.fsipolyurethanes.com" },
    { name: "TAC Air", tier: "Sustainable", logo: "/lovable-uploads/tac-air-logo.jpeg", website: "https://www.tacair.com" },
    { name: "TierPoint", tier: "Development", logo: "/lovable-uploads/tierpoint-logo.webp", website: "https://www.tierpoint.com" },
    { name: "LinMark Machine Products", tier: "Development", logo: "/lovable-uploads/linmark-logo.jpeg", website: "https://www.linmarkmachine.com" },
    { name: "Agilix Solutions", tier: "Competition", logo: "/lovable-uploads/agilix-logo.webp", website: "https://www.agilixsolutions.com" },
    { name: "Simons PLM Software", tier: "Competition", logo: "/lovable-uploads/siemens-plm-logo.svg", website: "https://plm.sw.siemens.com" },
    { name: "Jemco Components & Fabrication, Inc.", tier: "Competition", logo: "/lovable-uploads/jemco-logo.png", website: "https://www.jemcoinc.com" },
    { name: "Ace Hardware", tier: "Associate", logo: "/lovable-uploads/ace-hardware-logo.svg", website: "https://www.acehardware.com" },
  ];

  const sponsorshipBenefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description: "Support STEM education and inspire the next generation of engineers and innovators"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Brand Visibility",
      description: "Get your logo on our robot, team apparel, and marketing materials at competitions"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Talent Pipeline",
      description: "Connect with motivated students who could be your future employees"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Corporate Responsibility",
      description: "Demonstrate your commitment to education and community development"
    }
  ];

  const sponsorshipTiers = [
    {
      name: "Foundational Partner",
      amount: "$10,000/year+",
      color: "from-purple-500 to-indigo-600",
      benefits: [
        "Makes it possible for team to enter FIRST Robotics Competition",
        "Name displayed on robot, banners, team shirts, website",
        "Featured in all written communications",
        "Recognition by February 6th donation deadline"
      ]
    },
    {
      name: "Sustainable Partner",
      amount: "$5,000/year",
      color: "from-blue-400 to-cyan-500",
      benefits: [
        "Names and logos prominently on robot and banner",
        "Featured on website and team shirts",
        "Included in all written communications",
        "Recognition by February 6th donation deadline"
      ]
    },
    {
      name: "Development Partner",
      amount: "$2,500/year",
      color: "from-green-400 to-emerald-500",
      benefits: [
        "Name and logo on banner and team shirts",
        "Featured on website",
        "Included in all written communications",
        "Supports outreach to schools and community"
      ]
    },
    {
      name: "Competition Partner",
      amount: "$1,000/year",
      color: "from-orange-400 to-red-500",
      benefits: [
        "Logo and name on website and team shirts",
        "Included in all written communications",
        "Contributes to robot materials and competition costs"
      ]
    },
    {
      name: "Associate Partner",
      amount: "Materials/Services/Smaller Amounts",
      color: "from-gray-400 to-slate-500",
      benefits: [
        "Logo and name on website",
        "Included in all written communications",
        "Recognition for in-kind donations and support"
      ]
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Full-screen background accent photo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/82ee81cc-26a5-4be3-b3af-d056fdb28767.png" 
          alt="" 
          className="w-full h-full object-cover opacity-30 transition-opacity duration-1000 hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent" />
      </div>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.secondary/0.15),transparent_70%)] z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,theme(colors.primary/0.15),transparent_70%)] z-[1]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-24">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="p-3 rounded-full bg-primary/20 border border-primary/30 glow-subtle">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary-glow animate-pulse" />
                <span className="text-lg font-semibold text-foreground tracking-wider">PARTNERSHIP & SUPPORT</span>
                <Heart className="w-6 h-6 text-primary-glow animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-10 text-glow leading-tight">
              Our Amazing <span className="text-holographic">Sponsors</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
              We are grateful to our <span className="text-primary font-semibold">incredible partners</span> who make our robotics journey possible 
              and help us inspire the next generation of STEM leaders while sharing our 
              <span className="text-primary font-semibold"> Christian values</span> and 
              <span className="text-primary-glow font-semibold"> commitment to serving others</span>.
            </p>
          </div>
        </ScrollReveal>

        {/* Current Sponsors */}
        <ScrollReveal delay={200}>
          <div className="mb-28">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-white mb-20">
              Thank You to Our Current Sponsors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
              {currentSponsors.map((sponsor, index) => (
                 <ScrollReveal key={index} delay={index * 50}>
                   <a 
                     href={sponsor.website} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block"
                   >
                     <PremiumCard className="p-8 text-center hover-scale group/sponsor hover:shadow-luxury transition-all duration-700 cursor-pointer">
                      <div className="aspect-square glass-morphism rounded-2xl mb-5 flex items-center justify-center group-hover/sponsor:scale-110 transition-all duration-500 shadow-morphic">
                        <img 
                          src={sponsor.logo} 
                          alt={`${sponsor.name} logo`}
                          className="w-24 h-24 object-contain rounded-lg group-hover/sponsor:brightness-110 transition-all duration-500"
                        />
                      </div>
                      <h4 className="font-orbitron font-semibold text-white text-sm mb-4 group-hover/sponsor:text-glow transition-all duration-500">
                        {sponsor.name}
                      </h4>
                      <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold transition-all duration-500 group-hover/sponsor:scale-105 ${
                        sponsor.tier === 'Foundational' ? 'glass-morphism border border-purple-400/30 text-purple-200 group-hover/sponsor:text-purple-100 group-hover/sponsor:shadow-glow' :
                        sponsor.tier === 'Sustainable' ? 'glass-morphism border border-blue-400/30 text-blue-200 group-hover/sponsor:text-blue-100 group-hover/sponsor:shadow-glow' :
                        sponsor.tier === 'Development' ? 'glass-morphism border border-green-400/30 text-green-200 group-hover/sponsor:text-green-100 group-hover/sponsor:shadow-glow' :
                        sponsor.tier === 'Competition' ? 'glass-morphism border border-orange-400/30 text-orange-200 group-hover/sponsor:text-orange-100 group-hover/sponsor:shadow-glow' :
                        'glass-morphism border border-gray-400/30 text-gray-200 group-hover/sponsor:text-gray-100 group-hover/sponsor:shadow-glow'
                      }`}>
                        {sponsor.tier}
                      </span>
                    </PremiumCard>
                   </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Sponsorship Benefits */}
        <ScrollReveal delay={300}>
          <div className="mb-28">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-white mb-20">
              Why Sponsor Our Team?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {sponsorshipBenefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="h-full p-8">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30 flex-shrink-0 glow-subtle">
                        <div className="text-primary w-8 h-8 flex items-center justify-center">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h4 className="text-xl font-orbitron font-bold text-foreground mb-4 leading-tight">
                          {benefit.title}
                        </h4>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </PremiumCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Sponsorship Tiers */}
        <ScrollReveal delay={400}>
          <div className="mb-24">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-white mb-20">
              Sponsorship Opportunities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
              {sponsorshipTiers.map((tier, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="text-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color}`} />
                    <div className="p-5 sm:p-6 md:p-7 lg:p-8">
                      <h4 className="text-xl sm:text-2xl font-orbitron font-bold text-white mb-3 sm:mb-4">
                        {tier.name}
                      </h4>
                      <p className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                        {tier.amount}
                      </p>
                      <ul className="space-y-2.5 sm:space-y-3 text-left">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-muted-foreground">
                            <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </PremiumCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={500}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 p-12 lg:p-16 rounded-3xl border border-white/10">
              <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-8">
                Partner With Us Today
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                Join our mission to inspire young minds and shape the future of STEM. 
                Your sponsorship makes a real difference in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <LiquidButton 
                  variant="premium" 
                  size="lg"
                  className="group px-8 py-4"
                  onClick={() => window.location.href = '/contact?subject=sponsor'}
                >
                  <span className="flex items-center gap-3">
                    Become a Sponsor
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </LiquidButton>
                <a href="/sponsorship-packet.jpg" download="Cyborg-Cats-Sponsorship-Packet.jpg">
                  <LiquidButton 
                    variant="glass" 
                    size="lg"
                    className="px-8 py-4"
                  >
                    Download Sponsorship Packet
                  </LiquidButton>
                </a>
              </div>
              <p className="text-muted-foreground mt-10">
                Contact us at <span className="text-primary font-semibold">cyborgcatsfrcteam4256@gmail.com</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};