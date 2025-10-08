import { MoreVertical, Home, Users, Trophy, Heart, Mail, Info, ExternalLink, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

/**
 * Kebab menu (vertical three-dot menu) for additional navigation options
 */
export const KebabMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-lg border-border/50 z-[100]">
        <DropdownMenuLabel className="font-orbitron">Quick Links</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/about')} className="cursor-pointer">
          <Info className="mr-2 h-4 w-4" />
          <span>About Us</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/team')} className="cursor-pointer">
          <Users className="mr-2 h-4 w-4" />
          <span>Our Team</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/impact')} className="cursor-pointer">
          <Heart className="mr-2 h-4 w-4" />
          <span>Our Impact</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/sponsors')} className="cursor-pointer">
          <Trophy className="mr-2 h-4 w-4" />
          <span>Sponsors</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-orbitron">Connect</DropdownMenuLabel>
        
        <DropdownMenuItem onClick={() => navigate('/contact')} className="cursor-pointer">
          <Mail className="mr-2 h-4 w-4" />
          <span>Contact Us</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a
            href="https://instagram.com/cyborgcats4256"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center"
          >
            <Instagram className="mr-2 h-4 w-4" />
            <span>Instagram</span>
            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
          </a>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a
            href="https://www.firstinspires.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            <span>FIRST Robotics</span>
            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
