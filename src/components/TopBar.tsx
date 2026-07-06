import React, { useState, useEffect } from 'react';
import { Menu, Instagram, Linkedin, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const router = useRouter();
  const [time, setTime] = useState<string>('');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleClientAreaClick = () => {
    if (session) {
      router.push('/portal');
    } else {
      router.push('/login');
    }
  };

  return (
    <header className="flex items-center justify-between py-4 px-4 md:py-6 md:px-8 relative z-20 gap-4">
      <div className="flex items-center gap-2">
        {/* Menu toggle button for mobile */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden text-slate-400 hover:text-white p-2 border border-white/5 hover:border-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>

        {/* Connectivity badge */}
        <div className="flex items-center gap-2 md:gap-3 bg-white/5 border border-white/5 rounded-full pl-2.5 pr-3.5 py-1.5 md:pl-3 md:pr-5 md:py-2 backdrop-blur-sm overflow-hidden">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0"></div>
          <span className="text-[10px] md:text-xs font-mono text-slate-300 truncate max-w-[150px] sm:max-w-xs md:max-w-none">
            Conectando ideias. Criando experiências.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        {/* Social Icons */}
        <div className="flex items-center gap-3 mr-2">
          <a 
            href="https://www.instagram.com/magecomunicacao/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Instagram da MAGE"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="LinkedIn da MAGE"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <span className="text-xs md:text-sm font-mono text-slate-400">{time || '00:00 AM'}</span>
        <button 
          onClick={handleClientAreaClick}
          className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 hover:text-blue-200 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <User size={14} className="text-blue-400" />
          <span className="hidden sm:inline">{session ? 'Ir para o Portal' : 'Área do Cliente'}</span>
          <span className="sm:hidden">{session ? 'Portal' : 'Login'}</span>
        </button>
      </div>
    </header>
  );
}


