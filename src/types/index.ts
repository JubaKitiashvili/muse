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

export interface SiteContent {
  key: string;
  value_ka: string;
  value_en: string;
  value_ru: string;
}
