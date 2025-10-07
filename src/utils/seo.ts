/**
 * SEO utility functions for the Cyborg Cats website
 */

interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbs = (items: BreadcrumbItem[]) => {
  return items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://cyborgcats4256.com${item.path}`
  }));
};

/**
 * Generate optimal meta description based on content
 */
export const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.slice(0, lastSpace) + '...';
};

/**
 * Extract keywords from content
 */
export const extractKeywords = (content: string, maxKeywords: number = 10): string[] => {
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);

  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count word frequency
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
};

/**
 * Generate Open Graph image URL
 */
export const getOGImageUrl = (pagePath: string): string => {
  const baseUrl = 'https://cyborgcats4256.com';
  
  // Map specific pages to their OG images
  const imageMap: Record<string, string> = {
    '/': '/og-image.jpg',
    '/about': '/og-about.jpg',
    '/team': '/og-team.jpg',
    '/impact': '/og-impact.jpg',
    '/competitions': '/og-competitions.jpg',
    '/sponsors': '/og-sponsors.jpg',
  };

  return `${baseUrl}${imageMap[pagePath] || imageMap['/']}`;
};

/**
 * Check if page should be indexed by search engines
 */
export const shouldIndexPage = (path: string): boolean => {
  const noIndexPaths = ['/admin', '/login', '/404'];
  return !noIndexPaths.some(noIndexPath => path.startsWith(noIndexPath));
};

/**
 * Generate canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  return `https://cyborgcats4256.com${path}`;
};

/**
 * Format date for structured data
 */
export const formatDateForSchema = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
};