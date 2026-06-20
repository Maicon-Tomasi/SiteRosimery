import React from 'react';

export default function FooterNR1() {
  return (
    <footer className="bg-[#0f2423] text-gray-300 py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-[#C29F62] font-bold text-lg mb-4">Psicóloga Rosiméry</h4>
          <p className="text-sm">
            Especialista em Psicologia Organizacional e Implementação da NR-1 com foco em Riscos Psicossociais.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Contato</h4>
          <p className="text-sm">contato@psicologarosimery.com.br</p>
          <p className="text-sm">Siga no Instagram: <a href="https://instagram.com/rosimery_implementadoranr1" className="text-[#C29F62] hover:underline">@rosimery_implementadoranr1</a></p>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
          <p className="text-sm">
            <a href="/p-8f2c-policy" className="hover:text-white transition-colors">Política de Privacidade</a>
          </p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
