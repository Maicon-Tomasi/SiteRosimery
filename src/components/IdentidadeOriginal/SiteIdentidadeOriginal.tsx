"use client";

import React from "react";
import "./identidade-original.css";
import { useReveal } from "./useReveal";
import HeaderIdentidade from "./HeaderIdentidade";
import HeroIdentidade from "./HeroIdentidade";
import ExpertiseStrip from "./ExpertiseStrip";
import ConcernsSection from "./ConcernsSection";
import CareSection from "./CareSection";
import PerinatalSection from "./PerinatalSection";
import AboutSection from "./AboutSection";
import ProcessSection from "./ProcessSection";
import FaqSection from "./FaqSection";
import FinalCtaSection from "./FinalCtaSection";
import FooterIdentidade from "./FooterIdentidade";
import WhatsAppFloat from "./WhatsAppFloat";

export default function SiteIdentidadeOriginal() {
  useReveal();

  return (
    <div className="identidade-original-root">
      <HeaderIdentidade />
      <main id="conteudo">
        <HeroIdentidade />
        <ExpertiseStrip />
        <ConcernsSection />
        <CareSection />
        <PerinatalSection />
        <AboutSection />
        <ProcessSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <FooterIdentidade />
      <WhatsAppFloat />
    </div>
  );
}
