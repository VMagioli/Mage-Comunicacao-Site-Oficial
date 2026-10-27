'use client';

import React, { useEffect, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_TRACKING_ID, pageview, event } from '@/src/lib/gtag';

function TrackRouteChangeAndInteractions() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Rastreia mudanças de página e rotas
  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  // Rastreamento automático de cliques essenciais (WhatsApp, Redes Sociais, E-mail)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target || !target.href) return;

      const href = target.href;
      const text = target.innerText?.trim() || target.getAttribute('aria-label') || 'Link';

      // WhatsApp Clicks (Geração de Lead)
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        event({
          action: 'click_whatsapp',
          category: 'Lead',
          label: text,
          link_url: href,
        });
      }
      // Redes Sociais
      else if (href.includes('instagram.com')) {
        event({
          action: 'click_social',
          category: 'Social',
          label: 'Instagram',
          link_url: href,
        });
      } else if (href.includes('linkedin.com')) {
        event({
          action: 'click_social',
          category: 'Social',
          label: 'LinkedIn',
          link_url: href,
        });
      }
      // E-mail comercial
      else if (href.startsWith('mailto:')) {
        event({
          action: 'click_email',
          category: 'Lead',
          label: href.replace('mailto:', ''),
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <TrackRouteChangeAndInteractions />
      </Suspense>
    </>
  );
}
