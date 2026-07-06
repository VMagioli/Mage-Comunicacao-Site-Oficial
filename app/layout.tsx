import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAGE — Tecnologia com Propósito, Design com Clareza',
  description: 'Unimos código e criatividade para construir soluções digitais que conectam, inspiram e geram impacto real.',
  icons: {
    icon: '/favicon.ico', // fallback if exists
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full scroll-smooth">
      <body className="h-full antialiased bg-[#0B0F14] text-slate-400">
        {children}
      </body>
    </html>
  );
}
