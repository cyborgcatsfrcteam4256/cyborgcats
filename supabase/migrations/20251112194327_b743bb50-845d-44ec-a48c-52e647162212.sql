-- Create public-images bucket for news and team content
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-images', 'public-images', true);

-- Allow anyone to view public images
CREATE POLICY "Anyone can view public images"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-images');

-- Allow admins to upload public images
CREATE POLICY "Admins can upload public images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'public-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update public images
CREATE POLICY "Admins can update public images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'public-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete public images
CREATE POLICY "Admins can delete public images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'public-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Make avatars bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'avatars';

-- Drop all existing avatar policies
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Avatars bucket policies (private with proper RLS)
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own avatar"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);