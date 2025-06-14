'use client'
import { GraduationCap, BadgeCheck, Heart, Brain, Users } from "lucide-react"
import { FC, useEffect } from "react";
import AOS from "aos";


const Especializacoes: FC = () => {

  useEffect(() => {
          AOS.init({
              duration: 1000,
              once: true,
          });
      }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
          Professional Specializations & Education
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Continuous learning and specialized training to provide the highest quality care for expectant mothers and families.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck className="text-yellow-600" />
              <h3 className="font-semibold text-lg">Certifications & Specializations</h3>
            </div>

            <ul className="space-y-4">
              {[
                {
                  icon: <Heart className="text-pink-500" />,
                  title: "Perinatal Mental Health Certificate",
                  subtitle: "Postpartum Support International (PSI) · 2018",
                  desc: "Advanced certification in perinatal mood and anxiety disorders",
                },
                {
                  icon: <Brain className="text-pink-500" />,
                  title: "EMDR Therapy Training",
                  subtitle: "EMDR International Association · 2019",
                  desc: "Specialized training for birth trauma and PTSD treatment",
                },
                {
                  icon: <Users className="text-pink-500" />,
                  title: "Family Systems Therapy",
                  subtitle: "Bowen Center · 2020",
                  desc: "Advanced training in family dynamics during life transitions",
                },
                {
                  icon: <Users className="text-pink-500" />,
                  title: "Mindfulness-Based Interventions",
                  subtitle: "Center for Mindfulness · 2021",
                  desc: "Certified in prenatal and postnatal anxiety management",
                },
              ].map((item, i) => (
                <li data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    key={i} 
                    className="bg-white shadow-md rounded-md p-4">
                  <div className="flex items-center gap-3 mb-1">
                    {item.icon}
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="text-yellow-600" />
              <h3 className="font-semibold text-lg">Education & Training</h3>
            </div>

            <ul className="space-y-4">
              {[
                {
                  title: "Ph.D. in Clinical Psychology",
                  subtitle: "University of California, Los Angeles (UCLA) · 2012",
                  desc: "Reproductive and Maternal Psychology",
                },
                {
                  title: "M.A. in Psychology",
                  subtitle: "University of California, Los Angeles (UCLA) · 2009",
                  desc: "Developmental Psychology",
                },
                {
                  title: "B.A. in Psychology",
                  subtitle: "Stanford University · 2007",
                  desc: "Magna Cum Laude",
                },
              ].map((item, i) => (
                <li data-aos="fade-left"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine" 
                    key={i} 
                    className="bg-white shadow-md rounded-md p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <GraduationCap className="text-yellow-600" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </li>
              ))}

              {/* Licença */}
              <li 
                data-aos="fade-left"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                className="bg-rose-200 shadow-md rounded-md p-4 border border-rose-300"
              >
                <div className="flex items-center gap-3 mb-1">
                  <BadgeCheck className="text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-rose-800">Licensed Clinical Psychologist</h4>
                  </div>
                </div>
                <p className="text-sm text-rose-900">State of California • License #PSY12345</p>
                <p className="text-sm text-rose-800 mt-1">In good standing since 2012 · Continuing education current</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Especializacoes;
