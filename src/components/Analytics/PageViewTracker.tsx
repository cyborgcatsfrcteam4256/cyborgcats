import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageView {
  path: string;
  title: string;
  timestamp: number;
  referrer: string;
  userAgent: string;
}

export const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = () => {
      const pageView: PageView = {
        path: location.pathname,
        title: document.title,
        timestamp: Date.now(),
        referrer: document.referrer,
        userAgent: navigator.userAgent
      };

      // Store in localStorage for basic analytics
      const views = JSON.parse(localStorage.getItem('pageViews') || '[]');
      views.push(pageView);
      
      // Keep only last 100 page views to prevent storage bloat
      if (views.length > 100) {
        views.shift();
      }
      
      localStorage.setItem('pageViews', JSON.stringify(views));

      // Log for debugging (can be removed in production)
      console.log('Page view tracked:', pageView);

      // Send to analytics service if configured
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: location.pathname,
        });
      }
    };

    trackPageView();
  }, [location]);

  return null;
};

// Helper function to get analytics data
export const getAnalyticsData = () => {
  const views = JSON.parse(localStorage.getItem('pageViews') || '[]');
  
  // Calculate page view stats
  const stats = views.reduce((acc: any, view: PageView) => {
    acc[view.path] = (acc[view.path] || 0) + 1;
    return acc;
  }, {});

  // Get most viewed pages
  const sortedPages = Object.entries(stats)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 10);

  return {
    totalViews: views.length,
    uniquePaths: Object.keys(stats).length,
    mostViewedPages: sortedPages,
    recentViews: views.slice(-10).reverse()
  };
};
