import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CompetitionDashboard } from '@/components/Analytics/CompetitionDashboard';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { ScrollReveal } from '@/components/ScrollReveal';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs />
          <ScrollReveal>
            <CompetitionDashboard />
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;