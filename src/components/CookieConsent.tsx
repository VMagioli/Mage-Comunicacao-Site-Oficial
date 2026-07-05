import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieConsentProps {
  setActiveTab: (tab: string) => void;
}

export function CookieConsent({ setActiveTab }: CookieConsentProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('mage-cookie-consent');
    if (!consent) {
      // Small delay to make entry transition look amazing
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mage-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('mage-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 max-w-md w-auto sm:w-[420px] bg-[#111923]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-5 duration-500">
      
      {/* Decorative colored glow on top edge */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>

      <div className="flex items-start gap-4">
        {/* Shield icon with pulsing effect */}
        <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center relative">
          <ShieldCheck size={20} />
          <span className="absolute inset-0 rounded-xl bg-blue-500/5 animate-ping opacity-75"></span>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white tracking-wide">Controle de Cookies & Privacidade</h4>
            <button 
              onClick={() => setVisible(false)}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar aviso"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Usamos cookies para melhorar sua experiência de navegação, analisar estatísticas anônimas de tráfego e salvar suas preferências de interface (como o estado do menu). Ao continuar, você concorda com nossos termos. Veja nossa{' '}
            <button 
              onClick={() => {
                setActiveTab('privacidade');
                document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-blue-400 hover:underline hover:text-blue-300 font-medium cursor-pointer"
            >
              Política de Privacidade
            </button>.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleDecline}
              className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-[11px] font-medium transition-all cursor-pointer"
            >
              Recusar
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500 hover:text-white hover:border-blue-400 text-[11px] font-semibold tracking-wide transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
