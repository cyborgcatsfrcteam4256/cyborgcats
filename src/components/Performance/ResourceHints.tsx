import { useEffect } from 'react';

interface ResourceHint {
  url: string;
  type: 'preconnect' | 'dns-prefetch' | 'preload' | 'prefetch';
  as?: string;
  crossorigin?: boolean;
}

const hints: ResourceHint[] = [
  // Font resources
  { url: 'https://fonts.googleapis.com', type: 'preconnect' },
  { url: 'https://fonts.gstatic.com', type: 'preconnect', crossorigin: true },
  
  // Backend API - establish connection early to reduce network chain
  { url: 'https://tsjobgooiktsyergnxlk.supabase.co', type: 'preconnect', crossorigin: true },
  
  // Common external resources
  { url: '//www.thebluealliance.com', type: 'dns-prefetch' },
  { url: '//www.firstinspires.org', type: 'dns-prefetch' },
];

export const ResourceHints = () => {
  useEffect(() => {
    hints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.type;
      link.href = hint.url;
      
      if (hint.as) {
        link.setAttribute('as', hint.as);
      }
      
      if (hint.crossorigin) {
        link.setAttribute('crossorigin', 'anonymous');
      }

      // Check if link already exists
      const existing = document.querySelector(
        `link[rel="${hint.type}"][href="${hint.url}"]`
      );
      
      if (!existing) {
        document.head.appendChild(link);
      }
    });
  }, []);

  return null;
};

// Critical CSS loader
export const CriticalCSS = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalStyles = `
      /* Critical styles for initial render */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalStyles;
    style.setAttribute('data-critical', 'true');
    
    const existing = document.querySelector('style[data-critical="true"]');
    if (!existing) {
      document.head.appendChild(style);
    }
  }, []);

  return null;
};