import React from "react";

const WHATSAPP_FLOAT_URL =
  "https://wa.me/5566996598423?text=Ol%C3%A1%2C%20Rosim%C3%A9ry.%20Gostaria%20de%20saber%20mais%20sobre%20o%20atendimento.";

export default function WhatsAppFloat() {
  return (
    <a
      className="identidade-whatsapp-float"
      href={WHATSAPP_FLOAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Rosiméry pelo WhatsApp"
    >
      <span aria-hidden="true">↗</span>
      <strong>Conversar</strong>
    </a>
  );
}
