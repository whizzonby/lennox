
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _sub RECORD;
BEGIN
  -- Try to find matching intake submission by email
  SELECT * INTO _sub FROM public.jobseeker_submissions
    WHERE lower(email) = lower(COALESCE(NEW.email, ''))
    ORDER BY created_at DESC
    LIMIT 1;

  IF _sub IS NOT NULL THEN
    INSERT INTO public.profiles (user_id, email, first_name, last_name, phone, availability)
    VALUES (
      NEW.id,
      COALESCE(NEW.email, ''),
      _sub.first_name,
      _sub.last_name,
      _sub.phone,
      COALESCE(_sub.availability, '')
    );
  ELSE
    INSERT INTO public.profiles (user_id, email, first_name, last_name)
    VALUES (
      NEW.id,
      COALESCE(NEW.email, ''),
      COALESCE(NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'name', '')),
      ''
    );
  END IF;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'jobseeker');
  RETURN NEW;
END;
$function$;
