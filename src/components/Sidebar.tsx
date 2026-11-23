"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, Layers, BookOpen, Users, Mail, ChevronLeft, ChevronRight, X, Instagram, Facebook } from 'lucide-react';
import { ThreadsIcon } from '@/src/components/icons/ThreadsIcon';

const NAV_ITEMS = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/projetos', label: 'Projetos', icon: Folder },
  { href: '/servicos', label: 'Serviços', icon: Layers },
  { href: '/conteudos', label: 'Conteúdos', icon: BookOpen },
  { href: '/sobre', label: 'Sobre nós', icon: Users },
  { href: '/contato', label: 'Contato', icon: Mail },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Navegação principal"
      className={`fixed inset-y-0 left-0 z-50 lg:static flex flex-col justify-between py-8 px-5 shrink-0 bg-[#0B0F14]/95 border-r border-white/5 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-64 lg:w-[76px]' : 'w-64'} 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Collapse Toggle Button (Desktop only) */}
      <button
        type="button"
        onClick={setIsCollapsed}
        className="hidden lg:flex absolute top-8 -right-3 w-6 h-6 rounded-full bg-[#111923] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white items-center justify-center transition-all duration-300 cursor-pointer z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Close button (Mobile only) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(false)}
        className="lg:hidden absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
        aria-label="Fechar menu"
      >
        <X size={18} />
      </button>

      <div>
        {/* Logo */}
        <div className={`mb-14 px-2 transition-all duration-300 ${isCollapsed ? 'lg:text-center' : ''}`}>
          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            aria-label="MAGE Comunicação - Ir para o início"
            className="inline-block"
          >
            {isCollapsed ? (
              <>
                <span className="hidden lg:block text-2xl font-bold tracking-wider text-blue-400 select-none animate-pulse">
                  M
                </span>
                <span className="lg:hidden text-2xl font-bold tracking-[0.3em] text-white select-none">
                  MAGE
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold tracking-[0.3em] text-white select-none">
                MAGE
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-2" aria-label="Menu do site">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center rounded-lg transition-all duration-300 cursor-pointer ${
                  isCollapsed ? 'justify-start gap-3 px-3 py-2.5 lg:justify-center lg:p-2.5' : 'gap-3 px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
                <span
                  className={`text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
                    isCollapsed ? 'lg:hidden' : ''
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Status */}
      <div
        className={`mt-8 pt-6 border-t border-white/5 px-2 transition-all duration-300 ${
          isCollapsed ? 'lg:flex lg:flex-col lg:items-center' : ''
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <span
            className={`text-xs font-mono text-emerald-400 tracking-wider uppercase whitespace-nowrap ${
              isCollapsed ? 'lg:hidden' : ''
            }`}
          >
            Sistema online
          </span>
        </div>

        {/* Visual Frequency Indicator */}
        <div
          aria-hidden="true"
          className={`flex items-end gap-[2px] h-6 opacity-35 mb-4 ${isCollapsed ? 'lg:hidden' : ''}`}
        >
          {[40, 70, 45, 90, 65, 30, 80, 50, 85, 35, 60, 40].map((height, i) => (
            <div
              key={i}
              className="w-1 bg-emerald-400 rounded-t-sm"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Redes Sociais */}
        <div
          className={`flex items-center gap-4 ${
            isCollapsed ? 'justify-start mt-4 lg:flex-col lg:gap-3 lg:mt-2' : 'justify-start mt-4'
          }`}
        >
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
            href="https://www.threads.com/@magecomunicacao"
            className="text-slate-400 hover:text-white p-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads da MAGE"
          >
            <ThreadsIcon size={18} />
          </a>
          <a
            href="https://www.facebook.com/magecomunicacao"
            className="text-slate-400 hover:text-white p-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook da MAGE"
          >
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </aside>
  );
}
