import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FloatingKebabMenu = () => {
  const [activeDot, setActiveDot] = useState(0);
  const navigate = useNavigate();

  const sections = [
    { id: 'about-us', label: 'About Us' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'what-is-first', label: 'What is FIRST?' },
    { id: 'news', label: 'News' },
    { id: 'resources', label: 'Resources' },
    { id: 'community', label: 'Community' },
    { id: 'media', label: 'Media' },
    { id: 'contact', label: 'Contact' },
  ];

  // Detect which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex(section => section.id === entry.target.id);
          if (index !== -1) {
            setActiveDot(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (index: number) => {
    setActiveDot(index);
    const section = sections[index];
    const element = document.getElementById(section.id);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 group/menu">
      {/* Connecting Line */}
      <div className="absolute right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent transform translate-x-1/2" />
      
      {sections.map((section, index) => (
        <div key={index} className="relative group/dot">
          {/* Glow Ring */}
          <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${
            activeDot === index 
              ? 'bg-primary/60 scale-[3]' 
              : 'bg-primary/0 scale-0 group-hover/dot:bg-primary/40 group-hover/dot:scale-[2.5]'
          }`} />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/dot:opacity-100 group-hover/dot:translate-x-0 translate-x-2 pointer-events-none transition-all duration-300">
            <div className="glass-morphism border-2 border-primary/40 rounded-xl px-4 py-2.5 whitespace-nowrap shadow-luxury relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 animate-shimmer" />
              <span className="font-orbitron text-sm font-bold text-foreground relative z-10">
                {section.label}
              </span>
            </div>
          </div>

          {/* Dot Button */}
          <button
            onClick={() => handleDotClick(index)}
            className={`relative w-4 h-4 rounded-full transition-all duration-500 hover:scale-[2] group/button ${
              activeDot === index
                ? 'scale-[1.5]'
                : 'scale-100'
            }`}
            aria-label={`Go to ${section.label}`}
          >
            {/* Inner gradient dot */}
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
              activeDot === index
                ? 'bg-gradient-to-br from-primary via-primary-glow to-primary-electric shadow-glow animate-pulse'
                : 'bg-gradient-to-br from-primary/50 to-primary/30 group-hover/button:from-primary/80 group-hover/button:to-primary-glow/60'
            }`} />
            
            {/* Outer ring */}
            <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
              activeDot === index
                ? 'border-primary scale-150 opacity-100'
                : 'border-primary/0 scale-100 group-hover/button:border-primary/60 group-hover/button:scale-125'
            }`} />
            
            {/* Slow color morph effect */}
            {activeDot === index && (
              <div className="absolute inset-0 rounded-full bg-white" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};
