'use client';

import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';
import { animation } from '@/lib/animations';

export default function MenuContent() {
  const t = useTranslations('menu');

  const categories = [
    { title: t('drinks_title'), text: t('drinks_text'), icon: '~' },
    { title: t('wine_title'), text: t('wine_text'), icon: '~' },
    { title: t('food_title'), text: t('food_text'), icon: '~' },
  ];

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

        {/* Categories */}
        <section className="py-20 px-4 bg-[#100E0C]">
          <StaggerChildren staggerDelay={0.15} className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <FadeIn key={cat.title}>
                <div className="border border-[#C9A84C]/15 p-8 text-center space-y-4 h-full">
                  <div className="text-[#C9A84C]/40 text-2xl">{cat.icon}</div>
                  <h3 className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-px bg-[#C9A84C]/30 mx-auto" />
                  <p className="text-[#F5ECD7]/50 text-sm leading-relaxed">
                    {cat.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </StaggerChildren>

          <FadeIn>
            <p className="text-center text-[#F5ECD7]/30 text-sm tracking-wider mt-16">
              {t('coming_soon')}
            </p>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
