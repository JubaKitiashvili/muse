'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function UploadPhotoPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [captions, setCaptions] = useState({
    caption_ka: '',
    caption_en: '',
    caption_ru: '',
  });
  const [isPublished, setIsPublished] = useState(true);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError('აირჩიეთ ფაილი');
      return;
    }

    setLoading(true);
    setError('');

    const supabase = createClient();

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setLoading(false);
      return;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('gallery').getPublicUrl(filePath);

    // Insert into gallery_photos table
    const { error: insertError } = await supabase
      .from('gallery_photos')
      .insert({
        url: publicUrl,
        caption_ka: captions.caption_ka || null,
        caption_en: captions.caption_en || null,
        caption_ru: captions.caption_ru || null,
        is_published: isPublished,
        sort_order: 0,
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard/gallery');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5ECD7] mb-6">ფოტოს ატვირთვა</h1>

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
            ფოტო
          </label>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-[#333] rounded-lg p-8 text-center cursor-pointer hover:border-[#C9A84C]/50 transition-colors"
          >
            {preview ? (
              <div className="space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded"
                />
                <p className="text-sm text-[#F5ECD7]/50">
                  სხვა ფოტოს ასარჩევად დააჭირეთ
                </p>
              </div>
            ) : (
              <div>
                <svg
                  className="w-12 h-12 mx-auto text-[#F5ECD7]/30 mb-3"
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
                  აირჩიეთ ფოტო
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

        {(['ka', 'en', 'ru'] as const).map((lang) => (
          <div key={lang}>
            <label className="block text-sm font-medium text-[#F5ECD7]/80 mb-2">
              წარწერა ({lang.toUpperCase()})
            </label>
            <input
              type="text"
              value={captions[`caption_${lang}`]}
              onChange={(e) =>
                setCaptions((prev) => ({
                  ...prev,
                  [`caption_${lang}`]: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
        ))}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_published"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
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
            {loading ? 'იტვირთება...' : 'ფოტოს ატვირთვა'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard/gallery')}
            className="px-6 py-3 border border-[#333] text-[#F5ECD7]/70 rounded-lg hover:border-[#C9A84C]/50 transition-colors"
          >
            გაუქმება
          </button>
        </div>
      </form>
    </div>
  );
}
