import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FloatingKebabMenu = () => {
  const [activeDot, setActiveDot] = useState(0);
  const navigate = useNavigate();

  const sections = [
    { id: 'about-us', label: 'About Us' },
    { id: 'what-is-first', label: 'What is FIRST?' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'community', label: 'Community' },
    { id: 'media', label: 'Media' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleDotClick = (index: number) => {
    setActiveDot(index);
    const section = sections[index];
    const element = document.getElementById(section.id);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 group/menu">
      {sections.map((section, index) => (
        <div key={index} className="relative">
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/menu:opacity-100 pointer-events-none transition-opacity duration-300">
            <div className="glass-morphism border border-primary/30 rounded-lg px-3 py-2 whitespace-nowrap shadow-luxury">
              <span className="font-orbitron text-xs font-bold text-foreground">
                {section.label}
              </span>
            </div>
          </div>

          {/* Dot Button */}
          <button
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
              activeDot === index
                ? 'bg-primary scale-125 shadow-glow'
                : 'bg-primary/40 hover:bg-primary/70'
            }`}
            aria-label={`Go to ${section.label}`}
          />
        </div>
      ))}
    </div>
  );
};
