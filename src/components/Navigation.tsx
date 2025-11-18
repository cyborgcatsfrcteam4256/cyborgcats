import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Users, Trophy, Camera, BookOpen, Mail, Phone, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { getActiveClass } = useActiveRoute();
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role, approved")
        .eq("user_id", userId);

      const adminRole = data?.some(r => r.role === "admin" && r.approved);
      setIsAdmin(!!adminRole);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

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
    <nav aria-label="Main navigation" className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover-glow flex-shrink-0 min-w-0" aria-label="Cyborg Cats home page">
            <img 
              src={cyborgCatsLogo} 
              alt="Cyborg Cats FRC Team 4256 logo" 
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0 hidden sm:flex">
              <span className="font-orbitron font-bold text-sm lg:text-base xl:text-lg text-glow truncate">Cyborg Cats</span>
              <span className="font-inter text-[10px] lg:text-xs text-muted-foreground truncate">St. Louis • Team 4256</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <div className="flex items-center gap-1.5 xl:gap-2">
              <LanguageSwitcher />
              <KebabMenu />
              <div className="hidden xl:block">
                <SmartSearch />
              </div>
            </div>
            
            <div className="flex items-center gap-2 xl:gap-3 ml-2 xl:ml-3">
              {navItems.slice(0, 5).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-inter text-xs xl:text-sm text-foreground hover:text-primary transition-cyber hover:text-glow cursor-pointer whitespace-nowrap ${getActiveClass(item.href)}`}
                >
                  {item.label}
                </a>
              ))}
              
              {user && (
                <div className="hidden xl:block">
                  <NotificationBadge userId={user.id} />
                </div>
              )}
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1.5 h-8 px-2.5 xl:px-3 text-xs xl:text-sm">
                      <UserIcon className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                      <span className="hidden xl:inline">Portal</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card z-[100]">
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      My Profile
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Admin Portal
                        </DropdownMenuItem>
                      </>
                    )}
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
                  className="h-8 px-2.5 xl:px-3 text-xs xl:text-sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
              )}
              <Button 
                variant="hero" 
                size="sm"
                className="h-8 px-2.5 xl:px-4 text-xs xl:text-sm whitespace-nowrap"
                onClick={handleJoinClick}
              >
                {t('nav.joinUs')}
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {user && <NotificationBadge userId={user.id} />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-9 w-9 p-2 rounded-xl bg-card/50 border border-border/50 hover:bg-accent hover:border-border transition-cyber"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden animate-slide-up pb-3">
            <div className="px-3 pt-3 pb-3 space-y-2 bg-card/95 backdrop-blur-xl rounded-xl mt-3 shadow-luxury border border-primary/20">
              {/* Language, Kebab & Search */}
              <div className="flex items-center gap-2 mb-3">
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
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-300 cursor-pointer font-medium ${getActiveClass(item.href)}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </a>
              ))}
              <div className="pt-2 space-y-2">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="default" 
                      className="w-full justify-start h-10"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/dashboard');
                      }}
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      Portal
                    </Button>
                    {isAdmin && (
                      <Button 
                        variant="outline" 
                        size="default" 
                        className="w-full justify-start h-10"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/admin');
                        }}
                      >
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Admin Portal
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="default" 
                      className="w-full justify-start text-destructive h-10"
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
                    size="default" 
                    className="w-full h-10"
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
                  size="default" 
                  className="w-full h-10"
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