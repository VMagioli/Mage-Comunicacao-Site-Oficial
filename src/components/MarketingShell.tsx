"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/src/components/Sidebar';
import { TopBar } from '@/src/components/TopBar';
import { Footer } from '@/src/components/Footer';
import { CookieConsent } from '@/src/components/CookieConsent';

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') {
      setIsSidebarCollapsed(true);
    }
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined' && !window.location.hash) {
      mainRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#0B0F14]">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Image
          src="/background-image.webp"
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F14]/20 to-[#0B0F14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/90 via-[#0B0F14]/30 to-transparent" />
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      <main
        ref={mainRef}
        className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 scroll-smooth"
      >
        <div className="max-w-6xl w-full mx-auto flex flex-col min-h-full">
          <TopBar onMenuToggle={() => setIsMobileMenuOpen(true)} />
          {children}
          <div className="flex-grow" />
          <Footer />
        </div>
      </main>

      <CookieConsent />
    </div>
  );
}

