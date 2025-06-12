'use client'
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users } from "lucide-react"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const Sobre = () =>{

    useEffect(() => {
        AOS.init({
            duration: 1000, // duração da animação
            once: true,     // anima apenas uma vez
        });
    }, []);

    return(
        <div data-aos="fade-up" className="flex py-20 px-36">
            <div className="w-full">
                <h2 className="text-5xl font-bold mb-5"><span className="text-[#1f2937]">Este texto é um texto para teste</span><span className="text-[#d49f43]">x e será trocado</span></h2>

                <p className="text-[#515a68]">Veniam officia fugiat quis ex Lorem ad ullamco non aliquip aliqua proident. Enim eu fugiat nulla est ullamco ad et esse sit commodo eiusmod. Non eiusmod veniam eiusmod consequat aute enim in laborum et. Dolore occaecat magna do reprehenderit voluptate duis excepteur sint ad ullamco dolor ut. Anim eu commodo consequat dolore nisi laborum consequat cupidatat laboris ad esse fugiat.</p>

                <div className="flex gap-10 mt-5">
                    <Button className="bg-[#dba952] text-[20px] h-11 hover:bg-[#a79b6b] cursor-pointer">Marque uma consulta</Button>
                    <Button className="bg-transparent text-[20px] h-11 text-[#d49f43] border-2 border-[#dba952] hover:bg-[#a79b6b] hover:text-white cursor-pointer">
                        Saiba Mais
                    </Button>
                </div>

                <div className="flex gap-[250px] mt-10 justify-center ">
                    <div data-aos="fade-right" className="text-center flex flex-col items-center">
                        <div className="rounded-full bg-[#e5a9b3] items-center p-4">
                            <Heart size={30} color="white"/>
                        </div>
                        
                        <span>oiie</span>
                    </div>
                    <div data-aos="fade-up" className="text-center flex flex-col items-center">
                        <div className="rounded-full bg-[#dba952] items-center p-4">
                            <Shield size={30} color="white"/>
                        </div>
                        
                        <span>oiie</span>
                    </div>
                    <div data-aos="fade-left" className="text-center flex flex-col items-center">
                        <div className="rounded-full bg-white items-center p-4 border-[#e5a9b3] border-2">
                            <Users size={30} color="#dba952"/>
                        </div>
                        
                        <span>Suporte Familiar</span>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="w-full max-w-[600px] bg-gradient-to-br from-[#e5a9b3] to-[#dba952] rounded-3xl p-8 shadow-2xl">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#dba952] to-[#e5a9b3] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">RT</span>
                            </div>
                            
                                <h3 className="text-2xl font-bold text-gray-800">Dra. Rosiméry Tomasi</h3>
                                <p className="text-gray-600">Psicólogo Clínico Licenciado</p>
                                <p className="text-sm text-gray-500">Especialista em Psicologia Obstétrica</p>
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