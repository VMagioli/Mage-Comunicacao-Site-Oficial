import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedCaseBySlug } from '@/src/lib/cases';
import { ClientCaseDetailView } from '@/src/components/PortfolioGrid';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';

export const revalidate = 60;

interface SocialClientPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SocialClientPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedCaseBySlug('social', slug);

  if (!item) {
    return { title: 'Case não encontrado' };
  }

  return {
    title: `${item.client_name} — Case de Gestão de Redes Sociais`,
    description: item.summary,
    alternates: {
      canonical: `/projetos/redes-sociais/${item.slug}`,
    },
    openGraph: {
      title: `${item.client_name} | Gestão de Redes Sociais — MAGE Comunicação`,
      description: item.summary,
      url: `https://magecomunicacao.com.br/projetos/redes-sociais/${item.slug}`,
      type: 'article',
      ...(item.cover_image ? { images: [{ url: item.cover_image, alt: item.client_name }] } : {}),
    },
  };
}

export default async function SocialClientCasePage({ params }: SocialClientPageProps) {
  const { slug } = await params;
  const item = await getPublishedCaseBySlug('social', slug);

  if (!item) {
    notFound();
  }

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Gestão de Redes Sociais', path: '/projetos/redes-sociais' },
    { name: item.client_name, path: `/projetos/redes-sociais/${item.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <ClientCaseDetailView item={item} />
    </>
  );
}

