import { useEffect, useState } from 'react';

/**
 * Progress indicator that shows scroll progress at the top of the page
 */
export const ProgressIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-background/20">
      <div 
        className="h-full bg-gradient-to-r from-primary via-primary-glow to-accent transition-all duration-150 ease-out shadow-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
