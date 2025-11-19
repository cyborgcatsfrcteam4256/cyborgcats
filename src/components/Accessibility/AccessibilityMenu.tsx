import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Accessibility, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Volume2,
  Type,
  Moon,
  Sun,
  X,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize');
    const savedContrast = localStorage.getItem('highContrast');
    const savedTheme = localStorage.getItem('theme');
    const savedDyslexic = localStorage.getItem('dyslexic-font');
    const savedMotion = localStorage.getItem('reduce-motion');

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedContrast === 'true') setHighContrast(true);
    if (savedTheme === 'dark') setIsDark(true);
    if (savedDyslexic === 'true') setDyslexicFont(true);
    if (savedMotion === 'true') setReduceMotion(true);
    
    // Apply settings
    if (savedDyslexic === 'true') document.documentElement.classList.add('dyslexic-font');
    if (savedMotion === 'true') document.documentElement.classList.add('reduce-motion');
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize(prev => prev + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize(prev => prev - 10);
  };

  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
    setIsDark(false);
    setDyslexicFont(false);
    setReduceMotion(false);
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('theme');
    localStorage.removeItem('dyslexic-font');
    localStorage.removeItem('reduce-motion');
    document.documentElement.classList.remove('dyslexic-font', 'reduce-motion');
  };

  const toggleDyslexicFont = () => {
    const newValue = !dyslexicFont;
    setDyslexicFont(newValue);
    localStorage.setItem('dyslexic-font', String(newValue));
    
    if (newValue) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
  };

  const toggleReduceMotion = () => {
    const newValue = !reduceMotion;
    setReduceMotion(newValue);
    localStorage.setItem('reduce-motion', String(newValue));
    
    if (newValue) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-luxury flex items-center justify-center hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Open accessibility menu"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Accessibility Menu Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-background border border-border rounded-xl shadow-luxury p-6 animate-scale-in"
          role="dialog"
          aria-label="Accessibility settings"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-orbitron font-bold text-lg flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-primary" aria-hidden="true" />
              Accessibility
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Close accessibility menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size Controls */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" aria-hidden="true" />
                Text Size: {fontSize}%
              </label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  className="flex-1"
                  aria-label="Decrease text size"
                >
                  <ZoomOut className="w-4 h-4" aria-hidden="true" />
                  Smaller
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  className="flex-1"
                  aria-label="Increase text size"
                >
                  <ZoomIn className="w-4 h-4" aria-hidden="true" />
                  Larger
                </Button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between py-3 border-t border-border">
              <label htmlFor="high-contrast" className="text-sm font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
                High Contrast
              </label>
              <button
                id="high-contrast"
                onClick={() => setHighContrast(!highContrast)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  highContrast ? "bg-primary" : "bg-muted"
                )}
                role="switch"
                aria-checked={highContrast}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-background transition-transform",
                    highContrast ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between py-3 border-t border-border">
              <label htmlFor="dark-mode" className="text-sm font-semibold flex items-center gap-2">
                {isDark ? <Moon className="w-4 h-4 text-primary" aria-hidden="true" /> : <Sun className="w-4 h-4 text-primary" aria-hidden="true" />}
                Dark Mode
              </label>
              <button
                id="dark-mode"
                onClick={() => setIsDark(!isDark)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isDark ? "bg-primary" : "bg-muted"
                )}
                role="switch"
                aria-checked={isDark}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-background transition-transform",
                    isDark ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Dyslexic Font Toggle */}
            <div className="flex items-center justify-between py-3 border-t border-border">
              <label htmlFor="dyslexic-font" className="text-sm font-semibold flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" aria-hidden="true" />
                Dyslexia Font
              </label>
              <button
                id="dyslexic-font"
                onClick={toggleDyslexicFont}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  dyslexicFont ? "bg-primary" : "bg-muted"
                )}
                role="switch"
                aria-checked={dyslexicFont}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-background transition-transform",
                    dyslexicFont ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Reduce Motion Toggle */}
            <div className="flex items-center justify-between py-3 border-t border-border">
              <label htmlFor="reduce-motion" className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
                Reduce Motion
              </label>
              <button
                id="reduce-motion"
                onClick={toggleReduceMotion}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  reduceMotion ? "bg-primary" : "bg-muted"
                )}
                role="switch"
                aria-checked={reduceMotion}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-background transition-transform",
                    reduceMotion ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="w-full mt-4"
            >
              Reset to Defaults
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Settings are saved automatically and persist across sessions.
            </p>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};