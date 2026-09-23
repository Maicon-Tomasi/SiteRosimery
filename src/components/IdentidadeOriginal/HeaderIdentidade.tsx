"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/5566996598423?text=Ol%C3%A1%2C%20Rosim%C3%A9ry.%20Gostaria%20de%20saber%20mais%20sobre%20o%20atendimento.";

export default function HeaderIdentidade() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    const handleResize = () => {
      if (window.innerWidth > 840) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`identidade-header ${isScrolled ? "scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}
      id="inicio"
    >
      <div className="identidade-container identidade-nav-shell">
        <Link href="#inicio" className="identidade-brand" aria-label="Rosiméry Tomasi — início" onClick={closeMenu}>
          <Image
            src="/assets/site-obstetrica/logo-assinatura.png"
            alt="Rosiméry Aparecida dos Santos Tomasi"
            width={268}
            height={78}
            priority
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Link>

        <button
          className="identidade-menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`identidade-main-menu ${menuOpen ? "open" : ""}`}
          id="main-menu"
          aria-label="Navegação principal"
        >
          <a href="#atendimento" onClick={closeMenu}>
            Atendimento
          </a>
          <a href="#especialidade" onClick={closeMenu}>
            Especialidade
          </a>
          <a href="#sobre" onClick={closeMenu}>
            Sobre
          </a>
          <a href="#duvidas" onClick={closeMenu}>
            Dúvidas
          </a>
          <a
            className="identidade-button identidade-button-small"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Agendar conversa
          </a>
        </nav>
      </div>
    </header>
  );
}
