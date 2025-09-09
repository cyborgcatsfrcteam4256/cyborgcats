import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Handshake, Award, TrendingUp, Users, Globe, Download, DollarSign } from 'lucide-react';

const Sponsors = () => {
  const sponsorTiers = [
    {
      name: "Title Sponsor",
      investment: "$15,000+",
      benefits: [
        "Company logo on robot and team shirts",
        "Naming rights to major team initiatives",
        "Speaking opportunities at events",
        "Exclusive partnership announcements",
        "Custom collaboration projects",
        "Year-round social media recognition"
      ],
      color: "gradient-cyber",
      highlight: true
    },
    {
      name: "Gold Sponsor", 
      investment: "$5,000 - $14,999",
      benefits: [
        "Large logo placement on robot",
        "Recognition at all competitions",
        "Featured in press releases",
        "Access to competition footage",
        "Quarterly impact reports",
        "Employee engagement opportunities"
      ],
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      highlight: false
    },
    {
      name: "Silver Sponsor",
      investment: "$1,000 - $4,999", 
      benefits: [
        "Medium logo on robot and materials",
        "Social media recognition",
        "Newsletter mentions",
        "Competition result updates",
        "Team visit opportunities",
        "STEM partnership programs"
      ],
      color: "gradient-silver",
      highlight: false
    },
    {
      name: "Bronze Sponsor",
      investment: "$500 - $999",
      benefits: [
        "Small logo placement",
        "Website listing",
        "Thank you social posts", 
        "Competition photos access",
        "Annual impact summary",
        "Community recognition"
      ],
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      highlight: false
    }
  ];

  const currentSponsors = [
    { name: "Microsoft", tier: "Gold", logo: "🟢", industry: "Technology" },
    { name: "Boeing", tier: "Silver", logo: "✈️", industry: "Aerospace" },
    { name: "Emerson", tier: "Gold", logo: "⚡", industry: "Engineering" },
    { name: "Anheuser-Busch", tier: "Silver", logo: "🍺", industry: "Manufacturing" },
    { name: "Edward Jones", tier: "Bronze", logo: "💼", industry: "Financial Services" },
    { name: "Centene", tier: "Bronze", logo: "🏥", industry: "Healthcare" }
  ];

  const impactStats = [
    { metric: "80-100K", label: "Annual Budget", icon: DollarSign },
    { metric: "1000+", label: "Students Reached", icon: Users },
    { metric: "20+", label: "Legislators Met", icon: Building },
    { metric: "Global", label: "Outreach Impact", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="text-glow">Partner</span>
              <span className="block text-primary-glow">With Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Join industry leaders supporting STEM education and community impact. 
              Partner with the 2025 FIRST Impact Award winners.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group hover-glow transition-cyber">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-subtle group-hover:glow-electric">
                  <stat.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">{stat.metric}</div>
                <div className="text-muted-foreground font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Why Partner With Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Your investment goes beyond robotics - you're supporting STEM education, 
              community outreach, and the next generation of innovators.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 glow-subtle">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-4">Proven Impact</h3>
              <p className="text-muted-foreground font-inter mb-4">
                2025 FIRST Impact Award winners with demonstrated community influence, 
                reaching over 1,000 students through our programs.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">World Championship qualified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">100+ women in STEM participants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">International partnerships</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 glow-subtle">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-4">Brand Visibility</h3>
              <p className="text-muted-foreground font-inter mb-4">
                Gain exposure through competitions, social media, and community events 
                reaching thousands of engaged STEM enthusiasts.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Competition live streams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Social media presence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Community event exposure</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 glow-subtle">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-4">Meaningful Partnership</h3>
              <p className="text-muted-foreground font-inter mb-4">
                Build relationships with future STEM leaders and contribute to 
                educational initiatives that create lasting community impact.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Talent pipeline access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Employee engagement programs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-inter text-sm">Community partnership opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Sponsorship Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Choose the partnership level that best fits your organization's goals and budget.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {sponsorTiers.map((tier, index) => (
              <div 
                key={index}
                className={`bg-card border border-border rounded-xl p-8 hover-glow transition-cyber relative ${
                  tier.highlight ? 'ring-2 ring-primary/20 glow-subtle' : ''
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-cyber text-primary-foreground font-orbitron">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-orbitron font-bold mb-2">{tier.name}</h3>
                  <div className="text-3xl font-orbitron font-bold text-primary mb-4">{tier.investment}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="font-inter text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.highlight ? "hero" : "silver"} 
                  size="lg" 
                  className="w-full"
                >
                  {tier.highlight ? "Choose This Plan" : "Learn More"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Our Amazing Sponsors</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Thank you to the incredible organizations supporting our mission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSponsors.map((sponsor, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover-glow transition-cyber">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{sponsor.logo}</div>
                  <div className="flex-1">
                    <h3 className="font-orbitron font-bold text-lg">{sponsor.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="font-orbitron text-xs">
                        {sponsor.tier}
                      </Badge>
                      <span className="text-muted-foreground font-inter text-sm">{sponsor.industry}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-12 hover-glow transition-cyber">
            <Building className="w-16 h-16 text-primary mx-auto mb-6 glow-primary" />
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Ready to Partner?</h2>
            <p className="text-xl text-muted-foreground mb-8 font-inter">
              Join us in building the future of STEM education. Download our sponsorship packet 
              or contact us to discuss custom partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                Download Sponsor Packet
              </Button>
              <Button variant="silver" size="lg">
                Schedule a Meeting
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-muted-foreground font-inter">
                Questions? Contact us at{' '}
                <a href="mailto:sponsors@cyborgcats4256.org" className="text-primary hover:text-primary-glow transition-cyber">
                  sponsors@cyborgcats4256.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsors;