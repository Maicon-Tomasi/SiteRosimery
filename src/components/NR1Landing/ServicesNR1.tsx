import React from 'react';

export default function ServicesNR1() {
  const services = [
    {
      title: "Mapeamento de Riscos Psicossociais",
      desc: "Identificamos fatores no ambiente de trabalho que podem causar estresse crônico, Burnout e outros prejuízos à saúde mental da sua equipe."
    },
    {
      title: "Consultoria em PGR",
      desc: "Ajudamos sua empresa a integrar os riscos psicossociais e de saúde mental no Programa de Gerenciamento de Riscos (PGR), garantindo conformidade com a NR-1."
    },
    {
      title: "Treinamento para Lideranças",
      desc: "Capacitamos gestores para identificar sinais de adoecimento emocional, agir preventivamente e promover um clima organizacional saudável."
    },
    {
      title: "Palestras e SIPAT",
      desc: "Intervenções de impacto sobre saúde mental no trabalho, segurança psicológica e bem-estar para engajar todos os colaboradores."
    }
  ];

  return (
    <section className="bg-[#1A3B39] text-[#F5F2E9] py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como podemos ajudar sua empresa?</h2>
          <p className="text-[#C29F62] text-lg font-medium max-w-2xl mx-auto">
            Soluções completas em Saúde Mental e Segurança do Trabalho para cumprimento da NR-1 e prevenção de passivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-[#F5F2E9] text-[#1A3B39] p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#C29F62]">
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
