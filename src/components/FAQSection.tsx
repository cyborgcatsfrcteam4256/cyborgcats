import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronRight, HelpCircle, Users, Award, Lightbulb } from 'lucide-react';

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "Joining the Team",
      icon: Users,
      questions: [
        {
          question: "How can I join the Cyborg Cats?",
          answer: "We welcome students from Westminster Christian Academy who are passionate about STEM, robotics, and making a positive impact. Applications are typically open at the beginning of each school year. No prior robotics experience is required - we provide comprehensive training across all subteams including engineering, business, and outreach."
        },
        {
          question: "What time commitment is required?",
          answer: "During build season (January-February), we meet 4-6 hours on weekdays and 8+ hours on weekends. During off-season, we typically meet 2-3 times per week for 2-3 hours. Competition season requires travel to regional and potentially world championships."
        },
        {
          question: "Do I need prior robotics or engineering experience?",
          answer: "Absolutely not! We welcome students from all backgrounds and skill levels. Our experienced mentors and student leaders provide comprehensive training in everything from CAD design and programming to business planning and public speaking."
        }
      ]
    },
    {
      category: "Competition & Awards",
      icon: Award,
      questions: [
        {
          question: "What makes the FIRST Impact Award so significant?",
          answer: "The FIRST Impact Award is the most prestigious award in FIRST Robotics, recognizing teams that best embody the mission of FIRST. Our 2025 win highlights our comprehensive community outreach, legislative advocacy, and commitment to making STEM accessible to all students."
        },
        {
          question: "How does the World Championship work?",
          answer: "The FIRST World Championship brings together 400+ teams from around the globe in Houston, Texas. Teams compete in alliance-based matches, and awards are given for various achievements including robot performance, engineering excellence, and community impact."
        },
        {
          question: "What other competitions does the team participate in?",
          answer: "We participate in 2-3 regional competitions each season, the Missouri State Championship, and now the World Championship. We also engage in off-season events and community demonstrations throughout the year."
        }
      ]
    },
    {
      category: "Community Impact",
      icon: Lightbulb,
      questions: [
        {
          question: "What are your Women in STEM seminars?",
          answer: "Our Women in STEM seminars are monthly workshops designed to inspire and support young women in pursuing STEM careers. We've welcomed over 100 participants, featuring industry professionals, hands-on activities, and mentorship opportunities with our female team leaders."
        },
        {
          question: "How does your legislative advocacy work?",
          answer: "We actively engage with Missouri state legislators to advocate for STEM education policy. Our team has met with 20+ legislators, supporting bills like SB 33 and HB 256 that expand STEM opportunities statewide. We present research, share student perspectives, and demonstrate the impact of quality STEM programs."
        },
        {
          question: "Tell me about your international partnerships.",
          answer: "We've established partnerships with robotics teams in South Korea and Ethiopia, fostering global connections through virtual exchanges, shared projects, and cultural learning. These partnerships demonstrate that innovation and collaboration transcend borders."
        }
      ]
    }
  ];

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 data-stream opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="outline" className="mb-4 font-orbitron">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-glow">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Have questions about joining our team, our competitions, or our community impact? 
            Find answers to the most common questions here.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex}
              className="bg-card/80 backdrop-blur-lg border-border/50 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-subtle">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-glow">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const globalIndex = categoryIndex * 10 + index;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div 
                        key={index}
                        className="border border-border/30 rounded-lg bg-card/40 hover:bg-card/60 transition-cyber"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-6 text-left flex items-center justify-between hover:text-primary transition-cyber"
                        >
                          <h4 className="font-orbitron font-semibold text-lg pr-4">
                            {faq.question}
                          </h4>
                          {isOpen ? (
                            <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6 animate-slide-up">
                            <div className="border-t border-border/30 pt-4">
                              <p className="text-muted-foreground font-inter leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-xl p-8 hover-glow transition-cyber">
            <h3 className="text-2xl font-orbitron font-bold mb-4 text-glow">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground font-inter mb-6 max-w-2xl mx-auto">
              We're here to help! Reach out to us directly for any questions not covered above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Contact Our Team
              </Button>
              <Button variant="silver" size="lg">
                Schedule a Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};