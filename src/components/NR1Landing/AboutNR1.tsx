import React from 'react';

export default function AboutNR1() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12 border-y border-[#C29F62]/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          {/* Replace with Rosimery's actual photo optimized for web */}
          <div className="w-full max-w-sm aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative shadow-2xl">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
               <span className="text-sm">Foto Profissional (Rosiméry)</span>
             </div>
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A3B39] to-transparent p-6">
                <p className="text-[#F5F2E9] font-bold text-xl">Rosiméry Ap. dos Santos Tomasi</p>
                <p className="text-[#C29F62] text-sm">Psicóloga & Especialista em NR-1</p>
             </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3B39] mb-6">Por que adequar o PGR da sua empresa à Saúde Mental?</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            A inclusão dos riscos psicossociais na NR-1 não é apenas uma obrigação legal, mas uma necessidade para a sustentabilidade dos negócios.
            O adoecimento mental (como Burnout e Depressão) é uma das maiores causas de afastamento do trabalho e processos trabalhistas na atualidade.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Como <strong>Psicóloga Organizacional e Implementadora da NR-1</strong>, meu papel é auxiliar pequenas, médias e grandes empresas a criar ambientes de trabalho seguros psicologicamente, protegendo o bem-estar dos colaboradores e a saúde financeira e jurídica do negócio.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-[#C29F62] mr-3 mt-1 text-xl">✔</span>
              <span className="text-gray-800 font-medium">Prevenção de processos trabalhistas por assédio ou Burnout.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#C29F62] mr-3 mt-1 text-xl">✔</span>
              <span className="text-gray-800 font-medium">Atendimento a exigências do eSocial e Ministério do Trabalho.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#C29F62] mr-3 mt-1 text-xl">✔</span>
              <span className="text-gray-800 font-medium">Aumento de produtividade e redução de faltas (absenteísmo).</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
