import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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

export default function MenuPage() {
  return <MenuContent />;
}
