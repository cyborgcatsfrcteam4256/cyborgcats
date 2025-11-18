import { useEffect, useCallback, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

let rafId: number = 0;

export const useOptimizedScroll = (throttleMs: number = 100) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    // Batch reads in a single animation frame to prevent forced reflows
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY,
        });
        setIsScrolling(true);
        rafId = 0;
      });
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      handleScroll();

      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, throttleMs);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll, throttleMs]);

  return { scrollPosition, isScrolling };
};

// Smooth scroll utility with reduced motion support
export const smoothScrollTo = (targetY: number, duration: number = 800) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-in-out)
    const easing = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startY + difference * easing);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};
