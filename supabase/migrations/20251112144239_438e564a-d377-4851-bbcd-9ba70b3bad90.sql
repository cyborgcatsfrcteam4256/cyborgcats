-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  tier TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active sponsors
CREATE POLICY "Anyone can view active sponsors"
ON public.sponsors
FOR SELECT
USING (is_active = true);

-- Allow admins to manage sponsors
CREATE POLICY "Admins can insert sponsors"
ON public.sponsors
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update sponsors"
ON public.sponsors
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete sponsors"
ON public.sponsors
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_sponsors_updated_at
BEFORE UPDATE ON public.sponsors
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert existing sponsors
INSERT INTO public.sponsors (name, logo_url, website, tier, display_order) VALUES
('Westminster Christian Academy', '/lovable-uploads/westminster-logo.png', 'https://wcastl.org', 'Foundational Partner', 1),
('Boeing', '/lovable-uploads/boeing-logo.png', 'https://www.boeing.com', 'Foundational Partner', 2),
('FSI', '/lovable-uploads/fsi-logo.png', 'https://www.fsipolyurethanes.com', 'Foundational Partner', 3),
('TAC Air', '/lovable-uploads/tac-air-logo.jpeg', 'https://www.tacair.com', 'Sustainable Partner', 1),
('TierPoint', '/lovable-uploads/tierpoint-logo.webp', 'https://www.tierpoint.com', 'Development Partner', 1),
('LinMark Machine Products', '/lovable-uploads/linmark-logo.jpeg', 'https://www.linmarkmachine.com', 'Development Partner', 2),
('Agilix Solutions', '/lovable-uploads/agilix-logo.webp', 'https://www.agilixsolutions.com', 'Competition Partner', 1),
('Simons PLM Software', '/lovable-uploads/siemens-plm-logo.svg', 'https://plm.sw.siemens.com', 'Competition Partner', 2),
('Jemco Components & Fabrication, Inc.', '/lovable-uploads/jemco-logo.png', 'https://www.jemcoinc.com', 'Competition Partner', 3),
('Ace Hardware', '/lovable-uploads/ace-hardware-logo.svg', 'https://www.acehardware.com', 'Associate Partner', 1);