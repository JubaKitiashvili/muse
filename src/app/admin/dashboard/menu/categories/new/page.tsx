'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LangTabs } from '../../../components/lang-tabs';

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name_ka: '',
    name_en: '',
    name_ru: '',
    sort_order: 0,
    is_active: true,
  });

  function updateField(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from('menu_categories')
      .insert(form);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard/menu');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5ECD7] mb-6">ახალი კატეგორია</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-6 max-w-2xl space-y-6"
      >
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <LangTabs>
          {(lang) => (
            <div>
              <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
                სახელი ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                value={form[`name_${lang}` as keyof typeof form] as string}
                onChange={(e) => updateField(`name_${lang}`, e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          )}
        </LangTabs>

        <div>
          <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
            რიგითობა
          </label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) =>
              updateField('sort_order', parseInt(e.target.value) || 0)
            }
            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_active"
            checked={form.is_active}
            onChange={(e) => updateField('is_active', e.target.checked)}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <label htmlFor="is_active" className="text-sm text-[#F5ECD7]/80">
            აქტიური
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'იქმნება...' : 'კატეგორიის შექმნა'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard/menu')}
            className="px-6 py-3 border border-[#333] text-[#F5ECD7]/70 rounded-lg hover:border-[#C9A84C]/50 transition-colors"
          >
            გაუქმება
          </button>
        </div>
      </form>
    </div>
  );
}
