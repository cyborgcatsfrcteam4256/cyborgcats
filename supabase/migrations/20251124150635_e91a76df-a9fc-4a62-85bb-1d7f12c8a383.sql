-- Create sponsor_tiers table
CREATE TABLE public.sponsor_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  benefits text[] DEFAULT ARRAY[]::text[],
  icon text,
  color_gradient text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsor_tiers ENABLE ROW LEVEL SECURITY;

-- Anyone can view sponsor tiers
CREATE POLICY "Anyone can view sponsor tiers"
ON public.sponsor_tiers
FOR SELECT
USING (true);

-- Admins can manage sponsor tiers
CREATE POLICY "Admins can insert sponsor tiers"
ON public.sponsor_tiers
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update sponsor tiers"
ON public.sponsor_tiers
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete sponsor tiers"
ON public.sponsor_tiers
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default tiers
INSERT INTO public.sponsor_tiers (name, description, display_order) VALUES
('Foundational Partner', 'Our highest tier of support', 1),
('Sustainable Partner', 'Sustained partnership support', 2),
('Development Partner', 'Development phase support', 3),
('Competition Partner', 'Competition season support', 4),
('Associate Partner', 'Entry-level partnership', 5);