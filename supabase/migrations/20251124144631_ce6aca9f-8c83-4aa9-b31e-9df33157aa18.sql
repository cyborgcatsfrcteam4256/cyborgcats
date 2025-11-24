-- Drop all existing policies on news_posts
DROP POLICY IF EXISTS "Admins can delete news posts" ON public.news_posts;
DROP POLICY IF EXISTS "Admins can insert news posts" ON public.news_posts;
DROP POLICY IF EXISTS "Admins can update news posts" ON public.news_posts;
DROP POLICY IF EXISTS "Anyone can view published news" ON public.news_posts;

-- Recreate all policies with consistent role settings
-- SELECT policies
CREATE POLICY "Anyone can view published news" 
ON public.news_posts
FOR SELECT
TO public
USING (is_published = true);

CREATE POLICY "Admins can view all news posts"
ON public.news_posts
FOR SELECT
TO public
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- INSERT policy
CREATE POLICY "Admins can insert news posts" 
ON public.news_posts
FOR INSERT
TO public
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- UPDATE policy
CREATE POLICY "Admins can update news posts"
ON public.news_posts
FOR UPDATE
TO public
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- DELETE policy
CREATE POLICY "Admins can delete news posts"
ON public.news_posts
FOR DELETE
TO public
USING (public.has_role(auth.uid(), 'admin'::app_role));