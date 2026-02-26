import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

async function getCount(tableName: string): Promise<number> {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [eventCount, menuItemCount, galleryCount] = await Promise.all([
    getCount('events'),
    getCount('menu_items'),
    getCount('gallery_photos'),
  ]);

  const stats = [
    { label: 'ივენთები', count: eventCount, href: '/admin/dashboard/events' },
    { label: 'მენიუს პროდუქტები', count: menuItemCount, href: '/admin/dashboard/menu' },
    { label: 'გალერეის ფოტოები', count: galleryCount, href: '/admin/dashboard/gallery' },
  ];

  const quickActions = [
    { label: 'ივენთის დამატება', href: '/admin/dashboard/events/new' },
    { label: 'პროდუქტის დამატება', href: '/admin/dashboard/menu/items/new' },
    { label: 'ფოტოს ატვირთვა', href: '/admin/dashboard/gallery/upload' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F5ECD7]">მთავარი</h1>
        <p className="text-[#F5ECD7]/50 text-sm mt-1">
          გამარჯობა, {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-6 hover:border-[#C9A84C]/40 transition-colors"
          >
            <p className="text-sm text-[#F5ECD7]/50 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-4xl font-bold text-[#C9A84C] mt-2">
              {stat.count}
            </p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#F5ECD7] mb-4">
          სწრაფი მოქმედებები
        </h2>
        <div className="flex gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="px-6 py-3 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors text-sm"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
