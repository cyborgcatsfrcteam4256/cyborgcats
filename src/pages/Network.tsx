import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemberDirectory } from '@/components/Network/MemberDirectory';
import { MyConnections } from '@/components/Network/MyConnections';
import { MessagesEnhanced } from '@/components/Network/MessagesEnhanced';
import { ConnectionSuggestions } from '@/components/Network/ConnectionSuggestions';
import { useToast } from '@/hooks/use-toast';
import { useRealtimePresence } from '@/hooks/useRealtimePresence';

export default function Network() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('directory');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useRealtimePresence(user?.id);

  const handleMessageClick = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTab('messages');
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access the network",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading network...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta 
        title="Network - Cyborg Cats"
        description="Connect with alumni, parents, and students in the Cyborg Cats robotics team network"
      />
      <Navigation />
      <main className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Network</h1>
              <p className="text-muted-foreground">
                Connect with alumni, parents, and current students
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="directory">Directory</TabsTrigger>
                <TabsTrigger value="connections">My Connections</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="directory" className="space-y-6">
                <ConnectionSuggestions currentUserId={user?.id} />
                <MemberDirectory 
                  currentUserId={user?.id} 
                  onMessageClick={handleMessageClick}
                />
              </TabsContent>

              <TabsContent value="connections">
                <MyConnections 
                  currentUserId={user?.id}
                  onMessageClick={handleMessageClick}
                />
              </TabsContent>

              <TabsContent value="messages">
                <MessagesEnhanced 
                  currentUserId={user?.id}
                  selectedUserId={selectedUserId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}