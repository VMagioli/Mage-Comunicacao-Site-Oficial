import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal do Cliente',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] text-slate-100 overflow-x-hidden">
      {children}
    </div>
  );
}
