import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { ImpactSection } from '@/components/ImpactSection';
import { StatsShowcase } from '@/components/StatsShowcase';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { NewsSection } from '@/components/NewsSection';
import { PhotoGallery } from '@/components/PhotoGallery';
import { InstagramFeed } from '@/components/InstagramFeed';
import { FAQSection } from '@/components/FAQSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MatrixBackground } from '@/components/MatrixBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ultimate Y2K Matrix Background */}
      <MatrixBackground intensity="medium" color="cyan" />
      
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 scanlines" />
      
      {/* Main content */}
      <div className="relative z-20">
        <Navigation />
        <HeroSection />
        <ScrollReveal>
          <ImpactSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <StatsShowcase />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <NewsSection />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <PhotoGallery />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <InstagramFeed />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <FAQSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <NewsletterSection />
        </ScrollReveal>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
