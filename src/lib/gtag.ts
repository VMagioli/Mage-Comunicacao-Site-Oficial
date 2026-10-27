export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-P4RVFEWDD1';

// Registra visualizações de páginas virtuais ou rotas
export const pageview = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
      ...(title ? { page_title: title } : {}),
    });
  }
};

export interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Dispara eventos personalizados para o Google Analytics 4
export const event = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};
