
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
