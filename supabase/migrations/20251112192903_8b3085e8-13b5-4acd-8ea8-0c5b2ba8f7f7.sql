-- Drop the overly permissive public access policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow users to view profiles of accepted connections only
CREATE POLICY "Users can view connected profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 
    FROM public.connections 
    WHERE status = 'accepted' 
      AND (
        (requester_id = auth.uid() AND receiver_id = profiles.id)
        OR (receiver_id = auth.uid() AND requester_id = profiles.id)
      )
  )
);

-- Allow admins to view all profiles for moderation
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));