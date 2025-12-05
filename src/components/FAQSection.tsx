import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { StructuredData } from '@/components/SEO/StructuredData';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, HelpCircle, Users, Award, Lightbulb, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}

export const FAQSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const categoryIcons: Record<string, any> = {
    'Joining the Team': Users,
    'Competition & Awards': Award,
    'Community Impact': Lightbulb
  };

  // Flatten FAQs for structured data
  const allFAQs = faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));

  if (loading) {
    return (
      <section className="py-24 bg-card/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      <StructuredData type="faq" data={allFAQs} />
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

        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No FAQs available at this time.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs], categoryIndex) => {
              const CategoryIcon = categoryIcons[category] || HelpCircle;
              
              return (
                <Card 
                  key={category}
                  className="bg-card/80 backdrop-blur-lg border-border/50 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-subtle">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-orbitron font-bold text-glow">
                        {category}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {categoryFaqs.map((faq) => {
                        const isOpen = openItems.includes(faq.id);
                        
                        return (
                          <div 
                            key={faq.id}
                            className="border border-border/30 rounded-lg bg-card/40 hover:bg-card/60 transition-cyber"
                          >
                            <button
                              onClick={() => toggleItem(faq.id)}
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
              );
            })}
          </div>
        )}

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