import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SafetyControlsProps {
  targetUserId: string;
  targetUserName: string;
  messageId?: string;
  currentUserId: string;
  onComplete: () => void;
}

type ActionType = 'block' | 'report' | null;

export const SafetyControls = ({
  targetUserId,
  targetUserName,
  messageId,
  currentUserId,
  onComplete,
}: SafetyControlsProps) => {
  const [actionType, setActionType] = useState<ActionType>(null);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const reportReasons = [
    'Harassment or bullying',
    'Inappropriate content',
    'Spam',
    'Impersonation',
    'Safety concerns',
    'Other',
  ];

  const blockReasons = [
    'I don\'t want to see their content',
    'Harassment',
    'Spam',
    'Other',
  ];

  const handleBlock = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('blocked_users')
        .insert({
          blocker_id: currentUserId,
          blocked_id: targetUserId,
          reason: reason || description,
        });

      if (error) throw error;

      toast({
        title: "User Blocked",
        description: `You have blocked ${targetUserName}`,
      });

      onComplete();
      setActionType(null);
    } catch (error) {
      console.error('Error blocking user:', error);
      toast({
        title: "Error",
        description: "Failed to block user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    if (!reason) {
      toast({
        title: "Missing Information",
        description: "Please select a reason for reporting",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('reports')
        .insert({
          reporter_id: currentUserId,
          reported_user_id: messageId ? null : targetUserId,
          reported_message_id: messageId || null,
          reason,
          description,
        });

      if (error) throw error;

      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep our community safe. We will review this report.",
      });

      onComplete();
      setActionType(null);
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Block Dialog */}
      <Dialog open={actionType === 'block'} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block {targetUserName}?</DialogTitle>
            <DialogDescription>
              They won't be able to message you or see your profile. They won't be notified that you've blocked them.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Reason (optional)</Label>
              <RadioGroup value={reason} onValueChange={setReason}>
                {blockReasons.map(r => (
                  <div key={r} className="flex items-center space-x-2">
                    <RadioGroupItem value={r} id={r} />
                    <Label htmlFor={r} className="font-normal cursor-pointer">{r}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {reason === 'Other' && (
              <div>
                <Label htmlFor="description">Please specify</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more..."
                  rows={3}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBlock} disabled={loading}>
              {loading ? 'Blocking...' : 'Block User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={actionType === 'report'} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report {messageId ? 'Message' : 'User'}</DialogTitle>
            <DialogDescription>
              Help us understand what's happening. Reports are confidential.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Reason *</Label>
              <RadioGroup value={reason} onValueChange={setReason}>
                {reportReasons.map(r => (
                  <div key={r} className="flex items-center space-x-2">
                    <RadioGroupItem value={r} id={`report-${r}`} />
                    <Label htmlFor={`report-${r}`} className="font-normal cursor-pointer">{r}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="report-description">Additional details (optional)</Label>
              <Textarea
                id="report-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide any additional context that might help us understand the situation..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleReport} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Trigger Buttons (Hidden, controlled externally) */}
    </>
  );
};