-- Create impact_award_categories table
CREATE TABLE public.impact_award_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert predefined categories from the FIRST Impact Award definitions
INSERT INTO public.impact_award_categories (category_name, description, display_order) VALUES
  ('Advocacy', 'Promoting FIRST and STEM through government and community advocacy', 1),
  ('Hosted', 'Hosting events and activities for students and community', 2),
  ('Ran', 'Running programs and initiatives', 3),
  ('Reached', 'Outreach activities reaching community members', 4),
  ('Provided Published Resources', 'Creating and sharing educational resources', 5);

-- Create impact_award_entries table
CREATE TABLE public.impact_award_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documentation_id TEXT NOT NULL UNIQUE,
  team_number TEXT,
  activity_description TEXT NOT NULL,
  activity_location TEXT,
  activity_date TEXT NOT NULL,
  impact_category TEXT NOT NULL,
  documentation_type TEXT NOT NULL,
  documentation_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create impact_award_edit_requests table
CREATE TABLE public.impact_award_edit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID REFERENCES public.impact_award_entries(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES auth.users(id),
  request_type TEXT NOT NULL CHECK (request_type IN ('edit', 'add')),
  proposed_changes JSONB NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.impact_award_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_award_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_award_edit_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for impact_award_categories
CREATE POLICY "Anyone can view active categories"
  ON public.impact_award_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON public.impact_award_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for impact_award_entries
CREATE POLICY "Anyone can view active entries"
  ON public.impact_award_entries FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage all entries"
  ON public.impact_award_entries FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for impact_award_edit_requests
CREATE POLICY "Users can view their own requests"
  ON public.impact_award_edit_requests FOR SELECT
  USING (auth.uid() = requester_id);

CREATE POLICY "Users can create requests"
  ON public.impact_award_edit_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Admins can view all requests"
  ON public.impact_award_edit_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update requests"
  ON public.impact_award_edit_requests FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_impact_award_entries_updated_at
  BEFORE UPDATE ON public.impact_award_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for impact documentation
INSERT INTO storage.buckets (id, name, public) 
VALUES ('impact-documentation', 'impact-documentation', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for impact-documentation bucket
CREATE POLICY "Anyone can view impact documentation"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'impact-documentation');

CREATE POLICY "Authenticated users can upload impact documentation"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'impact-documentation' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admins can delete impact documentation"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'impact-documentation' AND
    public.has_role(auth.uid(), 'admin')
  );