export interface Project {
  id: number;
  url: string;
  realUrl: string;
  image: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  colorClass: string;
  tagColorClass: string;
  accentColor: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    url: 'fabriciomagioli.com.br',
    realUrl: 'https://www.fabriciomagioli.com.br/',
    image: '/images/site-fabriciomagioli.webp',
    label: 'HIGH-PERFORMANCE WEB DEVELOPMENT',
    title: 'Plataforma Imobiliária Fabrício Magiolli',
    description: 'Plataforma de alto padrão com busca inteligente de propriedades de luxo, mapas interativos e otimização SEO de extrema performance.',
    tags: ['Next.js', 'SEO', 'Real Estate', 'Tailwind'],
    colorClass: 'text-blue-400 border-blue-500/20 bg-blue-500/5 hover:border-blue-400/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]',
    tagColorClass: 'text-blue-400/90 bg-blue-500/10 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.05)]',
    accentColor: 'text-blue-400'
  },
  {
    id: 2,
    url: 'ingrydcarolnutri.com.br',
    realUrl: 'https://www.ingrydcarolnutri.com.br/',
    image: '/images/site-ingrydcarolnutri.webp',
    label: 'BRAND STRATEGY & IDENTITY',
    title: 'Posicionamento & Plataforma Dra. Ingrid',
    description: 'Desenvolvimento de identidade de marca premium, estratégia de conteúdo integrado e portal de agendamentos exclusivo de alta conversão.',
    tags: ['Strategy', 'Content', 'Identity', 'React'],
    colorClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-400/30 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    tagColorClass: 'text-emerald-400/90 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]',
    accentColor: 'text-emerald-400'
  },
  {
    id: 3,
    url: 'reputacaodigital.laizeandreatta.vercel.app',
    realUrl: 'https://reputacaodigital.laizeandreatta.vercel.app/',
    image: '/images/screencapture-reputacaodigital-laizeandreatta-vercel-app-2026-07-05-00_31_55.webp',
    label: 'PERSONAL BRANDING & INFLUENCE',
    title: 'Projeto Reputação Digital',
    description: 'Landing page de altíssima conversão focada na venda de mentorias e construção de autoridade digital por meio de posicionamento de alto valor.',
    tags: ['Branding', 'Copywriting', 'Conversion', 'React'],
    colorClass: 'text-pink-400 border-pink-500/20 bg-pink-500/5 hover:border-pink-400/30 hover:shadow-[0_0_12px_rgba(236,72,153,0.15)]',
    tagColorClass: 'text-pink-400/90 bg-pink-500/10 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.05)]',
    accentColor: 'text-pink-400'
  }
];
