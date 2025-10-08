import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, Mail } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  bio: string | null;
  avatar_url: string | null;
  graduation_year: number | null;
  roles: string[];
  connectionStatus: 'none' | 'pending' | 'connected';
}

interface MemberDirectoryProps {
  currentUserId: string;
  onMessageClick: (userId: string) => void;
}

export const MemberDirectory = ({ currentUserId, onMessageClick }: MemberDirectoryProps) => {
  const [members, setMembers] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, [currentUserId]);

  const fetchMembers = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUserId);

      if (profilesError) throw profilesError;

      // Fetch roles for each profile
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('approved', true);

      if (rolesError) throw rolesError;

      // Fetch connections
      const { data: connections, error: connectionsError } = await supabase
        .from('connections')
        .select('*')
        .or(`requester_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

      if (connectionsError) throw connectionsError;

      // Combine data
      const membersWithRoles = profiles?.map(profile => {
        const roles = userRoles?.filter(ur => ur.user_id === profile.id).map(ur => ur.role) || [];
        
        const connection = connections?.find(
          c => c.requester_id === profile.id || c.receiver_id === profile.id
        );
        
        let connectionStatus: 'none' | 'pending' | 'connected' = 'none';
        if (connection) {
          connectionStatus = connection.status === 'accepted' ? 'connected' : 'pending';
        }

        return {
          ...profile,
          roles,
          connectionStatus,
        };
      }) || [];

      setMembers(membersWithRoles);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: "Error",
        description: "Failed to load member directory",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendConnectionRequest = async (receiverId: string) => {
    try {
      const { error } = await supabase
        .from('connections')
        .insert({
          requester_id: currentUserId,
          receiver_id: receiverId,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Connection Request Sent",
        description: "Your connection request has been sent",
      });

      fetchMembers();
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast({
        title: "Error",
        description: "Failed to send connection request",
        variant: "destructive",
      });
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={roleFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('all')}
          >
            All
          </Button>
          <Button
            variant={roleFilter === 'student' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('student')}
          >
            Students
          </Button>
          <Button
            variant={roleFilter === 'alumni' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('alumni')}
          >
            Alumni
          </Button>
          <Button
            variant={roleFilter === 'parent' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('parent')}
          >
            Parents
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredMembers.map(member => (
          <Card key={member.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.avatar_url || undefined} />
                <AvatarFallback>
                  {member.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">{member.full_name}</h3>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {member.roles.map(role => (
                    <Badge key={role} variant="secondary" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                  {member.graduation_year && (
                    <Badge variant="outline" className="text-xs">
                      Class of {member.graduation_year}
                    </Badge>
                  )}
                </div>
                
                {member.bio && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {member.bio}
                  </p>
                )}
                
                <div className="flex gap-2">
                  {member.connectionStatus === 'none' && (
                    <Button
                      size="sm"
                      onClick={() => sendConnectionRequest(member.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  )}
                  
                  {member.connectionStatus === 'pending' && (
                    <Button size="sm" variant="outline" disabled>
                      Request Pending
                    </Button>
                  )}
                  
                  {member.connectionStatus === 'connected' && (
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => onMessageClick(member.id)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No members found</p>
        </div>
      )}
    </div>
  );
};