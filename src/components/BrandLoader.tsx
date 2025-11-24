import { useEffect } from 'react';
import { useBrandSettings } from '@/hooks/useBrandSettings';

export const BrandLoader = () => {
  const { data: brandSettings } = useBrandSettings();

  useEffect(() => {
    if (!brandSettings) return;

    // Create Google Fonts link dynamically
    const existingLink = document.getElementById('brand-fonts');
    if (existingLink) {
      existingLink.remove();
    }

    // Format font names for Google Fonts URL
    const formatFontName = (name: string) => name.replace(/\s+/g, '+');
    
    const fonts = [
      formatFontName(brandSettings.fontDisplay),
      formatFontName(brandSettings.fontBody),
      formatFontName(brandSettings.fontMono)
    ].join('&family=');

    const link = document.createElement('link');
    link.id = 'brand-fonts';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`;
    document.head.appendChild(link);

    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--font-display', `"${brandSettings.fontDisplay}", sans-serif`);
    root.style.setProperty('--font-body', `"${brandSettings.fontBody}", sans-serif`);
    root.style.setProperty('--font-mono', `"${brandSettings.fontMono}", monospace`);

  }, [brandSettings]);

  return null;
};
