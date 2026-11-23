import React from 'react';
import type { Metadata } from 'next';
import { AboutPage } from '@/src/components/AboutPage';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { MAGE_FOUNDERS_SCHEMA, generateBreadcrumbSchema } from '@/src/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Sobre Nós: Método M.A.G.E. e Liderança',
  description:
    'Conheça a MAGE Comunicação, estúdio digital fundado por Vitor Magioli e Lana Magioli no Rio de Janeiro com atendimento nacional remoto. Unimos tecnologia, comunicação e método para escalar empresas.',
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    title: 'Sobre Nós | MAGE Comunicação',
    description:
      'Unimos engenharia web, branding e gestão de redes sociais em um ecossistema integrado. Conheça o Método M.A.G.E. e quem constrói a MAGE.',
    url: 'https://magecomunicacao.com.br/sobre',
    type: 'website',
  },
};

export default function SobreRoute() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Sobre nós', path: '/sobre' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={MAGE_FOUNDERS_SCHEMA} />
      <AboutPage />
    </>
  );
}

