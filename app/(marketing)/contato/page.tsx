import React from 'react';
import type { Metadata } from 'next';
import { ContactPage } from '@/src/components/ContactPage';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Contato e Diagnóstico Estratégico',
  description:
    'Fale com a MAGE Comunicação pelo formulário ou WhatsApp. Atendemos empresas em todo o Brasil com gestão de redes sociais, criação de sites, landing pages e SEO.',
  alternates: {
    canonical: '/contato',
  },
  openGraph: {
    title: 'Contato | MAGE Comunicação',
    description:
      'Agende um diagnóstico estratégico ou solicite um orçamento para sites, landing pages, redes sociais e SEO.',
    url: 'https://magecomunicacao.com.br/contato',
    type: 'website',
  },
};

interface ContatoPageProps {
  searchParams: Promise<{ tipo?: string }>;
}

const VALID_TYPES = new Set(['web', 'branding', 'commercial', 'management', 'other']);

export default async function ContatoRoute({ searchParams }: ContatoPageProps) {
  const params = await searchParams;
  const defaultProjectType =
    params?.tipo && VALID_TYPES.has(params.tipo) ? params.tipo : 'web';

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Contato', path: '/contato' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <ContactPage defaultProjectType={defaultProjectType} />
    </>
  );
}

