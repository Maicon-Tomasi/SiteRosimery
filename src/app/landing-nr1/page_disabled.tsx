import React from 'react';
import HeaderNR1 from '@/components/NR1Landing/HeaderNR1';
import HeroNR1 from '@/components/NR1Landing/HeroNR1';
import AboutNR1 from '@/components/NR1Landing/AboutNR1';
import ServicesNR1 from '@/components/NR1Landing/ServicesNR1';
import CTAWhatsApp from '@/components/NR1Landing/CTAWhatsApp';
import FooterNR1 from '@/components/NR1Landing/FooterNR1';

export default function LandingNR1() {
  return (
    <div className="min-h-screen bg-[#F5F2E9] text-[#1A3B39] font-sans selection:bg-[#C29F62] selection:text-white">
      <HeaderNR1 />
      <main>
        <HeroNR1 />
        <AboutNR1 />
        <ServicesNR1 />
        <CTAWhatsApp />
      </main>
      <FooterNR1 />
    </div>
  );
}
