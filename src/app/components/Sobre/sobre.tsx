'use client'
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users } from "lucide-react"
import { FC, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Sobre: FC = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const onGoToPageMarcarConsulta = () => {
         
    };

    return (
        <div data-aos="fade-up" className="w-full flex flex-col xl:flex-row justify-around py-20 px-6 xl:px-36 gap-10">
            {/* Texto à esquerda */}
            <div className="w-full xl:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-5 text-center xl:text-left">
                    <span className="text-[#1f2937]">Apoiando você na jornada </span>
                    <span className="text-[#d49f43]">da maternidade</span>
                </h2>

                <p className="text-[#515a68] text-center xl:text-left">
                    Sou Rosiméry, psicóloga dedicada a proporcionar apoio emocional no início da maternidade até o terceiro mês do puerpério. Nascida em 1977, Trago uma abordagem única ao Pré-Natal Psicológico, uma profilaxia referente a prevenção de transtornos psicológicos. Transformando-o em uma jornada envolvente de autoconhecimento e fortalecimento emocional para mamães e papais/ ou para futuro pais. <br></br>
                    Recado para os papais. Ser pai é... a maior oportunidade que o homem recebe da natureza de evoluir de verdade.
                    Acredito que a maternidade é um momento de descobertas profundas. Meu acompanhamento psicológico não se limita ao aspecto físico, mas busca ajudar as mulheres a explorar seus sentimentos mais íntimos, descobrindo uma força interior que muitas vezes passa despercebida. <br />
                    Com empatia, calma, carinho e atenção, guio as mamães nesse caminho, oferecendo um suporte vital durante o período mais intenso da maternidade. Compreendo a importância de criar um ambiente acolhedor, onde as futuras mamães se sintam capacitadas e confiantes para enfrentar os desafios emocionais que podem surgir.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-5 justify-center xl:justify-start">
                    <Button onClick={onGoToPageMarcarConsulta} className="bg-[#dba952] text-[18px] h-11 hover:bg-[#a79b6b] cursor-pointer">
                        Marque uma consulta
                    </Button>
                    <Button className="bg-transparent text-[18px] h-11 text-[#d49f43] border-2 border-[#dba952] hover:bg-[#a79b6b] hover:text-white cursor-pointer">
                        Saiba Mais
                    </Button>
                </div>

                <div className="flex justify-center xl:justify-start gap-10 sm:gap-[100px] mt-10 flex-wrap">
                    <div data-aos="fade-right" className="text-center flex flex-col items-center hover:scale-150 transition-transform duration-300">
                        <div className="rounded-full bg-[#e5a9b3] p-4">
                            <Heart size={30} color="white" />
                        </div>
                        <span>Compaixão</span>
                    </div>
                    <div data-aos="fade-up" className="text-center flex flex-col items-center">
                        <div className="rounded-full bg-[#dba952] p-4">
                            <Shield size={30} color="white" />
                        </div>
                        <span>Espaço Seguro</span>
                    </div>
                    <div data-aos="fade-left" className="text-center flex flex-col items-center">
                        <div className="rounded-full bg-white p-4 border-[#e5a9b3] border-2">
                            <Users size={30} color="#dba952" />
                        </div>
                        <span>Suporte Familiar</span>
                    </div>
                </div>
            </div>

            {/* Card à direita */}
            <div className="w-full xl:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-[#e5a9b3] to-[#dba952] rounded-3xl p-4 sm:p-8 shadow-2xl">
                    <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#dba952] to-[#e5a9b3] rounded-full mb-4 flex items-center justify-center">
                                <img src="/imagensSite/img-contato.jpeg" alt="" className="rounded-[50%]"/>

                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Dra. Rosiméry Tomasi</h3>
                            <p className="text-gray-600 text-center">Psicólogo Clínico Licenciado</p>
                            <p className="text-sm text-gray-500 text-center">Especialista em Psicologia Obstétrica</p>
                        </div>

                        <div className="py-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Experiência</span>
                                <span className="font-semibold text-[#dba952]">12+</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Familias atendidas</span>
                                <span className="font-semibold text-[#e5a9b3]">567+</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Avaliação</span>
                                <span className="font-semibold text-[#dba952]">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sobre;
