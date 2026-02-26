'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animation } from '@/lib/animations';

const localeLabels: Record<string, string> = { ka: 'ქარ', en: 'ENG', ru: 'РУС' };
const locales = ['ka', 'en', 'ru'] as const;

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: animation.duration.fast, ease: animation.easing },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: animation.easing },
  },
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const getLocalePath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/') || '/';
  };

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/events`, label: t('events') },
    { href: `/${locale}/menu`, label: t('menu') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-sm border-b border-[#C9A84C]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <span className="text-[#C9A84C] text-xl tracking-[0.2em] font-light uppercase">
            Muse
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#F5ECD7]/70 hover:text-[#C9A84C] text-sm tracking-widest uppercase transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language dropdown */}
        <div className="hidden md:block relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-[#C9A84C] text-xs tracking-widest uppercase px-2 py-1 border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 transition-colors duration-200"
          >
            {localeLabels[locale]}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 bg-[#0D0D0D] border border-[#C9A84C]/30 min-w-full"
              >
                {locales
                  .filter((loc) => loc !== locale)
                  .map((loc) => (
                    <Link
                      key={loc}
                      href={getLocalePath(loc)}
                      onClick={() => setLangOpen(false)}
                      className="block px-4 py-2 text-xs tracking-widest text-[#F5ECD7]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors duration-200"
                    >
                      {localeLabels[loc]}
                    </Link>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#C9A84C] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-[#0D0D0D] border-t border-[#C9A84C]/20 px-4 py-6 space-y-4 overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[#F5ECD7]/70 hover:text-[#C9A84C] text-sm tracking-widest uppercase py-1"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="flex gap-3 pt-4 border-t border-[#C9A84C]/20">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={getLocalePath(loc)}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xs tracking-widest ${
                    locale === loc ? 'text-[#C9A84C]' : 'text-[#F5ECD7]/50'
                  }`}
                >
                  {localeLabels[loc]}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
