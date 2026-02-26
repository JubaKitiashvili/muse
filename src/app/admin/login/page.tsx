'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('არასწორი მონაცემები');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('შესვლა ვერ მოხერხდა');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-widest text-[#C9A84C]">
            MUSE
          </h1>
          <p className="text-[#F5ECD7]/60 mt-2 text-sm uppercase tracking-wider">
            ადმინ პანელი
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#F5ECD7]/80 mb-2"
            >
              ელ-ფოსტა
            </label>
            <input
              id="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
              placeholder="admin@musebar.ge"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#F5ECD7]/80 mb-2"
            >
              პაროლი
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
              placeholder="შეიყვანეთ პაროლი"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'შესვლა...' : 'შესვლა'}
          </button>
        </form>
      </div>
    </div>
  );
}
