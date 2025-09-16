import cyborgCatsLogo from '@/assets/cyborg-cats-logo.png';

interface LogoWatermarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'subtle' | 'circuit' | 'glow';
}

export const LogoWatermark = ({ 
  className = '', 
  size = 'md',
  variant = 'subtle' 
}: LogoWatermarkProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const containerSizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  const variantClasses = {
    subtle: 'bg-card/20 border-primary/10',
    circuit: 'bg-gradient-to-br from-primary/8 to-primary-glow/5 border-primary/15',
    glow: 'bg-gradient-to-br from-primary-glow/10 to-primary/8 border-primary-glow/20 shadow-glow'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`backdrop-blur-sm rounded-full border ${containerSizeClasses[size]} ${variantClasses[variant]}`}>
        <img 
          src={cyborgCatsLogo} 
          alt="" 
          className={`${sizeClasses[size]} object-contain opacity-80`}
        />
      </div>
      
      {variant === 'circuit' && (
        <>
          <div className="absolute top-1/2 -left-4 w-4 h-px bg-gradient-to-r from-transparent to-primary/15"></div>
          <div className="absolute top-1/2 -right-4 w-4 h-px bg-gradient-to-l from-transparent to-primary/15"></div>
        </>
      )}
      
      {variant === 'glow' && (
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl scale-150 -z-10"></div>
      )}
    </div>
  );
};