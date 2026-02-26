'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#C9A84C]/20 py-12 px-4">
      <StaggerChildren staggerDelay={0.12} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <FadeIn>
          <div className="space-y-3">
            <p className="text-[#C9A84C] text-2xl tracking-[0.3em] uppercase font-light">Muse</p>
            <div className="w-10 h-px bg-[#C9A84C]/40" />
            <p className="text-[#F5ECD7]/50 text-sm leading-relaxed">{t('address')}</p>
            <p className="text-[#F5ECD7]/50 text-sm">{t('hours')}</p>
            <a
              href="tel:+995599983838"
              className="block text-[#C9A84C]/70 text-sm hover:text-[#C9A84C] transition-colors"
            >
              +995 599 98 38 38
            </a>
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn>
          <div className="space-y-3">
            <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4">Navigation</p>
            {['events', 'menu', 'about', 'gallery', 'contact'].map((page) => (
              <Link
                key={page}
                href={`/${locale}/${page}`}
                className="block text-[#F5ECD7]/50 hover:text-[#C9A84C] text-sm tracking-wider uppercase transition-colors"
              >
                {tNav(page as 'events' | 'menu' | 'about' | 'gallery' | 'contact')}
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Social */}
        <FadeIn>
          <div className="space-y-3">
            <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4">Social</p>
            <a
              href="https://www.instagram.com/muse.tbilisi52/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#F5ECD7]/50 hover:text-[#C9A84C] text-sm tracking-wider transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/muse"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#F5ECD7]/50 hover:text-[#C9A84C] text-sm tracking-wider transition-colors"
            >
              Facebook
            </a>
          </div>
        </FadeIn>
      </StaggerChildren>

      <FadeIn>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#C9A84C]/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[#F5ECD7]/30 text-xs tracking-widest">
            &copy; {new Date().getFullYear()} Muse Bar Tbilisi. {t('rights')}.
          </p>
          <p className="text-[#F5ECD7]/20 text-xs">
            52 Vertskhli St, Tbilisi, Georgia
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
