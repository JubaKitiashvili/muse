'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { animation } from '@/lib/animations';
import type { MenuCategory, MenuItem, MenuItemVariant, Locale } from '@/types';

interface MenuContentProps {
  categories: MenuCategory[];
  items: MenuItem[];
  locale: Locale;
}

function getLocalizedName(item: { name_ka: string; name_en: string; name_ru: string }, locale: Locale): string {
  const name = item[`name_${locale}`];
  return name || item.name_ka;
}

function getLocalizedDescription(
  item: { description_ka: string | null; description_en: string | null; description_ru: string | null },
  locale: Locale
): string | null {
  const desc = item[`description_${locale}`];
  return desc || item.description_ka;
}

/* ─── Lightbox Modal ─── */
function ImageLightbox({
  item,
  locale,
  onClose,
}: {
  item: MenuItem;
  locale: Locale;
  onClose: () => void;
}) {
  const desc = getLocalizedDescription(item, locale);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={getLocalizedName(item, locale)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 max-w-2xl w-full animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-[#F5ECD7]/60 hover:text-[#F5ECD7] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image */}
        {item.image_url && (
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#C9A84C]/20">
            <Image
              src={item.image_url}
              alt={getLocalizedName(item, locale)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 640px"
              priority
            />
          </div>
        )}

        {/* Info below image */}
        <div className="mt-4 text-center">
          <h3 className="text-[#F5ECD7] text-lg sm:text-xl font-light tracking-wide">
            {getLocalizedName(item, locale)}
          </h3>
          {item.variants && item.variants.length > 0 ? (
            <div className="mt-2 space-y-1">
              {item.variants.map((v) => (
                <div key={v.id} className="flex items-baseline justify-center gap-3 text-sm sm:text-base">
                  <span className="text-[#F5ECD7]/60">{getLocalizedName(v, locale)}</span>
                  <span className="text-[#C9A84C] tabular-nums">{v.price} &#8382;</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#C9A84C] text-lg mt-1 tabular-nums">
              {item.price} &#8382;
            </p>
          )}
          {desc && (
            <p className="text-[#F5ECD7]/40 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Search Bar ─── */
function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Search icon */}
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1A1A1A] border border-[#C9A84C]/15 rounded-full py-3 pl-12 pr-10 text-[#F5ECD7]/80 text-sm placeholder:text-[#F5ECD7]/25 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5ECD7]/30 hover:text-[#F5ECD7]/60 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Menu Item Card ─── */
function MenuItemCard({
  item,
  locale,
  onImageClick,
}: {
  item: MenuItem;
  locale: Locale;
  onImageClick: (item: MenuItem) => void;
}) {
  const desc = getLocalizedDescription(item, locale);

  return (
    <div className="group flex gap-3 sm:gap-4 py-3 sm:py-4 px-3 sm:px-4 -mx-1 rounded-lg transition-all duration-200 hover:bg-[#C9A84C]/[0.04]">
      {/* Item Image — responsive sizes */}
      {item.image_url && (
        <button
          onClick={() => onImageClick(item)}
          className="flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 rounded-lg"
          aria-label={`View ${getLocalizedName(item, locale)}`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-[#C9A84C]/10 group-hover:border-[#C9A84C]/25 transition-colors">
            <Image
              src={item.image_url}
              alt={getLocalizedName(item, locale)}
              width={96}
              height={96}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </button>
      )}

      {/* Name + Description + Price/Variants */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {item.variants && item.variants.length > 0 ? (
          <>
            <span className="text-[#F5ECD7]/90 text-sm sm:text-base md:text-[17px] leading-tight">
              {getLocalizedName(item, locale)}
            </span>
            {desc && (
              <p className="text-[#F5ECD7]/30 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                {desc}
              </p>
            )}
            <div className="mt-2 space-y-0.5">
              {item.variants.map((v) => (
                <div key={v.id} className="flex items-baseline gap-2">
                  <span className="text-[#F5ECD7]/50 text-xs sm:text-sm">
                    {getLocalizedName(v, locale)}
                  </span>
                  <span className="flex-1 border-b border-dotted border-[#C9A84C]/10 min-w-[1rem] translate-y-[-3px] hidden sm:block" />
                  <span className="text-[#C9A84C] text-xs sm:text-sm font-light flex-shrink-0 tabular-nums ml-auto sm:ml-0">
                    {v.price} &#8382;
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-[#F5ECD7]/90 text-sm sm:text-base md:text-[17px] leading-tight">
                {getLocalizedName(item, locale)}
              </span>
              <span className="flex-1 border-b border-dotted border-[#C9A84C]/10 min-w-[1rem] translate-y-[-3px] hidden sm:block" />
              <span className="text-[#C9A84C] text-sm sm:text-base md:text-lg font-light flex-shrink-0 tabular-nums ml-auto sm:ml-0">
                {item.price} &#8382;
              </span>
            </div>
            {desc && (
              <p className="text-[#F5ECD7]/30 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                {desc}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function MenuContent({ categories, items, locale }: MenuContentProps) {
  const t = useTranslations('menu');
  const [lightboxItem, setLightboxItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Build hierarchy
  const mainCategories = useMemo(
    () => categories.filter((c) => c.parent_id === null).sort((a, b) => a.sort_order - b.sort_order),
    [categories]
  );

  const subcategoriesMap = useMemo(() => {
    const map = new Map<string, MenuCategory[]>();
    categories
      .filter((c) => c.parent_id !== null)
      .sort((a, b) => a.sort_order - b.sort_order)
      .forEach((sub) => {
        const list = map.get(sub.parent_id!) || [];
        list.push(sub);
        map.set(sub.parent_id!, list);
      });
    return map;
  }, [categories]);

  const itemsMap = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    items.forEach((item) => {
      const list = map.get(item.category_id) || [];
      list.push(item);
      map.set(item.category_id, list);
    });
    return map;
  }, [items]);

  // Active main category tab
  const [activeMainId, setActiveMainId] = useState<string>(mainCategories[0]?.id ?? '');
  const activeSubcategories = subcategoriesMap.get(activeMainId) ?? [];

  // Search filtering (includes variant names)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const name = getLocalizedName(item, locale).toLowerCase();
      const desc = getLocalizedDescription(item, locale)?.toLowerCase() ?? '';
      const variantMatch = item.variants?.some(
        (v) => getLocalizedName(v, locale).toLowerCase().includes(q)
      );
      return name.includes(q) || desc.includes(q) || variantMatch;
    });
  }, [searchQuery, items, locale]);

  // Find which subcategory an item belongs to (for search results grouping)
  const categoryNameMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => {
      map.set(c.id, getLocalizedName(c, locale));
    });
    return map;
  }, [categories, locale]);

  const handleImageClick = useCallback((item: MenuItem) => {
    if (item.image_url) setLightboxItem(item);
  }, []);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Header />
      <main className="bg-[#0D0D0D] min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-12 sm:pb-16 px-4">
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

        {/* Search Bar */}
        <section className="px-4 pb-6">
          <FadeIn delay={0.9}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('search_placeholder')}
            />
          </FadeIn>
        </section>

        {/* Main Category Tabs — hidden during search */}
        {!isSearching && mainCategories.length > 0 && (
          <section className="sticky top-16 z-40 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#C9A84C]/10">
            <div className="max-w-6xl mx-auto flex justify-center overflow-x-auto">
              {mainCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveMainId(cat.id)}
                  className={`px-6 sm:px-8 py-4 text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-300 border-b-2 whitespace-nowrap cursor-pointer ${
                    activeMainId === cat.id
                      ? 'text-[#C9A84C] border-[#C9A84C]'
                      : 'text-[#F5ECD7]/40 border-transparent hover:text-[#F5ECD7]/70'
                  }`}
                >
                  {getLocalizedName(cat, locale)}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Search Results */}
        {isSearching && (
          <section className="py-8 sm:py-12 px-4">
            <div className="max-w-6xl mx-auto">
              {searchResults && searchResults.length > 0 ? (
                <>
                  <p className="text-[#F5ECD7]/30 text-sm mb-6 text-center">
                    {searchResults.length} {t('search_results_count')}
                  </p>
                  <div className="space-y-1">
                    {searchResults.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        locale={locale}
                        onImageClick={handleImageClick}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center text-[#F5ECD7]/30 text-sm tracking-wider py-20">
                  {t('search_no_results')}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Subcategories & Items — hidden during search */}
        {!isSearching && (
          <section className="py-8 sm:py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
              {activeSubcategories.map((sub) => {
                const subItems = itemsMap.get(sub.id) ?? [];
                if (subItems.length === 0) return null;

                return (
                  <div key={`${activeMainId}-${sub.id}`} className="menu-fade-in">
                    <div>
                      {/* Subcategory Header */}
                      <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        {sub.image_url && (
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-[#C9A84C]/20 flex-shrink-0">
                            <Image
                              src={sub.image_url}
                              alt={getLocalizedName(sub, locale)}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h2 className="text-[#C9A84C] text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase font-light">
                            {getLocalizedName(sub, locale)}
                          </h2>
                          <div className="w-12 h-px bg-[#C9A84C]/20 mt-2" />
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-1">
                        {subItems.map((item) => (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            locale={locale}
                            onImageClick={handleImageClick}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {activeSubcategories.length === 0 && (
                <p className="text-center text-[#F5ECD7]/30 text-sm tracking-wider py-20 menu-fade-in">
                  {t('coming_soon')}
                </p>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />

      {/* Lightbox */}
      {lightboxItem && (
        <ImageLightbox
          item={lightboxItem}
          locale={locale}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </>
  );
}
