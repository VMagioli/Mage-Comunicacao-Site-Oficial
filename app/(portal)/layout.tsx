import React from 'react';

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
