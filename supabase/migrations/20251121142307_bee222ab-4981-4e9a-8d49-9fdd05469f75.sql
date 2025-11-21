-- Create team member requests table
CREATE TABLE IF NOT EXISTS public.team_member_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT
);

-- Enable RLS
ALTER TABLE public.team_member_requests ENABLE ROW LEVEL SECURITY;

-- Users can create their own requests
CREATE POLICY "Users can create team member requests"
  ON public.team_member_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own requests
CREATE POLICY "Users can view own requests"
  ON public.team_member_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all requests
CREATE POLICY "Admins can view all requests"
  ON public.team_member_requests
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update requests (approve/reject)
CREATE POLICY "Admins can update requests"
  ON public.team_member_requests
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_team_member_requests_user_id ON public.team_member_requests(user_id);
CREATE INDEX idx_team_member_requests_status ON public.team_member_requests(status);