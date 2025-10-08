-- Create storage buckets for user files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
  ('resumes', 'resumes', false, 10485760, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('user-photos', 'user-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

-- Add resume_url column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS resume_url TEXT;

-- Create user_photos table for multiple photos per user
CREATE TABLE IF NOT EXISTS public.user_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on user_photos table
ALTER TABLE public.user_photos ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_photos
CREATE POLICY "Anyone can view user photos"
  ON public.user_photos FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own photos"
  ON public.user_photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos"
  ON public.user_photos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos"
  ON public.user_photos FOR DELETE
  USING (auth.uid() = user_id);

-- Storage policies for avatars bucket
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for resumes bucket
CREATE POLICY "Users can view their own resume"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload their own resume"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own resume"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own resume"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for user-photos bucket
CREATE POLICY "Anyone can view user photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'user-photos');

CREATE POLICY "Users can upload their own photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'user-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'user-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'user-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Add trigger for user_photos updated_at
CREATE TRIGGER update_user_photos_updated_at
  BEFORE UPDATE ON public.user_photos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();