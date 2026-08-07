import React from 'react';
import type { Metadata } from 'next';
import { Inter, Manrope, IBM_Plex_Mono, Fira_Code } from 'next/font/google';
import './globals.css';
import { CookieConsentProvider, CookieEventListener } from '@/src/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MAGE — Agência Digital | Criação de Sites, Redes Sociais & Branding',
    template: '%s | MAGE'
  },
  description: 'A MAGE é uma agência digital focada em criação de sites, gestão de redes sociais, branding e soluções tecnológicas de alto desempenho.',
  keywords: ['agência digital', 'criação de sites', 'gestão de redes sociais', 'branding', 'desenvolvimento web', 'design', 'marketing digital'],
  authors: [{ name: 'MAGE Comunicação' }],
  creator: 'MAGE Comunicação',
  metadataBase: new URL('https://magecomunicacao.com.br'),
  openGraph: {
    title: 'MAGE — Agência Digital | Criação de Sites, Redes Sociais & Branding',
    description: 'Soluções digitais de alto impacto que unem tecnologia, design e estratégia para acelerar o seu negócio.',
    url: 'https://magecomunicacao.com.br',
    siteName: 'MAGE Comunicação',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/background-image.png',
        width: 1200,
        height: 630,
        alt: 'MAGE - Conectando ideias. Criando experiências.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAGE — Agência Digital | Criação de Sites, Redes Sociais & Branding',
    description: 'Soluções digitais de alto impacto que unem tecnologia, design e estratégia.',
    images: ['/background-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  }
};

import { JsonLd } from '@/src/components/seo/JsonLd';
import { MAGE_ORGANIZATION_SCHEMA } from '@/src/lib/seo-schemas';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`h-full scroll-smooth ${inter.variable} ${manrope.variable} ${ibmPlexMono.variable} ${firaCode.variable}`}>
      <head>
        <JsonLd data={MAGE_ORGANIZATION_SCHEMA} />
      </head>
      <body className="h-full antialiased bg-[#0B0F14] text-slate-400" suppressHydrationWarning>
        <CookieConsentProvider>
          <CookieEventListener />
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  );
}
