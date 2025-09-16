import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CyberButtonProps extends Omit<ButtonProps, 'variant'> {
  cyberVariant?: 'default' | 'neon' | 'matrix' | 'glitch' | 'hologram';
  glowIntensity?: 'low' | 'medium' | 'high';
  scanlines?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, cyberVariant = 'neon', glowIntensity = 'medium', scanlines = true, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30',
      neon: 'bg-transparent border-2 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] hover:text-white',
      matrix: 'bg-black border border-green-400 text-green-400 font-mono shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,0,0.8)]',
      glitch: 'bg-primary/10 border border-pink-400 text-white shadow-[0_0_20px_rgba(255,20,147,0.5)] hover:animate-[glitch-text_0.3s_linear_infinite]',
      hologram: 'bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-transparent text-white backdrop-blur-sm'
    };

    const glowStyles = {
      low: 'hover:drop-shadow-[0_0_10px_currentColor]',
      medium: 'hover:drop-shadow-[0_0_20px_currentColor]',
      high: 'hover:drop-shadow-[0_0_30px_currentColor]'
    };

    return (
      <Button
        ref={ref}
        className={cn(
          'relative overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
          'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
          variantStyles[cyberVariant],
          glowStyles[glowIntensity],
          scanlines && 'after:absolute after:inset-0 after:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)] after:animate-[scanline-flicker_0.1s_linear_infinite]',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Button>
    );
  }
);

CyberButton.displayName = 'CyberButton';