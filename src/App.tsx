import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { PortfolioGrid } from './components/PortfolioGrid';
import { BottomGrid } from './components/BottomGrid';

// Import New Pages
import { ServicesPage } from './components/ServicesPage';
import { ProcessesPage } from './components/ProcessesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';

// Import Global Footer and Cookie Consent
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
        <img
          src="/background-image.png"
          alt="Atmospheric Background"
          className="absolute inset-0 w-full h-full object-cover"
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
              <Hero />
              <ServicesGrid setActiveTab={setActiveTab} />
            </>
          )}

          {activeTab === 'projetos' && (
            <PortfolioGrid />
          )}

          {activeTab === 'servicos' && (
            <ServicesPage />
          )}

          {activeTab === 'processos' && (
            <ProcessesPage />
          )}

          {activeTab === 'sobre' && (
            <AboutPage />
          )}

          {activeTab === 'contato' && (
            <ContactPage />
          )}

          {activeTab === 'privacidade' && (
            <PrivacyPolicyPage />
          )}

          {activeTab === 'termos' && (
            <TermsPage />
          )}

          <div className="flex-grow"></div>
          <BottomGrid />
          <Footer setActiveTab={setActiveTab} />
        </div>
      </main>

      {/* Cookie Consent Toast */}
      <CookieConsent setActiveTab={setActiveTab} />
    </div>
  );
}



