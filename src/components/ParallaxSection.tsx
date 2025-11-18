import { useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/utils/performance';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ParallaxSection = ({ 
  children, 
  className, 
  speed = 0.5, 
  direction = 'up' 
}: ParallaxSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    setReducedMotion(prefersReducedMotion());

    if (reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  const getTransform = () => {
    if (reducedMotion) return 'none';
    
    const offset = scrollY * speed;
    
    switch (direction) {
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(-${offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(-${offset}px)`;
    }
  };

  return (
    <div 
      className={cn('will-change-transform', className)}
      style={{
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  );
};