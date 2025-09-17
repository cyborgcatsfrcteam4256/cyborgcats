import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { AboutFIRSTSection } from '@/components/AboutFIRSTSection';
import { ImpactSection } from '@/components/ImpactSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { NewsSection } from '@/components/NewsSection';
import { SponsorsSection } from '@/components/SponsorsSection';
import { PhotoGallery } from '@/components/PhotoGallery';
import { InstagramFeed } from '@/components/InstagramFeed';
import { FAQSection } from '@/components/FAQSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { ScrollReveal } from '@/components/ScrollReveal';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section id="home">
        <HeroSection />
      </section>
      <ScrollReveal>
        <section id="about">
          <AboutFIRSTSection />
        </section>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <section id="impact">
          <ImpactSection />
        </section>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <section id="competitions">
          <NewsSection />
        </section>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <section id="sponsors">
          <SponsorsSection />
        </section>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <section id="team">
          <PhotoGallery />
        </section>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <InstagramFeed />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <FAQSection />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <section id="contact">
          <NewsletterSection />
        </section>
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;
