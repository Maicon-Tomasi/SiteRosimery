'use client'
import { Mail, MapPin, Phone, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0E1525] text-white py-10 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-[#D8997C] rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-white">Dr</div>
            <div>
              <p className="font-semibold text-sm">Dr. Rosiméry Tomasi</p>
              <p className="text-xs text-gray-400">Psicóloga Especialista em Obstétrica</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-2">
            Fornecendo atendimento psicológico especializado e compassivo para gestantes, novos pais e famílias que passam pela jornada emocional da paternidade.
          </p>
          <p className="text-xs flex items-center text-gray-400">
            <Heart className="w-4 h-4 mr-1" />
            Dando suporte a famílias desde 2020
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Links Rápidos</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Ínicio</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Especializações</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Agenda</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Informações De Contato</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> (66) 9 9698-9912</li>
            <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> rosimery@gmail.com</li>
            <li className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-1" />Av. Paulo César Aranda, 814 - Jardim Riva, Primavera do Leste - MT, 78850-000<br />San Francisco, CA 94105</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>© 2024 Dr. Rosiméry A. S. Tomasi. Todos os direitos reservados.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          {/* <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">HIPAA Notice</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
