
-- Roles enum & table
CREATE TYPE public.app_role AS ENUM ('admin', 'jobseeker', 'employer');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS on user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  trade_role text DEFAULT '',
  location text DEFAULT '',
  willing_to_travel boolean DEFAULT false,
  availability text DEFAULT '',
  years_of_experience integer,
  job_type text[] DEFAULT '{}',
  shift_preference text[] DEFAULT '{}',
  pay_range_min numeric,
  pay_range_max numeric,
  commute_distance text DEFAULT '',
  actively_looking boolean DEFAULT true,
  trade_skills text[] DEFAULT '{}',
  equipment_experience text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Work history
CREATE TABLE public.work_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  start_date text DEFAULT '',
  end_date text DEFAULT '',
  responsibilities text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.work_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own work history"
  ON public.work_history FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own work history"
  ON public.work_history FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own work history"
  ON public.work_history FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own work history"
  ON public.work_history FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Documents table
CREATE TABLE public.jobseeker_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  status text NOT NULL DEFAULT 'uploaded',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.jobseeker_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents"
  ON public.jobseeker_documents FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON public.jobseeker_documents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON public.jobseeker_documents FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('jobseeker-docs', 'jobseeker-docs', false);

CREATE POLICY "Users can upload own docs"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'jobseeker-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own docs"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'jobseeker-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own docs"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'jobseeker-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Trigger for updated_at on profiles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile + role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'name', '')),
    ''
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'jobseeker');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
