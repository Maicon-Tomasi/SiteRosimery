'use client'

import Image from 'next/image'
import { FC } from 'react'

const SobreDois: FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center lg:text-left">
          About Dr. Sarah Martinez
        </h2>
        <p className="text-center lg:text-left text-gray-700">
          Dedicated to supporting women and families through one of lifes most transformative journeys
        </p>
        <div className="rounded-lg overflow-hidden shadow-md">
          <Image
            src="/img-about.jpg" // Substitua com o caminho real
            alt="Dr. Sarah with client"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="bg-pink-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-3">My Journey</h3>
          <p className="text-gray-700 mb-2">
            My passion for obstetric psychology began during my own journey to motherhood...
          </p>
          <p className="text-gray-700">
            This personal insight, combined with over 12 years of professional training...
          </p>
        </div>
        <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-6 rounded-lg">
          <h3 className="font-bold mb-4">My Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Holistic Approach</strong>
              <p>I believe in treating the whole person...</p>
            </div>
            <div>
              <strong>Cultural Sensitivity</strong>
              <p>I honor diverse cultural backgrounds...</p>
            </div>
            <div>
              <strong>Evidence-Based Care</strong>
              <p>My practice is grounded in the latest research...</p>
            </div>
            <div>
              <strong>Collaborative Partnership</strong>
              <p>Together, well develop personalized strategies...</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-base mb-2">Professional Memberships</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="flex items-start gap-2">
              🧠 American Psychological Association – Division 17
            </li>
            <li className="flex items-start gap-2">
              📘 Postpartum Support International – Certified Provider
            </li>
            <li className="flex items-start gap-2">
              📍 California Psychological Association – Active Member
            </li>
            <li className="flex items-start gap-2">
              🧾 Maternal Mental Health Alliance – Advisory Board
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-br from-orange-200 to-pink-300 p-6 rounded-lg text-white">
          <div className="text-2xl font-bold mb-2">SM</div>
          <div>
            <p className="font-semibold">Dr. Sarah Martinez</p>
            <p className="text-sm">Licensed Clinical Psychologist</p>
            <p className="text-sm mt-2">📍 San Francisco, CA</p>
            <p className="text-sm">💼 12+ Years Experience</p>
            <p className="text-sm">👨‍👩‍👧 500+ Families Supported</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Languages Spoken</h3>
          <ul className="text-sm list-disc list-inside">
            <li>English (Native)</li>
            <li>Spanish (Fluent)</li>
            <li>Portuguese (Conversational)</li>
          </ul>
        </div>

        <div className="bg-pink-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Current Research</h3>
          <p className="text-sm">
            Currently contributing to a longitudinal study on postpartum depression prevention...
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="/imagensSite/img-sobre.jpeg" // Substitua com o caminho real
            alt="Welcoming Office"
            className="w-full h-auto object-cover max-h-[600px]"
          />
          <p className="text-sm mt-1 text-gray-600">My welcoming office space</p>
        </div>
      </div>
    </section>
  )
}

export default SobreDois;