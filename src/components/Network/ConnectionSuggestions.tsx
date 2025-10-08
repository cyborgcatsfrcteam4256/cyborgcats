import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserPlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuggestedProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  graduation_year: number | null;
  roles: string[];
  mutualConnections: number;
}

interface ConnectionSuggestionsProps {
  currentUserId: string;
}

export const ConnectionSuggestions = ({ currentUserId }: ConnectionSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<SuggestedProfile[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSuggestions();
  }, [currentUserId]);

  const fetchSuggestions = async () => {
    try {
      // Get current user's profile
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('graduation_year')
        .eq('id', currentUserId)
        .single();

      // Get existing connections
      const { data: connections } = await supabase
        .from('connections')
        .select('requester_id, receiver_id')
        .or(`requester_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

      const connectedIds = new Set(
        connections?.map(c => 
          c.requester_id === currentUserId ? c.receiver_id : c.requester_id
        ) || []
      );

      // Get all profiles except current user and existing connections
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUserId);

      if (!profiles) return;

      // Get roles for all profiles
      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('approved', true);

      // Calculate suggestions with scoring
      const scored = profiles
        .filter(p => !connectedIds.has(p.id) && !dismissed.has(p.id))
        .map(profile => {
          const roles = userRoles?.filter(ur => ur.user_id === profile.id).map(ur => ur.role) || [];
          let score = 0;

          // Same graduation year = high priority
          if (currentProfile?.graduation_year && profile.graduation_year === currentProfile.graduation_year) {
            score += 10;
          }

          // Recent graduation years = medium priority
          const yearDiff = Math.abs((profile.graduation_year || 0) - (currentProfile?.graduation_year || 0));
          if (yearDiff <= 2) {
            score += 5;
          }

          // Alumni connecting with students = good for mentorship
          const currentRoles = userRoles?.filter(ur => ur.user_id === currentUserId).map(ur => ur.role) || [];
          if (currentRoles.includes('alumni') && roles.includes('student')) {
            score += 8;
          }

          return {
            ...profile,
            roles,
            mutualConnections: 0, // Could be calculated with more complex query
            score,
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setSuggestions(scored);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('connections')
        .insert({
          requester_id: currentUserId,
          receiver_id: userId,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Connection Request Sent",
        description: "Your connection request has been sent",
      });

      // Remove from suggestions
      setSuggestions(prev => prev.filter(s => s.id !== userId));

      // Create notification
      await supabase.from('notifications').insert({
        user_id: userId,
        type: 'connection_request',
        title: 'New Connection Request',
        message: 'Someone wants to connect with you',
        link: '/network?tab=connections',
      });
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast({
        title: "Error",
        description: "Failed to send connection request",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = (userId: string) => {
    setDismissed(prev => new Set([...prev, userId]));
    setSuggestions(prev => prev.filter(s => s.id !== userId));
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-20 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">People You May Know</h3>
      <div className="space-y-4">
        {suggestions.map(profile => (
          <div key={profile.id} className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{profile.full_name}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.roles.slice(0, 2).map(role => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
                {profile.graduation_year && (
                  <Badge variant="outline" className="text-xs">
                    '{String(profile.graduation_year).slice(-2)}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleConnect(profile.id)}
              >
                <UserPlus className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDismiss(profile.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};