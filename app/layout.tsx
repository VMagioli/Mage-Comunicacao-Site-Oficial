import React from 'react';
import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { CookieConsentProvider, CookieEventListener } from '@/src/components/CookieConsent';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { MAGE_ORGANIZATION_SCHEMA } from '@/src/lib/seo-schemas';
import { GoogleAnalytics } from '@/src/components/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MAGE Comunicação — Criação de Sites, Gestão de Redes Sociais & SEO',
    template: '%s | MAGE Comunicação',
  },
  description:
    'Digital studio especializada em criação de sites e landing pages, gestão de redes sociais (Instagram, Facebook, TikTok) e SEO com Perfil da Empresa no Google. Base no Rio de Janeiro com atendimento nacional remoto.',
  keywords: [
    'digital studio',
    'agência digital',
    'criação de sites',
    'criação de landing pages',
    'gestão de redes sociais',
    'social media',
    'criação de conteúdo',
    'perfil da empresa no google',
    'google meu negócio',
    'SEO',
    'branding',
    'agência digital Rio de Janeiro',
  ],
  authors: [{ name: 'MAGE Comunicação' }],
  creator: 'MAGE Comunicação',
  metadataBase: new URL('https://magecomunicacao.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MAGE Comunicação — Criação de Sites, Gestão de Redes Sociais & SEO',
    description:
      'Criamos sites e landing pages rápidos otimizados para Google, fazemos gestão completa de redes sociais e estruturamos seu Perfil da Empresa no Google.',
    url: 'https://magecomunicacao.com.br',
    siteName: 'MAGE Comunicação',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAGE Comunicação — Criação de Sites, Gestão de Redes Sociais & SEO',
    description:
      'Tecnologia e comunicação trabalhando como um ecossistema: sites, landing pages, redes sociais e SEO no Google.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`h-full scroll-smooth ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <JsonLd data={MAGE_ORGANIZATION_SCHEMA} />
      </head>
      <body className="h-full antialiased bg-[#0B0F14] text-slate-400" suppressHydrationWarning>
        <GoogleAnalytics />
        <CookieConsentProvider>
          <CookieEventListener />
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  );
}
