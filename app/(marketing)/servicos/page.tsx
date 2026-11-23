import React from 'react';
import type { Metadata } from 'next';
import { ServicesPage } from '@/src/components/ServicesPage';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { MAGE_SERVICES_SCHEMA, generateBreadcrumbSchema } from '@/src/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Serviços: Redes Sociais, Sites, Landing Pages e SEO',
  description:
    'Conheça os serviços da MAGE Comunicação: gestão de redes sociais (Instagram, Facebook, TikTok), criação de conteúdo, desenvolvimento de sites e landing pages, Perfil da Empresa no Google e SEO.',
  alternates: {
    canonical: '/servicos',
  },
  openGraph: {
    title: 'Serviços | MAGE Comunicação',
    description:
      'Gestão de redes sociais, criação de sites e landing pages, Perfil da Empresa no Google com SEO e estrutura digital integrada para empresas.',
    url: 'https://magecomunicacao.com.br/servicos',
    type: 'website',
  },
};

export default function ServicosRoute() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={MAGE_SERVICES_SCHEMA} />
      <ServicesPage />
    </>
  );
}

