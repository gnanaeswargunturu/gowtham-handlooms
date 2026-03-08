
-- Add payment_qr_url to shop_settings
ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS payment_qr_url text;

-- Create reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, order_id)
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

-- Users can insert their own reviews
CREATE POLICY "Users can insert their own reviews" ON public.reviews
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews" ON public.reviews
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Admins and owners can manage all reviews
CREATE POLICY "Admins and owners can manage reviews" ON public.reviews
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()) OR is_owner(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
