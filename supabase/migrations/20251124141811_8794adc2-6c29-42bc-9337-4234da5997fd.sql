-- Fix the Resources RLS policy to properly allow admin inserts
DROP POLICY IF EXISTS "Admins can manage all resources" ON resources;

CREATE POLICY "Admins can manage all resources"
ON resources
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Verify news_posts policy (recreate to ensure it has both clauses)
DROP POLICY IF EXISTS "Admins can insert news posts" ON news_posts;

CREATE POLICY "Admins can insert news posts"
ON news_posts
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));