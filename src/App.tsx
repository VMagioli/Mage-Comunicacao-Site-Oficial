import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { BottomGrid } from './components/BottomGrid';

export default function App() {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#0B0F14]">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="/fotofront.png"
          alt="Atmospheric Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F14]/20 to-[#0B0F14]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/90 via-[#0B0F14]/30 to-transparent"></div>
      </div>

      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="max-w-6xl w-full mx-auto flex flex-col min-h-full">
          <TopBar />
          <Hero />
          <ServicesGrid />
          <div className="flex-grow"></div>
          <BottomGrid />
        </div>
      </main>
    </div>
  );
}

