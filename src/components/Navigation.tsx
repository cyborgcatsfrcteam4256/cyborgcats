import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Users, Trophy, Camera, BookOpen, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';
import { SmartSearch } from '@/components/UI/SmartSearch';
import { useActiveRoute } from '@/hooks/useActiveRoute';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { getActiveClass } = useActiveRoute();

  const navItems = [
    { href: '/about', label: 'About', icon: Home },
    { href: '/team', label: 'Team', icon: Users },
    { href: '/impact', label: 'Impact', icon: Trophy },
    { href: '/sponsors', label: 'Sponsors', icon: Trophy },
    { href: '/#media', label: 'Media', icon: Camera },
    { href: '/#resources', label: 'Resources', icon: BookOpen },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetPath = path || '/';
      const currentPath = window.location.pathname;
      
      if (currentPath !== targetPath) {
        navigate(targetPath);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  const handleJoinClick = () => {
    setIsOpen(false);
    navigate('/contact?subject=join');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover-glow min-w-0 flex-shrink-0">
            <img 
              src={cyborgCatsLogo} 
              alt="Cyborg Cats FRC Team 4256 Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-orbitron font-bold text-sm sm:text-base lg:text-lg text-glow truncate">Cyborg Cats</span>
              <span className="font-inter text-xs sm:text-xs text-muted-foreground truncate hidden xs:block">St. Louis • Team 4256</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <div className="ml-4">
              <SmartSearch />
            </div>
            <div className="flex items-center space-x-3 xl:space-x-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-inter text-sm xl:text-base text-foreground hover:text-primary transition-cyber hover:text-glow cursor-pointer whitespace-nowrap ${getActiveClass(item.href)}`}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="hero" 
                size="sm"
                onClick={handleJoinClick}
              >
                Join Us
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
          <div className="lg:hidden animate-slide-up pb-4">
            <div className="px-4 pt-4 pb-4 space-y-2 bg-card/95 backdrop-blur-xl rounded-2xl mt-4 shadow-luxury border border-primary/20">
              {/* Mobile Search */}
              <div className="mb-4">
                <SmartSearch />
              </div>
              
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-accent/50 rounded-xl transition-all duration-300 cursor-pointer font-medium ${getActiveClass(item.href)}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleJoinClick}
                >
                  <Phone className="w-4 h-4 mr-2" />
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