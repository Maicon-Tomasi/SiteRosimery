'use client';

import React, { useState } from 'react';

const Contato: React.FC = () => {
     const [nome, setNome] = useState('');
     const [telefone, setTelefone] = useState('');
     const [mensagem, setMensagem] = useState('');

     const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();

     const numeroWhatsApp = '5566996598423'; // Coloque o número da psicóloga aqui (sem + ou traços)
     const texto = `Olá, meu nome é ${nome}, meu telefone é ${telefone}. Mensagem: ${mensagem}`;
     const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

     window.open(url, '_blank'); // Abre o WhatsApp em nova aba
     };

  return (
    <section className="bg-pink-50 py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
        Especializações Profissionais e Educação
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Aprendizado contínuo e treinamento especializado para oferecer cuidados da mais alta qualidade para gestantes e famílias.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {/* Left - Form */}
        <div className="w-full md:max-w-[800px] bg-white p-6 rounded shadow-md rounded-2xl">
          <h2 className="text-2xl font-semibold mb-1">Me mande uma mensagem no WhatsApp</h2>
          <p className="text-sm text-gray-600 mb-6">
            Geralmente eu consigo te responder em até 24 horas. <br />
           Essa mensagem será enviada diretamente para o meu WhatsApp, onde posso te responder rapidamente.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Primeiro nome"
                className="border-[1px] p-2 rounded-[6px]"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Telefone"
                className="border-[1px] p-2 rounded-[6px]"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
            <textarea
              placeholder="Escreva sua mensagem aqui..."
              className="border-[1px] p-2 rounded-[6px] min-h-[120px] w-full"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
            >
              Enviar
            </button>
            <p className="text-xs text-center text-gray-500">
              Ao enviar este formulário, você concorda com minha política de privacidade e termos de serviço.
            </p>
          </form>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.586394016403!2d-54.31239702411727!3d-15.560287917235625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9377250d4f28d9d9%3A0x572a81a2ad2c237c!2sPsic%C3%B3loga%20Rosim%C3%A9ry%20Tomasi%20-%20Psic%C3%B3loga%20Cl%C3%ADnica%20e%20Obst%C3%A9trica!5e0!3m2!1spt-BR!2sbr!4v1750215930537!5m2!1spt-BR!2sbr"
            className="w-full m-2 border-2 rounded-[10px] border-[#d49f43]"
            height={250}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right - Info */}
        <div className="space-y-6 w-full md:max-w-[400px]">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-6 rounded shadow-md text-sm">
            <h3 className="font-semibold mb-2">Informações de contato</h3>
            <p>📞 (66) 9 9659-8423 <span className="block text-xs text-gray-600 m-2">Mensagem ou ligação</span></p>
            <p>📍 Av. Paulo César Aranda, 814 - Jardim Riva<br /> Primavera do Leste - MT, 78850-000<br />
            </p>
          </div>

          {/* Office Hours */}
          <div className="bg-white p-6 rounded shadow-md text-sm">
            <h3 className="font-semibold mb-2">Horários</h3>
            <ul>
              <li className="flex justify-between"><span>Segunda-feira</span><span>08:00 às 18:00</span></li>
              <li className="flex justify-between"><span>Terça-feira</span><span>08:00 às 18:00</span></li>
              <li className="flex justify-between"><span>Quarta-feira</span><span>08:00 às 18:00</span></li>
              <li className="flex justify-between"><span>Quinta-feira</span><span>08:00 às 18:00</span></li>
              <li className="flex justify-between"><span>Sexta-feira</span><span>08:00 às 18:00</span></li>
              <li className="flex justify-between"><span>Sábado</span><span>08:00 às 12:00</span></li>
              <li className="flex justify-between"><span>Domingo</span><span>Fechado</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;