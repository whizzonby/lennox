
CREATE POLICY "Admins can view jobseeker submissions"
ON public.jobseeker_submissions
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
