import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Handshake, Award, TrendingUp, Users, Globe, Download, DollarSign, Mail, Phone, Calendar, Star, ArrowRight, Zap } from 'lucide-react';
import { useState } from 'react';

const Sponsors = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [showQuickContact, setShowQuickContact] = useState(false);
  const sponsorTiers = [
    {
      name: "Foundational Partner",
      investment: "$10,000+",
      benefits: [
        "Company name in team title (if donated by Feb 6th)",
        "Logo on robot, banners, and team shirts",
        "Featured on website and all communications",
        "Makes competitive participation possible",
        "Highest level of recognition and visibility",
        "Priority partnership opportunities"
      ],
      color: "gradient-cyber",
      highlight: true
    },
    {
      name: "Sustainable Partner", 
      investment: "$5,000",
      benefits: [
        "Prominent logo placement on robot",
        "Featured on banners and team shirts",
        "Website and communication recognition",
        "Essential funding for team operations",
        "Sustains our competitive readiness",
        "Community event recognition"
      ],
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      highlight: false
    },
    {
      name: "Development Partner",
      investment: "$2,500", 
      benefits: [
        "Logo on banners and team shirts",
        "Website and communication mentions",
        "Enables expanded outreach programs",
        "Supports community robotics initiatives",
        "Recognition at community events",
        "Partnership in STEM education growth"
      ],
      color: "gradient-silver",
      highlight: false
    },
    {
      name: "Competition Partner",
      investment: "$1,000",
      benefits: [
        "Logo on website and team shirts",
        "Recognition in all communications",
        "Supports competition materials creation",
        "Enables professional team presentation",
        "Quarterly team updates",
        "Competition result sharing"
      ],
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      highlight: false
    },
    {
      name: "Associate Partner",
      investment: "Any Amount",
      benefits: [
        "Logo on website",
        "Recognition in all communications",
        "Support through gifts or services welcome",
        "Valuable community partnership",
        "Flexible contribution options",
        "Grassroots team support"
      ],
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
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
    { metric: "2000+", label: "Students Reached", icon: Users },
    { metric: "19", label: "Legislators Met", icon: Building },
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter mb-8">
              Join industry leaders supporting STEM education and community impact. 
              Partner with the 2025 FIRST Impact Award winners.
            </p>
            
            {/* Urgent CTA Banner */}
            <div className="bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30 rounded-xl p-6 mb-8 animate-pulse">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-primary animate-bounce" />
                <span className="text-lg font-orbitron font-bold text-primary">DEADLINE APPROACHING!</span>
                <Zap className="w-6 h-6 text-primary animate-bounce" />
              </div>
              <p className="text-muted-foreground font-inter mb-4">
                Foundational Partners who donate by <strong className="text-primary">February 6th</strong> get their company name in our team title!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group animate-bounce hover:animate-none"
                  onClick={() => setShowQuickContact(true)}
                >
                  <Star className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                  Become a Foundational Partner
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="silver" size="lg" className="group">
                  <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Quick Contact
                </Button>
              </div>
            </div>
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

          <div className="grid lg:grid-cols-3 gap-8">
            {sponsorTiers.slice(0, 3).map((tier, index) => (
              <div 
                key={index}
                className={`bg-card border border-border rounded-xl p-8 transition-all duration-300 relative cursor-pointer transform hover:scale-105 ${
                  tier.highlight ? 'ring-2 ring-primary/20 glow-subtle' : ''
                } ${hoveredTier === index ? 'glow-electric shadow-2xl' : 'hover-glow'}`}
                onMouseEnter={() => setHoveredTier(index)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-cyber text-primary-foreground font-orbitron animate-pulse">
                      ⚡ Most Popular ⚡
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-orbitron font-bold mb-2 transition-colors duration-300 ${
                    hoveredTier === index ? 'text-primary' : ''
                  }`}>
                    {tier.name}
                  </h3>
                  <div className={`text-3xl font-orbitron font-bold mb-4 transition-all duration-300 ${
                    hoveredTier === index ? 'text-primary-glow scale-110' : 'text-primary'
                  }`}>
                    {tier.investment}
                  </div>
                  {hoveredTier === index && (
                    <div className="text-sm font-inter text-muted-foreground animate-fade-in">
                      Click to start sponsorship process
                    </div>
                  )}
                </div>

                <div className={`space-y-3 mb-8 transition-all duration-300 ${
                  hoveredTier === index ? 'space-y-4' : ''
                }`}>
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className={`flex items-start space-x-3 transition-all duration-300 ${
                      hoveredTier === index ? 'transform translate-x-2' : ''
                    }`}>
                      <div className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${
                        hoveredTier === index ? 'bg-primary-glow w-3 h-3 glow-subtle' : 'bg-primary'
                      }`}></div>
                      <span className={`font-inter transition-colors duration-300 ${
                        hoveredTier === index ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.highlight ? "hero" : "silver"} 
                  size="lg" 
                  className={`w-full group transition-all duration-300 ${
                    hoveredTier === index ? 'transform translate-y-0 shadow-lg' : ''
                  }`}
                  onClick={() => setShowQuickContact(true)}
                >
                  <span className="mr-2">
                    {tier.highlight ? "🚀 Start Partnership" : "💡 Get Started"}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
          
          {/* Additional Partnership Levels */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {sponsorTiers.slice(3).map((tier, index) => (
              <div 
                key={index + 3}
                className="bg-card border border-border rounded-xl p-8 transition-all duration-300 relative cursor-pointer transform hover:scale-105 hover-glow"
                onMouseEnter={() => setHoveredTier(index + 3)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-orbitron font-bold mb-2 transition-colors duration-300 ${
                    hoveredTier === index + 3 ? 'text-primary' : ''
                  }`}>
                    {tier.name}
                  </h3>
                  <div className={`text-3xl font-orbitron font-bold mb-4 transition-all duration-300 ${
                    hoveredTier === index + 3 ? 'text-primary-glow scale-110' : 'text-primary'
                  }`}>
                    {tier.investment}
                  </div>
                  {hoveredTier === index + 3 && (
                    <div className="text-sm font-inter text-muted-foreground animate-fade-in">
                      Perfect for smaller businesses and organizations
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className={`flex items-start space-x-3 transition-all duration-300 ${
                      hoveredTier === index + 3 ? 'transform translate-x-2' : ''
                    }`}>
                      <div className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${
                        hoveredTier === index + 3 ? 'bg-primary-glow w-3 h-3 glow-subtle' : 'bg-primary'
                      }`}></div>
                      <span className={`font-inter transition-colors duration-300 ${
                        hoveredTier === index + 3 ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="silver" 
                  size="lg" 
                  className="w-full group"
                  onClick={() => setShowQuickContact(true)}
                >
                  💼 Start Partnership
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* Multiple Contact Options */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-glow">Ready to Partner?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Multiple ways to get started - choose what works best for you!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Quick Start */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                <Zap className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Quick Start</h3>
              <p className="text-muted-foreground font-inter mb-6">
                Ready to sponsor right now? Start the process immediately.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full group animate-bounce hover:animate-none"
                onClick={() => setShowQuickContact(true)}
              >
                <Star className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Sponsor Now!
              </Button>
            </div>

            {/* Learn More */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Get Details</h3>
              <p className="text-muted-foreground font-inter mb-6">
                Download our comprehensive sponsorship packet with all the details.
              </p>
              <Button variant="silver" size="lg" className="w-full group">
                <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                Download Packet
              </Button>
            </div>

            {/* Schedule Meeting */}
            <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-4">Let's Talk</h3>
              <p className="text-muted-foreground font-inter mb-6">
                Schedule a meeting to discuss custom partnership opportunities.
              </p>
              <Button variant="silver" size="lg" className="w-full group">
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Schedule Meeting
              </Button>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20 rounded-xl p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-6 text-primary">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group cursor-pointer hover:bg-background/50 p-3 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:glow-subtle transition-all">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold">Email</div>
                    <a href="mailto:sponsors@cyborgcats4256.org" className="text-primary hover:text-primary-glow transition-cyber font-inter">
                      sponsors@cyborgcats4256.org
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group cursor-pointer hover:bg-background/50 p-3 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:glow-subtle transition-all">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-orbitron font-bold">Phone</div>
                    <a href="tel:+1234567890" className="text-primary hover:text-primary-glow transition-cyber font-inter">
                      (314) 555-CATS
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-6">Why Act Now?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
                  <span className="font-inter text-muted-foreground">
                    <strong className="text-primary">Feb 6th Deadline:</strong> Company name in team title
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
                  <span className="font-inter text-muted-foreground">
                    <strong className="text-primary">Competition Season:</strong> Maximum visibility during events
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
                  <span className="font-inter text-muted-foreground">
                    <strong className="text-primary">Impact Award Winners:</strong> Proven ROI and community reach
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Modal */}
      {showQuickContact && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full animate-scale-in">
            <div className="text-center mb-6">
              <Star className="w-16 h-16 text-primary mx-auto mb-4 glow-primary animate-pulse" />
              <h3 className="text-2xl font-orbitron font-bold mb-2">Let's Partner!</h3>
              <p className="text-muted-foreground font-inter">
                Choose your preferred way to get started
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full group"
                onClick={() => window.location.href = 'mailto:sponsors@cyborgcats4256.org?subject=Sponsorship%20Inquiry'}
              >
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Send Email Now
              </Button>
              
              <Button 
                variant="silver" 
                size="lg" 
                className="w-full group"
                onClick={() => window.location.href = 'tel:+13145552287'}
              >
                <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Call Us Directly
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => setShowQuickContact(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Sponsors;