import React from "react";
import Image from "next/image";

const WHATSAPP_ABOUT =
  "https://wa.me/5566996598423?text=Ol%C3%A1%2C%20Rosim%C3%A9ry.%20Gostaria%20de%20agendar%20uma%20conversa.";

const CREDENTIALS = [
  { title: "Psicóloga clínica", subtitle: "CRP 18/06601" },
  { title: "Psicologia obstétrica", subtitle: "Cuidado no ciclo gravídico-puerperal" },
  { title: "Atendimento presencial", subtitle: "Primavera do Leste/MT" },
  { title: "Atendimento online", subtitle: "Mais flexibilidade para a sua rotina" },
];

export default function AboutSection() {
  return (
    <section className="identidade-section identidade-about" id="sobre">
      <div className="identidade-container identidade-about-grid">
        <div className="identidade-about-media identidade-reveal">
          <div className="identidade-about-shape" aria-hidden="true"></div>
          <Image
            src="/assets/site-obstetrica/rosimery-sobre.jpg"
            alt="Rosiméry Tomasi sorrindo"
            width={1536}
            height={2048}
            loading="lazy"
          />
          <Image
            className="identidade-about-mark"
            src="/assets/site-obstetrica/logo-mark.png"
            alt=""
            width={135}
            height={135}
            aria-hidden="true"
          />
        </div>

        <div className="identidade-about-copy identidade-reveal">
          <p className="identidade-eyebrow">Prazer, eu sou a Rosiméry</p>
          <h2>Antes de qualquer técnica, existe uma pessoa diante de outra pessoa.</h2>
          <p>
            Meu trabalho é oferecer um espaço de escuta respeitosa, acolhimento e reflexão para que
            você compreenda melhor o que está vivendo e construa caminhos possíveis.
          </p>
          <p>
            Minha trajetória inclui formação e atuação voltadas à saúde emocional da mulher, com
            atenção especial às experiências da gestação, parto, puerpério e maternidade.
          </p>

          <div className="identidade-credentials">
            {CREDENTIALS.map((cred) => (
              <div key={cred.title}>
                <strong>{cred.title}</strong>
                <span>{cred.subtitle}</span>
              </div>
            ))}
          </div>

          <a
            className="identidade-text-link identidade-text-link-rose"
            href={WHATSAPP_ABOUT}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com a Rosiméry <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
