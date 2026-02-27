import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import type { MenuCategory, MenuItem, MenuItemVariant } from '@/types';
import MenuContent from './MenuContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'menu' });

  return {
    title: t('seo_title'),
    description: t('seo_description'),
    openGraph: {
      title: t('seo_title'),
      description: t('seo_description'),
      url: `https://musebar.ge/${locale}/menu`,
      type: 'website',
    },
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const [categoriesRes, itemsRes, variantsRes] = await Promise.all([
    supabase
      .from('menu_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order'),
    supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('sort_order'),
    supabase
      .from('menu_item_variants')
      .select('*')
      .order('sort_order'),
  ]);

  const categories: MenuCategory[] = categoriesRes.data ?? [];
  const variants: MenuItemVariant[] = variantsRes.data ?? [];

  // Attach variants to their items
  const variantsMap = new Map<string, MenuItemVariant[]>();
  variants.forEach((v) => {
    const list = variantsMap.get(v.item_id) || [];
    list.push(v);
    variantsMap.set(v.item_id, list);
  });

  const items: MenuItem[] = (itemsRes.data ?? []).map((item: MenuItem) => ({
    ...item,
    variants: variantsMap.get(item.id),
  }));

  return (
    <MenuContent
      categories={categories}
      items={items}
      locale={locale as 'ka' | 'en' | 'ru'}
    />
  );
}
