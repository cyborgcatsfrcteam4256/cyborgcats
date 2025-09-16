import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LiquidButtonProps extends ButtonProps {
  liquidEffect?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
}

export const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, liquidEffect = true, glowIntensity = 'medium', children, ...props }, ref) => {
    const glowClasses = {
      low: 'hover:shadow-elevated',
      medium: 'hover:shadow-luxury',
      high: 'hover:shadow-glow',
    };

    return (
      <Button
        ref={ref}
        className={cn(
          'relative overflow-hidden group',
          liquidEffect && 'liquid-button',
          glowClasses[glowIntensity],
          'transition-all duration-500 ease-out',
          'hover:scale-105 hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {/* Liquid flow effect */}
        {liquidEffect && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
              style={{ animationDelay: '0.1s' }}
            />
          </div>
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>

        {/* Energy border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Button>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';