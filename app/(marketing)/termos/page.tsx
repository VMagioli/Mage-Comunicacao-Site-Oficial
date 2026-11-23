import React from 'react';
import type { Metadata } from 'next';
import { TermsPage } from '@/src/components/TermsPage';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Leia os Termos de Uso do website oficial da MAGE Comunicação, propriedade intelectual e diretrizes de propostas.',
  alternates: {
    canonical: '/termos',
  },
  openGraph: {
    title: 'Termos de Uso | MAGE Comunicação',
    description:
      'Leia os Termos de Uso do website oficial da MAGE Comunicação, propriedade intelectual e diretrizes de propostas.',
    url: 'https://magecomunicacao.com.br/termos',
    type: 'website',
  },
};

export default function TermosRoute() {
  return <TermsPage />;
}

