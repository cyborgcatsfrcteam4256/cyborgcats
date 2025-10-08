import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, UserPlus, UserX, Flag, Linkedin, Github, GraduationCap, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Profile {
  id: string;
  full_name: string;
  bio: string | null;
  avatar_url: string | null;
  graduation_year: number | null;
  skills: string[] | null;
  interests: string[] | null;
  linkedin_url: string | null;
  github_url: string | null;
  is_online: boolean;
  last_seen: string;
  roles: string[];
}

interface ProfileModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onConnect?: () => void;
  onMessage?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
  connectionStatus?: 'none' | 'pending' | 'connected';
}

export const ProfileModal = ({
  profile,
  isOpen,
  onClose,
  onConnect,
  onMessage,
  onBlock,
  onReport,
  connectionStatus = 'none',
}: ProfileModalProps) => {
  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="text-2xl">
                  {profile.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {profile.is_online && (
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{profile.full_name}</DialogTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.roles?.map(role => (
                  <Badge key={role} variant="secondary">{role}</Badge>
                ))}
                {profile.graduation_year && (
                  <Badge variant="outline">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    Class of {profile.graduation_year}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.is_online ? 'Online' : `Last seen ${formatDistanceToNow(new Date(profile.last_seen), { addSuffix: true })}`}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {profile.bio && (
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
            </div>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(skill => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          {profile.interests && profile.interests.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(interest => (
                  <Badge key={interest} variant="secondary">{interest}</Badge>
                ))}
              </div>
            </div>
          )}

          {(profile.linkedin_url || profile.github_url) && (
            <div>
              <h4 className="font-semibold mb-2">Links</h4>
              <div className="flex gap-2">
                {profile.linkedin_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {profile.github_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          <Separator />

          <div className="flex gap-2">
            {connectionStatus === 'none' && onConnect && (
              <Button onClick={onConnect} className="flex-1">
                <UserPlus className="h-4 w-4 mr-2" />
                Connect
              </Button>
            )}
            
            {connectionStatus === 'pending' && (
              <Button variant="outline" disabled className="flex-1">
                Request Pending
              </Button>
            )}
            
            {connectionStatus === 'connected' && onMessage && (
              <Button onClick={onMessage} className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            )}
            
            {onBlock && (
              <Button variant="outline" onClick={onBlock}>
                <UserX className="h-4 w-4 mr-2" />
                Block
              </Button>
            )}
            
            {onReport && (
              <Button variant="ghost" onClick={onReport}>
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};