import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/src/lib/posts';
import { getAllPublishedCases } from '@/src/lib/cases';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://magecomunicacao.com.br';
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/servicos`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projetos`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projetos/sites`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/projetos/redes-sociais`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/projetos/perfil-google`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/conteudos`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/sobre`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contato`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacidade`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/termos`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const [posts, cases] = await Promise.all([
    getPublishedPosts(),
    getAllPublishedCases(),
  ]);

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/conteudos/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || post.created_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const clientCaseRoutes: MetadataRoute.Sitemap = cases
    .filter((c) => c.type === 'social' || c.type === 'google')
    .map((c) => ({
      url: `${baseUrl}/projetos/${c.type === 'social' ? 'redes-sociais' : 'perfil-google'}/${c.slug}`,
      lastModified: new Date(c.updated_at || c.created_at),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...postRoutes, ...clientCaseRoutes];
}
