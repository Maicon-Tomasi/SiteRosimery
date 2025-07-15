"use client";

import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";

const Dashboard = () => {
  const { getQuantidadeTotalAgendamentos, getQuantidadeTotalConsultasRealizadas, getQuantidadeTotalPacientes } = useApi();
  const [qtdeAgendamentos, setQtdeAgendamentos] = useState<number>(0);
  const [qtdeConsultasRealizadas, setQtdeConsultasRealizada] = useState<number>(0);
  const [qtdePacienteCadastrados, setQtdePacienteCadastrados] = useState<number>(0);

  const options: EChartsOption = {
    title: {
      text: 'Agendamentos Mensal',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Agendamentos',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 15, 25, 30, 40, 50, 60],
        itemStyle: {
          color: '#f39c12', // Cor amarela
        },
      },
    ],
  };

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

            <div className="flex gap-5 mt-10">
              <div className="w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                  <ReactECharts option={options} style={{ height: '400px' }} />
                </div>
              </div>
              
              <div className="w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                  <ReactECharts option={options} style={{ height: '400px' }} />
                </div>
              </div>
            </div>
            
            <div className="flex gap-5 mt-10">
              <div className="w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                  <ReactECharts option={options} style={{ height: '400px' }} />
                </div>
              </div>
              
              <div className="w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                  <ReactECharts option={options} style={{ height: '400px' }} />
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;