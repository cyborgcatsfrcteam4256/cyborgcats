import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

interface RoleRequest {
  id: string;
  user_id: string;
  role: string;
  approved: boolean;
  requested_at: string;
  approved_at: string | null;
  approved_by: string | null;
  profiles: {
    full_name: string;
    avatar_url: string | null;
    graduation_year: number | null;
  };
}

export const RoleApprovals = () => {
  const [requests, setRequests] = useState<RoleRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          profiles!user_roles_user_id_fkey (
            full_name,
            avatar_url,
            graduation_year
          )
        `)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching role requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load role requests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();

    // Set up real-time subscription
    const channel = supabase
      .channel('role-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_roles'
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleApprove = async (requestId: string, userId: string) => {
    setProcessingId(requestId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_roles')
        .update({
          approved: true,
          approved_at: new Date().toISOString(),
          approved_by: user.id,
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: 'Request approved',
        description: 'The role request has been approved successfully.',
      });

      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve request',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    setProcessingId(requestId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: 'Request rejected',
        description: 'The role request has been rejected and removed.',
      });

      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject request',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const pendingRequests = requests.filter(r => !r.approved);
  const approvedRequests = requests.filter(r => r.approved);

  const renderRequestCard = (request: RoleRequest) => (
    <Card key={request.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.profiles?.avatar_url || undefined} />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{request.profiles?.full_name || 'Unknown User'}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="capitalize">
                  {request.role}
                </Badge>
                {request.profiles?.graduation_year && (
                  <span className="text-sm text-muted-foreground">
                    Class of {request.profiles.graduation_year}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Requested {format(new Date(request.requested_at), 'PPp')}
              </div>
              {request.approved_at && (
                <div className="text-sm text-muted-foreground mt-1">
                  Approved {format(new Date(request.approved_at), 'PPp')}
                </div>
              )}
            </div>
          </div>
          {!request.approved && (
            <div className="flex gap-2 ml-4">
              <Button
                size="sm"
                variant="default"
                onClick={() => handleApprove(request.id, request.user_id)}
                disabled={processingId === request.id}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleReject(request.id)}
                disabled={processingId === request.id}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Role Approvals</CardTitle>
          <CardDescription>Loading role requests...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Role Approvals
          {pendingRequests.length > 0 && (
            <Badge variant="destructive">{pendingRequests.length} pending</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Review and approve member role requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pending">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending requests</p>
              </div>
            ) : (
              pendingRequests.map(renderRequestCard)
            )}
          </TabsContent>

          <TabsContent value="approved">
            {approvedRequests.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No approved requests yet</p>
              </div>
            ) : (
              approvedRequests.map(renderRequestCard)
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
