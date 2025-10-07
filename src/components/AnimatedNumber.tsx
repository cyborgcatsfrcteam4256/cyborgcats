import { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedNumber = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  className = ''
}: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};