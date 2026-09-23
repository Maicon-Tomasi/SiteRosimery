import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FooterIdentidade() {
  return (
    <footer className="identidade-site-footer">
      <div className="identidade-container identidade-footer-grid">
        <div className="identidade-footer-brand">
          <Image
            src="/assets/site-obstetrica/logo-assinatura.png"
            alt="Rosiméry Aparecida dos Santos Tomasi"
            width={330}
            height={100}
            style={{ width: "auto", height: "auto", maxHeight: "100px", objectFit: "contain" }}
          />
          <p>Psicologia clínica e obstétrica com escuta, vínculo e cuidado emocional.</p>
        </div>

        <div>
          <h3>Atendimento</h3>
          <p>Presencial em Primavera do Leste/MT</p>
          <p>Online</p>
          <p>CRP 18/06601</p>
        </div>

        <div>
          <h3>Navegação</h3>
          <Link href="#atendimento">Atendimento</Link>
          <Link href="#especialidade">Especialidade</Link>
          <Link href="#sobre">Sobre</Link>
          <Link href="#duvidas">Dúvidas</Link>
        </div>

        <div>
          <h3>Contato</h3>
          <a href="https://wa.me/5566996598423" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <Link href="#inicio">Voltar ao início ↑</Link>
        </div>
      </div>

      <div className="identidade-container identidade-footer-bottom">
        <p>© 2026 Rosiméry Tomasi. Todos os direitos reservados.</p>
        <p>Psicóloga Clínica e Obstétrica</p>
      </div>
    </footer>
  );
}
