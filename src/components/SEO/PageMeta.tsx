import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalPath?: string;
}

export const PageMeta = ({ 
  title, 
  description, 
  keywords, 
  ogImage = '/og-image.jpg',
  canonicalPath 
}: PageMetaProps) => {
  const location = useLocation();
  const fullTitle = `${title} | Cyborg Cats 4256`;
  const canonicalUrl = `https://cyborgcats4256.com${canonicalPath || location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const metaTags: Record<string, string> = {
      'description': description,
      'og:title': fullTitle,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:image': `https://cyborgcats4256.com${ogImage}`,
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': `https://cyborgcats4256.com${ogImage}`,
    };

    if (keywords) {
      metaTags['keywords'] = keywords;
    }

    // Update existing meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';
        meta.setAttribute(attr, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Cleanup function not needed as we want the latest values to persist
  }, [fullTitle, description, keywords, canonicalUrl, ogImage]);

  return null;
};
