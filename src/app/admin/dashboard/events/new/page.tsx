'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LangTabs } from '../../components/lang-tabs';

export default function NewEventPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title_ka: '',
    title_en: '',
    title_ru: '',
    description_ka: '',
    description_en: '',
    description_ru: '',
    date: '',
    time: '',
    image_url: '',
    is_published: false,
  });

  function updateField(field: string, value: string | boolean) {
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

    const supabase = createClient();

    let finalImageUrl = form.image_url || null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('events')
        .upload(filePath, imageFile);

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    const { error: insertError } = await supabase.from('events').insert({
      ...form,
      image_url: finalImageUrl,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard/events');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5ECD7] mb-6">ახალი ივენთი</h1>

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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
                  სათაური ({lang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={form[`title_${lang}` as keyof typeof form] as string}
                  onChange={(e) => updateField(`title_${lang}`, e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
                  აღწერა ({lang.toUpperCase()})
                </label>
                <textarea
                  rows={4}
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
              თარიღი
            </label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
              დრო
            </label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => updateField('time', e.target.value)}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
        </div>

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
            id="is_published"
            checked={form.is_published}
            onChange={(e) => updateField('is_published', e.target.checked)}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <label htmlFor="is_published" className="text-sm text-[#F5ECD7]/80">
            დაუყოვნებლივ გამოქვეყნება
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'იქმნება...' : 'ივენთის შექმნა'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard/events')}
            className="px-6 py-3 border border-[#333] text-[#F5ECD7]/70 rounded-lg hover:border-[#C9A84C]/50 transition-colors"
          >
            გაუქმება
          </button>
        </div>
      </form>
    </div>
  );
}
