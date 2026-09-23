import React from "react";
import Image from "next/image";

const WHATSAPP_PERINATAL =
  "https://wa.me/5566996598423?text=Ol%C3%A1%2C%20Rosim%C3%A9ry.%20Gostaria%20de%20saber%20mais%20sobre%20psicologia%20obst%C3%A9trica%20e%20perinatal.";

const SPECIALTY_ITEMS = [
  { number: "01", text: "Acolhimento emocional durante a gestação" },
  { number: "02", text: "Preparação emocional para o parto" },
  { number: "03", text: "Cuidado no puerpério e na maternidade" },
];

export default function PerinatalSection() {
  return (
    <section className="identidade-section identidade-perinatal" id="especialidade">
      <div className="identidade-container identidade-perinatal-grid">
        <div className="identidade-perinatal-copy identidade-reveal">
          <p className="identidade-eyebrow identidade-eyebrow-light">
            Psicologia obstétrica e perinatal
          </p>
          <h2>Cuidar de quem está vivendo a transformação.</h2>
          <p>
            Gestação, parto, pós-parto e maternidade podem reunir alegria, medo, culpa, dúvidas e
            mudanças profundas. Ter um espaço seguro para falar sobre tudo isso também é uma forma de
            cuidado.
          </p>

          <div className="identidade-specialty-list">
            {SPECIALTY_ITEMS.map((item) => (
              <div key={item.number}>
                <span>{item.number}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <a
            className="identidade-button identidade-button-light"
            href={WHATSAPP_PERINATAL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conversar sobre este cuidado <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="identidade-perinatal-media identidade-reveal">
          <Image
            src="/assets/site-obstetrica/rosimery-obstetrica.jpg"
            alt="Rosiméry Tomasi estudando temas de psicologia obstétrica"
            width={1536}
            height={2048}
            loading="lazy"
          />
          <blockquote>“Cuidar da saúde emocional também faz parte deste novo ciclo.”</blockquote>
        </div>
      </div>
    </section>
  );
}
