'use client';

import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';
import { animation } from '@/lib/animations';

export default function ContactContent() {
  const t = useTranslations('contact');

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

        {/* Contact Info */}
        <section className="py-20 px-4 bg-[#100E0C]">
          <StaggerChildren staggerDelay={0.15} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Details */}
            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase">{t('address_label')}</p>
                  <p className="text-[#F5ECD7]/60 text-sm tracking-wide">{t('address')}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase">{t('hours_label')}</p>
                  <p className="text-[#F5ECD7]/60 text-sm tracking-wide">{t('hours')}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase">{t('phone_label')}</p>
                  <a
                    href="tel:+995599983838"
                    className="text-[#F5ECD7]/60 text-sm tracking-wide hover:text-[#C9A84C] transition-colors"
                  >
                    {t('phone')}
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Reservation */}
            <FadeIn direction="right">
              <div className="border border-[#C9A84C]/20 p-8 space-y-4">
                <h2 className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase">{t('reserve_title')}</h2>
                <div className="w-10 h-px bg-[#C9A84C]/40" />
                <p className="text-[#F5ECD7]/50 text-sm leading-relaxed tracking-wide">
                  {t('reserve_text')}
                </p>
                <a
                  href="tel:+995599983838"
                  className="inline-block border border-[#C9A84C] text-[#C9A84C] px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-300 mt-4"
                >
                  {t('phone')}
                </a>
              </div>
            </FadeIn>
          </StaggerChildren>
        </section>

        {/* Google Maps */}
        <section className="pb-20 px-4 bg-[#100E0C]">
          <FadeIn className="max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps?q=Muse+Bar+Tbilisi,+52+Vertskhli+Street&z=16&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Muse Bar Tbilisi - Google Maps"
              className="rounded-lg"
            />
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
