"use client";

import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const { getQuantidadeTotalAgendamentos, getQuantidadeTotalConsultasRealizadas, getQuantidadeTotalPacientes } = useApi();
  const [qtdeAgendamentos, setQtdeAgendamentos] = useState<number>(0);
  const [qtdeConsultasRealizadas, setQtdeConsultasRealizada] = useState<number>(0);
  const [qtdePacienteCadastrados, setQtdePacienteCadastrados] = useState<number>(0);

  const carregarQuantidadeAgendamentos = async () => {
    try {
      const quantidade = await getQuantidadeTotalAgendamentos();  
      setQtdeAgendamentos(quantidade);
    } catch (error) {
      console.error("Erro ao carregar quantidade de agendamentos:", error);
    }
  }
  
  const carregarQuantidadeConsultasRealizadas = async () => {
    try {
      const quantidade = await getQuantidadeTotalConsultasRealizadas();  
      setQtdeConsultasRealizada(quantidade);
    } catch (error) {
      console.error("Erro ao carregar quantidade de agendamentos:", error);
    }
  }
  
  const carregarQuantidadePacientesCadastrados = async () => {
    try {
      const quantidade = await getQuantidadeTotalPacientes();  
      setQtdePacienteCadastrados(quantidade);
    } catch (error) {
      console.error("Erro ao carregar quantidade de agendamentos:", error);
    }
  }

  useEffect(() => {
    carregarQuantidadeAgendamentos();
    carregarQuantidadeConsultasRealizadas();
    carregarQuantidadePacientesCadastrados();
  }, [])

  return (
    <div className="w-full flex flex-col gap-6 p-6 min-h-screen">
      <div>
            <div className='flex gap-5'>
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                    <div className="text-lg font-semibold mb-2">
                        Total de Agendamentos
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 text-right pr-4">
                        {qtdeAgendamentos}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                    <div className="text-lg font-semibold mb-2">
                        Total de Consultas Realizadas
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 text-right pr-4">
                        {qtdeConsultasRealizadas}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                    <div className="text-lg font-semibold mb-2">
                        Pacientes Cadastrados
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 text-right pr-4">
                        {qtdePacienteCadastrados}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                    <div className="text-lg font-semibold mb-2">
                        Faturamento
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 text-right pr-4">
                       0
                    </div>
                </div>
            </div>
        
            
        </div>
    </div>
  );
}

export default Dashboard;