import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { AboutImpactTabs } from '@/components/AboutImpactTabs';
import { SponsorsSection } from '@/components/SponsorsSection';
import { CommunitySection } from '@/components/CommunitySection';
import { MediaGallery } from '@/components/MediaGallery';
import { FAQSection } from '@/components/FAQSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BackToTop } from '@/components/BackToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnalyticsTracker />
      <Navigation />
      
      {/* Hero Section */}
      <section id="about-us">
        <HeroSection />
      </section>

      {/* Sponsors - Moved up to position 2 for prominence */}
      <ScrollReveal>
        <section id="sponsors">
          <SponsorsSection />
        </section>
      </ScrollReveal>

      {/* Combined About FIRST + Impact in Tabs */}
      <ScrollReveal delay={100}>
        <section id="what-is-first">
          <AboutImpactTabs />
        </section>
      </ScrollReveal>

      {/* Combined Testimonials + Alumni in Tabs */}
      <ScrollReveal delay={100}>
        <section id="community">
          <CommunitySection />
        </section>
      </ScrollReveal>

      {/* Combined Photos + Instagram in Tabs */}
      <ScrollReveal delay={100}>
        <section id="media">
          <MediaGallery />
        </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal delay={100}>
        <FAQSection />
      </ScrollReveal>

      {/* Resources Section */}
      <ScrollReveal delay={100}>
        <section id="resources">
          <ResourcesSection />
        </section>
      </ScrollReveal>

      {/* Newsletter/Contact */}
      <ScrollReveal delay={100}>
        <section id="contact">
          <NewsletterSection />
        </section>
      </ScrollReveal>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
