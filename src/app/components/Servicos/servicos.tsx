'use client';

import { FC, ReactElement, useEffect } from 'react';
import {
  Baby,
  Stethoscope,
  Feather,
  Activity,
  ZapOff,
  BatteryLow,
  BrainCircuit,
  Handshake,
  CloudRain,
} from 'lucide-react';
import AOS from "aos";
import Slider from "react-slick";


interface ServiceCard {
  title: string;
  description: string;
  icon: ReactElement;
  items: string[];
  image: string;
}

const services: ServiceCard[] = [
  {
    title: 'Durante o Ciclo gravídico-Puerperal',
    description: 'O período da gestação até o puerpério envolve mudanças intensas na identidade da mulher, despertando emoções complexas. O acompanhamento psicológico proporciona um espaço seguro para acolher essas transformações e fortalecer a saúde mental da gestante.',
    icon: <Baby className="text-white" size={20} />,
    items: [
      'Apoio à ambivalência afetiva materna',
      'Manejo das inseguranças e angústias gestacionais',
      'Fortalecimento da identidade da mulher',
      'Prevenção de sofrimento emocional durante a gestação',
      'Promoção do bem-estar materno desde a concepção ao puerpério',
    ],
    image: '/imagensSite/servicos/servicoCicloGravidico.jpg',
  },
  {
    title: 'Preparação para o Parto',
    description: 'Mais do que planejar o tipo de parto, é essencial preparar-se psicologicamente para o processo em si. A orientação emocional ajuda a mulher a enfrentar esse momento com mais confiança, diminuindo frustrações e sentimentos de fracasso.',
    icon: <Stethoscope className="text-white" size={20} />,
    items: [
      'Enfrentamento da inevitabilidade do parto',
      'Redução de frustrações e expectativas irreais',
      'Construção de um vínculo positivo com a experiência',
      'Fortalecimento emocional para o momento do nascimento',
    ],
    image: '/imagensSite/servicos/servicoPreparacaoParto.jpg',
  },
  {
    title: 'Puerpério e Adaptação',
    description: 'O puerpério é um dos períodos mais delicados da maternidade, com alterações hormonais, emocionais e sociais. A psicoterapia auxilia a mulher na reorganização da nova rotina, promovendo equilíbrio emocional nessa fase de transição.',
    icon: <Handshake className="text-white" size={20} />,
    items: [
      'Apoio à reestruturação da vida doméstica',
      'Compreensão do novo papel materno',
      'Acolhimento da labilidade emocional',
      'Apoio à adaptação familiar à chegada do bebê',
    ],
    image: '/imagensSite/servicos/servicoPuerperioEAdpatacao.jpg',
  },
  {
    title: ' Luto Perinatal e Perdas Gestacionais',
    description: 'As perdas gestacionais e neonatais causam um tipo de luto muito particular, muitas vezes silenciado socialmente. O suporte psicológico possibilita o acolhimento adequado dessa dor, ajudando na elaboração da perda e na reconstrução do significado da maternidade.',
    icon: <Feather className="text-white" size={20} />,
    items: [
      'Prevenção de psicopatologias relacionadas à perda',
      'Acolhimento do sofrimento emocional',
      'Espaço seguro para expressão do luto',
      'Apoio à elaboração emocional da perda',
    ],
    image: '/imagensSite/servicos/servicoLutoPerinatal.jpg',
  },
  {
    title: 'Transtornos de Ansiedade',
    description: 'A ansiedade é uma resposta natural do corpo, mas quando exacerbada, compromete a qualidade de vida. Na gestação e pós-parto, esses sintomas podem se intensificar e requerem acompanhamento terapêutico para evitar prejuízos emocionais maiores.',
    icon: <Activity className="text-white" size={20} />,
    items: [
      'Identificação de sintomas físicos e emocionais',
      'Apoio no controle de reações disfuncionais',
      'Redução de impactos sociais e profissionais',
      'Técnicas para promover o bem-estar psicológico',
    ],
    image: '/imagensSite/servicos/ServicoAnsiedade.jpg',
  },
  {
    title: 'Depressão',
    description: 'A depressão pode surgir ou se agravar durante a maternidade, afetando o vínculo com o bebê, a autoestima e o desejo de viver. A psicoterapia promove o enfrentamento dessa condição com acolhimento e estratégias de fortalecimento emocional.',
    icon: <CloudRain className="text-white" size={20} />,
    items: [
      'Intervenção em estados de apatia e baixa autoestima',
      'Prevenção de pensamentos autodestrutivos',
      'Estímulo à retomada de atividades prazerosas',
      'Apoio no resgate da motivação e autonomia',
    ],
    image: '/imagensSite/servicos/servicoDepressao.jpg',
  },
  {
    title: 'Estresse Pós-Traumático',
    description: 'Situações traumáticas vividas durante a gravidez, parto ou pós-parto podem gerar sofrimento psicológico intenso. O acompanhamento especializado é essencial para lidar com os sintomas e restabelecer o senso de segurança da mulher.',
    icon: <ZapOff className="text-white" size={20} />,
    items: [
      'Acolhimento de memórias intrusivas',
      'Manejo do terror psicológico e sintomas físicos',
      'Prevenção de desdobramentos emocionais graves',
      'Promoção de segurança e estabilidade emocional',
    ],
    image: '/imagensSite/servicos/ServicoEstressePosTraumatic.jpg',
  },
  {
    title: 'Síndrome de Burnout',
    description: 'A sobrecarga emocional e física decorrente da rotina materna ou profissional pode levar ao esgotamento. A psicóloga oferece suporte para restabelecer o equilíbrio e encontrar novas formas de lidar com a pressão diária.',
    icon: <BatteryLow className="text-white" size={20} />,
    items: [
      'Identificação de sinais de esgotamento',
      'Apoio na busca por equilíbrio emocional',
      'Estratégias para lidar com a sobrecarga',
      'Promoção de um ambiente de vida mais saudável',
    ],
    image: '/imagensSite/servicos/servicoBurnoout.jpg',
  },
  {
    title: 'Transtorno de Personalidade Borderline',
    description: 'Pessoas com TPB enfrentam instabilidades emocionais intensas e dificuldades nos relacionamentos. Com acompanhamento psicológico, é possível desenvolver ferramentas para melhorar a qualidade de vida e regular emoções.',
    icon: <BrainCircuit className="text-white" size={20} />,
    items: [
      'Apoio em casos de instabilidade emocional intensa',
      'Terapias específicas (como TCC) para controle dos sintomas',
      'Promoção da autoestima e do autocontrole',
      'Acompanhamento contínuo para melhora da qualidade de vida',
    ],
    image: '/imagensSite/servicos/servicoBordeline.jpg',
  },
];

const Servico: FC = () => {

   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // telas médias
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // celulares
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


     useEffect(() => {
             AOS.init({
                 duration: 1000,
                 once: true,
             });
         }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">Algumas formas de te ajudar</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Ofereço suporte psicológico especializado como psicóloga obstétrica, adaptado às necessidades específicas de futuros e novos pais, ajudando você a navegar pela jornada emocional da paternidade com confiança e tranquilidade.
        Além disso, realizo atendimentos voltados à saúde mental de forma geral, acolhendo diferentes demandas emocionais com empatia e profissionalism
      </p>

      <Slider
        {...settings}
        className="slider-container"
      >
        {services.map((service, index) => (
          <div key={index} className="px-2">
            <div
              className="bg-white rounded-xl shadow-md overflow-hidden text-left hover:shadow-lg transition h-full"
              data-aos="zoom-in-up"
            >
              <div className="relative h-50">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-amber-500 p-2 rounded-full">
                  {service.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  {service.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </Slider>

    </section>
  );
};

export default Servico;
