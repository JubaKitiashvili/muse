'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Photo {
  id: string;
  url: string;
  caption_en: string | null;
  caption_ka: string | null;
  sort_order: number;
  is_published: boolean;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [captions, setCaptions] = useState({
    caption_ka: '',
    caption_en: '',
    caption_ru: '',
  });

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('id, url, caption_en, caption_ka, sort_order, is_published')
        .order('sort_order');
      if (error) throw error;
      setPhotos(data ?? []);
    } catch {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }

  async function deletePhoto(id: string) {
    if (!confirm('ნამდვილად გსურთ ამ ფოტოს წაშლა?')) return;
    const supabase = createClient();
    await supabase.from('gallery_photos').delete().eq('id', id);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  async function togglePublish(id: string, current: boolean) {
    const supabase = createClient();
    await supabase
      .from('gallery_photos')
      .update({ is_published: !current })
      .eq('id', id);
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, is_published: !current } : p
      )
    );
  }

  async function startEditCaption(id: string) {
    const supabase = createClient();
    const { data } = await supabase
      .from('gallery_photos')
      .select('caption_ka, caption_en, caption_ru')
      .eq('id', id)
      .single();

    setCaptions({
      caption_ka: data?.caption_ka ?? '',
      caption_en: data?.caption_en ?? '',
      caption_ru: data?.caption_ru ?? '',
    });
    setEditingId(id);
  }

  async function saveCaptions() {
    if (!editingId) return;
    const supabase = createClient();
    await supabase
      .from('gallery_photos')
      .update({
        caption_ka: captions.caption_ka || null,
        caption_en: captions.caption_en || null,
        caption_ru: captions.caption_ru || null,
      })
      .eq('id', editingId);

    setEditingId(null);
    loadPhotos();
  }

  if (loading) {
    return <div className="text-[#F5ECD7]/50">იტვირთება...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#F5ECD7]">გალერეა</h1>
        <Link
          href="/admin/dashboard/gallery/upload"
          className="px-5 py-2.5 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors text-sm"
        >
          ფოტოს ატვირთვა
        </Link>
      </div>

      {/* Caption Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-[#F5ECD7]">
              წარწერების რედაქტირება
            </h3>
            {(['ka', 'en', 'ru'] as const).map((lang) => (
              <div key={lang}>
                <label className="block text-xs text-[#F5ECD7]/50 mb-1">
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
                  className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#333] rounded text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            ))}
            <div className="flex gap-3">
              <button
                onClick={saveCaptions}
                className="px-4 py-2 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded text-sm"
              >
                შენახვა
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 border border-[#333] text-[#F5ECD7]/70 rounded text-sm"
              >
                გაუქმება
              </button>
            </div>
          </div>
        </div>
      )}

      {photos.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-8 text-center text-[#F5ECD7]/50">
          ფოტოები ჯერ არ არის. ატვირთეთ პირველი ფოტო.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg overflow-hidden"
            >
              <div className="aspect-square bg-[#111] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption_en || ''}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-[#F5ECD7]/70 truncate mb-3">
                  {photo.caption_ka || photo.caption_en || 'წარწერის გარეშე'}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => togglePublish(photo.id, photo.is_published)}
                    className={`text-xs px-3 py-1 rounded-full ${
                      photo.is_published
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}
                  >
                    {photo.is_published ? 'გამოქვეყნებული' : 'დრაფტი'}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditCaption(photo.id)}
                      className="text-xs text-[#C9A84C] hover:underline"
                    >
                      რედაქტირება
                    </button>
                    <button
                      onClick={() => deletePhoto(photo.id)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      წაშლა
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
