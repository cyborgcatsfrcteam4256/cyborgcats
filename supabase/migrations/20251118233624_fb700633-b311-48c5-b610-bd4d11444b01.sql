-- Create site_settings table for admin-controlled statistics
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  display_label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings (public stats)
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can insert settings
CREATE POLICY "Admins can insert site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update settings
CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete settings
CREATE POLICY "Admins can delete site settings"
ON public.site_settings
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Seed initial values
INSERT INTO public.site_settings (setting_key, setting_value, display_label) VALUES
  ('team_members_count', '48', 'Team Members'),
  ('years_active', '14', 'Years of Excellence'),
  ('legislators_met', '19', 'Legislators Met');