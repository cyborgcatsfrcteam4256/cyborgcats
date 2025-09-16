import { useState, useEffect } from 'react';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

export const FloatingLogo = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show logo after scrolling past first section
      setIsVisible(scrollY > windowHeight * 0.8);
      
      // Update position based on scroll
      const newX = Math.sin(scrollY * 0.001) * 30;
      const newY = Math.cos(scrollY * 0.0008) * 20;
      setPosition({ x: newX, y: newY });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-20 right-8 z-40 pointer-events-none transition-all duration-1000 ease-out opacity-30 hover:opacity-60"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className="relative">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        
        {/* Logo */}
        <img 
          src={cyborgCatsLogo} 
          alt="Cyborg Cats Logo" 
          className="w-12 h-12 object-contain relative z-10 animate-cyber-float filter drop-shadow-lg"
        />
        
        {/* Cyber ring effect */}
        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-2 border border-primary-glow/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
      </div>
    </div>
  );
};