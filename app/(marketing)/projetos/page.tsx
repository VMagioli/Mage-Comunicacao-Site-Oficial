import React from 'react';
import type { Metadata } from 'next';
import { PortfolioGrid } from '@/src/components/PortfolioGrid';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';
import { getPublishedCaseCounts } from '@/src/lib/cases';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projetos e Cases: Sites, Redes Sociais e Perfil no Google',
  description:
    'Confira os principais projetos da MAGE Comunicação: sites e landing pages entregues, cases de gestão de redes sociais com prints de antes e depois e Perfis da Empresa no Google.',
  alternates: {
    canonical: '/projetos',
  },
  openGraph: {
    title: 'Projetos e Cases | MAGE Comunicação',
    description:
      'Sites e landing pages, gestão de redes sociais com prints de métricas e otimização de Perfis da Empresa no Google.',
    url: 'https://magecomunicacao.com.br/projetos',
    type: 'website',
  },
};

export default async function ProjetosRoute() {
  const counts = await getPublishedCaseCounts();
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PortfolioGrid counts={counts} />
    </>
  );
}
