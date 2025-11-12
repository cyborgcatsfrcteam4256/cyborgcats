-- Add admin-only SELECT policy for contacts table
CREATE POLICY "Admins can view contact submissions"
ON public.contacts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add admin-only SELECT policy for newsletter_subscribers table
CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));