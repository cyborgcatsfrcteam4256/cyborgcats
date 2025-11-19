import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink, ArrowRight, BookOpen, Sparkles, Zap, Rocket } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { PremiumCard } from '@/components/PremiumCard';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const ResourcesPreviewSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_approved", true)
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const categoryIcons = {
    'Technical': Zap,
    'Educational': BookOpen,
    'Competition': Rocket,
    'Programming': FileText,
  };

  if (loading || resources.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary-electric/5" />
        <div className="absolute inset-0 circuit-pattern opacity-10 animate-pulse" />
        <EnhancedBackground variant="particles" className="opacity-40" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            {/* Floating Badge */}
            <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8 border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 shadow-luxury hover:shadow-cyber group animate-float">
              <BookOpen className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-500" />
              <span className="font-orbitron text-sm tracking-wider text-primary font-bold">{t('resources.title')}</span>
              <Sparkles className="w-5 h-5 text-primary-glow animate-pulse" />
            </div>
            
            {/* Title with Gradient Animation */}
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary-electric bg-clip-text text-transparent animate-gradient bg-300%">
                {t('resources.subtitle')}
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-inter mb-8">
              {t('resources.description')}
            </p>
            
            {/* Stats Bar */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="glass-morphism px-6 py-3 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-500 group">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-orbitron text-sm text-muted-foreground">
                    <span className="text-primary font-bold">{resources.length}</span> Featured
                  </span>
                </div>
              </div>
              <div className="glass-morphism px-6 py-3 rounded-full border border-primary-glow/20 hover:border-primary-glow/40 transition-all duration-500 group">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary-glow group-hover:scale-110 transition-transform" />
                  <span className="font-orbitron text-sm text-muted-foreground">
                    <span className="text-primary-glow font-bold">Free</span> Access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {resources.map((resource, index) => {
            const CategoryIcon = categoryIcons[resource.category as keyof typeof categoryIcons] || FileText;
            
            return (
              <ScrollReveal key={resource.id} delay={index * 150}>
                <PremiumCard 
                  variant={index === 0 ? "luxury" : index === 1 ? "cyber" : "glass"}
                  className="group h-full flex flex-col relative overflow-hidden"
                  interactive
                  glowEffect
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-electric/10" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                  </div>

                  <CardContent className="flex-1 flex flex-col p-8 relative z-10">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <Badge 
                        className="font-orbitron bg-gradient-to-r from-primary/20 to-primary-glow/20 border-2 border-primary/30 text-primary hover:border-primary/60 transition-all duration-500 group-hover:scale-110"
                      >
                        {resource.category}
                      </Badge>
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/30 group-hover:border-primary/60 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-orbitron font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-2 text-glow">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 flex-1 line-clamp-3 leading-relaxed font-inter">
                      {resource.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-primary/20">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Download className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">
                          <span className="text-primary font-bold font-orbitron">{resource.downloads_count}</span> {t('resources.downloads')}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="premium"
                      className="w-full group/btn"
                      onClick={() => {
                        if (resource.file_url) {
                          window.open(resource.file_url, '_blank');
                        } else if (resource.external_url) {
                          window.open(resource.external_url, '_blank');
                        }
                      }}
                    >
                      {resource.file_url ? (
                        <>
                          <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                          {t('resources.download')}
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-45 transition-transform duration-500" />
                          {t('resources.viewResource')}
                        </>
                      )}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </Button>
                  </CardContent>
                </PremiumCard>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="text-center relative">
            {/* Decorative Elements */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative glass-morphism rounded-3xl p-12 border-2 border-primary/30 hover:border-primary/60 transition-all duration-700 shadow-luxury hover:shadow-cyber group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-electric/5 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="mb-6">
                  <Sparkles className="w-12 h-12 text-primary mx-auto animate-pulse" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-orbitron font-black mb-4 text-glow">
                  Explore Our Full Resource Library
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-inter">
                  Access technical documentation, CAD files, programming guides, and competition resources to fuel your robotics journey
                </p>
                
                <Button
                  variant="premium"
                  size="lg"
                  className="group/btn text-lg px-8 py-6 h-auto"
                  onClick={() => navigate('/resources')}
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover/btn:translate-y-[-4px] transition-transform duration-500" />
                  {t('resources.viewAll')}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
