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
  const xOffset = Math.sin(scrollProgress * Math.PI * 2) * 10;
  const yOffset = Math.cos(scrollProgress * Math.PI * 3) * 8;

  return (
    <>
      {/* Primary floating cat group - top right */}
      <div 
        className="fixed top-1/4 right-16 z-20 pointer-events-none transition-all duration-700 ease-out"
        style={{
          transform: `translate(${xOffset}px, ${yOffset}px)`,
          opacity: 0.12,
        }}
      >
        <div className="relative">
          {/* Group of three cats in triangular formation */}
          <div className="relative">
            {/* Top cat */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <img 
                src={cyborgCatsLogo} 
                alt="" 
                className="w-8 h-8 object-contain animate-cyber-float"
              />
            </div>
            
            {/* Bottom left cat */}
            <div className="absolute top-4 -left-3">
              <img 
                src={cyborgCatsLogo} 
                alt="" 
                className="w-6 h-6 object-contain animate-cyber-float opacity-80"
                style={{ animationDelay: '0.8s' }}
              />
            </div>
            
            {/* Bottom right cat */}
            <div className="absolute top-4 -right-3">
              <img 
                src={cyborgCatsLogo} 
                alt="" 
                className="w-6 h-6 object-contain animate-cyber-float opacity-80"
                style={{ animationDelay: '1.6s' }}
              />
            </div>
          </div>
          
          {/* Subtle connecting lines */}
          <div className="absolute top-2 left-0 w-6 h-px bg-primary/10 rotate-45"></div>
          <div className="absolute top-2 right-0 w-6 h-px bg-primary/10 -rotate-45"></div>
        </div>
      </div>

      {/* Secondary floating cat group - bottom left */}
      <div 
        className="fixed bottom-1/3 left-20 z-20 pointer-events-none transition-all duration-900 ease-out"
        style={{
          transform: `translate(${-xOffset * 0.6}px, ${-yOffset * 0.8}px)`,
          opacity: 0.08,
        }}
      >
        <div className="relative">
          {/* Horizontal formation of three cats */}
          <div className="flex items-center space-x-4">
            <img 
              src={cyborgCatsLogo} 
              alt="" 
              className="w-5 h-5 object-contain animate-cyber-float"
            />
            <img 
              src={cyborgCatsLogo} 
              alt="" 
              className="w-6 h-6 object-contain animate-cyber-float"
              style={{ animationDelay: '1s' }}
            />
            <img 
              src={cyborgCatsLogo} 
              alt="" 
              className="w-4 h-4 object-contain animate-cyber-float opacity-70"
              style={{ animationDelay: '2s' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};