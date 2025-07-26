"use client";

import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import {
  CalendarDays,
  CheckCircle,
  Users,
  DollarSign,
} from "lucide-react";

const Dashboard = () => {
  const {
    getQuantidadeTotalAgendamentos,
    getQuantidadeTotalConsultasRealizadas,
    getQuantidadeTotalPacientes,
    getQuantidadeTotalConsultasRealizadasPorMes,
    getQuantidadeTotalConsultasRealizadasPorTipoConsulta,
  } = useApi();

  const [qtdeAgendamentos, setQtdeAgendamentos] = useState<number>(0);
  const [qtdeConsultasRealizadas, setQtdeConsultasRealizada] = useState<number>(0);
  const [qtdePacienteCadastrados, setQtdePacienteCadastrados] = useState<number>(0);
  const [qtdeConsultasRealizadasPorMes, setQtdeConsultasRealizadasPorMes] = useState<number[]>([]);
  const [qtdeConsultasRealizadasPorTipoConsulta, setQtdeConsultasRealizadasPorTipoConsulta] = useState([{}]);
  const [anoReferencia, setAnoReferencia] = useState<number>(new Date().getFullYear());

  const options: EChartsOption = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Consultas Realizadas",
        type: "bar",
        data: qtdeConsultasRealizadasPorMes,
        itemStyle: {
          color: '#f39c12', // Cor amarela
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };
  
  const optionsPie: EChartsOption = {
    title: {
      text: 'Tipos de Consultas Realizadas',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Tipos de Consulta',
        type: 'pie',
        radius: '50%',
        data: qtdeConsultasRealizadasPorTipoConsulta,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const carregarDados = async () => {
    try {
      const [agend, consult, pacientes, consultarPorMes, consultasPorTipoConsulta] = await Promise.all([
        getQuantidadeTotalAgendamentos(),
        getQuantidadeTotalConsultasRealizadas(),
        getQuantidadeTotalPacientes(),
        getQuantidadeTotalConsultasRealizadasPorMes(anoReferencia),
        getQuantidadeTotalConsultasRealizadasPorTipoConsulta(anoReferencia),
      ]);
      setQtdeAgendamentos(agend);
      setQtdeConsultasRealizada(consult);
      setQtdePacienteCadastrados(pacientes); 
      
      const consultarPorMesArray = Array.isArray(consultarPorMes) 
                                  ? consultarPorMes.map(Number) 
                                  : Object.values(consultarPorMes).map(Number);
    
      setQtdeConsultasRealizadasPorMes(consultarPorMesArray);

      const dadosGraficoPie = Object.entries(consultasPorTipoConsulta)
      .filter(([value]) => Number(value) > 0)
      .map(([name, value]) => ({
        name,
        value: Number(value)
      }));
      
      setQtdeConsultasRealizadasPorTipoConsulta(dadosGraficoPie);

    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    }
  };

  useEffect(() => {
    carregarDados();
    setAnoReferencia(2025);
  }, []);
  
  useEffect(() => {
    console.log("Consultas realizadas por mês:", qtdeConsultasRealizadasPorMes);
  }, [qtdeConsultasRealizadasPorMes]);

  const cards = [
    {
      title: "Total de Agendamentos",
      icon: <CalendarDays className="w-6 h-6 text-yellow-500" />,
      value: qtdeAgendamentos,
    },
    {
      title: "Consultas Realizadas",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      value: qtdeConsultasRealizadas,
    },
    {
      title: "Pacientes Cadastrados",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      value: qtdePacienteCadastrados,
    },
    {
      title: "Faturamento",
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      value: "R$ 0,00",
    },
  ];

  return (
    <div className="w-full p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">{card.icon}</div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{card.title}</span>
              <strong className="text-2xl font-semibold text-gray-800">
                {card.value}
              </strong>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Consultas Realizadas Mensal</h2>
          <ReactECharts option={options} style={{ height: "400px" }} />
        </div>
        {/* <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Tipos De Consultas Realizadas</h2>
          <ReactECharts option={optionsPie} style={{ height: "400px" }} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
