'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Event {
  id: string;
  title_en: string;
  title_ka: string;
  date: string;
  time: string;
  is_published: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('events')
        .select('id, title_en, title_ka, date, time, is_published')
        .order('date', { ascending: false });
      if (error) throw error;
      setEvents(data ?? []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEvent(id: string) {
    if (!confirm('ნამდვილად გსურთ ამ ივენთის წაშლა?')) return;
    const supabase = createClient();
    await supabase.from('events').delete().eq('id', id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  async function togglePublish(id: string, current: boolean) {
    const supabase = createClient();
    await supabase
      .from('events')
      .update({ is_published: !current })
      .eq('id', id);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, is_published: !current } : e
      )
    );
  }

  if (loading) {
    return <div className="text-[#F5ECD7]/50">იტვირთება...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#F5ECD7]">ივენთები</h1>
        <Link
          href="/admin/dashboard/events/new"
          className="px-5 py-2.5 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors text-sm"
        >
          ახალი ივენთი
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-8 text-center text-[#F5ECD7]/50">
          ივენთები ჯერ არ არის. შექმენით პირველი ივენთი.
        </div>
      ) : (
        <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#C9A84C]/20">
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                  სათაური
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[#F5ECD7]/50">
                  თარიღი
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
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-[#333]/50 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-[#F5ECD7]">
                    {event.title_ka || event.title_en || 'უსათაურო'}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#F5ECD7]/70">
                    {event.date} {event.time && `at ${event.time}`}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        togglePublish(event.id, event.is_published)
                      }
                      className={`text-xs px-3 py-1 rounded-full ${
                        event.is_published
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-yellow-900/30 text-yellow-400'
                      }`}
                    >
                      {event.is_published ? 'გამოქვეყნებული' : 'დრაფტი'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/dashboard/events/${event.id}/edit`}
                      className="text-sm text-[#C9A84C] hover:underline mr-4"
                    >
                      რედაქტირება
                    </Link>
                    <button
                      onClick={() => deleteEvent(event.id)}
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
  );
}
