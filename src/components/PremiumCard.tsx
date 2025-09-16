import { forwardRef, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'neon' | 'luxury' | 'cyber';
  interactive?: boolean;
  glowEffect?: boolean;
  hoverScale?: boolean;
  children: ReactNode;
}

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ 
    className, 
    variant = 'default', 
    interactive = true, 
    glowEffect = false, 
    hoverScale = true, 
    children, 
    ...props 
  }, ref) => {
    const variantClasses = {
      default: 'bg-card/80 backdrop-blur-lg border-border/50',
      glass: 'bg-white/10 backdrop-blur-xl border-white/20 text-white',
      neon: 'bg-primary-electric/10 border-primary-electric/30 shadow-cyber',
      luxury: 'bg-gradient-to-br from-card/90 to-card/70 border-primary/20 shadow-luxury',
      cyber: 'bg-gradient-to-br from-cyborg-blue/20 to-primary-electric/10 border-primary/30 shadow-elevated'
    };

    return (
      <Card
        ref={ref}
        className={cn(
          'transition-all duration-700 ease-out relative overflow-hidden',
          variantClasses[variant],
          interactive && 'interactive-card cursor-pointer',
          glowEffect && 'glow-interactive',
          hoverScale && 'hover:scale-[1.02]',
          'hover:shadow-luxury hover:border-primary/40',
          'group',
          className
        )}
        {...props}
      >
        {/* Enhanced hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Smooth flowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';