-- Make avatars bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'avatars';

-- Create function to get user email (for admin users page)
CREATE OR REPLACE FUNCTION public.get_user_email(_user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM auth.users WHERE id = _user_id;
$$;