import { useEffect } from 'react';

export const MobileOptimizations = () => {
  useEffect(() => {
    // Add touch-action optimization
    document.body.style.touchAction = 'pan-y';

    // Improve tap highlighting
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-tap-highlight-color: rgba(0, 130, 201, 0.2);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.touchAction = '';
    };
  }, []);

  return null;
};
