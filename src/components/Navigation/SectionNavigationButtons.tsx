import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectionNavigationButtonsProps {
  previousSection?: { id: string; label: string };
  nextSection?: { id: string; label: string };
}

/**
 * Navigation buttons to move between sections
 * Displays "Previous Section" and "Next Section" buttons
 */
export const SectionNavigationButtons = ({ 
  previousSection, 
  nextSection 
}: SectionNavigationButtonsProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!previousSection && !nextSection) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-border/50">
      {previousSection ? (
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollToSection(previousSection.id)}
          className="flex items-center gap-2 group"
        >
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          <span className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="font-semibold">{previousSection.label}</span>
          </span>
        </Button>
      ) : (
        <div />
      )}
      
      {nextSection && (
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollToSection(nextSection.id)}
          className="flex items-center gap-2 group"
        >
          <span className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="font-semibold">{nextSection.label}</span>
          </span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </Button>
      )}
    </div>
  );
};
