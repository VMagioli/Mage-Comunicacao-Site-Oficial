import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export function TopBar() {
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
    <header className="flex items-center justify-between py-6 px-8 relative z-20">
      <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-full pl-3 pr-5 py-2 backdrop-blur-sm">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        <span className="text-xs font-mono text-slate-300">Conectando ideias. Criando experiências.</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm font-mono text-slate-400">{time || '00:00 AM'}</span>
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500 border border-[#0B0F14]"></span>
        </button>
      </div>
    </header>
  );
}
