
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL,
  payment_id TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'success',
  order_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert via service role" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON public.orders
  FOR SELECT USING (true);
