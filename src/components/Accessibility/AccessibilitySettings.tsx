import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Type, Contrast, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AccessibilitySettings = () => {
  const { t } = useTranslation();
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedFont = localStorage.getItem('dyslexic-font') === 'true';
    const savedMotion = localStorage.getItem('reduce-motion') === 'true';
    const savedContrast = localStorage.getItem('high-contrast') === 'true';
    
    setDyslexicFont(savedFont);
    setReduceMotion(savedMotion);
    setHighContrast(savedContrast);
    
    // Apply settings
    if (savedFont) document.documentElement.classList.add('dyslexic-font');
    if (savedMotion) document.documentElement.classList.add('reduce-motion');
    if (savedContrast) document.documentElement.classList.add('high-contrast');
  }, []);

  const toggleDyslexicFont = (checked: boolean) => {
    setDyslexicFont(checked);
    localStorage.setItem('dyslexic-font', String(checked));
    
    if (checked) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
  };

  const toggleReduceMotion = (checked: boolean) => {
    setReduceMotion(checked);
    localStorage.setItem('reduce-motion', String(checked));
    
    if (checked) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  const toggleHighContrast = (checked: boolean) => {
    setHighContrast(checked);
    localStorage.setItem('high-contrast', String(checked));
    
    if (checked) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
        <CardDescription>
          Customize your viewing experience for better accessibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="dyslexic-font" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Dyslexia-Friendly Font
            </Label>
            <p className="text-sm text-muted-foreground">
              Use OpenDyslexic font for easier reading
            </p>
          </div>
          <Switch
            id="dyslexic-font"
            checked={dyslexicFont}
            onCheckedChange={toggleDyslexicFont}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="reduce-motion" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Reduce Motion
            </Label>
            <p className="text-sm text-muted-foreground">
              Minimize animations and transitions
            </p>
          </div>
          <Switch
            id="reduce-motion"
            checked={reduceMotion}
            onCheckedChange={toggleReduceMotion}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="high-contrast" className="flex items-center gap-2">
              <Contrast className="h-4 w-4" />
              High Contrast Mode
            </Label>
            <p className="text-sm text-muted-foreground">
              Enhance color contrast for better visibility
            </p>
          </div>
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={toggleHighContrast}
          />
        </div>
      </CardContent>
    </Card>
  );
};