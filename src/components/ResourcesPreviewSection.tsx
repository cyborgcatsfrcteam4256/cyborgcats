import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EnhancedBackground } from '@/components/EnhancedBackground';
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

  if (loading || resources.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      <EnhancedBackground variant="subtle" className="opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8 border border-accent/20">
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="font-audiowide text-sm tracking-wider text-accent">{t('resources.title')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-audiowide font-black mb-6 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            {t('resources.subtitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('resources.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {resources.map((resource, index) => (
            <ScrollReveal key={resource.id} delay={index * 100}>
              <Card className="group h-full flex flex-col bg-card/80 backdrop-blur-lg border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-all duration-500">
                <CardContent className="flex-1 flex flex-col p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge 
                      variant="outline" 
                      className="font-audiowide bg-accent/10 border-accent/30 text-accent hover:bg-accent/20"
                    >
                      {resource.category}
                    </Badge>
                    <FileText className="w-6 h-6 text-accent" />
                  </div>

                  <h3 className="text-2xl font-audiowide font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {resource.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Download className="w-3.5 h-3.5 text-accent" />
                    {resource.downloads_count} {t('resources.downloads')}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full group/btn hover:bg-accent/10 border border-accent/20 hover:border-accent/50"
                    onClick={() => {
                      if (resource.file_url) {
                        window.open(resource.file_url, '_blank');
                      } else if (resource.external_url) {
                        window.open(resource.external_url, '_blank');
                      }
                    }}
                  >
                    {resource.file_url ? t('resources.download') : t('resources.viewResource')}
                    {resource.file_url ? (
                      <Download className="ml-2 w-4 h-4" />
                    ) : (
                      <ExternalLink className="ml-2 w-4 h-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="group relative overflow-hidden hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)]"
          >
            <span className="relative z-10">{t('resources.viewAll')}</span>
            <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
          </Button>
        </div>
      </div>
    </section>
  );
};
