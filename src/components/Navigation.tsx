import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';
import { SmartSearch } from '@/components/UI/SmartSearch';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#about-us', label: 'About Us' },
    { href: '#what-is-first', label: 'What is FIRST' },
    { href: '#impact', label: 'Impact' },
    { href: '#news', label: 'News' },
    { href: '#sponsors', label: 'Sponsors' },
    { href: '#photos', label: 'Photos' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#about-us" onClick={() => handleNavClick('#about-us')} className="flex items-center space-x-2 sm:space-x-3 hover-glow min-w-0 flex-shrink-0">
            <img 
              src={cyborgCatsLogo} 
              alt="Cyborg Cats FRC Team 4256 Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-orbitron font-bold text-sm sm:text-base lg:text-lg text-glow truncate">Cyborg Cats</span>
              <span className="font-inter text-xs sm:text-xs text-muted-foreground truncate hidden xs:block">St. Louis • Team 4256</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <SmartSearch />
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="font-inter text-foreground hover:text-primary transition-cyber hover:text-glow cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <Button variant="hero" size="sm">
                Join Us
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-cyber">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-cyber cursor-pointer"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button variant="hero" size="sm" className="w-full">
                  Join Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};