-- Drop existing INSERT policy for news_posts
DROP POLICY IF EXISTS "Admins can insert news posts" ON public.news_posts;

-- Recreate the INSERT policy with explicit WITH CHECK condition
CREATE POLICY "Admins can insert news posts" 
ON public.news_posts
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Also ensure the has_role function is correct (recreating for safety)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND approved = true
  )
$$;