import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { ScrollReveal } from '@/components/ScrollReveal';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Download, ExternalLink, BookOpen, Loader2, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  resource_type: string;
  file_url: string | null;
  external_url: string | null;
  downloads_count: number;
  views_count: number;
  created_at: string;
}

const CATEGORIES = ['All', 'Programming', 'CAD & Design', 'Team Management', 'STEM Curriculum'];

const Resources = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(r => r.category === selectedCategory));
    }
  }, [selectedCategory, resources]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
      setFilteredResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceClick = async (resource: Resource) => {
    // Increment view count
    await supabase
      .from('resources')
      .update({ views_count: resource.views_count + 1 })
      .eq('id', resource.id);

    if (resource.resource_type === 'file' && resource.file_url) {
      // Increment download count for files
      await supabase
        .from('resources')
        .update({ downloads_count: resource.downloads_count + 1 })
        .eq('id', resource.id);

      // Download file
      const { data } = await supabase.storage
        .from('resumes')
        .download(resource.file_url);
      
      if (data) {
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.title;
        a.click();
      }
    } else if (resource.external_url) {
      window.open(resource.external_url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Resources & Learning | Cyborg Cats"
        description="Access educational resources, tutorials, and materials for robotics teams and STEM education."
      />
      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
          
          <div className="container mx-auto px-6 relative">
            <Breadcrumbs />
            
            <ScrollReveal>
              <div className="text-center mt-8 mb-16">
                <Badge variant="outline" className="mb-4 font-orbitron">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('resources.title')}
                </Badge>
                <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                  Resources & <span className="text-holographic">Learning</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t('resources.subtitle')}
                </p>
              </div>
            </ScrollReveal>

            {/* Filter */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Resources Grid */}
            {filteredResources.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  {selectedCategory === 'All' 
                    ? 'No resources available yet. Check back soon!'
                    : `No resources found in ${selectedCategory} category.`
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredResources.map((resource, index) => (
                  <ScrollReveal key={resource.id} delay={index * 100}>
                    <Card className="group h-full flex flex-col bg-card/80 backdrop-blur-lg border-border/50 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)] transition-all duration-500">
                      <CardContent className="flex-1 flex flex-col p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge 
                            variant="outline" 
                            className="font-orbitron bg-accent/10 border-accent/30 text-accent"
                          >
                            {resource.category}
                          </Badge>
                          <FileText className="w-6 h-6 text-accent" />
                        </div>

                        <h3 className="text-2xl font-orbitron font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {resource.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                          {resource.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Download className="w-3.5 h-3.5 text-accent" />
                            {resource.downloads_count} downloads
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-accent" />
                            {resource.views_count} views
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          className="w-full group/btn hover:bg-accent/10 border border-accent/20 hover:border-accent/50"
                          onClick={() => handleResourceClick(resource)}
                        >
                          {resource.resource_type === 'file' ? (
                            <>
                              <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                              {t('resources.download')}
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t('resources.viewResource')}
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
