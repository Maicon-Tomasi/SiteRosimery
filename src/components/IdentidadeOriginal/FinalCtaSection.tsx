import React from "react";
import Image from "next/image";

const WHATSAPP_CTA =
  "https://wa.me/5566996598423?text=Ol%C3%A1%2C%20Rosim%C3%A9ry.%20Gostaria%20de%20agendar%20uma%20conversa.";

export default function FinalCtaSection() {
  return (
    <section className="identidade-final-cta">
      <div className="identidade-container">
        <div className="identidade-final-cta-inner identidade-reveal">
          <Image
            src="/assets/site-obstetrica/logo-mark.png"
            alt=""
            width={90}
            height={90}
            aria-hidden="true"
          />
          <p className="identidade-eyebrow" style={{ justifyContent: "center" }}>
            Seu próximo passo
          </p>
          <h2>Talvez este seja o momento de olhar para você.</h2>
          <p>
            Você não precisa esperar chegar ao limite para procurar ajuda. Se fizer sentido, podemos
            começar conversando.
          </p>
          <a
            className="identidade-button"
            href={WHATSAPP_CTA}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar pelo WhatsApp <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
