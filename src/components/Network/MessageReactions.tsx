import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Smile } from 'lucide-react';

interface Reaction {
  id: string;
  user_id: string;
  reaction: string;
}

interface MessageReactionsProps {
  messageId: string;
  currentUserId: string;
}

const AVAILABLE_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🎉'];

export const MessageReactions = ({ messageId, currentUserId }: MessageReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReactions();

    // Subscribe to reaction changes
    const channel = supabase
      .channel(`reactions-${messageId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'message_reactions',
          filter: `message_id=eq.${messageId}`,
        },
        () => {
          fetchReactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messageId]);

  const fetchReactions = async () => {
    const { data, error } = await supabase
      .from('message_reactions')
      .select('*')
      .eq('message_id', messageId);

    if (error) {
      console.error('Error fetching reactions:', error);
      return;
    }

    setReactions(data || []);
  };

  const handleReaction = async (emoji: string) => {
    setLoading(true);
    try {
      // Check if user already reacted with this emoji
      const existing = reactions.find(
        r => r.user_id === currentUserId && r.reaction === emoji
      );

      if (existing) {
        // Remove reaction
        await supabase
          .from('message_reactions')
          .delete()
          .eq('id', existing.id);
      } else {
        // Add reaction
        await supabase
          .from('message_reactions')
          .insert({
            message_id: messageId,
            user_id: currentUserId,
            reaction: emoji,
          });
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group reactions by emoji
  const groupedReactions = reactions.reduce((acc, r) => {
    if (!acc[r.reaction]) {
      acc[r.reaction] = [];
    }
    acc[r.reaction].push(r);
    return {};
  }, {} as Record<string, Reaction[]>);

  return (
    <div className="flex items-center gap-1">
      {/* Display existing reactions */}
      {Object.entries(groupedReactions).map(([emoji, users]) => {
        const userReacted = users.some(u => u.user_id === currentUserId);
        return (
          <Button
            key={emoji}
            variant={userReacted ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 px-2 gap-1"
            onClick={() => handleReaction(emoji)}
            disabled={loading}
          >
            <span>{emoji}</span>
            <span className="text-xs">{users.length}</span>
          </Button>
        );
      })}

      {/* Add reaction button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" disabled={loading}>
            <Smile className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="end">
          <div className="flex gap-1">
            {AVAILABLE_REACTIONS.map(emoji => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-xl hover:scale-125 transition-transform"
                onClick={() => handleReaction(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};