
-- Jobseeker intake submissions
CREATE TABLE public.jobseeker_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT,
  availability TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.jobseeker_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit jobseeker form"
  ON public.jobseeker_submissions
  FOR INSERT
  WITH CHECK (true);

-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);
