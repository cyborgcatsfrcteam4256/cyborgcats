import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Mail } from 'lucide-react';

interface Connection {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  profile: {
    id: string;
    full_name: string;
    bio: string | null;
    avatar_url: string | null;
    graduation_year: number | null;
  };
  isIncoming: boolean;
}

interface MyConnectionsProps {
  currentUserId: string;
  onMessageClick: (userId: string) => void;
}

export const MyConnections = ({ currentUserId, onMessageClick }: MyConnectionsProps) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchConnections();
  }, [currentUserId]);

  const fetchConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select(`
          *,
          requester:profiles!connections_requester_id_fkey(id, full_name, bio, avatar_url, graduation_year),
          receiver:profiles!connections_receiver_id_fkey(id, full_name, bio, avatar_url, graduation_year)
        `)
        .or(`requester_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

      if (error) throw error;

      const processedConnections = data?.map(conn => ({
        ...conn,
        profile: conn.requester_id === currentUserId ? conn.receiver : conn.requester,
        isIncoming: conn.receiver_id === currentUserId,
      })) || [];

      setConnections(processedConnections.filter(c => c.status === 'accepted'));
      setPendingRequests(processedConnections.filter(c => c.status === 'pending'));
    } catch (error) {
      console.error('Error fetching connections:', error);
      toast({
        title: "Error",
        description: "Failed to load connections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnectionResponse = async (connectionId: string, status: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('connections')
        .update({ status })
        .eq('id', connectionId);

      if (error) throw error;

      toast({
        title: status === 'accepted' ? "Connection Accepted" : "Request Declined",
        description: status === 'accepted' 
          ? "You are now connected" 
          : "Connection request has been declined",
      });

      fetchConnections();
    } catch (error) {
      console.error('Error updating connection:', error);
      toast({
        title: "Error",
        description: "Failed to update connection",
        variant: "destructive",
      });
    }
  };

  const removeConnection = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;

      toast({
        title: "Connection Removed",
        description: "Connection has been removed",
      });

      fetchConnections();
    } catch (error) {
      console.error('Error removing connection:', error);
      toast({
        title: "Error",
        description: "Failed to remove connection",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading connections...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {pendingRequests.filter(r => r.isIncoming).length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pendingRequests.filter(r => r.isIncoming).map(request => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={request.profile.avatar_url || undefined} />
                    <AvatarFallback>
                      {request.profile.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{request.profile.full_name}</h3>
                    
                    {request.profile.graduation_year && (
                      <Badge variant="outline" className="text-xs mb-2">
                        Class of {request.profile.graduation_year}
                      </Badge>
                    )}
                    
                    {request.profile.bio && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {request.profile.bio}
                      </p>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleConnectionResponse(request.id, 'accepted')}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConnectionResponse(request.id, 'rejected')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">My Connections ({connections.length})</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {connections.map(connection => (
            <Card key={connection.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={connection.profile.avatar_url || undefined} />
                  <AvatarFallback>
                    {connection.profile.full_name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{connection.profile.full_name}</h3>
                  
                  {connection.profile.graduation_year && (
                    <Badge variant="outline" className="text-xs mb-2">
                      Class of {connection.profile.graduation_year}
                    </Badge>
                  )}
                  
                  {connection.profile.bio && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {connection.profile.bio}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => onMessageClick(connection.profile.id)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeConnection(connection.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {connections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No connections yet. Visit the directory to connect with other members!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};