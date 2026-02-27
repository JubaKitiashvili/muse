-- Menu item variants (e.g. "Georgian Salad" → "with walnut oil" 20₾, "with walnuts" 22₾)
CREATE TABLE public.menu_item_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
  name_ka TEXT NOT NULL,
  name_en TEXT DEFAULT '',
  name_ru TEXT DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  sort_order INT4 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_menu_item_variants_item_id ON public.menu_item_variants(item_id);

ALTER TABLE public.menu_item_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read variants" ON public.menu_item_variants FOR SELECT USING (true);
CREATE POLICY "Admin full variants" ON public.menu_item_variants FOR ALL USING (true);
