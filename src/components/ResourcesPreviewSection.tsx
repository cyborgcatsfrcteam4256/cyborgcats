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
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-audiowide text-sm tracking-wider">{t('resources.title')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-audiowide font-black mb-6 text-glow">
            {t('resources.subtitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('resources.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {resources.map((resource, index) => (
            <ScrollReveal key={resource.id} delay={index * 100}>
              <Card className="group h-full flex flex-col bg-card/80 backdrop-blur-lg border-border/50 hover-glow transition-cyber">
                <CardContent className="flex-1 flex flex-col p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className="font-audiowide">
                      {resource.category}
                    </Badge>
                    <FileText className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-2xl font-audiowide font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {resource.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Download className="w-3.5 h-3.5" />
                    {resource.downloads_count} downloads
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full group/btn hover:bg-primary/10"
                    onClick={() => {
                      if (resource.file_url) {
                        window.open(resource.file_url, '_blank');
                      } else if (resource.external_url) {
                        window.open(resource.external_url, '_blank');
                      }
                    }}
                  >
                    {resource.file_url ? 'Download' : 'View Resource'}
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
          >
            {t('resources.viewAll')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
