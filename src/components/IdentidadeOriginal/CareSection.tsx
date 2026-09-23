import React from "react";
import Image from "next/image";

const WHATSAPP_CARE =
  "https://wa.me/5566996598423?text=Ol%C3%A1%2C%20Rosim%C3%A9ry.%20Quero%20entender%20como%20funciona%20o%20atendimento.";

const CARE_POINTS = [
  "Atendimento acolhedor e individualizado",
  "Escuta sem julgamentos",
  "Respeito ao seu tempo e à sua singularidade",
  "Sessões presenciais ou online",
];

export default function CareSection() {
  return (
    <section className="identidade-section identidade-care-section">
      <div className="identidade-container identidade-care-grid">
        <div className="identidade-care-image identidade-reveal">
          <Image
            src="/assets/site-obstetrica/rosimery-profissional.jpg"
            alt="Rosiméry Tomasi em seu ambiente de atendimento"
            width={1540}
            height={2048}
            loading="lazy"
          />
          <div className="identidade-image-caption">
            Um espaço de presença e respeito pela sua história.
          </div>
        </div>

        <div className="identidade-care-copy identidade-reveal">
          <p className="identidade-eyebrow">Psicoterapia individual</p>
          <h2>Você não precisa chegar à terapia sabendo explicar tudo.</h2>
          <p>
            A psicoterapia é um processo construído com tempo, confiança e escuta. Juntas, podemos
            compreender o que você está vivendo e encontrar formas mais possíveis de se relacionar
            consigo e com a sua história.
          </p>

          <ul className="identidade-check-list">
            {CARE_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <a
            className="identidade-button identidade-button-outline"
            href={WHATSAPP_CARE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Entender como funciona <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
