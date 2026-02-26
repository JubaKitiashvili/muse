'use client';

import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';
import { animation } from '@/lib/animations';

export default function AboutContent() {
  const t = useTranslations('about');

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

        {/* Story */}
        <section className="py-20 px-4 bg-[#100E0C]">
          <StaggerChildren staggerDelay={0.15} className="max-w-3xl mx-auto space-y-16">
            <FadeIn>
              <div className="space-y-4">
                <h2 className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase">{t('story_title')}</h2>
                <div className="w-10 h-px bg-[#C9A84C]/40" />
                <p className="text-[#F5ECD7]/60 text-sm leading-relaxed tracking-wide">
                  {t('story_text')}
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="space-y-4">
                <h2 className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase">{t('atmosphere_title')}</h2>
                <div className="w-10 h-px bg-[#C9A84C]/40" />
                <p className="text-[#F5ECD7]/60 text-sm leading-relaxed tracking-wide">
                  {t('atmosphere_text')}
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="space-y-4">
                <h2 className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase">{t('music_title')}</h2>
                <div className="w-10 h-px bg-[#C9A84C]/40" />
                <p className="text-[#F5ECD7]/60 text-sm leading-relaxed tracking-wide">
                  {t('music_text')}
                </p>
              </div>
            </FadeIn>
          </StaggerChildren>
        </section>
      </main>
      <Footer />
    </>
  );
}
