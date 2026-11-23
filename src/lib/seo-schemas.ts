export interface FaqItem {
  question: string;
  answer: string;
}

export const MAGE_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://magecomunicacao.com.br/#organization',
      name: 'MAGE Comunicação',
      alternateName: 'MAGE Agência Digital',
      url: 'https://magecomunicacao.com.br',
      email: 'contato@magecomunicacao.com.br',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://magecomunicacao.com.br/#logo',
        url: 'https://magecomunicacao.com.br/favicon.png',
        caption: 'MAGE Comunicação',
      },
      image: {
        '@id': 'https://magecomunicacao.com.br/#logo',
      },
      description:
        'Agência digital com base no Rio de Janeiro e atendimento nacional remoto, especializada em gestão de redes sociais (Instagram, Facebook, TikTok), criação de conteúdo estratégico, desenvolvimento de sites e landing pages e gestão de Perfil da Empresa no Google com SEO.',
      knowsAbout: [
        'Gestão de Redes Sociais (Social Media)',
        'Criação de Conteúdo para Instagram, Facebook e TikTok',
        'Criação de Sites Institucionais',
        'Desenvolvimento de Landing Pages de Alta Conversão',
        'Perfil da Empresa no Google (Google Meu Negócio)',
        'Search Engine Optimization (SEO)',
        'Branding e Posicionamento Digital',
        'Desenvolvimento Web Next.js',
      ],
      sameAs: [
        'https://www.instagram.com/magecomunicacao/',
        'https://www.threads.com/@magecomunicacao',
        'https://www.facebook.com/magecomunicacao',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+55-21-99396-3503',
        email: 'contato@magecomunicacao.com.br',
        contactType: 'sales',
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://magecomunicacao.com.br/#website',
      url: 'https://magecomunicacao.com.br',
      name: 'MAGE Comunicação',
      description:
        'Agência digital especializada em sites, landing pages, gestão de redes sociais e SEO para empresas em todo o Brasil.',
      publisher: {
        '@id': 'https://magecomunicacao.com.br/#organization',
      },
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://magecomunicacao.com.br/#localbusiness',
      name: 'MAGE Comunicação',
      url: 'https://magecomunicacao.com.br',
      email: 'contato@magecomunicacao.com.br',
      telephone: '+55-21-99396-3503',
      image: 'https://magecomunicacao.com.br/opengraph-image',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rio de Janeiro',
        addressRegion: 'RJ',
        addressCountry: 'BR',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brasil',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      parentOrganization: {
        '@id': 'https://magecomunicacao.com.br/#organization',
      },
    },
  ],
};

export const MAGE_SERVICES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Serviços da MAGE Comunicação',
  provider: {
    '@id': 'https://magecomunicacao.com.br/#organization',
  },
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Gestão de Redes Sociais & Criação de Conteúdo',
        description:
          'Social media completo para Instagram, Facebook, TikTok e outros canais, incluindo planejamento, roteirização e edição para quem tem pouca disponibilidade ou dificuldade para criar conteúdo.',
        areaServed: 'BR',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Criação de Sites e Landing Pages',
        description:
          'Desenvolvimento de sites institucionais rápidos em Next.js, landing pages e páginas de vendas com foco em SEO e conversão.',
        areaServed: 'BR',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Gestão de Perfil da Empresa no Google e SEO',
        description:
          'Criação, otimização e gestão do Perfil da Empresa no Google (Google Meu Negócio) integrada a estratégias de SEO técnico e local.',
        areaServed: 'BR',
      },
    },
  ],
};

export const MAGE_FOUNDERS_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Vitor Magioli',
      jobTitle: 'Cofundador | Analista de Sistemas & Tecnologia Estrutural',
      worksFor: {
        '@id': 'https://magecomunicacao.com.br/#organization',
      },
    },
    {
      '@type': 'Person',
      name: 'Lana Magioli',
      jobTitle: 'Cofundadora | Branding & Estratégia Narrativa',
      worksFor: {
        '@id': 'https://magecomunicacao.com.br/#organization',
      },
    },
  ],
};

export function generateFaqSchema(faqList: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://magecomunicacao.com.br${item.path}`,
    })),
  };
}
