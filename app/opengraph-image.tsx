import { ImageResponse } from 'next/og';

export const alt = 'MAGE Comunicação — Criação de Sites, Gestão de Redes Sociais & SEO';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B0F14',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(59, 130, 246, 0.25), transparent 45%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.2), transparent 45%)',
          padding: '64px 72px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              M
            </div>
            <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '0.28em' }}>
              MAGE
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              fontSize: '18px',
              color: '#CBD5E1',
            }}
          >
            magecomunicacao.com.br
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '940px' }}>
          <div style={{ fontSize: '56px', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            Sites, Gestão de Redes Sociais e SEO para empresas.
          </div>
          <div style={{ fontSize: '26px', color: '#94A3B8', lineHeight: 1.4 }}>
            Tecnologia e comunicação trabalhando como um ecossistema para gerar autoridade e demanda qualificada.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Sites & Landing Pages', 'Social Media & Conteúdo', 'Google & SEO'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '10px 22px',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                color: '#93C5FD',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

