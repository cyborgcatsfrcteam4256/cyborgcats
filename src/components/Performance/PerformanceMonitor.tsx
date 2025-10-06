import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Measure First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
    
    if (fcpEntry) {
      setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }));
    }

    // Measure Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP not supported');
    }

    // Measure Cumulative Layout Shift
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsScore += (entry as any).value;
        }
      }
      setMetrics((prev) => ({ ...prev, cls: clsScore }));
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS not supported');
    }

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      lcpObserver.disconnect();
      clsObserver.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') return null;

  const getScoreColor = (metric: keyof PerformanceMetrics, value?: number) => {
    if (!value) return 'text-muted-foreground';

    switch (metric) {
      case 'fcp':
        return value < 1800 ? 'text-green-500' : value < 3000 ? 'text-yellow-500' : 'text-red-500';
      case 'lcp':
        return value < 2500 ? 'text-green-500' : value < 4000 ? 'text-yellow-500' : 'text-red-500';
      case 'cls':
        return value < 0.1 ? 'text-green-500' : value < 0.25 ? 'text-yellow-500' : 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg z-50 text-sm font-mono">
      <div className="font-bold mb-2 text-foreground">Performance Metrics</div>
      <div className="space-y-1">
        <div className={getScoreColor('fcp', metrics.fcp)}>
          FCP: {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'Measuring...'}
        </div>
        <div className={getScoreColor('lcp', metrics.lcp)}>
          LCP: {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'Measuring...'}
        </div>
        <div className={getScoreColor('cls', metrics.cls)}>
          CLS: {metrics.cls ? metrics.cls.toFixed(3) : 'Measuring...'}
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};
