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
import { ProgressIndicator } from '@/components/Navigation/ProgressIndicator';
import { SectionNav } from '@/components/Navigation/SectionNav';
import { SectionNavigationButtons } from '@/components/Navigation/SectionNavigationButtons';

const Index = () => {
  const sections = [
    { id: 'about-us', label: 'About Us' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'what-is-first', label: 'What is FIRST?' },
    { id: 'community', label: 'Community' },
    { id: 'media', label: 'Media' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnalyticsTracker />
      <ProgressIndicator />
      <Navigation />
      <SectionNav />
      
      {/* Hero Section */}
      <section id="about-us">
        <HeroSection />
      </section>

      {/* Sponsors - Moved up to position 2 for prominence */}
      <ScrollReveal>
        <section id="sponsors">
          <SponsorsSection />
          <div className="container mx-auto px-6">
            <SectionNavigationButtons 
              previousSection={sections[0]}
              nextSection={sections[2]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Combined About FIRST + Impact in Tabs */}
      <ScrollReveal delay={100}>
        <section id="what-is-first">
          <AboutImpactTabs />
          <div className="container mx-auto px-6">
            <SectionNavigationButtons 
              previousSection={sections[1]}
              nextSection={sections[3]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Combined Testimonials + Alumni in Tabs */}
      <ScrollReveal delay={100}>
        <section id="community">
          <CommunitySection />
          <div className="container mx-auto px-6">
            <SectionNavigationButtons 
              previousSection={sections[2]}
              nextSection={sections[4]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Combined Photos + Instagram in Tabs */}
      <ScrollReveal delay={100}>
        <section id="media">
          <MediaGallery />
          <div className="container mx-auto px-6">
            <SectionNavigationButtons 
              previousSection={sections[3]}
              nextSection={sections[5]}
            />
          </div>
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
          <div className="container mx-auto px-6">
            <SectionNavigationButtons 
              previousSection={sections[4]}
              nextSection={sections[6]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Newsletter/Contact */}
      <ScrollReveal delay={100}>
        <section id="contact">
          <NewsletterSection />
          <div className="container mx-auto px-6">
            <SectionNavigationButtons 
              previousSection={sections[5]}
            />
          </div>
        </section>
      </ScrollReveal>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
