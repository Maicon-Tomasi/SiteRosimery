import React from "react";

const CONCERNS = [
  {
    number: "01",
    title: "Ansiedade e pensamentos acelerados",
    description:
      "Quando as preocupações ocupam espaço demais e tornam difícil descansar, decidir ou estar presente.",
  },
  {
    number: "02",
    title: "Sobrecarga emocional",
    description:
      "Quando as responsabilidades se acumulam e parece não existir tempo ou espaço para cuidar de si.",
  },
  {
    number: "03",
    title: "Gestação, puerpério e maternidade",
    description:
      "Para acolher medos, expectativas, transformações e tudo aquilo que nem sempre encontra lugar para ser dito.",
  },
  {
    number: "04",
    title: "Mudanças e momentos difíceis",
    description:
      "Em fases de luto, conflitos, baixa autoestima ou quando você apenas sente que precisa de ajuda.",
  },
];

export default function ConcernsSection() {
  return (
    <section className="identidade-section identidade-identify" id="atendimento">
      <div className="identidade-container identidade-two-column-intro">
        <div className="identidade-section-heading identidade-reveal">
          <p className="identidade-eyebrow">Talvez você esteja aqui porque...</p>
          <h2>Algo dentro de você está pedindo atenção.</h2>
        </div>
        <div className="identidade-intro-copy identidade-reveal">
          <p>
            Nem sempre é fácil nomear o que sentimos. Às vezes, o primeiro passo é reconhecer que
            não precisamos lidar com tudo sozinhas.
          </p>
        </div>
      </div>

      <div className="identidade-container identidade-concerns-grid">
        {CONCERNS.map((item) => (
          <article className="identidade-concern-card identidade-reveal" key={item.number}>
            <span className="identidade-card-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
