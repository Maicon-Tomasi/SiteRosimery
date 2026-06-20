import React from 'react';

export default function HeroNR1() {
  return (
    <section className="relative bg-[#F5F2E9] py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A3B39] leading-tight mb-6">
            SUA EMPRESA É MEI, ME OU EPP?
            <span className="block text-[#C29F62] mt-2">A NR-1 TEM OPÇÕES SIMPLIFICADAS.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium">
            Entenda o que mudou e aproveite as facilidades. Proteja sua empresa de passivos trabalhistas 
            gerenciando corretamente os Riscos Psicossociais.
          </p>
          <a 
            href="#contato"
            className="inline-block bg-[#1A3B39] hover:bg-[#132c2a] text-[#F5F2E9] font-bold py-4 px-8 rounded shadow-lg transition-transform transform hover:-translate-y-1 duration-300 text-lg"
          >
            ENTENDA AS EXIGÊNCIAS PARA PEQUENAS EMPRESAS
          </a>
        </div>
        <div className="z-10 flex justify-center w-full">
          <div className="relative w-full max-w-md">
            {/* Decorative background elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#C29F62] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#1A3B39] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            
            {/* Main Premium Card */}
            <div className="relative bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(26,59,57,0.1)] border border-gray-100">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#1A3B39]/10 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#1A3B39]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A3B39]">Evite Multas e Processos</h3>
                  <p className="text-sm text-gray-500">Adequação simplificada para o seu negócio</p>
                </div>
              </div>
              
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 bg-[#C29F62]/10 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-[#C29F62]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fichas Orientativas (MEI)</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">Materiais prontos para orientação clara dos seus funcionários sobre os riscos no ambiente.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 bg-[#C29F62]/10 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-[#C29F62]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Declaração de Ausência de Riscos</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">Dispensa da elaboração completa do PGR caso sua empresa não apresente riscos específicos.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
