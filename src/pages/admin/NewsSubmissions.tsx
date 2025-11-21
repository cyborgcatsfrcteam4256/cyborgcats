import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { CheckCircle, XCircle, Clock, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface NewsSubmission {
  id: string;
  user_id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  author_name: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
  rejection_reason: string | null;
  published_news_id: string | null;
}

export default function NewsSubmissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<NewsSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<NewsSubmission | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'preview' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role, approved')
        .eq('user_id', user.id);

      const isAdmin = roles?.some(r => r.role === 'admin' && r.approved);

      if (!isAdmin) {
        toast.error('Admin access required');
        navigate('/dashboard');
        return;
      }

      await fetchSubmissions();
    } catch (error) {
      console.error('Error:', error);
      navigate('/dashboard');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('news_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions((data as NewsSubmission[]) || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submission: NewsSubmission) => {
    setSelectedSubmission(submission);
    setActionType('approve');
  };

  const handleReject = async (submission: NewsSubmission) => {
    setSelectedSubmission(submission);
    setActionType('reject');
    setRejectionReason('');
  };

  const handlePreview = async (submission: NewsSubmission) => {
    setSelectedSubmission(submission);
    setActionType('preview');
  };

  const confirmAction = async () => {
    if (!selectedSubmission) return;

    setProcessing(true);
    try {
      if (actionType === 'approve') {
        // First, create the news post
        const { data: newsPost, error: insertError } = await supabase
          .from('news_posts')
          .insert([{
            title: selectedSubmission.title,
            content: selectedSubmission.content,
            excerpt: selectedSubmission.excerpt,
            author: selectedSubmission.author_name,
            image_url: selectedSubmission.image_url,
            is_published: true,
            published_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (insertError) throw insertError;

        // Then update submission status
        const { error: updateError } = await supabase
          .from('news_submissions')
          .update({
            status: 'approved',
            reviewed_at: new Date().toISOString(),
            reviewed_by: (await supabase.auth.getUser()).data.user?.id,
            published_news_id: newsPost.id
          })
          .eq('id', selectedSubmission.id);

        if (updateError) throw updateError;

        toast.success('News article approved and published!');
      } else if (actionType === 'reject') {
        const { error } = await supabase
          .from('news_submissions')
          .update({
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
            reviewed_by: (await supabase.auth.getUser()).data.user?.id,
            rejection_reason: rejectionReason
          })
          .eq('id', selectedSubmission.id);

        if (error) throw error;

        toast.success('Submission rejected');
      }

      await fetchSubmissions();
      setSelectedSubmission(null);
      setActionType(null);
    } catch (error) {
      console.error('Error processing submission:', error);
      toast.error('Failed to process submission');
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
      <AdminLayout title="News Submissions" description="Review user-submitted news articles">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="News Submissions" description="Review user-submitted news articles">
      <div className="space-y-6">
        <div className="grid gap-6">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No news submissions found</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id} className="glass-morphism border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="font-orbitron text-xl mb-2">{submission.title}</CardTitle>
                      {submission.author_name && (
                        <CardDescription>By {submission.author_name}</CardDescription>
                      )}
                      {submission.excerpt && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{submission.excerpt}</p>
                      )}
                    </div>
                    {getStatusBadge(submission.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {submission.image_url && (
                    <img
                      src={submission.image_url}
                      alt={submission.title}
                      className="w-full h-48 object-cover rounded-lg border border-border"
                    />
                  )}

                  <div className="text-xs text-muted-foreground">
                    Submitted: {format(new Date(submission.created_at), 'MMM d, yyyy h:mm a')}
                  </div>

                  {submission.status === 'pending' && (
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handlePreview(submission)}
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 border-blue-500/30"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(submission)}
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-500 border-green-500/30"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve & Publish
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(submission)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {submission.status === 'rejected' && submission.rejection_reason && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <Label className="text-sm font-semibold text-red-500 mb-1">Rejection Reason:</Label>
                      <p className="text-sm text-muted-foreground">{submission.rejection_reason}</p>
                    </div>
                  )}

                  {submission.status === 'approved' && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-sm text-green-500">✓ Published to news page</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={actionType === 'preview'} onOpenChange={() => {
        setSelectedSubmission(null);
        setActionType(null);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-2xl">{selectedSubmission?.title}</DialogTitle>
            {selectedSubmission?.author_name && (
              <DialogDescription>By {selectedSubmission.author_name}</DialogDescription>
            )}
          </DialogHeader>
          <div className="space-y-4">
            {selectedSubmission?.image_url && (
              <img
                src={selectedSubmission.image_url}
                alt={selectedSubmission.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            {selectedSubmission?.excerpt && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <Label className="text-sm font-semibold mb-2">Excerpt:</Label>
                <p className="text-sm">{selectedSubmission.excerpt}</p>
              </div>
            )}
            <div>
              <Label className="text-sm font-semibold mb-2">Full Article:</Label>
              <div className="prose prose-sm max-w-none text-foreground">
                {selectedSubmission?.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setSelectedSubmission(null);
              setActionType(null);
            }}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Dialogs */}
      <Dialog open={actionType === 'approve' || actionType === 'reject'} onOpenChange={() => {
        setSelectedSubmission(null);
        setActionType(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve & Publish' : 'Reject Submission'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve'
                ? `Publish "${selectedSubmission?.title}" to the news page?`
                : `Provide a reason for rejecting "${selectedSubmission?.title}"`}
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
                setSelectedSubmission(null);
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