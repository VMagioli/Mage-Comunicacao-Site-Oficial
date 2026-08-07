import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://magecomunicacao.com.br';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/admin/', '/api/private/'],
      },
      // Allow AI Bots explicit access for GEO & AIO discovery
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Bytespider', 'CCBot', 'Google-Extended', 'Cohere-ai'],
        allow: '/',
        disallow: ['/portal/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
