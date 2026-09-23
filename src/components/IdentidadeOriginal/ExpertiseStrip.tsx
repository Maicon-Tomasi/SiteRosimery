import React from "react";

const EXPERTISES = [
  {
    number: "01",
    title: "Psicologia clínica",
    subtitle: "Cuidado emocional individual",
  },
  {
    number: "02",
    title: "Saúde da mulher",
    subtitle: "Escuta para diferentes ciclos",
  },
  {
    number: "03",
    title: "Online e presencial",
    subtitle: "Um formato possível para você",
  },
];

export default function ExpertiseStrip() {
  return (
    <section className="identidade-expertise-strip" aria-label="Áreas de atuação">
      <div className="identidade-container identidade-expertise-grid">
        {EXPERTISES.map((item) => (
          <div key={item.number}>
            <span>{item.number}</span>
            <strong>{item.title}</strong>
            <small>{item.subtitle}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
