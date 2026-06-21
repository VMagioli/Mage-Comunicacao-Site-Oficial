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
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=2400" 
          alt="Atmospheric Background" 
          className="w-full h-full object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/40 via-[#0B0F14]/80 to-[#0B0F14]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/80 to-transparent"></div>
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

