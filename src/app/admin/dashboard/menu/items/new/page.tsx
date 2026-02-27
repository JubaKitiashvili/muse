'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { compressImage } from '@/lib/compress-image';
import { LangTabs } from '../../../components/lang-tabs';

interface Category {
  id: string;
  parent_id: string | null;
  name_en: string;
  name_ka: string;
}

export default function NewMenuItemPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState<
    { name_ka: string; name_en: string; name_ru: string; price: string }[]
  >([]);

  const [form, setForm] = useState({
    category_id: '',
    name_ka: '',
    name_en: '',
    name_ru: '',
    description_ka: '',
    description_en: '',
    description_ru: '',
    price: '',
    image_url: '',
    sort_order: 0,
    is_available: true,
  });

  const mainCategories = allCategories.filter((c) => !c.parent_id);
  const subcategories = allCategories.filter(
    (c) => c.parent_id === selectedMainCategory
  );

  useEffect(() => {
    async function loadCategories() {
      const supabase = createClient();
      const { data } = await supabase
        .from('menu_categories')
        .select('id, parent_id, name_en, name_ka')
        .order('sort_order');
      setAllCategories(data ?? []);
    }
    loadCategories();
  }, []);

  function updateField(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setImageFile(selected);
    setImagePreview(URL.createObjectURL(selected));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.category_id) {
      setError('აირჩიეთ კატეგორია და ქვეკატეგორია');
      setLoading(false);
      return;
    }

    const supabase = createClient();

    let finalImageUrl = form.image_url || null;

    if (imageFile) {
      const compressed = await compressImage(imageFile);
      const fileExt = compressed.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('menu')
        .upload(filePath, compressed);

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('menu')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    const { data: inserted, error: insertError } = await supabase
      .from('menu_items')
      .insert({
        ...form,
        price: hasVariants ? 0 : parseFloat(form.price) || 0,
        image_url: finalImageUrl,
        description_ka: form.description_ka || null,
        description_en: form.description_en || null,
        description_ru: form.description_ru || null,
      })
      .select('id')
      .single();

    if (insertError || !inserted) {
      setError(insertError?.message ?? 'Insert failed');
      setLoading(false);
      return;
    }

    // Insert variants if enabled
    if (hasVariants && variants.length > 0) {
      const variantRows = variants.map((v, i) => ({
        item_id: inserted.id,
        name_ka: v.name_ka,
        name_en: v.name_en || '',
        name_ru: v.name_ru || '',
        price: parseFloat(v.price) || 0,
        sort_order: i,
      }));
      const { error: varError } = await supabase
        .from('menu_item_variants')
        .insert(variantRows);
      if (varError) {
        setError(varError.message);
        setLoading(false);
        return;
      }
    }

    router.push('/admin/dashboard/menu');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5ECD7] mb-6">
        ახალი პროდუქტი
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-6 max-w-2xl space-y-6"
      >
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
              მთავარი კატეგორია
            </label>
            <select
              required
              value={selectedMainCategory}
              onChange={(e) => {
                setSelectedMainCategory(e.target.value);
                updateField('category_id', '');
              }}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
            >
              <option value="">აირჩიეთ</option>
              {mainCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_ka || cat.name_en}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
              ქვეკატეგორია
            </label>
            <select
              required
              value={form.category_id}
              onChange={(e) => updateField('category_id', e.target.value)}
              disabled={!selectedMainCategory}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors disabled:opacity-40"
            >
              <option value="">
                {selectedMainCategory ? 'აირჩიეთ' : 'ჯერ აირჩიეთ კატეგორია'}
              </option>
              {subcategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_ka || cat.name_en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <LangTabs>
          {(lang) => (
            <div className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
                  აღწერა ({lang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={
                    form[`description_${lang}` as keyof typeof form] as string
                  }
                  onChange={(e) =>
                    updateField(`description_${lang}`, e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </LangTabs>

        {/* Variants toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="has_variants"
            checked={hasVariants}
            onChange={(e) => setHasVariants(e.target.checked)}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <label htmlFor="has_variants" className="text-sm text-[#F5ECD7]/80">
            ვარიანტებით (მაგ. სხვადასხვა ზომა/ტიპი სხვადასხვა ფასით)
          </label>
        </div>

        {!hasVariants ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
                ფასი (&#8382;)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
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
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-[#F5ECD7]/80">
                ვარიანტები
              </label>
              <button
                type="button"
                onClick={() =>
                  setVariants((prev) => [
                    ...prev,
                    { name_ka: '', name_en: '', name_ru: '', price: '' },
                  ])
                }
                className="text-xs text-[#C9A84C] hover:text-[#C9A84C]/80 transition-colors cursor-pointer"
              >
                + ვარიანტის დამატება
              </button>
            </div>

            {variants.length === 0 && (
              <p className="text-xs text-[#F5ECD7]/30 text-center py-4 border border-dashed border-[#333] rounded-lg">
                დაამატეთ მინიმუმ ერთი ვარიანტი
              </p>
            )}

            {variants.map((v, idx) => (
              <div
                key={idx}
                className="border border-[#333] rounded-lg p-4 space-y-3 relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setVariants((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="absolute top-2 right-2 text-red-400/60 hover:text-red-400 transition-colors cursor-pointer"
                  aria-label="ვარიანტის წაშლა"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="სახელი (KA)"
                    value={v.name_ka}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, name_ka: e.target.value } : item
                        )
                      )
                    }
                    className="px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Name (EN)"
                    value={v.name_en}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, name_en: e.target.value } : item
                        )
                      )
                    }
                    className="px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Название (RU)"
                    value={v.name_ru}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, name_ru: e.target.value } : item
                        )
                      )
                    }
                    className="px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="ფასი ₾"
                    value={v.price}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, price: e.target.value } : item
                        )
                      )
                    }
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
            ))}

            {/* Sort order when variants enabled */}
            <div className="w-1/2">
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
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
            სურათი
          </label>
          <div
            onClick={() => !imagePreview && fileRef.current?.click()}
            className={`border-2 border-dashed border-[#333] rounded-lg p-6 text-center transition-colors ${
              !imagePreview ? 'cursor-pointer hover:border-[#C9A84C]/50' : ''
            }`}
          >
            {imagePreview ? (
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded"
                />
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="text-xs text-[#C9A84C] hover:underline"
                  >
                    შეცვლა
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-xs text-red-400 hover:underline"
                  >
                    წაშლა
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <svg
                  className="w-10 h-10 mx-auto text-[#F5ECD7]/30 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="text-sm text-[#F5ECD7]/50">
                  ატვირთეთ სურათი
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {!imageFile && (
            <div className="mt-3">
              <p className="text-xs text-[#F5ECD7]/40 mb-1.5">ან URL-ით:</p>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => updateField('image_url', e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="https://..."
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_available"
            checked={form.is_available}
            onChange={(e) => updateField('is_available', e.target.checked)}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <label htmlFor="is_available" className="text-sm text-[#F5ECD7]/80">
            ხელმისაწვდომი
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'იქმნება...' : 'პროდუქტის შექმნა'}
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
