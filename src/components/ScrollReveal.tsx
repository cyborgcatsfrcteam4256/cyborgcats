import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export const ScrollReveal = ({ 
  children, 
  className, 
  delay = 0, 
  threshold = 0.1,
  direction = 'up'
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (direction) {
      case 'up':
        return 'animate-slide-up';
      case 'down':
        return 'opacity-100 translate-y-0 transition-all duration-700 ease-out';
      case 'left':
        return 'opacity-100 translate-x-0 transition-all duration-700 ease-out';
      case 'right':
        return 'opacity-100 -translate-x-0 transition-all duration-700 ease-out';
      case 'scale':
        return 'animate-scale-in';
      default:
        return 'animate-slide-up';
    }
  };

  const getInitialClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8';
      case 'down':
        return '-translate-y-8';
      case 'left':
        return 'translate-x-8';
      case 'right':
        return '-translate-x-8';
      case 'scale':
        return 'scale-95';
      default:
        return 'translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !isVisible && getInitialClass(),
        getAnimationClass(),
        className
      )}
    >
      {children}
    </div>
  );
};