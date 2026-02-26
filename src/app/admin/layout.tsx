import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'MUSE Admin',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
