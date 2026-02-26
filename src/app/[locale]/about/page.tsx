import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutContent from './AboutContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('seo_title'),
    description: t('seo_description'),
    openGraph: {
      title: t('seo_title'),
      description: t('seo_description'),
      url: `https://musebar.ge/${locale}/about`,
      type: 'website',
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
