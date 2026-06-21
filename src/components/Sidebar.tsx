import React from 'react';
import { Home, Folder, Layers, Activity, Users, Mail, Activity as ActivityIcon } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Início', icon: Home, active: true },
  { label: 'Projetos', icon: Folder },
  { label: 'Serviços', icon: Layers },
  { label: 'Processos', icon: Activity },
  { label: 'Sobre nós', icon: Users },
  { label: 'Contato', icon: Mail },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-[#0B0F14]/80 backdrop-blur-md border-r border-white/5 flex flex-col justify-between py-8 px-6 shrink-0 relative z-20">
      <div>
        {/* Logo */}
        <div className="mb-14 px-2">
          <h1 className="text-2xl font-bold tracking-[0.3em] text-white">MAGE</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                  item.active
                    ? 'bg-blue-500/10 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={item.active ? 'text-blue-400' : 'text-slate-500'} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Footer / Status */}
      <div className="mt-8 pt-6 border-t border-white/5 px-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-mono text-emerald-500/80 tracking-wider uppercase">Sistema online</span>
        </div>
        
        {/* Fake Sound Wave / Frequency chart */}
        <div className="flex items-end gap-[2px] h-6 opacity-30">
          {[40, 70, 45, 90, 65, 30, 80, 50, 85, 35, 60, 40].map((height, i) => (
            <div 
              key={i} 
              className="w-1 bg-emerald-400 rounded-t-sm transition-all duration-500" 
              style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </aside>
  );
}
