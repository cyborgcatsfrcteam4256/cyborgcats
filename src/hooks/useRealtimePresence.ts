import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRealtimePresence = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    // Set user as online
    const setOnline = async () => {
      await supabase
        .from('profiles')
        .update({ 
          is_online: true,
          last_seen: new Date().toISOString()
        })
        .eq('id', userId);
    };

    // Set user as offline
    const setOffline = async () => {
      await supabase
        .from('profiles')
        .update({ 
          is_online: false,
          last_seen: new Date().toISOString()
        })
        .eq('id', userId);
    };

    // Set online on mount
    setOnline();

    // Update last_seen periodically
    const interval = setInterval(() => {
      supabase
        .from('profiles')
        .update({ last_seen: new Date().toISOString() })
        .eq('id', userId)
        .eq('is_online', true);
    }, 30000); // Every 30 seconds

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOffline();
      } else {
        setOnline();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle beforeunload
    const handleBeforeUnload = () => {
      // Use navigator.sendBeacon for reliable offline status on page unload
      const data = new FormData();
      data.append('user_id', userId);
      navigator.sendBeacon('/api/set-offline', data);
      
      // Fallback to sync request
      setOffline();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      setOffline();
    };
  }, [userId]);
};