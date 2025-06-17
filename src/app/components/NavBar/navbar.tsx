'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <header className="bg-white shadow-md px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo/logo.png" alt="Logo" className="h-15" />
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 text-[#dba952] font-medium">
          <Link href="/">Início</Link>
          <ScrollLink className='cursor-pointer' to="servicos" smooth={true} duration={500}>Serviços</ScrollLink>
          <ScrollLink className='cursor-pointer' to="especializacoes" smooth={true} duration={500}>Especializações</ScrollLink>
          <ScrollLink className='cursor-pointer' to="sobre" smooth={true} duration={500}>Sobre</ScrollLink>
          <ScrollLink className='cursor-pointer' to="contato" smooth={true} duration={500}>Contato</ScrollLink>
          <Link href="/Agenda">Agenda</Link>
        </nav>

        {/* Botão direito */}
        <div className="hidden md:block text-sm text-gray-900">
          <button className='bg-white border-2 border-[#dba952] text-[#dba952] px-4 py-2 rounded-full hover:bg-[#c9a34b] hover:text-white transition-colors duration-300'>
            Marque um horário
          </button>
        </div>

        {/* Menu mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6 text-[#dba952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <nav className="md:hidden flex flex-col gap-4 mt-2 text-[#dba952] font-medium px-4">
          <Link href="#">Início</Link>
          <Link href="#">Início</Link>
          <Link href="#">Início</Link>
          <Link href="#">Início</Link>
          <Link href="#">Início</Link>
          <span className="text-gray-900">Marque um horário</span>
        </nav>
      )}
    </header>
  );
}
