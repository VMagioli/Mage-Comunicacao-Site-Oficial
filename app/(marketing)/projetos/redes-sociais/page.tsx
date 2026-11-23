import React from 'react';
import type { Metadata } from 'next';
import { SocialProjectsSection } from '@/src/components/PortfolioGrid';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';
import { getPublishedCasesByType } from '@/src/lib/cases';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Cases de Gestão de Redes Sociais (Antes e Depois)',
  description:
    'Veja os principais cases de gestão de redes sociais da MAGE Comunicação: perfis atuais e anteriores, prints reais de métricas e análises de antes e depois.',
  alternates: {
    canonical: '/projetos/redes-sociais',
  },
  openGraph: {
    title: 'Cases de Gestão de Redes Sociais | MAGE Comunicação',
    description:
      'Resultados de antes e depois com prints reais e estratégias de gestão de Instagram, Facebook e TikTok pela MAGE Comunicação.',
    url: 'https://magecomunicacao.com.br/projetos/redes-sociais',
    type: 'website',
  },
};

export default async function ProjetosRedesSociaisRoute() {
  const cases = await getPublishedCasesByType('social');
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Gestão de Redes Sociais', path: '/projetos/redes-sociais' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <SocialProjectsSection cases={cases} />
    </>
  );
}
