'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Category {
  id: string;
  parent_id: string | null;
  name_en: string;
  name_ka: string;
  sort_order: number;
  is_active: boolean;
}

interface CategoryWithChildren extends Category {
  children: Category[];
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
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const supabase = createClient();
      const [catRes, itemRes] = await Promise.all([
        supabase
          .from('menu_categories')
          .select('id, parent_id, name_en, name_ka, sort_order, is_active')
          .order('sort_order'),
        supabase
          .from('menu_items')
          .select('id, category_id, name_en, name_ka, price, is_available, sort_order')
          .order('sort_order'),
      ]);
      const cats = catRes.data ?? [];
      setAllCategories(cats);
      setItems(itemRes.data ?? []);

      // Expand all main categories by default
      const expandState: Record<string, boolean> = {};
      cats.filter((c) => !c.parent_id).forEach((c) => {
        expandState[c.id] = true;
      });
      setExpanded(expandState);
    } catch {
      // tables may not exist
    } finally {
      setLoading(false);
    }
  }

  function buildTree(): CategoryWithChildren[] {
    const mainCats = allCategories.filter((c) => !c.parent_id);
    return mainCats.map((main) => ({
      ...main,
      children: allCategories
        .filter((c) => c.parent_id === main.id)
        .sort((a, b) => a.sort_order - b.sort_order),
    }));
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function deleteCategory(cat: Category) {
    const hasChildren = allCategories.some((c) => c.parent_id === cat.id);
    const message = hasChildren
      ? 'ეს წაშლის ყველა ქვეკატეგორიას და მათ პროდუქტებს. გსურთ გაგრძელება?'
      : 'ნამდვილად გსურთ ამ კატეგორიის წაშლა?';

    if (!confirm(message)) return;
    const supabase = createClient();
    await supabase.from('menu_categories').delete().eq('id', cat.id);
    setAllCategories((prev) => prev.filter(
      (c) => c.id !== cat.id && c.parent_id !== cat.id
    ));
    // Also remove items belonging to deleted subcategories
    if (hasChildren) {
      const deletedSubIds = allCategories
        .filter((c) => c.parent_id === cat.id)
        .map((c) => c.id);
      setItems((prev) => prev.filter((i) => !deletedSubIds.includes(i.category_id)));
    }
  }

  async function toggleCategoryActive(id: string, current: boolean) {
    const supabase = createClient();
    await supabase
      .from('menu_categories')
      .update({ is_active: !current })
      .eq('id', id);
    setAllCategories((prev) =>
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

  function getCategoryPath(categoryId: string) {
    const sub = allCategories.find((c) => c.id === categoryId);
    if (!sub) return 'კატეგორიის გარეშე';
    const parent = allCategories.find((c) => c.id === sub.parent_id);
    if (parent) {
      return `${parent.name_ka || parent.name_en} > ${sub.name_ka || sub.name_en}`;
    }
    return sub.name_ka || sub.name_en;
  }

  if (loading) {
    return <div className="text-[#F5ECD7]/50">იტვირთება...</div>;
  }

  const tree = buildTree();

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

        {tree.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-6 text-center text-[#F5ECD7]/50">
            კატეგორიები ჯერ არ არის.
          </div>
        ) : (
          <div className="space-y-3">
            {tree.map((main) => (
              <div
                key={main.id}
                className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg overflow-hidden"
              >
                {/* Main category row */}
                <div className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleExpand(main.id)}
                      className="text-[#F5ECD7]/50 hover:text-[#F5ECD7] transition-colors"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${expanded[main.id] ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-[#F5ECD7]">
                      {main.name_ka || main.name_en}
                    </span>
                    <span className="text-xs text-[#F5ECD7]/30">
                      ({main.children.length} ქვეკატეგორია)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#F5ECD7]/40">
                      რიგ: {main.sort_order}
                    </span>
                    <button
                      onClick={() => toggleCategoryActive(main.id, main.is_active)}
                      className={`text-xs px-3 py-1 rounded-full ${
                        main.is_active
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {main.is_active ? 'აქტიური' : 'არააქტიური'}
                    </button>
                    <Link
                      href={`/admin/dashboard/menu/categories/${main.id}/edit`}
                      className="text-sm text-[#C9A84C] hover:underline"
                    >
                      რედაქტირება
                    </Link>
                    <button
                      onClick={() => deleteCategory(main)}
                      className="text-sm text-red-400 hover:underline"
                    >
                      წაშლა
                    </button>
                  </div>
                </div>

                {/* Subcategories */}
                {expanded[main.id] && (
                  <div className="border-t border-[#333]/50">
                    {main.children.length === 0 ? (
                      <div className="pl-14 pr-6 py-3 text-xs text-[#F5ECD7]/30">
                        ქვეკატეგორიები ჯერ არ არის
                      </div>
                    ) : (
                      main.children.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between pl-14 pr-6 py-3 border-b border-[#333]/30 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[#F5ECD7]/20">|--</span>
                            <span className="text-sm text-[#F5ECD7]/80">
                              {sub.name_ka || sub.name_en}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-[#F5ECD7]/40">
                              რიგ: {sub.sort_order}
                            </span>
                            <button
                              onClick={() => toggleCategoryActive(sub.id, sub.is_active)}
                              className={`text-xs px-3 py-1 rounded-full ${
                                sub.is_active
                                  ? 'bg-green-900/30 text-green-400'
                                  : 'bg-red-900/30 text-red-400'
                              }`}
                            >
                              {sub.is_active ? 'აქტიური' : 'არააქტიური'}
                            </button>
                            <Link
                              href={`/admin/dashboard/menu/categories/${sub.id}/edit`}
                              className="text-sm text-[#C9A84C] hover:underline"
                            >
                              რედაქტირება
                            </Link>
                            <button
                              onClick={() => deleteCategory(sub)}
                              className="text-sm text-red-400 hover:underline"
                            >
                              წაშლა
                            </button>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Add subcategory button */}
                    <div className="pl-14 pr-6 py-3 border-t border-[#333]/30">
                      <Link
                        href={`/admin/dashboard/menu/categories/new?parent=${main.id}`}
                        className="text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors"
                      >
                        + ქვეკატეგორიის დამატება
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
                      {getCategoryPath(item.category_id)}
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
