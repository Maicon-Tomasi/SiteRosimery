'use client';

import { FC, useEffect } from 'react';
import {
  Heart,
  Baby,
  Brain,
  Users,
  Calendar,
  Phone,
} from 'lucide-react';
import AOS from "aos";


interface ServiceCard {
  title: string;
  description: string;
  icon: JSX.Element;
  items: string[];
  image: string;
}

const services: ServiceCard[] = [
  {
    title: 'Prenatal Psychology',
    description: 'Support during pregnancy, addressing anxiety, depression, and preparing for parenthood.',
    icon: <Baby className="text-white" size={20} />,
    items: [
      'Pregnancy anxiety management',
      'Birth preparation',
      'Partner support',
      'Body image concerns',
    ],
    image: '/imagensSite/gravidez-img.jpg',
  },
  {
    title: 'Postpartum Support',
    description: 'Comprehensive care for new mothers dealing with postpartum depression and adjustment.',
    icon: <Heart className="text-white" size={20} />,
    items: [
      'Postpartum depression treatment',
      'Bonding support',
      'Sleep deprivation coping',
      'Identity transition',
    ],
    image: '/imagensSite/gravidez-img.jpg',
  },
  {
    title: 'Perinatal Mental Health',
    description: 'Specialized treatment for mental health concerns during the perinatal period.',
    icon: <Brain className="text-white" size={20} />,
    items: [
      'PTSD from birth trauma',
      'Perinatal anxiety disorders',
      'Obsessive-compulsive symptoms',
      'Mood disorders',
    ],
    image: '/imagensSite/gravidez-img.jpg',
  },
  {
    title: 'Family Therapy',
    description: 'Supporting couples and families through the transition to parenthood.',
    icon: <Users className="text-white" size={20} />,
    items: [
      'Couple relationship therapy',
      'Sibling adjustment',
      'Grandparent involvement',
      'Communication skills',
    ],
    image: '/imagensSite/gravidez-img.jpg',
  },
  {
    title: 'Loss & Grief Support',
    description: 'Compassionate care for pregnancy loss, infant loss, and fertility challenges.',
    icon: <Calendar className="text-white" size={20} />,
    items: [
      'Miscarriage grief counseling',
      'Stillbirth support',
      'Infertility counseling',
      'Secondary loss support',
    ],
    image: '/imagensSite/gravidez-img.jpg',
  },
  {
    title: 'Telehealth Sessions',
    description: 'Convenient online therapy sessions for busy parents and expectant mothers.',
    icon: <Phone className="text-white" size={20} />,
    items: [
      'Flexible scheduling',
      'Secure video platform',
      'From comfort of home',
      'Reduced travel stress',
    ],
    image: '/imagensSite/gravidez-img.jpg',
  },
];

const Servico: FC = () => {

     useEffect(() => {
             AOS.init({
                 duration: 1000,
                 once: true,
             });
         }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">Comprehensive Obstetric Psychology Services</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        I provide specialized psychological support tailored to the unique needs of expectant and new parents,
        helping you navigate the emotional journey of parenthood with confidence and peace of mind.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden text-left hover:shadow-lg transition"
            data-aos="zoom-in-up"
          >
            <div className="relative h-40">
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
        ))}
      </div>
    </section>
  );
};

export default Servico;
