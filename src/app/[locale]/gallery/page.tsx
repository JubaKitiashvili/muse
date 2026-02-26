import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import GalleryContent from './GalleryContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });

  return {
    title: t('seo_title'),
    description: t('seo_description'),
    openGraph: {
      title: t('seo_title'),
      description: t('seo_description'),
      url: `https://musebar.ge/${locale}/gallery`,
      type: 'website',
    },
  };
}

export default function GalleryPage() {
  return <GalleryContent />;
}
