-- =============================================
-- Muse Bar Tbilisi — Initial Database Schema
-- =============================================

-- 1. TABLES
-- -----------------------------------------

-- Events
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ka TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  description_ka TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_ru TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  time TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Menu Categories
CREATE TABLE public.menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ka TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  sort_order INT4 NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Menu Items
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name_ka TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  description_ka TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_ru TEXT DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  sort_order INT4 NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gallery Photos
CREATE TABLE public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  caption_ka TEXT DEFAULT '',
  caption_en TEXT DEFAULT '',
  caption_ru TEXT DEFAULT '',
  sort_order INT4 NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. ROW LEVEL SECURITY (RLS)
-- -----------------------------------------

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Public read (only published/active/available)
CREATE POLICY "Public can view published events"
  ON public.events FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can view active categories"
  ON public.menu_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view available items"
  ON public.menu_items FOR SELECT
  USING (is_available = true);

CREATE POLICY "Public can view published photos"
  ON public.gallery_photos FOR SELECT
  USING (is_published = true);

-- Authenticated users: full CRUD
CREATE POLICY "Authenticated full access to events"
  ON public.events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated full access to categories"
  ON public.menu_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated full access to items"
  ON public.menu_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated full access to photos"
  ON public.gallery_photos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. STORAGE BUCKETS
-- -----------------------------------------

INSERT INTO storage.buckets (id, name, public) VALUES ('events', 'events', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('menu', 'menu', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Public read for all buckets
CREATE POLICY "Public read events bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'events');

CREATE POLICY "Public read menu bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'menu');

CREATE POLICY "Public read gallery bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

-- Authenticated upload/update/delete
CREATE POLICY "Auth upload to events"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'events');

CREATE POLICY "Auth update events"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'events');

CREATE POLICY "Auth delete from events"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'events');

CREATE POLICY "Auth upload to menu"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'menu');

CREATE POLICY "Auth update menu"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'menu');

CREATE POLICY "Auth delete from menu"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'menu');

CREATE POLICY "Auth upload to gallery"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Auth update gallery"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery');

CREATE POLICY "Auth delete from gallery"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery');
