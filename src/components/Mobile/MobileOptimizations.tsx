import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MobileOptimizationsProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileOptimizations = ({ children, className }: MobileOptimizationsProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [touchSupport, setTouchSupport] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLandscape(window.innerWidth > window.innerHeight);
      setTouchSupport('ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // Add mobile-specific optimizations
  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on input focus
      document.head.insertAdjacentHTML('beforeend', 
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">'
      );

      // Add mobile-specific styles
      document.documentElement.classList.add('mobile-optimized');
      
      if (touchSupport) {
        document.documentElement.classList.add('touch-device');
      }
    }

    return () => {
      document.documentElement.classList.remove('mobile-optimized', 'touch-device');
    };
  }, [isMobile, touchSupport]);

  return (
    <div 
      className={cn(
        // Base mobile optimizations
        'relative',
        // Touch optimizations
        touchSupport && 'touch-device',
        // Mobile-specific spacing and sizing
        isMobile && [
          'mobile-layout',
          // Larger touch targets
          '[&_button]:min-h-[44px] [&_a]:min-h-[44px]',
          // Better mobile typography
          '[&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl',
          // Mobile-optimized spacing
          '[&_.container]:px-4 [&_.section]:py-8'
        ],
        // Landscape mobile optimizations
        isLandscape && isMobile && [
          'landscape-mobile',
          // Adjust vertical spacing for landscape
          '[&_.section]:py-4'
        ],
        className
      )}
      style={{
        // CSS custom properties for dynamic adjustments
        ...(isMobile && {
          '--mobile-safe-area-top': 'env(safe-area-inset-top, 0px)',
          '--mobile-safe-area-bottom': 'env(safe-area-inset-bottom, 0px)',
          '--mobile-safe-area-left': 'env(safe-area-inset-left, 0px)',
          '--mobile-safe-area-right': 'env(safe-area-inset-right, 0px)'
        } as React.CSSProperties)
      }}
    >
      {children}
    </div>
  );
};