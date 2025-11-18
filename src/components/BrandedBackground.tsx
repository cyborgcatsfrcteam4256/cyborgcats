import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

interface BrandedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const BrandedBackground = ({ children, className = '' }: BrandedBackgroundProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Subtle branded background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left logo */}
        <div className="absolute top-10 left-10 opacity-5">
          <img src={cyborgCatsLogo} alt="" className="w-32 h-32 object-contain rotate-12" />
        </div>
        
        {/* Center logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-3">
          <img src={cyborgCatsLogo} alt="" className="w-64 h-64 object-contain -rotate-6" />
        </div>
        
        {/* Bottom right logo */}
        <div className="absolute bottom-10 right-10 opacity-5">
          <img src={cyborgCatsLogo} alt="" className="w-24 h-24 object-contain rotate-45" />
        </div>
        
        {/* Additional scattered mini logos */}
        <div className="absolute top-1/4 right-1/4 opacity-2">
          <img src={cyborgCatsLogo} alt="" className="w-16 h-16 rotate-90" />
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 opacity-2">
          <img src={cyborgCatsLogo} alt="" className="w-20 h-20 -rotate-12" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};