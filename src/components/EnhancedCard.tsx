import { forwardRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glowEffect?: boolean;
  hoverScale?: boolean;
}

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, interactive = true, glowEffect = false, hoverScale = true, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'transition-all duration-500 ease-out',
          'bg-card/80 backdrop-blur-lg border-border/50',
          interactive && 'interactive-card cursor-pointer',
          glowEffect && 'glow-interactive',
          hoverScale && 'hover:scale-[1.02]',
          'hover:shadow-luxury hover:border-primary/30',
          'group relative overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    );
  }
);

EnhancedCard.displayName = 'EnhancedCard';