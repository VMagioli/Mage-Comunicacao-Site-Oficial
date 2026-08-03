import React from 'react';
import { Home, Folder, Layers, Activity, Users, Mail, ChevronLeft, ChevronRight, X, Instagram, Linkedin } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Início', icon: Home },
  { id: 'projetos', label: 'Projetos', icon: Folder },
  { id: 'servicos', label: 'Serviços', icon: Layers },
  { id: 'processos', label: 'Processos', icon: Activity },
  { id: 'sobre', label: 'Sobre nós', icon: Users },
  { id: 'contato', label: 'Contato', icon: Mail },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}: SidebarProps) {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 lg:static flex flex-col justify-between py-8 px-5 shrink-0 bg-[#0B0F14]/95 lg:bg-[#0B0F14]/80 backdrop-blur-md border-r border-white/5 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-64 lg:w-[76px]' : 'w-64'} 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Collapse Toggle Button (Desktop only) */}
      <button
        onClick={setIsCollapsed}
        className="hidden lg:flex absolute top-8 -right-3 w-6 h-6 rounded-full bg-[#111923] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white items-center justify-center transition-all duration-300 cursor-pointer z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Close button (Mobile only) */}
      <button
        onClick={() => setIsMobileOpen(false)}
        className="lg:hidden absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
        aria-label="Fechar menu"
      >
        <X size={18} />
      </button>

      <div>
        {/* Logo */}
        <div className={`mb-14 px-2 transition-all duration-300 ${isCollapsed ? 'lg:text-center' : ''}`}>
          {isCollapsed ? (
            <>
              <div className="hidden lg:block text-2xl font-bold tracking-wider text-blue-400 select-none animate-pulse">M</div>
              <div className="lg:hidden text-2xl font-bold tracking-[0.3em] text-white select-none">MAGE</div>
            </>
          ) : (
            <div className="text-2xl font-bold tracking-[0.3em] text-white select-none">MAGE</div>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false); // Auto close on mobile click
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-lg transition-all duration-300 cursor-pointer ${
                  isCollapsed ? 'justify-start gap-3 px-3 py-2.5 lg:justify-center lg:p-2.5' : 'gap-3 px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
                <span className={`text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
                  isCollapsed ? 'lg:hidden' : ''
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Status */}
      <div className={`mt-8 pt-6 border-t border-white/5 px-2 transition-all duration-300 ${isCollapsed ? 'lg:flex lg:flex-col lg:items-center' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className={`text-xs font-mono text-emerald-500/80 tracking-wider uppercase whitespace-nowrap ${
            isCollapsed ? 'lg:hidden' : ''
          }`}>
            Sistema online
          </span>
        </div>
        
        {/* Fake Sound Wave / Frequency chart */}
        <div className={`flex items-end gap-[2px] h-6 opacity-30 mb-4 ${isCollapsed ? 'lg:hidden' : ''}`}>
          {[40, 70, 45, 90, 65, 30, 80, 50, 85, 35, 60, 40].map((height, i) => (
            <div 
              key={i} 
              className="w-1 bg-emerald-400 rounded-t-sm transition-all duration-500 animate-pulse" 
              style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>

        {/* Redes Sociais */}
        <div className={`flex items-center gap-4 ${isCollapsed ? 'justify-start mt-4 lg:flex-col lg:gap-3 lg:mt-2' : 'justify-start mt-4'}`}>
          <a
            href="https://www.instagram.com/magecomunicacao/"
            className="text-slate-500 hover:text-white p-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da MAGE"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://linkedin.com/"
            className="text-slate-500 hover:text-white p-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn da MAGE"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </aside>
  );
}

