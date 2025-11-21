import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/Admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { CheckCircle, XCircle, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface TeamMemberRequest {
  id: string;
  user_id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
  rejection_reason: string | null;
}

export default function TeamMemberRequests() {
  const [requests, setRequests] = useState<TeamMemberRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<TeamMemberRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('team_member_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests((data as TeamMemberRequest[]) || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: TeamMemberRequest) => {
    setSelectedRequest(request);
    setActionType('approve');
  };

  const handleReject = async (request: TeamMemberRequest) => {
    setSelectedRequest(request);
    setActionType('reject');
    setRejectionReason('');
  };

  const confirmAction = async () => {
    if (!selectedRequest) return;

    setProcessing(true);
    try {
      if (actionType === 'approve') {
        // First, insert into team_members
        const { error: insertError } = await supabase
          .from('team_members')
          .insert([{
            name: selectedRequest.name,
            role: selectedRequest.role,
            bio: selectedRequest.bio,
            image_url: selectedRequest.image_url,
            github_url: selectedRequest.github_url,
            linkedin_url: selectedRequest.linkedin_url,
            is_active: true
          }]);

        if (insertError) throw insertError;

        // Then update request status
        const { error: updateError } = await supabase
          .from('team_member_requests')
          .update({
            status: 'approved',
            reviewed_at: new Date().toISOString(),
            reviewed_by: (await supabase.auth.getUser()).data.user?.id
          })
          .eq('id', selectedRequest.id);

        if (updateError) throw updateError;

        toast.success(`Approved ${selectedRequest.name} as a team member!`);
      } else if (actionType === 'reject') {
        const { error } = await supabase
          .from('team_member_requests')
          .update({
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
            reviewed_by: (await supabase.auth.getUser()).data.user?.id,
            rejection_reason: rejectionReason
          })
          .eq('id', selectedRequest.id);

        if (error) throw error;

        toast.success('Request rejected');
      }

      await fetchRequests();
      setSelectedRequest(null);
      setActionType(null);
    } catch (error) {
      console.error('Error processing request:', error);
      toast.error('Failed to process request');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Team Member Requests" description="Review and approve team member showcase requests">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Team Member Requests" description="Review and approve team member showcase requests">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-orbitron font-bold mb-2">Team Member Requests</h1>
          <p className="text-muted-foreground">Review and approve team member showcase requests</p>
        </div>

        <div className="grid gap-6">
          {requests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No team member requests found</p>
              </CardContent>
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request.id} className="glass-morphism border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-orbitron text-xl">{request.name}</CardTitle>
                      <CardDescription>{request.role}</CardDescription>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {request.bio && (
                    <div>
                      <Label className="text-sm font-semibold mb-1">Bio:</Label>
                      <p className="text-sm text-muted-foreground">{request.bio}</p>
                    </div>
                  )}

                  <div className="flex gap-4 text-sm">
                    {request.github_url && (
                      <a
                        href={request.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {request.linkedin_url && (
                      <a
                        href={request.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        LinkedIn <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Submitted: {new Date(request.created_at).toLocaleDateString()}
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(request)}
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-500 border-green-500/30"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(request)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {request.status === 'rejected' && request.rejection_reason && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <Label className="text-sm font-semibold text-red-500 mb-1">Rejection Reason:</Label>
                      <p className="text-sm text-muted-foreground">{request.rejection_reason}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={!!selectedRequest && !!actionType} onOpenChange={() => {
        setSelectedRequest(null);
        setActionType(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve'
                ? `Add ${selectedRequest?.name} to the public team members page?`
                : `Provide a reason for rejecting ${selectedRequest?.name}'s request`}
            </DialogDescription>
          </DialogHeader>

          {actionType === 'reject' && (
            <div className="space-y-2">
              <Label htmlFor="rejection_reason">Rejection Reason</Label>
              <Textarea
                id="rejection_reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide feedback..."
                rows={4}
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRequest(null);
                setActionType(null);
              }}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant={actionType === 'approve' ? 'default' : 'destructive'}
              onClick={confirmAction}
              disabled={processing || (actionType === 'reject' && !rejectionReason.trim())}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}