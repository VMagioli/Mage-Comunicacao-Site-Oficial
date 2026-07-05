import React, { useState, useEffect } from 'react';
import { Bell, Menu } from 'lucide-react';

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

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
        <span className="text-xs md:text-sm font-mono text-slate-400">{time || '00:00 AM'}</span>
        <button className="relative text-slate-400 hover:text-white transition-colors cursor-pointer">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500 border border-[#0B0F14]"></span>
        </button>
      </div>
    </header>
  );
}

