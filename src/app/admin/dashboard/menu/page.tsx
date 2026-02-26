'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Category {
  id: string;
  name_en: string;
  name_ka: string;
  sort_order: number;
  is_active: boolean;
}

interface MenuItem {
  id: string;
  category_id: string;
  name_en: string;
  name_ka: string;
  price: number;
  is_available: boolean;
  sort_order: number;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const supabase = createClient();
      const [catRes, itemRes] = await Promise.all([
        supabase
          .from('menu_categories')
          .select('id, name_en, name_ka, sort_order, is_active')
          .order('sort_order'),
        supabase
          .from('menu_items')
          .select('id, category_id, name_en, name_ka, price, is_available, sort_order')
          .order('sort_order'),
      ]);
      setCategories(catRes.data ?? []);
      setItems(itemRes.data ?? []);
    } catch {
      // tables may not exist
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm('ნამდვილად გსურთ ამ კატეგორიის წაშლა? მასში არსებული პროდუქტები დაკარგავენ კატეგორიას.'))
      return;
    const supabase = createClient();
    await supabase.from('menu_categories').delete().eq('id', id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  async function toggleCategoryActive(id: string, current: boolean) {
    const supabase = createClient();
    await supabase
      .from('menu_categories')
      .update({ is_active: !current })
      .eq('id', id);
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_active: !current } : c))
    );
  }

  async function deleteItem(id: string) {
    if (!confirm('ნამდვილად გსურთ ამ პროდუქტის წაშლა?')) return;
    const supabase = createClient();
    await supabase.from('menu_items').delete().eq('id', id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function toggleItemAvailable(id: string, current: boolean) {
    const supabase = createClient();
    await supabase
      .from('menu_items')
      .update({ is_available: !current })
      .eq('id', id);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, is_available: !current } : i))
    );
  }

  if (loading) {
    return <div className="text-[#F5ECD7]/50">იტვირთება...</div>;
  }

  function getCategoryName(categoryId: string) {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name_ka || cat?.name_en || 'კატეგორიის გარეშე';
  }

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#F5ECD7]">კატეგორიები</h1>
          <Link
            href="/admin/dashboard/menu/categories/new"
            className="px-5 py-2.5 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors text-sm"
          >
            ახალი კატეგორია
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-6 text-center text-[#F5ECD7]/50">
            კატეგორიები ჯერ არ არის.
          </div>
        ) : (
          <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#C9A84C]/20">
                  <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    სახელი
                  </th>
                  <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    რიგითობა
                  </th>
                  <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    სტატუსი
                  </th>
                  <th className="text-right px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    მოქმედებები
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-[#333]/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-[#F5ECD7]">
                      {cat.name_ka || cat.name_en}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#F5ECD7]/70">
                      {cat.sort_order}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          toggleCategoryActive(cat.id, cat.is_active)
                        }
                        className={`text-xs px-3 py-1 rounded-full ${
                          cat.is_active
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {cat.is_active ? 'აქტიური' : 'არააქტიური'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/dashboard/menu/categories/${cat.id}/edit`}
                        className="text-sm text-[#C9A84C] hover:underline mr-4"
                      >
                        რედაქტირება
                      </Link>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-sm text-red-400 hover:underline"
                      >
                        წაშლა
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Items Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#F5ECD7]">მენიუს პროდუქტები</h2>
          <Link
            href="/admin/dashboard/menu/items/new"
            className="px-5 py-2.5 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors text-sm"
          >
            ახალი პროდუქტი
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-6 text-center text-[#F5ECD7]/50">
            პროდუქტები ჯერ არ არის.
          </div>
        ) : (
          <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#C9A84C]/20">
                  <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    სახელი
                  </th>
                  <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    კატეგორია
                  </th>
                  <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    ფასი
                  </th>
                  <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    სტატუსი
                  </th>
                  <th className="text-right px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                    მოქმედებები
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#333]/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-[#F5ECD7]">
                      {item.name_ka || item.name_en}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#F5ECD7]/70">
                      {getCategoryName(item.category_id)}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#C9A84C]">
                      {item.price} &#8382;
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          toggleItemAvailable(item.id, item.is_available)
                        }
                        className={`text-xs px-3 py-1 rounded-full ${
                          item.is_available
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {item.is_available ? 'ხელმისაწვდომი' : 'მიუწვდომელი'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/dashboard/menu/items/${item.id}/edit`}
                        className="text-sm text-[#C9A84C] hover:underline mr-4"
                      >
                        რედაქტირება
                      </Link>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-sm text-red-400 hover:underline"
                      >
                        წაშლა
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
