import React from 'react';

export default function HeaderNR1() {
  return (
    <header className="w-full bg-[#1A3B39] text-[#F5F2E9] py-4 px-6 md:px-12 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-bold tracking-wide">Rosiméry Ap. dos Santos Tomasi</span>
          <span className="text-xs md:text-sm text-[#C29F62] uppercase tracking-widest font-semibold">Implementadora de NR-1 & Saúde Mental</span>
        </div>
        <a 
          href="#contato"
          className="hidden md:inline-block bg-[#C29F62] hover:bg-[#b08d51] text-[#1A3B39] font-bold py-2 px-6 rounded transition-colors duration-300"
        >
          Falar com Especialista
        </a>
      </div>
    </header>
  );
}
