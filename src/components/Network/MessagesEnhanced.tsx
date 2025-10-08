import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Send, MoreVertical, Flag, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { TypingIndicator, useTypingIndicator } from './TypingIndicator';
import { MessageReactions } from './MessageReactions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  edited: boolean;
  deleted: boolean;
  sender: {
    full_name: string;
    avatar_url: string | null;
    is_online: boolean;
  };
  receiver: {
    full_name: string;
    avatar_url: string | null;
    is_online: boolean;
  };
}

interface Conversation {
  userId: string;
  userName: string;
  userAvatar: string | null;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface MessagesEnhancedProps {
  currentUserId: string;
  selectedUserId?: string | null;
  onReportMessage?: (messageId: string) => void;
}

export const MessagesEnhanced = ({
  currentUserId,
  selectedUserId,
  onReportMessage,
}: MessagesEnhancedProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { indicateTyping, stopTyping } = useTypingIndicator(
    currentUserId,
    selectedConversation || ''
  );

  useEffect(() => {
    if (selectedUserId) {
      setSelectedConversation(selectedUserId);
      fetchMessages(selectedUserId);
    }
  }, [selectedUserId]);

  useEffect(() => {
    fetchConversations();

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMsg = payload.new as any;
          if (
            newMsg.receiver_id === currentUserId ||
            newMsg.sender_id === currentUserId
          ) {
            fetchConversations();
            if (selectedConversation) {
              fetchMessages(selectedConversation);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(full_name, avatar_url, is_online),
          receiver:profiles!messages_receiver_id_fkey(full_name, avatar_url, is_online)
        `)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .eq('deleted', false)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const conversationMap = new Map<string, Conversation>();

      data?.forEach((msg: Message) => {
        const partnerId =
          msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
        const partnerName =
          msg.sender_id === currentUserId
            ? msg.receiver.full_name
            : msg.sender.full_name;
        const partnerAvatar =
          msg.sender_id === currentUserId
            ? msg.receiver.avatar_url
            : msg.sender.avatar_url;
        const isOnline =
          msg.sender_id === currentUserId
            ? msg.receiver.is_online
            : msg.sender.is_online;

        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            userId: partnerId,
            userName: partnerName,
            userAvatar: partnerAvatar,
            isOnline,
            lastMessage: msg.content,
            lastMessageTime: msg.created_at,
            unreadCount:
              msg.receiver_id === currentUserId && !msg.read ? 1 : 0,
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
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive',
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
          sender:profiles!messages_sender_id_fkey(full_name, avatar_url, is_online),
          receiver:profiles!messages_receiver_id_fkey(full_name, avatar_url, is_online)
        `)
        .or(
          `and(sender_id.eq.${currentUserId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${currentUserId})`
        )
        .eq('deleted', false)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);

      await supabase
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', currentUserId)
        .eq('sender_id', partnerId);

      fetchConversations();
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const { error } = await supabase.from('messages').insert({
        sender_id: currentUserId,
        receiver_id: selectedConversation,
        content: newMessage.trim(),
      });

      if (error) throw error;

      // Create notification
      await supabase.from('notifications').insert({
        user_id: selectedConversation,
        type: 'new_message',
        title: 'New Message',
        message: `You have a new message`,
        link: '/network?tab=messages',
      });

      setNewMessage('');
      stopTyping();
      fetchMessages(selectedConversation);
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ deleted: true })
        .eq('id', messageId);

      if (error) throw error;

      if (selectedConversation) {
        fetchMessages(selectedConversation);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };

  const handleTyping = () => {
    indicateTyping();
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-4 h-[600px]">
        <Card className="md:col-span-1 p-4">
          <Skeleton className="h-full" />
        </Card>
        <Card className="md:col-span-2 p-4">
          <Skeleton className="h-full" />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-4 h-[600px]">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Messages</h3>
        </div>
        <ScrollArea className="h-[540px]">
          {conversations.map((conv) => (
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
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conv.userAvatar || undefined} />
                  <AvatarFallback>
                    {conv.userName.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {conv.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium truncate">{conv.userName}</span>
                  {conv.unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(conv.lastMessageTime), {
                    addSuffix: true,
                  })}
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
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={
                        conversations.find((c) => c.userId === selectedConversation)
                          ?.userAvatar || undefined
                      }
                    />
                    <AvatarFallback>
                      {conversations
                        .find((c) => c.userId === selectedConversation)
                        ?.userName.split(' ')
                        .map((n) => n[0])
                        .join('') || ''}
                    </AvatarFallback>
                  </Avatar>
                  {conversations.find((c) => c.userId === selectedConversation)
                    ?.isOnline && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {conversations.find((c) => c.userId === selectedConversation)
                      ?.userName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {conversations.find((c) => c.userId === selectedConversation)
                      ?.isOnline
                      ? 'Online'
                      : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender_id === currentUserId
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        msg.sender_id === currentUserId ? 'items-end' : 'items-start'
                      } flex flex-col gap-1`}
                    >
                      <div
                        className={`rounded-lg p-3 ${
                          msg.sender_id === currentUserId
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs opacity-70">
                            {formatDistanceToNow(new Date(msg.created_at), {
                              addSuffix: true,
                            })}
                            {msg.edited && ' (edited)'}
                          </p>
                          {msg.sender_id === currentUserId && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0"
                                >
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => deleteMessage(msg.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                          {msg.sender_id !== currentUserId && onReportMessage && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0"
                              onClick={() => onReportMessage(msg.id)}
                            >
                              <Flag className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <MessageReactions
                        messageId={msg.id}
                        currentUserId={currentUserId}
                      />
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <TypingIndicator
              currentUserId={currentUserId}
              conversationWithId={selectedConversation}
            />

            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
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