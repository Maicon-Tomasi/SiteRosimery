import React from "react";

const STEPS = [
  {
    number: "01",
    title: "Você envia uma mensagem",
    description:
      "Conte, do seu jeito, o que está buscando. Não precisa preparar um texto ou saber explicar tudo.",
  },
  {
    number: "02",
    title: "Alinhamos os detalhes",
    description:
      "Conversamos sobre disponibilidade, modalidade e as informações necessárias para começar.",
  },
  {
    number: "03",
    title: "Iniciamos o processo",
    description:
      "Você passa a ter um espaço reservado para ser ouvida e olhar para si com mais cuidado.",
  },
];

export default function ProcessSection() {
  return (
    <section className="identidade-section identidade-process-section" id="processo">
      <div className="identidade-container identidade-process-heading identidade-reveal">
        <p className="identidade-eyebrow" style={{ justifyContent: "center" }}>
          O primeiro passo pode ser simples
        </p>
        <h2>Como funciona o atendimento?</h2>
      </div>

      <div className="identidade-container identidade-process-grid">
        {STEPS.map((step) => (
          <article className="identidade-process-card identidade-reveal" key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
