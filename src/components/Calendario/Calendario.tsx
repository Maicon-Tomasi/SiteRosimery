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
     dados: EventType[]
}



const Calendario = ({dados}: CalendarioProps) => {
     const hoje = new Date();
     hoje.setHours(8, 0, 0, 0);
     
     const diaMax = addDays(hoje, 5);
     diaMax.setHours(18, 0, 0, 0);

     const [eventos, setEventos] = useState<EventType[]>();
     const [dataMin, setDataMin] = useState<Date>(hoje);
     const [dataMax, setDataMax] = useState<Date>(diaMax);

     const handleEventClick = useCallback((event: EventType) => {
          // if (window.confirm(`Remover evento "${event.title}"?`)) {
          //      setEventos(prev => prev.filter(e => e !== event));
          // }
     }, []);

     useEffect(() => {
          const events: EventType[] = [];
          dados.forEach(element => {
               events.push(element);
          });
          setEventos(events);
     }, [dados]); 

     useEffect(() =>{
          console.log(eventos);
     }, [eventos])

  return (
    <div className="rounded-xl border border-[#e2cfcf] bg-[#fbeeee] p-4 shadow-md">
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        style={{ height: '70vh' }}
        min={dataMin}
        max={dataMax}
        onSelectEvent={handleEventClick}
        className="custom-calendar"
        toolbar
        messages={{
          next: 'Próximo',
          previous: 'Voltar',
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          agenda: 'Agenda',
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
