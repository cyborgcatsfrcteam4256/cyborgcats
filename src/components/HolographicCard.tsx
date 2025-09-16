import { forwardRef, ReactNode, useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'matrix' | 'neon' | 'cyber' | 'ghost';
  interactive?: boolean;
  scanlines?: boolean;
  glitchEffect?: boolean;
  children: ReactNode;
}

export const HolographicCard = forwardRef<HTMLDivElement, HolographicCardProps>(
  ({ 
    className, 
    variant = 'default', 
    interactive = true, 
    scanlines = true,
    glitchEffect = false,
    children, 
    ...props 
  }, ref) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    const variantClasses = {
      default: 'bg-black/50 border border-cyan-400/50 backdrop-blur-lg',
      matrix: 'bg-black/80 border border-green-400/50 text-green-400',
      neon: 'bg-transparent border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)]',
      cyber: 'bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/50',
      ghost: 'bg-white/5 border border-white/20 backdrop-blur-xl'
    };

    return (
      <Card
        ref={ref}
        className={cn(
          'relative overflow-hidden transition-all duration-500 group',
          variantClasses[variant],
          interactive && 'cursor-pointer hover:scale-[1.02] hover:-translate-y-2',
          interactive && 'hover:shadow-[0_0_50px_rgba(0,255,255,0.5)]',
          glitchEffect && 'hover:animate-[glitch-text_0.5s_linear_infinite]',
          className
        )}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {/* Holographic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0, 255, 255, 0.1), transparent 50%)`
          }}
        />

        {/* Matrix-style corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400 opacity-60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400 opacity-60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-60" />

        {/* Scanlines effect */}
        {scanlines && (
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.05)_2px,rgba(0,255,255,0.05)_4px)] animate-[scanline-flicker_0.1s_linear_infinite]" />
        )}

        {/* Data stream effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-[dataFlow_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-100" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Holographic shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Card>
    );
  }
);

HolographicCard.displayName = 'HolographicCard';