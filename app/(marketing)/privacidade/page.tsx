import React from 'react';
import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/src/components/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Saiba como a MAGE Comunicação coleta, utiliza, armazena e protege seus dados pessoais em conformidade com a LGPD.',
  alternates: {
    canonical: '/privacidade',
  },
  openGraph: {
    title: 'Política de Privacidade | MAGE Comunicação',
    description:
      'Saiba como a MAGE Comunicação coleta, utiliza, armazena e protege seus dados pessoais em conformidade com a LGPD.',
    url: 'https://magecomunicacao.com.br/privacidade',
    type: 'website',
  },
};

export default function PrivacidadeRoute() {
  return <PrivacyPolicyPage />;
}

