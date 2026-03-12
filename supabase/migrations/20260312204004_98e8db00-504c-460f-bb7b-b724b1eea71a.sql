
DROP POLICY "Allow insert via service role" ON public.orders;
CREATE POLICY "Deny anon insert" ON public.orders
  FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "Allow service insert" ON public.orders
  FOR INSERT TO service_role WITH CHECK (true);
