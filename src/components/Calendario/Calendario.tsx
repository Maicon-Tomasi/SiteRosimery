// components/Agenda.tsx
import { Calendar, dateFnsLocalizer, Event as RBCEvent } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { use, useCallback, useEffect, useState } from 'react';
import { ReadAgendamentoDto } from '@/interfaces/interfacesDto';

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

interface CalendarioProps
{
     dados: EventType[],
     atualiza: number
}

const Calendario = ({dados, atualiza}: CalendarioProps) => {
     const hoje = new Date();
     hoje.setHours(8, 0, 0, 0);
     
     const diaMax = addDays(hoje, 5);
     diaMax.setHours(20, 0, 0, 0);

    // Adicione esse estado para controlar a data atual
     const [dataAtual, setDataAtual] = useState<Date>(new Date()); 
     const [eventos, setEventos] = useState<EventType[]>([]);
     const [dataMin, setDataMin] = useState<Date>(hoje);
     const [dataMax, setDataMax] = useState<Date>(diaMax);

     const handleEventClick = useCallback((event: EventType) => {
          // if (window.confirm(`Remover evento "${event.title}"?`)) {
          //      setEventos(prev => prev.filter(e => e !== event));
          // }
     }, []);

     useEffect(() => {
        const events: EventType[] = dados.map(element => ({
          ...element,
          start: new Date(element.start),
          end: new Date(element.end),
        }));
        setEventos(events);
    }, [atualiza]);

     useEffect(() =>{
          console.log(eventos);
     }, [eventos])

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
