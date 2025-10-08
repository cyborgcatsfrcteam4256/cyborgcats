import { useState, useRef, useEffect } from 'react';
import { Home, Users, Trophy, Gift, MessageSquare, Image, HelpCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FloatingKebabMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'About Us', action: () => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: Users, label: 'Our Team', action: () => navigate('/team') },
    { icon: Trophy, label: 'Our Impact', action: () => navigate('/impact') },
    { icon: Gift, label: 'Sponsors', action: () => document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: MessageSquare, label: 'Community', action: () => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: Image, label: 'Media', action: () => document.getElementById('media')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: HelpCircle, label: 'FAQ', action: () => document.querySelector('.faq-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: Mail, label: 'Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="fixed right-6 bottom-6 z-50">
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-56 bg-background/95 backdrop-blur-xl border-2 border-primary/30 rounded-2xl shadow-luxury overflow-hidden animate-scale-in">
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item.action)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors duration-200 group"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary-glow/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-orbitron text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Three Dot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-background/90 backdrop-blur-xl border-2 border-primary/40 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-primary/80 hover:bg-primary/5 transition-all duration-300 shadow-luxury hover:shadow-cyber group"
        aria-label="Quick Menu"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-200" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-200 delay-75" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-200 delay-150" />
      </button>
    </div>
  );
};
