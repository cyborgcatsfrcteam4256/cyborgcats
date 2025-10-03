import { Building2, Handshake, Star, Users, Trophy, Target, ArrowRight, Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumCard } from './PremiumCard';
import { LiquidButton } from './LiquidButton';

export const SponsorsSection = () => {
  const currentSponsors = [
    { name: "TechCorp Industries", tier: "Platinum", logo: "/lovable-uploads/0ed115c9-c65c-485d-a648-96ef646179b3.png" },
    { name: "Innovation Labs", tier: "Gold", logo: "/lovable-uploads/2bef5729-53ec-4330-baa1-ac4ba5367ce2.png" },
    { name: "Future Systems", tier: "Gold", logo: "/lovable-uploads/40d68d3b-ba42-4e64-a83f-cb602561d4db.png" },
    { name: "Robotics Solutions", tier: "Silver", logo: "/lovable-uploads/4a9a0ddd-912a-4220-bc38-b8818af5e963.png" },
    { name: "Engineering Plus", tier: "Silver", logo: "/lovable-uploads/6a730614-1628-4753-9fd6-706f9c02ddcf.png" },
    { name: "Tech Dynamics", tier: "Bronze", logo: "/lovable-uploads/82ee81cc-26a5-4be3-b3af-d056fdb28767.png" }
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
      name: "Platinum",
      amount: "$5,000+",
      color: "from-slate-400 to-slate-200",
      benefits: ["Logo on robot", "Team apparel", "Website feature", "Social media mentions", "Competition invites"]
    },
    {
      name: "Gold",
      amount: "$2,500+",
      color: "from-yellow-400 to-yellow-200",
      benefits: ["Logo on robot", "Team apparel", "Website listing", "Social media mentions"]
    },
    {
      name: "Silver",
      amount: "$1,000+",
      color: "from-gray-400 to-gray-200",
      benefits: ["Team apparel", "Website listing", "Social media recognition"]
    },
    {
      name: "Bronze",
      amount: "$500+",
      color: "from-amber-600 to-amber-400",
      benefits: ["Website listing", "Thank you certificate"]
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
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-3 rounded-full bg-primary/20 border border-primary/30 glow-subtle">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary-glow animate-pulse" />
                <span className="text-lg font-semibold text-foreground tracking-wider">PARTNERSHIP & SUPPORT</span>
                <Heart className="w-6 h-6 text-primary-glow animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 text-glow leading-tight">
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
          <div className="mb-24">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-white mb-16">
              Thank You to Our Current Sponsors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {currentSponsors.map((sponsor, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                   <PremiumCard className="p-6 text-center hover-scale group/sponsor hover:shadow-luxury transition-all duration-700">
                    <div className="aspect-square glass-morphism rounded-2xl mb-4 flex items-center justify-center group-hover/sponsor:scale-110 transition-all duration-500 shadow-morphic">
                      <img 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        className="w-16 h-16 object-contain rounded-lg group-hover/sponsor:brightness-110 transition-all duration-500"
                      />
                    </div>
                    <h4 className="font-orbitron font-semibold text-white text-sm mb-3 group-hover/sponsor:text-glow transition-all duration-500">
                      {sponsor.name}
                    </h4>
                    <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold transition-all duration-500 group-hover/sponsor:scale-105 ${
                      sponsor.tier === 'Platinum' ? 'glass-morphism border border-slate-400/30 text-slate-200 group-hover/sponsor:text-slate-100 group-hover/sponsor:shadow-glow' :
                      sponsor.tier === 'Gold' ? 'glass-morphism border border-yellow-400/30 text-yellow-200 group-hover/sponsor:text-yellow-100 group-hover/sponsor:shadow-glow' :
                      sponsor.tier === 'Silver' ? 'glass-morphism border border-gray-400/30 text-gray-200 group-hover/sponsor:text-gray-100 group-hover/sponsor:shadow-glow' :
                      'glass-morphism border border-amber-400/30 text-amber-200 group-hover/sponsor:text-amber-100 group-hover/sponsor:shadow-glow'
                    }`}>
                      {sponsor.tier}
                    </span>
                  </PremiumCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Sponsorship Benefits */}
        <ScrollReveal delay={300}>
          <div className="mb-24">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-white mb-16">
              Why Sponsor Our Team?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sponsorshipBenefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="h-full">
                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="p-3 lg:p-4 rounded-2xl bg-primary/20 border border-primary/30 flex-shrink-0 glow-subtle">
                        <div className="text-primary w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg lg:text-xl font-orbitron font-bold text-foreground mb-2 lg:mb-3 leading-tight">
                          {benefit.title}
                        </h4>
                        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
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
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-white mb-16">
              Sponsorship Opportunities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sponsorshipTiers.map((tier, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <PremiumCard className="text-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color}`} />
                    <div className="p-6">
                      <h4 className="text-2xl font-orbitron font-bold text-white mb-2">
                        {tier.name}
                      </h4>
                      <p className="text-3xl font-bold text-primary mb-6">
                        {tier.amount}
                      </p>
                      <ul className="space-y-3 text-left">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                            <Star className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
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
            <div className="bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 p-12 rounded-3xl border border-white/10">
              <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">
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
                <LiquidButton 
                  variant="glass" 
                  size="lg"
                  className="px-8 py-4"
                  onClick={() => window.location.href = '/contact?subject=sponsor'}
                >
                  Download Sponsorship Packet
                </LiquidButton>
              </div>
              <p className="text-muted-foreground mt-8">
                Contact us at <span className="text-primary font-semibold">cyborgcatsfrcteam4256@gmail.com</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};