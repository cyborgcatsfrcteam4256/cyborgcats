-- Create resources table for admin-managed learning resources
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('programming', 'cad_design', 'team_management', 'stem_curriculum')),
  resource_type TEXT NOT NULL CHECK (resource_type IN ('link', 'file', 'video', 'document')),
  file_url TEXT,
  external_url TEXT,
  downloads_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Public can view approved resources
CREATE POLICY "Anyone can view approved resources"
ON public.resources
FOR SELECT
USING (is_approved = true);

-- Authenticated users can submit resources
CREATE POLICY "Authenticated users can submit resources"
ON public.resources
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Users can view their own submitted resources
CREATE POLICY "Users can view own resources"
ON public.resources
FOR SELECT
USING (auth.uid() = created_by);

-- Admins can do everything
CREATE POLICY "Admins can manage all resources"
ON public.resources
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update RLS policies for team_members to ensure admins can manage
CREATE POLICY "Admins can insert team members"
ON public.team_members
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update team members"
ON public.team_members
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete team members"
ON public.team_members
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update RLS policies for news_posts to ensure admins can manage
CREATE POLICY "Admins can insert news posts"
ON public.news_posts
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update news posts"
ON public.news_posts
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete news posts"
ON public.news_posts
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for resource files
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resources bucket
CREATE POLICY "Anyone can view resource files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resources');

CREATE POLICY "Admins can upload resource files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'resources' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update resource files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'resources' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete resource files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'resources' AND
  has_role(auth.uid(), 'admin'::app_role)
);

-- Create index for faster queries
CREATE INDEX idx_resources_category ON public.resources(category);
CREATE INDEX idx_resources_approved ON public.resources(is_approved);
CREATE INDEX idx_resources_featured ON public.resources(is_featured);