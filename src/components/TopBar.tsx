import React, { useState, useEffect } from 'react';
import { Menu, Instagram, Linkedin, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';

interface TopBarProps {
  onMenuToggle: () => void;
  /** Sessão já resolvida pelo Server Component pai */
  userSession?: Session | null;
}

export function TopBar({ onMenuToggle, userSession = null }: TopBarProps) {
  const router = useRouter();
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  );

  /* ───────────────── relógio “vivo” ───────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClientAreaClick = () => {
    router.push(userSession ? '/portal' : '/login');
  };

  return (
    <header className="flex items-center justify-between py-4 px-4 md:py-6 md:px-8 gap-4 relative z-20">
      <div className="flex items-center gap-2">
        {/* Botão de menu mobile */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-slate-400 hover:text-white p-2 border border-white/5 hover:border-white/10 rounded-lg transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>

        {/* Badge */}
        <div className="flex items-center gap-2 md:gap-3 bg-white/5 border border-white/5 rounded-full pl-2.5 pr-3.5 py-1.5 md:pl-3 md:pr-5 md:py-2 backdrop-blur-sm overflow-hidden">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] md:text-xs font-mono text-slate-300 truncate max-w-[150px] sm:max-w-xs">
            Conectando ideias. Criando experiências.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        {/* Redes sociais */}
        <div className="flex items-center gap-3 mr-2">
          <a
            href="https://www.instagram.com/magecomunicacao/"
            className="text-slate-400 hover:text-white p-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da MAGE"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://linkedin.com/"
            className="text-slate-400 hover:text-white p-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn da MAGE"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <span className="text-xs md:text-sm font-mono text-slate-400">{time}</span>

        <button
          onClick={handleClientAreaClick}
          className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 hover:text-blue-200 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2"
        >
          <User size={14} className="text-blue-400" />
          <span className="hidden sm:inline">
            {userSession ? 'Ir para o Portal' : 'Área do Cliente'}
          </span>
          <span className="sm:hidden">{userSession ? 'Portal' : 'Login'}</span>
        </button>
      </div>
    </header>
  );
}
