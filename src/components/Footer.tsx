import React, { useState } from 'react';
import { Instagram, Linkedin, HelpCircle } from 'lucide-react';
import { FaqSection } from '@/src/components/seo/FaqSection';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);

  return (
    <>
      <footer className="mt-auto py-8 px-4 md:px-8 border-t border-white/5 bg-[#0B0F14]/40 backdrop-blur-sm relative z-20">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Side: Copyright */}
          <div className="text-[11px] font-mono text-slate-500 tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} MAGE COMUNICAÇÃO. TODOS OS DIREITOS RESERVADOS.
          </div>

          {/* Center Side: Social Networks */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/magecomunicacao/"
              className="text-slate-500 hover:text-white p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da MAGE"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://linkedin.com/"
              className="text-slate-500 hover:text-white p-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn da MAGE"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Right Side: Links */}
          <div className="flex items-center gap-5 sm:gap-6 text-[11px] font-mono flex-wrap justify-center">
            <button 
              onClick={() => setIsFaqOpen(true)}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <HelpCircle size={13} className="text-slate-500" />
              <span>FAQ / Dúvidas</span>
            </button>

            <button 
              onClick={() => {
                setActiveTab('privacidade');
                // Smooth scroll to top of main container when changing tab
                document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('termos');
                document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </footer>

      {/* Floating FAQ Drawer */}
      <FaqSection isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </>
  );
}

