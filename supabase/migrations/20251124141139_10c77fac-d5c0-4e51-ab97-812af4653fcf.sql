-- Add approval and featured fields to user_photos table
ALTER TABLE public.user_photos
ADD COLUMN IF NOT EXISTS is_approved boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS category text;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_photos_approved ON public.user_photos(is_approved);
CREATE INDEX IF NOT EXISTS idx_user_photos_featured ON public.user_photos(is_featured);

-- Update RLS policies for admin access
CREATE POLICY "Admins can update all photos"
ON public.user_photos
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
    AND approved = true
  )
);

CREATE POLICY "Admins can delete all photos"
ON public.user_photos
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
    AND approved = true
  )
);

CREATE POLICY "Admins can view all photos"
ON public.user_photos
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
    AND approved = true
  )
);

-- Make user-photos bucket public so approved photos can be displayed
UPDATE storage.buckets
SET public = true
WHERE id = 'user-photos';