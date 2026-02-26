'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';
import { animation, fadeInVariants } from '@/lib/animations';

export default function HomePage() {
  const t = useTranslations('hero');
  const tHome = useTranslations('home');

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/images/hero/hero.jpg')" }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-[#0D0D0D]/40 to-[#0D0D0D]/80" />
          {/* Gold vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0D0D0D_100%)]" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 space-y-6">
            {/* Decorative line */}
            <FadeIn delay={0.2} duration={animation.duration.slow}>
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-px w-12 bg-[#C9A84C]/60" />
                <span className="text-[#C9A84C]/60 text-xs tracking-[0.4em] uppercase">Tbilisi</span>
                <div className="h-px w-12 bg-[#C9A84C]/60" />
              </div>
            </FadeIn>

            <FadeIn delay={0.4} duration={animation.duration.slow}>
              <h1 className="text-7xl md:text-9xl text-[#C9A84C] tracking-[0.4em] indent-[0.4em] uppercase font-light">
                {t('title')}
              </h1>
            </FadeIn>

            <FadeIn delay={0.6} direction="none">
              <motion.div
                className="gold-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: animation.duration.slow, delay: 0.6, ease: animation.easing }}
              />
            </FadeIn>

            <FadeIn delay={0.8}>
              <p className="text-[#F5ECD7]/70 text-sm md:text-base tracking-[0.3em] uppercase font-light">
                {t('subtitle')}
              </p>
            </FadeIn>

            <FadeIn delay={1.0}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/events"
                  className="border border-[#C9A84C] text-[#C9A84C] px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-300"
                >
                  {t('cta_events')}
                </Link>
                <a
                  href="tel:+995599983838"
                  className="border border-[#F5ECD7]/30 text-[#F5ECD7]/70 px-8 py-3 text-xs tracking-[0.3em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                >
                  {t('cta_reserve')}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Scroll indicator — subtle pulse */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="h-6 w-px bg-[#C9A84C]" />
            <div className="h-1 w-1 rounded-full bg-[#C9A84C]" />
          </motion.div>
        </section>

        {/* ── EVENTS PREVIEW ── */}
        <section className="py-20 px-4 bg-[#0D0D0D]">
          <StaggerChildren staggerDelay={0.15} className="max-w-4xl mx-auto text-center space-y-4">
            <FadeIn>
              <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Live Music</p>
            </FadeIn>
            <FadeIn>
              <h2 className="text-3xl md:text-4xl text-[#F5ECD7] font-light tracking-wider">
                {tHome('events_title')}
              </h2>
            </FadeIn>
            <FadeIn direction="none">
              <div className="gold-divider my-4" />
            </FadeIn>
            <FadeIn>
              <p className="text-[#F5ECD7]/50 text-sm tracking-wider leading-relaxed max-w-lg mx-auto">
                {tHome('events_subtitle')}
              </p>
            </FadeIn>
            <FadeIn>
              <div className="pt-6">
                <Link
                  href="/events"
                  className="inline-block border border-[#C9A84C]/50 text-[#C9A84C] px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-all duration-300"
                >
                  {tHome('events_cta')}
                </Link>
              </div>
            </FadeIn>
          </StaggerChildren>
        </section>

        {/* ── ABOUT SNIPPET ── */}
        <section className="py-20 px-4 bg-[#100E0C]">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="space-y-6">
                <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Since Tbilisi</p>
                <h2 className="text-3xl md:text-4xl text-[#F5ECD7] font-light tracking-wider">
                  {tHome('about_title')}
                </h2>
                <div className="w-10 h-px bg-[#C9A84C]/50" />
                <p className="text-[#F5ECD7]/60 text-sm leading-relaxed tracking-wide">
                  {tHome('about_text')}
                </p>
                <Link
                  href="/about"
                  className="inline-block text-[#C9A84C] text-xs tracking-[0.3em] uppercase border-b border-[#C9A84C]/40 pb-0.5 hover:border-[#C9A84C] transition-colors"
                >
                  {tHome('about_cta')} →
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative h-72 md:h-96 bg-[#1A1410]">
                <img
                  src="/assets/images/hero/interior.jpg"
                  alt="Muse Bar Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-[#C9A84C]/20" />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
