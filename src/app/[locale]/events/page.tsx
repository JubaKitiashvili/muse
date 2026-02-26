import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import EventsContent from './EventsContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });

  return {
    title: t('seo_title'),
    description: t('seo_description'),
    openGraph: {
      title: t('seo_title'),
      description: t('seo_description'),
      url: `https://musebar.ge/${locale}/events`,
      type: 'website',
    },
  };
}

export default function EventsPage() {
  return <EventsContent />;
}
