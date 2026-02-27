-- Add subcategory support: self-referencing parent_id + image_url for category images
ALTER TABLE public.menu_categories
  ADD COLUMN parent_id UUID REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  ADD COLUMN image_url TEXT;

CREATE INDEX idx_menu_categories_parent_id ON public.menu_categories(parent_id);
