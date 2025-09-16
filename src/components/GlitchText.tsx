import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'cyan' | 'pink' | 'green';
}

export const GlitchText = ({ 
  children, 
  className, 
  intensity = 'medium',
  color = 'cyan' 
}: GlitchTextProps) => {
  const intensityStyles = {
    low: 'animate-[glitch-text_4s_linear_infinite]',
    medium: 'animate-[glitch-text_2s_linear_infinite]',
    high: 'animate-[glitch-text_1s_linear_infinite]'
  };

  const colorStyles = {
    cyan: '[&::before]:text-cyan-400 [&::after]:text-pink-400',
    pink: '[&::before]:text-pink-400 [&::after]:text-cyan-400',
    green: '[&::before]:text-green-400 [&::after]:text-red-400'
  };

  return (
    <span 
      className={cn(
        'relative inline-block text-white',
        intensityStyles[intensity],
        colorStyles[color],
        'before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:w-full before:h-full',
        'after:content-[attr(data-text)] after:absolute after:top-0 after:left-0 after:w-full after:h-full',
        'before:animate-[glitch-1_2s_linear_infinite_reverse]',
        'after:animate-[glitch-2_2s_linear_infinite]',
        className
      )}
      data-text={children}
    >
      {children}
    </span>
  );
};