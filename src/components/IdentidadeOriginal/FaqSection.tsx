"use client";

import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "O atendimento pode ser online?",
    answer:
      "Sim. O atendimento online oferece mais flexibilidade e os detalhes são alinhados no primeiro contato.",
  },
  {
    question: "Onde acontece o atendimento presencial?",
    answer:
      "Em Primavera do Leste/MT. O endereço e as orientações são enviados após o agendamento.",
  },
  {
    question: "Preciso saber exatamente o que tenho?",
    answer:
      "Não. Você pode começar por aquilo que está difícil agora. Compreender o que acontece faz parte do processo.",
  },
  {
    question: "Como faço para agendar?",
    answer:
      "Use qualquer botão de WhatsApp desta página. A disponibilidade e os próximos passos serão combinados por lá.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="identidade-section identidade-faq-section" id="duvidas">
      <div className="identidade-container identidade-faq-grid">
        <div className="identidade-faq-heading">
          <p className="identidade-eyebrow">Antes de começar</p>
          <h2>Dúvidas frequentes</h2>
          <p>Se ainda restar alguma pergunta, você pode falar diretamente comigo pelo WhatsApp.</p>
        </div>

        <div className="identidade-faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`identidade-faq-item ${isOpen ? "open" : ""}`}
              >
                <button
                  className="identidade-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(index)}
                  style={{ cursor: "pointer", width: "100%" }}
                >
                  <span>{item.question}</span>
                  <span
                    className="identidade-faq-icon"
                    aria-hidden="true"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="identidade-faq-answer"
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden", minHeight: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        padding: "0 40px 24px 0",
                        color: "#545958",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        opacity: isOpen ? 1 : 0,
                        transition: "opacity 0.25s ease",
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
