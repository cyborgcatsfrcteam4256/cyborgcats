import { useState, useEffect } from 'react';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const FloatingLogo = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      // Show logo after scrolling past hero section
      setIsVisible(scrollY > windowHeight * 0.6);
      
      // Calculate scroll progress for smooth animations
      const progress = Math.min(scrollY / documentHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  // Calculate position based on scroll progress for more natural movement
  const xOffset = Math.sin(scrollProgress * Math.PI * 2) * 15;
  const yOffset = Math.cos(scrollProgress * Math.PI * 3) * 10;
  const rotation = scrollProgress * 360;

  return (
    <>
      {/* Main floating logo */}
      <div 
        className="fixed top-1/4 right-12 z-30 pointer-events-none transition-all duration-500 ease-out"
        style={{
          transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation * 0.1}deg)`,
          opacity: 0.25 + (Math.sin(scrollProgress * Math.PI * 4) * 0.15),
        }}
      >
        <div className="relative">
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
          
          {/* Logo with integrated design */}
          <div className="relative bg-gradient-to-br from-primary/5 to-primary-glow/5 rounded-full p-3 backdrop-blur-sm border border-primary/10">
            <img 
              src={cyborgCatsLogo} 
              alt="" 
              className="w-10 h-10 object-contain filter drop-shadow-sm"
            />
          </div>
          
          {/* Cyber circuit lines extending from logo */}
          <div className="absolute top-1/2 -left-8 w-8 h-px bg-gradient-to-r from-transparent to-primary/20"></div>
          <div className="absolute top-1/2 -right-8 w-8 h-px bg-gradient-to-l from-transparent to-primary/20"></div>
          <div className="absolute -top-8 left-1/2 w-px h-8 bg-gradient-to-b from-transparent to-primary/20"></div>
        </div>
      </div>

      {/* Secondary floating logo - smaller, different position */}
      <div 
        className="fixed bottom-1/3 left-16 z-30 pointer-events-none transition-all duration-700 ease-out"
        style={{
          transform: `translate(${-xOffset * 0.5}px, ${-yOffset * 0.7}px) rotate(${-rotation * 0.05}deg)`,
          opacity: 0.15 + (Math.cos(scrollProgress * Math.PI * 3) * 0.1),
        }}
      >
        <div className="relative">
          <div className="bg-gradient-to-br from-primary-glow/5 to-primary/5 rounded-full p-2 backdrop-blur-sm border border-primary-glow/10">
            <img 
              src={cyborgCatsLogo} 
              alt="" 
              className="w-6 h-6 object-contain opacity-60"
            />
          </div>
        </div>
      </div>
    </>
  );
};