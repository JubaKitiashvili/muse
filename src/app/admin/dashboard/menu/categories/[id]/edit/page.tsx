'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { compressImage } from '@/lib/compress-image';
import { LangTabs } from '../../../../components/lang-tabs';

interface ParentCategory {
  id: string;
  name_ka: string;
  name_en: string;
}

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [parentCategories, setParentCategories] = useState<ParentCategory[]>([]);
  const [hasChildren, setHasChildren] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    parent_id: '',
    name_ka: '',
    name_en: '',
    name_ru: '',
    image_url: '',
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const [catRes, parentsRes, childrenRes] = await Promise.all([
        supabase.from('menu_categories').select('*').eq('id', id).single(),
        supabase
          .from('menu_categories')
          .select('id, name_ka, name_en')
          .is('parent_id', null)
          .order('sort_order'),
        supabase
          .from('menu_categories')
          .select('id', { count: 'exact', head: true })
          .eq('parent_id', id),
      ]);

      // Filter out self from parent list
      setParentCategories(
        (parentsRes.data ?? []).filter((c) => c.id !== id)
      );
      setHasChildren((childrenRes.count ?? 0) > 0);

      if (catRes.error || !catRes.data) {
        setError('კატეგორია ვერ მოიძებნა');
        setLoading(false);
        return;
      }

      const d = catRes.data;
      setForm({
        parent_id: d.parent_id ?? '',
        name_ka: d.name_ka ?? '',
        name_en: d.name_en ?? '',
        name_ru: d.name_ru ?? '',
        image_url: d.image_url ?? '',
        sort_order: d.sort_order ?? 0,
        is_active: d.is_active ?? true,
      });
      setLoading(false);
    }
    load();
  }, [id]);

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
    setSaving(true);
    setError('');

    const supabase = createClient();

    let finalImageUrl: string | null = form.image_url || null;

    if (imageFile) {
      const compressed = await compressImage(imageFile);
      const fileExt = compressed.name.split('.').pop();
      const fileName = `categories/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('menu')
        .upload(fileName, compressed);

      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('menu')
        .getPublicUrl(fileName);

      finalImageUrl = publicUrl;
    }

    const { error: updateError } = await supabase
      .from('menu_categories')
      .update({
        ...form,
        parent_id: form.parent_id || null,
        image_url: finalImageUrl,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    router.push('/admin/dashboard/menu');
  }

  if (loading) {
    return <div className="text-[#F5ECD7]/50">იტვირთება...</div>;
  }

  const isSubcategory = form.parent_id !== '';

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5ECD7] mb-6">
        {isSubcategory ? 'ქვეკატეგორიის რედაქტირება' : 'კატეგორიის რედაქტირება'}
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

        <div>
          <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
            ტიპი
          </label>
          {hasChildren ? (
            <div>
              <p className="text-sm text-[#F5ECD7]/50 px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg">
                მთავარი კატეგორია
              </p>
              <p className="text-xs text-[#F5ECD7]/30 mt-1">
                ამ კატეგორიას აქვს ქვეკატეგორიები, ტიპის შეცვლა შეუძლებელია
              </p>
            </div>
          ) : (
            <select
              value={form.parent_id}
              onChange={(e) => updateField('parent_id', e.target.value)}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
            >
              <option value="">მთავარი კატეგორია</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  ქვეკატეგორია: {cat.name_ka || cat.name_en}
                </option>
              ))}
            </select>
          )}
        </div>

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

        {isSubcategory && (
          <div>
            <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
              სურათი
            </label>
            <div
              onClick={() => !imagePreview && !form.image_url && fileRef.current?.click()}
              className={`border-2 border-dashed border-[#333] rounded-lg p-6 text-center transition-colors ${
                !imagePreview && !form.image_url ? 'cursor-pointer hover:border-[#C9A84C]/50' : ''
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
              ) : form.image_url ? (
                <div className="space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image_url}
                    alt="Current"
                    className="max-h-48 mx-auto rounded"
                  />
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="text-xs text-[#C9A84C] hover:underline"
                    >
                      ახალი ატვირთვა
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('image_url', '')}
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
          </div>
        )}

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
            disabled={saving}
            className="px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'ინახება...' : 'შენახვა'}
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
