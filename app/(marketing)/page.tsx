"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Sidebar } from '@/src/components/Sidebar';
import { TopBar } from '@/src/components/TopBar';
import { Hero } from '@/src/components/Hero';
import { ServicesGrid } from '@/src/components/ServicesGrid';
import { BottomGrid } from '@/src/components/BottomGrid';

// Dynamic/Lazy loaded subpages and components
const PortfolioGrid = dynamic(() => import('@/src/components/PortfolioGrid').then(mod => mod.PortfolioGrid), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/[0.02] rounded-2xl border border-white/5" />
});

const ServicesPage = dynamic(() => import('@/src/components/ServicesPage').then(mod => mod.ServicesPage), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/[0.02] rounded-2xl border border-white/5" />
});

const ProcessesPage = dynamic(() => import('@/src/components/ProcessesPage').then(mod => mod.ProcessesPage), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/[0.02] rounded-2xl border border-white/5" />
});

const AboutPage = dynamic(() => import('@/src/components/AboutPage').then(mod => mod.AboutPage), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/[0.02] rounded-2xl border border-white/5" />
});

const ContactPage = dynamic(() => import('@/src/components/ContactPage').then(mod => mod.ContactPage), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/[0.02] rounded-2xl border border-white/5" />
});

const PrivacyPolicyPage = dynamic(() => import('@/src/components/PrivacyPolicyPage').then(mod => mod.PrivacyPolicyPage));
const TermsPage = dynamic(() => import('@/src/components/TermsPage').then(mod => mod.TermsPage));

// Import Global Footer and Cookie Consent
import { Footer } from '@/src/components/Footer';
import { CookieConsent } from '@/src/components/CookieConsent';
import { FaqSection } from '@/src/components/seo/FaqSection';
import { GeoComparisonTable } from '@/src/components/seo/GeoComparisonTable';

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('web');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Only access localStorage on client-side
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#0B0F14]">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-image.png"
          alt="Atmospheric Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F14]/20 to-[#0B0F14]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/90 via-[#0B0F14]/30 to-transparent"></div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10">
        <div className="max-w-6xl w-full mx-auto flex flex-col min-h-full">
          <TopBar onMenuToggle={() => setIsMobileMenuOpen(true)} />
          
          {/* Dynamic Content Switching */}
          {activeTab === 'inicio' && (
            <>
              <Hero setActiveTab={setActiveTab} />
              <ServicesGrid setActiveTab={setActiveTab} />
              <GeoComparisonTable />
              <FaqSection />
              <BottomGrid />
            </>
          )}

          {activeTab === 'projetos' && (
            <PortfolioGrid />
          )}

          {activeTab === 'servicos' && (
            <ServicesPage setActiveTab={setActiveTab} setSelectedProjectType={setSelectedProjectType} />
          )}

          {activeTab === 'processos' && (
            <ProcessesPage />
          )}

          {activeTab === 'sobre' && (
            <AboutPage />
          )}

          {activeTab === 'contato' && (
            <ContactPage defaultProjectType={selectedProjectType} />
          )}

          {activeTab === 'privacidade' && (
            <PrivacyPolicyPage />
          )}

          {activeTab === 'termos' && (
            <TermsPage />
          )}

          <div className="flex-grow"></div>
          <Footer setActiveTab={setActiveTab} />
        </div>
      </main>

      {/* Cookie Consent Toast */}
      <CookieConsent setActiveTab={setActiveTab} />
    </div>
  );
}
