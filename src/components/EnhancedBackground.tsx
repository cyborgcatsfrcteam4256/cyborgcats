import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedBackgroundProps {
  variant?: 'subtle' | 'dynamic' | 'particles';
  className?: string;
}

export const EnhancedBackground = ({ variant = 'subtle', className }: EnhancedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    if (variant === 'dynamic') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [variant]);

  if (variant === 'particles') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        {/* Animated particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="floating-orb"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 130, 201, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 130, 201, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    );
  }

  if (variant === 'dynamic') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        {/* Dynamic gradient orbs that follow mouse */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.4), hsl(var(--primary-glow) / 0.2), transparent)',
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        <div 
          className="absolute w-64 h-64 rounded-full blur-2xl opacity-40 transition-all duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary-electric) / 0.3), transparent)',
            left: `${(1 - mousePosition.x) * 100}%`,
            top: `${(1 - mousePosition.y) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Animated circuit lines */}
        <div className="absolute inset-0 circuit-pattern opacity-10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Subtle static background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background/50 via-transparent to-background/30" />
      
      {/* Static orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/15 rounded-full blur-3xl animate-cyber-float" />
    </div>
  );
};