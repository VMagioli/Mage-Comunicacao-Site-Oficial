"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShieldCheck, X } from 'lucide-react';

/* ─────────── Contexto simples para toda a app ─────────── */
type ConsentStatus = 'accepted' | 'declined' | undefined;
interface CookieContextType {
  status: ConsentStatus;
  setStatus: (s: ConsentStatus) => void;
}
const CookieConsentContext = createContext<CookieContextType | null>(null);

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent precisa do Provider');
  return ctx;
};

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<ConsentStatus>(undefined);
  return (
    <CookieConsentContext.Provider value={{ status, setStatus }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

/* ────────────────── Componente banner ─────────────────── */
interface CookieConsentProps {
  setActiveTab: (tab: string) => void;
}
export function CookieConsent({ setActiveTab }: CookieConsentProps) {
  const { status, setStatus } = useCookieConsent();
  const [visible, setVisible] = useState(false);

  /* mostra somente se ainda não respondeu */
  useEffect(() => {
    if (status) return;
    const stored = localStorage.getItem('mage-cookie-consent') as ConsentStatus;
    if (stored) {
      setStatus(stored);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [status, setStatus]);

  /* helper para salvar + emitir evento */
  const saveAndDispatch = (choice: ConsentStatus) => {
    localStorage.setItem('mage-cookie-consent', choice!);
    setStatus(choice);
    window.dispatchEvent(
      new CustomEvent<ConsentStatus>('mage-cookie-consent', {
        detail: choice,
      }),
    );
    setVisible(false);
  };

  if (!visible || status) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 max-w-md w-auto sm:w-[420px] bg-[#111923]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* linha decorativa */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />

      <div className="flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center relative">
          <ShieldCheck size={20} />
          <span className="absolute inset-0 rounded-xl bg-blue-500/5 animate-ping opacity-75" />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">Controle de Cookies & Privacidade</h4>
            <button
              onClick={() => setVisible(false)}
              className="text-slate-500 hover:text-white"
              aria-label="Fechar aviso"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Usamos cookies para melhorar sua experiência […] Veja nossa{' '}
            <button
              onClick={() => {
                setActiveTab('privacidade');
                document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-blue-400 hover:underline font-medium"
            >
              Política de Privacidade
            </button>.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => saveAndDispatch('declined')}
              className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white text-[11px]"
            >
              Recusar
            </button>
            <button
              onClick={() => saveAndDispatch('accepted')}
              className="px-4 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500 hover:text-white text-[11px] font-semibold"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Componente auxiliar de escuta rodando no cliente */
export function CookieEventListener() {
  useEffect(() => {
    const handler = (e: CustomEvent<'accepted' | 'declined'>) => {
      console.log('cookie choice:', e.detail); // plug analytics aqui
    };
    window.addEventListener('mage-cookie-consent', handler as any);
    return () => window.removeEventListener('mage-cookie-consent', handler as any);
  }, []);
  return null;
}
