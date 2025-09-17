import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'display' | 'heading' | 'body' | 'caption';
  glow?: boolean;
  holographic?: boolean;
  shimmer?: boolean;
}

export const ResponsiveText = forwardRef<HTMLDivElement, ResponsiveTextProps>(
  ({ className, variant = 'body', glow = false, holographic = false, shimmer = false, children, ...props }, ref) => {
    const baseClasses = "transition-all duration-500";
    
    const variantClasses = {
      display: "text-4xl md:text-6xl lg:text-8xl font-orbitron font-black leading-tight",
      heading: "text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold leading-tight",
      body: "text-base md:text-lg lg:text-xl font-inter leading-relaxed",
      caption: "text-sm md:text-base font-inter"
    };

    const effectClasses = {
      glow: glow ? "text-glow" : "",
      holographic: holographic ? "text-holographic" : "",
      shimmer: shimmer ? "text-shimmer" : ""
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          effectClasses.glow,
          effectClasses.holographic,
          effectClasses.shimmer,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveText.displayName = 'ResponsiveText';

interface AdaptiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const AdaptiveContainer = forwardRef<HTMLDivElement, AdaptiveContainerProps>(
  ({ className, maxWidth = 'xl', padding = 'md', children, ...props }, ref) => {
    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-none'
    };

    const paddingClasses = {
      none: '',
      sm: 'px-4',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
      xl: 'px-8 sm:px-12 lg:px-16'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto',
          maxWidthClasses[maxWidth],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AdaptiveContainer.displayName = 'AdaptiveContainer';