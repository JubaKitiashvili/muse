import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

type Locale = 'ka' | 'en' | 'ru';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    ka: 'მუზა — ბარი და კაფე თბილისში | Muse Bar Tbilisi',
    en: 'Muse Bar Tbilisi | Live Music, Cocktails & Vintage Atmosphere',
    ru: 'Муза Бар Тбилиси | Живая музыка, коктейли и винтажная атмосфера',
  };

  const descriptions: Record<string, string> = {
    ka: 'მუზა — თბილისის გულში, ვერცხლის ქუჩაზე. ლაივ მუსიკა ყოველ საღამოს — ფორტეპიანო, ვიოლინო, ჯაზი. კოქტეილები, ყავა, განსაკუთრებული ატმოსფერო.',
    en: 'Muse bar in the heart of Tbilisi on Vertskhli Street. Live music every evening — piano, violin, jazz. Cocktails, coffee, and a one-of-a-kind vintage atmosphere.',
    ru: 'Бар Муза в центре Тбилиси на улице Верцхли. Живая музыка каждый вечер — фортепиано, скрипка, джаз. Коктейли, кофе и неповторимая атмосфера.',
  };

  const siteNames: Record<string, string> = {
    ka: 'მუზა — Muse Bar Tbilisi',
    en: 'Muse Bar Tbilisi',
    ru: 'Муза Бар Тбилиси',
  };

  const siteName = siteNames[locale] || siteNames.ka;

  return {
    title: {
      default: titles[locale] || titles.ka,
      template: `%s | ${siteName}`,
    },
    description: descriptions[locale] || descriptions.ka,
    keywords: ['muse bar tbilisi', 'მუზა ბარი', 'bar tbilisi', 'live music tbilisi', 'ვერცხლის ქუჩა', 'jazz bar tbilisi', 'мuse tbilisi', 'муза тбილиси'],
    openGraph: {
      title: titles[locale] || titles.ka,
      description: descriptions[locale] || descriptions.ka,
      url: 'https://musebar.ge',
      siteName: 'Muse Bar Tbilisi',
      locale: locale,
      type: 'website',
    },
    alternates: {
      languages: {
        ka: '/ka',
        en: '/en',
        ru: '/ru',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
