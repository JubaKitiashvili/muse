'use client';

import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { animation } from '@/lib/animations';

export default function GalleryContent() {
  const t = useTranslations('gallery');

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 bg-[#0D0D0D]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <FadeIn delay={0.2}>
              <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Muse Bar</p>
            </FadeIn>
            <FadeIn delay={0.4} duration={animation.duration.slow}>
              <h1 className="text-5xl md:text-7xl text-[#C9A84C] tracking-[0.3em] indent-[0.3em] uppercase font-light">
                {t('title')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.6} direction="none">
              <div className="gold-divider my-4" />
            </FadeIn>
            <FadeIn delay={0.8}>
              <p className="text-[#F5ECD7]/50 text-sm tracking-wider">
                {t('subtitle')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Placeholder */}
        <section className="py-20 px-4 bg-[#100E0C]">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-[#F5ECD7]/40 text-sm tracking-wider">
                {t('coming_soon')}
              </p>
              <a
                href="https://www.instagram.com/muse.tbilisi52/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#C9A84C]/50 text-[#C9A84C] px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-all duration-300"
              >
                Instagram
              </a>
              <p className="text-[#F5ECD7]/30 text-xs tracking-wider">
                {t('follow')}
              </p>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
