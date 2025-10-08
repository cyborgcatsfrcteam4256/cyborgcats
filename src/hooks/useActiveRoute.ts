import { useLocation } from 'react-router-dom';

/**
 * Hook to determine if a route or section is active
 * Handles both page routes (/about) and anchor sections (/#media)
 */
export const useActiveRoute = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentHash = location.hash;

  const isActive = (href: string): boolean => {
    // Handle anchor links (e.g., /#media)
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetPath = path || '/';
      return currentPath === targetPath && currentHash === `#${hash}`;
    }
    
    // Handle regular routes
    return currentPath === href;
  };

  const getActiveClass = (href: string): string => {
    return isActive(href) 
      ? 'text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:shadow-glow' 
      : '';
  };

  return { isActive, getActiveClass, currentPath, currentHash };
};
