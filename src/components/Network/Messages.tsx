import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { messageSchema } from '@/lib/validations/message';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender: {
    full_name: string;
    avatar_url: string | null;
  };
  receiver: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface Conversation {
  userId: string;
  userName: string;
  userAvatar: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface MessagesProps {
  currentUserId: string;
  selectedUserId?: string | null;
}

export const Messages = ({ currentUserId, selectedUserId }: MessagesProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Auto-select conversation when navigating from connections
  useEffect(() => {
    if (selectedUserId) {
      setSelectedConversation(selectedUserId);
      fetchMessages(selectedUserId);
    }
  }, [selectedUserId]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [validationError, setValidationError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
    
    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${currentUserId}`,
        },
        () => {
          fetchConversations();
          if (selectedConversation) {
            fetchMessages(selectedConversation);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, selectedConversation]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(full_name, avatar_url),
          receiver:profiles!messages_receiver_id_fkey(full_name, avatar_url)
        `)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation partner
      const conversationMap = new Map<string, Conversation>();
      
      data?.forEach((msg: Message) => {
        const partnerId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
        const partnerName = msg.sender_id === currentUserId ? msg.receiver.full_name : msg.sender.full_name;
        const partnerAvatar = msg.sender_id === currentUserId ? msg.receiver.avatar_url : msg.sender.avatar_url;
        
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            userId: partnerId,
            userName: partnerName,
            userAvatar: partnerAvatar,
            lastMessage: msg.content,
            lastMessageTime: msg.created_at,
            unreadCount: msg.receiver_id === currentUserId && !msg.read ? 1 : 0,
          });
        } else {
          const conv = conversationMap.get(partnerId)!;
          if (msg.receiver_id === currentUserId && !msg.read) {
            conv.unreadCount++;
          }
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (partnerId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(full_name, avatar_url),
          receiver:profiles!messages_receiver_id_fkey(full_name, avatar_url)
        `)
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', currentUserId)
        .eq('sender_id', partnerId);

      fetchConversations();
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Validate message content
    const validation = messageSchema.safeParse({ content: newMessage });
    if (!validation.success) {
      setValidationError(validation.error.errors[0].message);
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: currentUserId,
          receiver_id: selectedConversation,
          content: newMessage.trim(),
        });

      if (error) throw error;

      setNewMessage('');
      setValidationError('');
      fetchMessages(selectedConversation);
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-4 h-[600px]">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Conversations</h3>
        </div>
        <ScrollArea className="h-[540px]">
          {conversations.map(conv => (
            <button
              key={conv.userId}
              onClick={() => {
                setSelectedConversation(conv.userId);
                fetchMessages(conv.userId);
              }}
              className={`w-full p-4 flex items-start gap-3 hover:bg-accent transition-colors ${
                selectedConversation === conv.userId ? 'bg-accent' : ''
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.userAvatar || undefined} />
                <AvatarFallback>
                  {conv.userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium truncate">{conv.userName}</span>
                  {conv.unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(conv.lastMessageTime), { addSuffix: true })}
                </p>
              </div>
            </button>
          ))}
          {conversations.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No conversations yet
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Messages Area */}
      <Card className="md:col-span-2 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b">
              <h3 className="font-semibold">
                {conversations.find(c => c.userId === selectedConversation)?.userName}
              </h3>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender_id === currentUserId
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="space-y-2"
              >
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                        setValidationError('');
                      }}
                      placeholder="Type a message..."
                      className="min-h-[60px] resize-none"
                      maxLength={5000}
                    />
                    <div className="flex justify-between items-center text-xs">
                      <span className={newMessage.length > 5000 ? 'text-destructive' : 'text-muted-foreground'}>
                        {newMessage.length}/5000 characters
                      </span>
                      {validationError && (
                        <span className="text-destructive">{validationError}</span>
                      )}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!newMessage.trim() || newMessage.length > 5000}
                    className="self-start"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </Card>
    </div>
  );
};