import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TypingIndicatorProps {
  currentUserId: string;
  conversationWithId: string;
}

export const TypingIndicator = ({ currentUserId, conversationWithId }: TypingIndicatorProps) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Subscribe to typing indicators
    const channel = supabase
      .channel('typing_indicators')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'typing_indicators',
          filter: `user_id=eq.${conversationWithId},conversation_with=eq.${currentUserId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setIsTyping(payload.new.is_typing);
            
            // Auto-clear after 3 seconds
            setTimeout(() => {
              setIsTyping(false);
            }, 3000);
          } else if (payload.eventType === 'DELETE') {
            setIsTyping(false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, conversationWithId]);

  if (!isTyping) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2">
      <div className="flex gap-1">
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>typing...</span>
    </div>
  );
};

export const useTypingIndicator = (currentUserId: string, conversationWithId: string) => {
  let timeoutId: NodeJS.Timeout;

  const indicateTyping = async () => {
    // Clear existing timeout
    if (timeoutId) clearTimeout(timeoutId);

    // Upsert typing indicator
    await supabase
      .from('typing_indicators')
      .upsert({
        user_id: currentUserId,
        conversation_with: conversationWithId,
        is_typing: true,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,conversation_with'
      });

    // Auto-remove after 3 seconds
    timeoutId = setTimeout(async () => {
      await supabase
        .from('typing_indicators')
        .delete()
        .eq('user_id', currentUserId)
        .eq('conversation_with', conversationWithId);
    }, 3000);
  };

  const stopTyping = async () => {
    if (timeoutId) clearTimeout(timeoutId);
    
    await supabase
      .from('typing_indicators')
      .delete()
      .eq('user_id', currentUserId)
      .eq('conversation_with', conversationWithId);
  };

  return { indicateTyping, stopTyping };
};