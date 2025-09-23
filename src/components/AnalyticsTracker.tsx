import { useEffect } from 'react';

// Analytics tracking component for performance monitoring
export const AnalyticsTracker = () => {
  useEffect(() => {
    // Initialize analytics tracking
    const initAnalytics = () => {
      // Track page load performance
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          // Log performance metrics (replace with your analytics service)
          console.log('Performance Metrics:', {
            loadTime,
            domContentLoaded,
            timestamp: Date.now()
          });
        }
      }

      // Track user interactions
      const trackInteraction = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.tagName === 'A') {
          // Log interaction (replace with your analytics service)
          console.log('User Interaction:', {
            element: target.tagName,
            text: target.textContent?.trim(),
            timestamp: Date.now()
          });
        }
      };

      // Add event listeners for user interactions
      document.addEventListener('click', trackInteraction);
      
      // Track scroll depth
      let maxScrollDepth = 0;
      const trackScrollDepth = () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScrollDepth) {
          maxScrollDepth = scrollPercent;
          // Log scroll depth (replace with your analytics service)
          if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            console.log('Scroll Depth:', {
              depth: maxScrollDepth,
              timestamp: Date.now()
            });
          }
        }
      };

      window.addEventListener('scroll', trackScrollDepth);

      // Cleanup function
      return () => {
        document.removeEventListener('click', trackInteraction);
        window.removeEventListener('scroll', trackScrollDepth);
      };
    };

    const cleanup = initAnalytics();
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
};

// Hook for tracking custom events
export const useAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Log custom event (replace with your analytics service)
    console.log('Custom Event:', {
      event: eventName,
      properties,
      timestamp: Date.now()
    });
  };

  const trackPageView = (pageName: string) => {
    // Log page view (replace with your analytics service)
    console.log('Page View:', {
      page: pageName,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  };

  return { trackEvent, trackPageView };
};