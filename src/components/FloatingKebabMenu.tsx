import { useState } from 'react';
import { X, Home, Users, Trophy, Sparkles, MessageSquare, Image, HelpCircle, Gift, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FloatingKebabMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Items */}
      <div className={`fixed right-6 bottom-24 z-50 flex flex-col-reverse gap-3 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item.action)}
            className="group relative flex items-center gap-3 glass-morphism border border-primary/30 rounded-2xl px-4 py-3 hover:border-primary/60 transition-all duration-300 hover:scale-105 shadow-luxury hover:shadow-cyber animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            
            {/* Icon */}
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <item.icon className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            
            {/* Label */}
            <span className="relative font-orbitron text-sm font-bold text-white whitespace-nowrap pr-2">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main Button with Three Vertical Dots */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 w-16 h-16 glass-morphism border-2 border-primary/40 rounded-2xl flex flex-col items-center justify-center gap-1.5 hover:border-primary/80 transition-all duration-500 hover:scale-110 shadow-luxury hover:shadow-cyber group"
        aria-label="Quick Menu"
      >
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse" />
        
        {/* Rotating glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary-electric rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-700 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
        
        {/* Three Vertical Dots */}
        {isOpen ? (
          <X className="relative w-7 h-7 text-primary group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <div className="relative flex flex-col gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300 shadow-glow" />
            <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300 delay-75 shadow-glow" />
            <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300 delay-150 shadow-glow" />
          </div>
        )}

        {/* Sparkles */}
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary-glow animate-pulse" />
      </button>
    </>
  );
};
