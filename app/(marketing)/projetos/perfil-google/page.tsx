import React from 'react';
import type { Metadata } from 'next';
import { GoogleProjectsSection } from '@/src/components/PortfolioGrid';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';
import { getPublishedCasesByType } from '@/src/lib/cases';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Cases de Perfil da Empresa no Google e SEO Local',
  description:
    'Conheça os principais projetos de criação e gestão de Perfil da Empresa no Google (Google Meu Negócio) com prints de métricas e SEO local entregues pela MAGE Comunicação.',
  alternates: {
    canonical: '/projetos/perfil-google',
  },
  openGraph: {
    title: 'Cases de Perfil da Empresa no Google | MAGE Comunicação',
    description:
      'Evolução de visualizações, rotas, ligações e avaliações em Perfis da Empresa no Google gerenciados pela MAGE.',
    url: 'https://magecomunicacao.com.br/projetos/perfil-google',
    type: 'website',
  },
};

export default async function ProjetosPerfilGoogleRoute() {
  const cases = await getPublishedCasesByType('google');
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Perfil da Empresa no Google', path: '/projetos/perfil-google' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <GoogleProjectsSection cases={cases} />
    </>
  );
}
