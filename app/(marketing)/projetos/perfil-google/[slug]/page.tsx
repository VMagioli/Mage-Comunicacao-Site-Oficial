import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedCaseBySlug } from '@/src/lib/cases';
import { ClientCaseDetailView } from '@/src/components/PortfolioGrid';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';

export const revalidate = 60;

interface GoogleClientPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GoogleClientPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedCaseBySlug('google', slug);

  if (!item) {
    return { title: 'Case não encontrado' };
  }

  return {
    title: `${item.client_name} — Case de Perfil da Empresa no Google`,
    description: item.summary,
    alternates: {
      canonical: `/projetos/perfil-google/${item.slug}`,
    },
    openGraph: {
      title: `${item.client_name} | Perfil da Empresa no Google — MAGE Comunicação`,
      description: item.summary,
      url: `https://magecomunicacao.com.br/projetos/perfil-google/${item.slug}`,
      type: 'article',
      ...(item.cover_image ? { images: [{ url: item.cover_image, alt: item.client_name }] } : {}),
    },
  };
}

export default async function GoogleClientCasePage({ params }: GoogleClientPageProps) {
  const { slug } = await params;
  const item = await getPublishedCaseBySlug('google', slug);

  if (!item) {
    notFound();
  }

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Perfil da Empresa no Google', path: '/projetos/perfil-google' },
    { name: item.client_name, path: `/projetos/perfil-google/${item.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <ClientCaseDetailView item={item} />
    </>
  );
}

