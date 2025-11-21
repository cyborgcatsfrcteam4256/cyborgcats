-- Create news submissions table for user-submitted articles
CREATE TABLE IF NOT EXISTS public.news_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  published_news_id UUID REFERENCES public.news_posts(id)
);

-- Enable RLS
ALTER TABLE public.news_submissions ENABLE ROW LEVEL SECURITY;

-- Users can create their own submissions
CREATE POLICY "Users can create news submissions"
  ON public.news_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON public.news_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON public.news_submissions
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update submissions (approve/reject)
CREATE POLICY "Admins can update submissions"
  ON public.news_submissions
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_news_submissions_user_id ON public.news_submissions(user_id);
CREATE INDEX idx_news_submissions_status ON public.news_submissions(status);