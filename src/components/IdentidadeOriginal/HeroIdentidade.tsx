"use client";

import React from "react";
import Image from "next/image";

const WHATSAPP_HERO =
  "https://wa.me/5566996598423?text=Ol%C3%A1%2C%20Rosim%C3%A9ry.%20Gostaria%20de%20conversar%20sobre%20a%20psicoterapia.";

export default function HeroIdentidade() {
  const handleScrollToAtendimento = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("atendimento");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#atendimento");
    }
  };

  return (
    <section className="identidade-hero identidade-section-soft">
      <div className="identidade-container identidade-hero-grid">
        <div className="identidade-hero-copy identidade-reveal">
          <p className="identidade-eyebrow">
            Psicóloga clínica e obstétrica
            <span className="identidade-eyebrow-divider" aria-hidden="true"></span>
            CRP 18/06601
          </p>
          <h1>
            Há fases da vida que pedem <em>mais acolhimento.</em>
          </h1>
          <p className="identidade-hero-lead">
            Um espaço seguro para compreender o que você sente, cuidar da sua saúde emocional e
            atravessar mudanças com mais consciência e gentileza.
          </p>
          <div className="identidade-hero-actions">
            <a
              className="identidade-button"
              href={WHATSAPP_HERO}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero conversar <span aria-hidden="true">→</span>
            </a>
            <a
              className="identidade-text-link"
              href="#atendimento"
              onClick={handleScrollToAtendimento}
            >
              Conhecer o atendimento <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="identidade-location-note">
            <span className="identidade-location-dot" aria-hidden="true"></span>
            <span>Atendimento presencial em Primavera do Leste/MT e online</span>
          </div>
        </div>

        <div className="identidade-hero-media identidade-reveal">
          <div className="identidade-hero-arch">
            <Image
              src="/assets/site-obstetrica/rosimery-hero.jpg"
              alt="Rosiméry Tomasi sentada em uma poltrona lendo"
              fill
              priority
              sizes="(max-width: 840px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "48% 28%" }}
            />
          </div>
          <div className="identidade-hero-seal">
            <Image
              src="/assets/site-obstetrica/logo-mark.png"
              alt=""
              width={62}
              height={62}
              aria-hidden="true"
            />
            <p>
              <strong>Escuta, vínculo e cuidado</strong>
              <span>para o seu momento</span>
            </p>
          </div>
          <div className="identidade-gold-line" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
