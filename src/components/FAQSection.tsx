import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, HelpCircle, Users, Award, Lightbulb } from 'lucide-react';

export const FAQSection = () => {
  const navigate = useNavigate();
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
          answer: "Time commitment varies based on your leadership role and personal level of involvement. We believe in flexible participation that works with your academic schedule and other commitments. Whether you're looking for a few hours a week or want to dive deep into intensive project work, we'll help you find the right balance to maximize your learning and contribution to the team."
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
          question: "What competitions does the team participate in?",
          answer: "We compete year-round to maximize our growth and impact! During the regular season, we participate in the St. Louis area FIRST Regional and at least one additional regional competition. Our ultimate goal is qualifying for the FIRST Championship (Worlds) where we can compete against the best teams globally. We also engage in off-season competitions throughout the year to continue developing our skills, test new strategies, and build lasting relationships with teams from across the region."
        },
        {
          question: "How can I support the team?",
          answer: "There are many ways to support our team - from sponsorship opportunities to volunteering at events. We welcome community partnerships and are always looking for mentors with technical or business expertise."
        }
      ]
    },
    {
      category: "Community Impact",
      icon: Lightbulb,
      questions: [
        {
          question: "What are your Women in STEM seminars?",
          answer: "Our Women in STEM seminars are public workshops held at Westminster Christian Academy, featuring industry professionals and hands-on activities. We've welcomed over 100 attendees over the past three years. All of our business and engineering upper leadership is female, demonstrating our commitment to women in STEM leadership."
        },
        {
          question: "How does your legislative advocacy work?",
          answer: "We actively engage with Missouri state legislators to advocate for STEM education policy. Our team has met with 19 representatives and the Lieutenant Governor, supporting bills like HB 256 that expand STEM opportunities statewide."
        },
        {
          question: "What is the STEM Companion Initiative?",
          answer: "The STEM Companion Initiative is our flagship program connecting children with special needs to STEM education. We've hosted over 5 demonstrations and events, including Easter egg hunts, offering STEM-related games and robot demonstrations. We also created stemcompanion.org with publicly accessible resources."
        },
        {
          question: "Tell me about your international partnerships.",
          answer: "We've helped establish South Korea's 4th FRC team at Samuel School after visiting and demonstrating STEM activities in 2023. In Ethiopia, a team member's family led STEM activities for 115 students, creating water bottle cars to highlight sustainability while providing robotics jerseys. Before our work, only 2 active FRC teams existed in all of Africa."
        },
        {
          question: "What other community programs do you run?",
          answer: "We host the annual St. Louis FLL Season Kickoff (900+ people over 3 years), conduct FIRST Robotics classes at Camp Westminster (120 students over 3 years), organize Team Planting Workshops, mentor multiple FLL teams including the Champion's Award-winning Hedgehog Hackers, and provide practice fields for 70+ FRC teams at regionals."
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
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Contact Our Team
              </Button>
              <Button 
                variant="silver" 
                size="lg"
                onClick={() => navigate('/contact?subject=visit')}
              >
                Schedule a Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};