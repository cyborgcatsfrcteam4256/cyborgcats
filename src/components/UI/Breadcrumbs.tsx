import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  '': 'Home',
  'about': 'About Us',
  'impact': 'Impact & Outreach',
  'competitions': 'Competitions',
  'team': 'Team',
  'sponsors': 'Sponsors',
  'contact': 'Contact'
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Don't show breadcrumbs on home page
  if (pathSegments.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' }
  ];

  // Build breadcrumb path
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, path: currentPath });
  });

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground py-4">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isHome = index === 0;
        
        return (
          <div key={breadcrumb.path} className="flex items-center space-x-1">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            
            {isLast ? (
              <span className="font-medium text-foreground">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className={cn(
                  "hover:text-primary transition-colors duration-200 flex items-center gap-1",
                  isHome && "hover:scale-105 transition-transform"
                )}
              >
                {isHome && <Home className="h-4 w-4" />}
                {breadcrumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};