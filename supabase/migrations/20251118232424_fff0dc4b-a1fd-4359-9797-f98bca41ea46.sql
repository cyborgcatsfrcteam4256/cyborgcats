-- Create function to allow admins to assign roles to users
CREATE OR REPLACE FUNCTION public.admin_assign_role(
  target_user_id uuid,
  target_role public.app_role
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can assign roles
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can assign roles';
  END IF;

  -- Upsert the role for the target user
  INSERT INTO public.user_roles (user_id, role, approved, approved_at, approved_by)
  VALUES (target_user_id, target_role, true, now(), auth.uid())
  ON CONFLICT (user_id, role) 
  DO UPDATE SET 
    approved = EXCLUDED.approved,
    approved_at = EXCLUDED.approved_at,
    approved_by = EXCLUDED.approved_by;
END;
$$;