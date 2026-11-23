import React from 'react';
import type { Metadata } from 'next';
import { getPublishedPosts } from '@/src/lib/posts';
import { ConteudosHub } from '@/src/components/blog/ConteudosHub';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/src/lib/seo-schemas';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Conteúdos, Guias e Estratégias Digitais',
  description:
    'Guias práticos e insights da MAGE Comunicação sobre gestão de redes sociais, criação de sites e landing pages, SEO e Perfil da Empresa no Google.',
  alternates: {
    canonical: '/conteudos',
  },
  openGraph: {
    title: 'Conteúdos | MAGE Comunicação',
    description:
      'Guias práticos e análises sobre redes sociais, sites de alta conversão, SEO e Perfil da Empresa no Google.',
    url: 'https://magecomunicacao.com.br/conteudos',
    type: 'website',
  },
};

export default async function ConteudosRoute() {
  const posts = await getPublishedPosts();
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Conteúdos', path: '/conteudos' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <ConteudosHub posts={posts} />
    </>
  );
}

