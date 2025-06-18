'use client'

import Image from 'next/image'
import { FC, useEffect } from 'react'
import { Element } from 'react-scroll'
import AOS from "aos";
import "aos/dist/aos.css";

const SobreDois: FC = () => {

  useEffect(() => {
          AOS.init({
              duration: 1000,
              once: true,
          });
      }, []);

  return (
    <Element name="sobre">
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <h2 data-aos="fade-up" className="text-2xl md:text-3xl font-semibold text-center lg:text-left">
            Sobre Dr. Rosméry Tomasi
          </h2>
          <p data-aos="fade-up" className="text-center lg:text-left text-gray-700">
            Estou à sua disposição e comprometida em atender às suas necessidades em todas as fases da vida.
          </p>
          <div data-aos="flip-left" className="rounded-lg overflow-hidden shadow-md">
            <Image
              src="/img-about.jpg" // Substitua com o caminho real
              alt="Dr. Sarah with client"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div data-aos="flip-left" className="bg-pink-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">Minha Caminhada</h3>
            <p className="text-gray-700 mb-2">
              Minha paixão pela psicologia obstétrica nasceu da vivência da maternidade.
            </p>
            <p className="text-gray-700">
              Essa experiência pessoal, somada a uma abordagem acolhedora e mais de 3 anos de formação profissional, me motiva a apoiar mulheres e casais desde o pré-natal até o terceiro mês após o parto.
            </p>
          </div>
          <div data-aos="flip-left" className="bg-gradient-to-r from-orange-100 to-pink-100 p-6 rounded-lg">
            <h3 className="font-bold mb-4">Meus Bordões</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Abordagem Integral</strong>
                <p>Acredito que cuidar da mente é tão essencial quanto cuidar do corpo.</p>
              </div>
              <div>
                <strong>Cuidado Preventivo</strong>
                <p>Ofereço o Pré-Natal Psicológico como forma de prevenir transtornos emocionais.</p>
              </div>
              <div>
                <strong>Acolhimento e Fortalecimento</strong>
                <p>Guio mamães com empatia, carinho e atenção, promovendo autoconhecimento e segurança emocional.</p>
              </div>
              <div>
                <strong>Participação dos Pais</strong>
                <p>Para os papais, ser pai é uma chance única de evoluir. Também os acolho nessa jornada de transformação.</p>
              </div>
            </div>
          </div>
          <div data-aos="flip-left">
            <h3 className="font-bold text-base mb-2">Apoios Profissionais</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li className="flex items-start gap-2">
                🧠 Rede de violência doméstica contra a mulher
              </li>
              {/* <li className="flex items-start gap-2">
                📘 Postpartum Support International – Certified Provider
              </li>
              <li className="flex items-start gap-2">
                📍 California Psychological Association – Active Member
              </li>
              <li className="flex items-start gap-2">
                🧾 Maternal Mental Health Alliance – Advisory Board
              </li> */}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div data-aos="flip-right" className="bg-gradient-to-br from-orange-200 to-pink-300 p-6 rounded-lg text-white">
            <div className="text-2xl font-bold mb-2">RT</div>
            <div>
              <p className="font-semibold">Dr. Rosiméry Tomasi</p>
              <p className="text-sm">Consultório de psicologia próprio!</p>
              <p className="text-sm mt-2">📍 Primavera do Leste, MT</p>
              <p className="text-sm">💼 5+ Anos de experiência</p>
              <p className="text-sm">👨‍👩‍👧 30+ Familias Atendidas</p>
            </div>
          </div>

          <div data-aos="flip-right" className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Consigo me cominicar em:</h3>
            <ul className="text-sm list-disc list-inside">
              <li>Potuguês - Brasil (Nativo)</li>
            </ul>
          </div>

          <div data-aos="flip-right" className="bg-pink-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Pesquisa atual</h3>
            <p className="text-sm">
              Atualmente contribuindo para um estudo longitudinal sobre prevenção da depressão pós-parto...          
            </p>
          </div>

          <div data-aos="flip-right" className="rounded-lg overflow-hidden shadow-md">
            <img
              src="/imagensSite/img-sobre.jpeg" // Substitua com o caminho real
              alt="Welcoming Office"
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        </div>
      </section>
    </Element>
  )
}

export default SobreDois;