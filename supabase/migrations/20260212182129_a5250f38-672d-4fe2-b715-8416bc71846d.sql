
-- Validation trigger for contact_submissions
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(NEW.name) > 100 OR length(NEW.name) < 1 THEN
    RAISE EXCEPTION 'Name must be between 1 and 100 characters';
  END IF;
  IF length(NEW.email) > 254 OR length(NEW.email) < 3 THEN
    RAISE EXCEPTION 'Email must be between 3 and 254 characters';
  END IF;
  IF NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  IF length(NEW.message) > 5000 OR length(NEW.message) < 10 THEN
    RAISE EXCEPTION 'Message must be between 10 and 5000 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_contact_submission_trigger
BEFORE INSERT ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.validate_contact_submission();

-- Validation trigger for jobseeker_submissions
CREATE OR REPLACE FUNCTION public.validate_jobseeker_submission()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(NEW.first_name) > 100 OR length(NEW.first_name) < 1 THEN
    RAISE EXCEPTION 'First name must be between 1 and 100 characters';
  END IF;
  IF length(NEW.last_name) > 100 OR length(NEW.last_name) < 1 THEN
    RAISE EXCEPTION 'Last name must be between 1 and 100 characters';
  END IF;
  IF length(NEW.email) > 254 OR length(NEW.email) < 3 THEN
    RAISE EXCEPTION 'Email must be between 3 and 254 characters';
  END IF;
  IF NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  IF length(NEW.phone) > 20 OR length(NEW.phone) < 7 THEN
    RAISE EXCEPTION 'Phone must be between 7 and 20 characters';
  END IF;
  IF NEW.experience IS NOT NULL AND length(NEW.experience) > 5000 THEN
    RAISE EXCEPTION 'Experience must be under 5000 characters';
  END IF;
  IF NEW.availability IS NOT NULL AND length(NEW.availability) > 500 THEN
    RAISE EXCEPTION 'Availability must be under 500 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_jobseeker_submission_trigger
BEFORE INSERT ON public.jobseeker_submissions
FOR EACH ROW
EXECUTE FUNCTION public.validate_jobseeker_submission();

-- Rate limiting table for anonymous submissions
CREATE TABLE public.submission_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  table_name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access to rate limits table
-- Only edge functions with service role can access it

-- Index for efficient lookups
CREATE INDEX idx_rate_limits_ip_table_time ON public.submission_rate_limits (ip_hash, table_name, created_at);

-- Auto-cleanup old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.submission_rate_limits WHERE created_at < now() - interval '24 hours';
  RETURN NEW;
END;
$$;

CREATE TRIGGER cleanup_rate_limits_trigger
AFTER INSERT ON public.submission_rate_limits
FOR EACH ROW
EXECUTE FUNCTION public.cleanup_old_rate_limits();
