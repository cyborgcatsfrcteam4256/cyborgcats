import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Home, Users, Trophy, Camera, BookOpen, Mail } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  { id: 'about-us', label: 'About', icon: Home },
  { id: 'sponsors', label: 'Sponsors', icon: Trophy },
  { id: 'what-is-first', label: 'FIRST', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'media', label: 'Media', icon: Camera },
  { id: 'contact', label: 'Contact', icon: Mail },
];

/**
 * Floating section navigation for the homepage
 * Shows all sections and highlights the current one as user scrolls
 */
export const SectionNav = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Show nav after scrolling past hero
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop - Right side floating nav */}
      <Card className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40 p-3 bg-card/95 backdrop-blur-lg border-border/50 shadow-luxury">
        <nav className="flex flex-col gap-2">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                activeSection === id
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
              title={label}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeSection === id ? 'opacity-100 max-w-[100px]' : 'opacity-0 max-w-0 overflow-hidden'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </nav>
      </Card>

      {/* Mobile - Bottom sheet */}
      <Card className="xl:hidden fixed bottom-4 left-4 right-4 z-40 p-2 bg-card/95 backdrop-blur-lg border-border/50 shadow-luxury">
        <nav className="flex justify-around gap-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all duration-300 flex-1 ${
                activeSection === id
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </Card>
    </>
  );
};
