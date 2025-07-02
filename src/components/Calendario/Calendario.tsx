// components/Agenda.tsx
import { Calendar, dateFnsLocalizer, Event as RBCEvent } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay, addDays, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { use, useCallback, useEffect, useState } from 'react';
import { ReadAgendamentoDto } from '@/interfaces/interfacesDto';
import { useApi } from '@/hooks/useApi';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface EventType extends RBCEvent {
  title: string;
  start: Date;
  end: Date;
}

const Calendario = () => {
     const hoje = new Date();
     hoje.setHours(8, 0, 0, 0);
     
     const diaMax = addDays(hoje, 5);
     diaMax.setHours(20, 0, 0, 0);

    // Adicione esse estado para controlar a data atual
    const { getAgendamentos } = useApi();
     const [dataAtual, setDataAtual] = useState<Date>(new Date()); 
     const [eventos, setEventos] = useState<EventType[]>([]);
     const [dataMin, setDataMin] = useState<Date>(hoje);
     const [dataMax, setDataMax] = useState<Date>(diaMax);
     const [agendamentosFormatados, setAgendamentosFormatados] = useState<{ title: string; start: Date; end: Date }[]>([]);
     const [reloadCalendario, setReloadCalendario] = useState(0);
     const [agendamentos, setAgendamentos] = useState<ReadAgendamentoDto[]>([]); 
      
     const handleEventClick = useCallback((event: EventType) => {
          // if (window.confirm(`Remover evento "${event.title}"?`)) {
          //      setEventos(prev => prev.filter(e => e !== event));
          // }
     }, []);

     useEffect(() => {
        const events: EventType[] = agendamentosFormatados.map(element => ({
          ...element,
          start: new Date(element.start),
          end: new Date(element.end),
        }));
        setEventos(events);
    }, [reloadCalendario]);

     useEffect(() =>{
          console.log(eventos);
     }, [eventos])

     useEffect(() => {
          console.log("Agendamentos formatados:", agendamentosFormatados);
       }, [agendamentosFormatados]);
  
       useEffect(() => {
            const carregarAgendamentos = async () => {
            const dados = await getAgendamentos();
            setAgendamentos(dados);
            };
  
            carregarAgendamentos();
       }, []);
  
       useEffect(() => {
            const dadosFormatadosAgendamento = agendamentos.map((agendamentoFormatado) => {
                 let dataConsultaFormatada = new Date(agendamentoFormatado.dataHoraConsulta);
                 return {
                      title: agendamentoFormatado.paciente.nome,
                      start: dataConsultaFormatada,
                      end: addHours(dataConsultaFormatada, 1),
                 };
            });
  
            setAgendamentosFormatados(dadosFormatadosAgendamento);
            setReloadCalendario((prev) => prev + 1);
  
       }, [agendamentos]);

  return (
    <div className="rounded-xl border border-[#e2cfcf] bg-[#ffffff] p-4 shadow-md">
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        date={dataAtual} // ← controla a data exibida
        onNavigate={(novaData) => setDataAtual(novaData)} // ← atualiza ao clicar nos botões
        style={{ height: '80vh' }}
        min={new Date(1970, 1, 1, 8, 0)}  // 08:00
        max={new Date(1970, 1, 1, 19, 0)} // 19:00
        messages={{
          today: 'Hoje',
          previous: 'Voltar',
          next: 'Próximo',
          date: 'Data',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'Nenhum evento neste intervalo.',
        }}
      />


    </div>
  );
}

export default Calendario;
