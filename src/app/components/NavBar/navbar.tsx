'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/main/siteObstetrica';
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const numeroWhatsApp = '5566996598423'; // Coloque o número da psicóloga aqui (sem + ou traços)
      const texto = `Olá, queria marcar uma consulta. Vim pelo seu site.`;
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank'); // Abre o WhatsApp em nova aba
  };

  const NavItem = ({ to, label }: { to: string, label: string }) => {
    if (isHome) {
      return (
        <ScrollLink className='cursor-pointer' to={to} smooth={true} duration={500}>
          {label}
        </ScrollLink>
      );
    }
    return (
      <Link href={`/main/siteObstetrica#${to}`}>
        {label}
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-md px-4 py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/main/siteObstetrica">
            <img src="/logo/logo.png" alt="Logo" className="h-15 cursor-pointer" />
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 text-[#dba952] font-medium items-center">
          <Link href="/main/siteObstetrica">Início</Link>
          <NavItem to="servicos" label="Serviços" />
          <NavItem to="especializacoes" label="Especializações" />
          <NavItem to="sobre" label="Sobre" />
          <NavItem to="contato" label="Contato" />
          <Link href="/main/blog" className={pathname.includes('/blog') ? 'font-bold underline' : ''}>
            Blog
          </Link>
        </nav>

        {/* Botão direito */}
        <div className="hidden md:block text-sm text-gray-900">
          <button onClick={handleSubmit} className='bg-white border-2 border-[#dba952] text-[#dba952] px-4 py-2 rounded-full hover:bg-[#c9a34b] hover:text-white transition-colors duration-300'>
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
        <nav className="md:hidden flex flex-col gap-4 mt-2 text-[#dba952] font-medium px-4 pb-4">
          <Link href="/main/siteObstetrica" onClick={() => setIsOpen(false)}>Início</Link>
          <div onClick={() => setIsOpen(false)}><NavItem to="servicos" label="Serviços" /></div>
          <div onClick={() => setIsOpen(false)}><NavItem to="especializacoes" label="Especializações" /></div>
          <div onClick={() => setIsOpen(false)}><NavItem to="sobre" label="Sobre" /></div>
          <div onClick={() => setIsOpen(false)}><NavItem to="contato" label="Contato" /></div>
          <Link href="/main/blog" onClick={() => setIsOpen(false)} className={pathname.includes('/blog') ? 'font-bold underline' : ''}>
            Blog
          </Link>
          <button onClick={(e) => { handleSubmit(e); setIsOpen(false); }} className='bg-white border-2 border-[#dba952] text-[#dba952] px-4 py-2 rounded-full hover:bg-[#c9a34b] hover:text-white transition-colors duration-300 w-full'>
            Marque um horário
          </button>
        </nav>
      )}
    </header>
  );
}
