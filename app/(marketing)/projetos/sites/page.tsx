import React from 'react';
import type { Metadata } from 'next';
import { SitesProjectsSection } from '@/src/components/PortfolioGrid';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';
import { getPublishedCasesByType } from '@/src/lib/cases';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projetos de Sites e Landing Pages',
  description:
    'Confira os sites institucionais e landing pages de alta performance desenvolvidos pela MAGE Comunicação com foco em SEO e conversão.',
  alternates: {
    canonical: '/projetos/sites',
  },
  openGraph: {
    title: 'Projetos de Sites e Landing Pages | MAGE Comunicação',
    description:
      'Portfólio de sites rápidos e landing pages desenvolvidos pela MAGE Comunicação.',
    url: 'https://magecomunicacao.com.br/projetos/sites',
    type: 'website',
  },
};

export default async function ProjetosSitesRoute() {
  const cases = await getPublishedCasesByType('site');
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Sites & Landing Pages', path: '/projetos/sites' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <SitesProjectsSection cases={cases} />
    </>
  );
}
