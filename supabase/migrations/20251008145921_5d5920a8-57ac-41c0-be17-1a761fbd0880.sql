-- Create connections table for network relationships
CREATE TABLE public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(requester_id, receiver_id),
  CHECK (requester_id != receiver_id)
);

-- Create messages table for direct messaging
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CHECK (sender_id != receiver_id)
);

-- Enable RLS
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for connections
CREATE POLICY "Users can view their own connections"
  ON public.connections FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create connection requests"
  ON public.connections FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update connections they're part of"
  ON public.connections FOR UPDATE
  USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can delete their own connection requests"
  ON public.connections FOR DELETE
  USING (auth.uid() = requester_id);

-- RLS Policies for messages
CREATE POLICY "Users can view their own messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = receiver_id);

CREATE POLICY "Users can delete their sent messages"
  ON public.messages FOR DELETE
  USING (auth.uid() = sender_id);

-- Add trigger for updated_at on connections
CREATE TRIGGER update_connections_updated_at
  BEFORE UPDATE ON public.connections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;