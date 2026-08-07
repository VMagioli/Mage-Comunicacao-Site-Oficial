export interface FaqItem {
  question: string;
  answer: string; // Factual, 40-60 words (BLUF tactic)
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
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://magecomunicacao.com.br/#logo',
        url: 'https://magecomunicacao.com.br/og-image.png',
        caption: 'MAGE Comunicação'
      },
      image: {
        '@id': 'https://magecomunicacao.com.br/#logo'
      },
      description: 'Agência digital de alta performance especializada em Branding, Desenvolvimento Web de Alta Velocidade, SEO Semântico, AEO e Gestão Estratégica de Presença Digital.',
      knowsAbout: [
        'Search Engine Optimization (SEO)',
        'Answer Engine Optimization (AEO)',
        'Generative Engine Optimization (GEO)',
        'Search Experience Optimization (SXO)',
        'Artificial Intelligence Optimization (AIO)',
        'Desenvolvimento Web Next.js',
        'Branding Estratégico',
        'Gestão de Mídia & Presença Digital'
      ],
      sameAs: [
        'https://www.instagram.com/magecomunicacao',
        'https://www.linkedin.com/company/magecomunicacao',
        'https://github.com/VMagioli/Mage-Comunicacao-Site-Oficial'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+55-11-99999-9999',
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: ['Portuguese', 'English']
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://magecomunicacao.com.br/#website',
      url: 'https://magecomunicacao.com.br',
      name: 'MAGE Comunicação',
      description: 'Soluções digitais de alto impacto que unem tecnologia, design e inteligência estratégica.',
      publisher: {
        '@id': 'https://magecomunicacao.com.br/#organization'
      },
      inLanguage: 'pt-BR'
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://magecomunicacao.com.br/#localbusiness',
      name: 'MAGE Comunicação',
      url: 'https://magecomunicacao.com.br',
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressRegion: 'SP'
      },
      image: 'https://magecomunicacao.com.br/og-image.png',
      telephone: '+55-11-99999-9999',
      parentOrganization: {
        '@id': 'https://magecomunicacao.com.br/#organization'
      }
    }
  ]
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
        text: item.answer
      }
    }))
  };
}
