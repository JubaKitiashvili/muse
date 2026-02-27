export type Locale = 'ka' | 'en' | 'ru';

export interface Event {
  id: string;
  title_ka: string;
  title_en: string;
  title_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  date: string;
  time: string;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface MenuCategory {
  id: string;
  parent_id: string | null;
  name_ka: string;
  name_en: string;
  name_ru: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface MenuItemVariant {
  id: string;
  item_id: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  price: number;
  sort_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  description_ka: string | null;
  description_en: string | null;
  description_ru: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  variants?: MenuItemVariant[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption_ka: string | null;
  caption_en: string | null;
  caption_ru: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface SiteContent {
  key: string;
  value_ka: string;
  value_en: string;
  value_ru: string;
}
