import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Users, Trophy, Camera, BookOpen, Mail, Phone, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';
import { SmartSearch } from '@/components/UI/SmartSearch';
import { useActiveRoute } from '@/hooks/useActiveRoute';
import { LanguageSwitcher } from '@/components/Navigation/LanguageSwitcher';
import { KebabMenu } from '@/components/Navigation/KebabMenu';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { NotificationBadge } from '@/components/Network/NotificationBadge';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { getActiveClass } = useActiveRoute();
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { href: '/about', label: t('nav.about'), icon: Home },
    { href: '/team', label: t('nav.team'), icon: Users },
    { href: '/impact', label: t('nav.impact'), icon: Trophy },
    { href: '/sponsors', label: t('nav.sponsors'), icon: Trophy },
    { href: '/network', label: 'Network', icon: Users },
    { href: '/#media', label: t('nav.media'), icon: Camera },
    { href: '/#resources', label: t('nav.resources'), icon: BookOpen },
    { href: '/contact', label: t('nav.contact'), icon: Mail },
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
    navigate('/');
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
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <LanguageSwitcher />
            <KebabMenu />
            <div className="ml-2">
              <SmartSearch />
            </div>
            <div className="flex items-center space-x-3 xl:space-x-4">
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
              {user && <NotificationBadge userId={user.id} />}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <UserIcon className="h-4 w-4" />
                      Portal
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
              )}
              <Button 
                variant="hero" 
                size="sm"
                onClick={handleJoinClick}
              >
                {t('nav.joinUs')}
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
              {/* Language, Kebab & Search */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1">
                  <SmartSearch />
                </div>
                <LanguageSwitcher />
                <KebabMenu />
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
              <div className="pt-2 space-y-2">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/dashboard');
                      }}
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      Portal
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      className="w-full text-destructive"
                      onClick={() => {
                        setIsOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/auth');
                    }}
                  >
                    Sign In
                  </Button>
                )}
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleJoinClick}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('nav.joinUs')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};