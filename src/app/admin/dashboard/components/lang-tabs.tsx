'use client';

import { useState } from 'react';

const languages = [
  { code: 'ka', label: 'KA' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const;

export type Lang = (typeof languages)[number]['code'];

export function LangTabs({
  children,
}: {
  children: (activeLang: Lang) => React.ReactNode;
}) {
  const [activeLang, setActiveLang] = useState<Lang>('ka');

  return (
    <div>
      <div className="flex gap-1 mb-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActiveLang(lang.code)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeLang === lang.code
                ? 'bg-[#C9A84C] text-[#0D0D0D]'
                : 'bg-[#1A1A1A] text-[#F5ECD7]/50 hover:text-[#F5ECD7]'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      {children(activeLang)}
    </div>
  );
}
