import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CompetitionDashboard } from '@/components/Analytics/CompetitionDashboard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 font-orbitron">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance Analytics
              </Badge>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 text-glow">
                Competition <span className="text-holographic">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Data-driven analysis of our performance across competitions, 
                helping us continuously improve and achieve excellence.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <CompetitionDashboard />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Analytics;
