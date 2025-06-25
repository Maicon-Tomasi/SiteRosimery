"use client";
import TabelaAgendamentos from "@/components/TableAgendamentos/page";
import { useState } from "react";


const Agendamento = () =>{

     const [reloadTabela, setReloadTabela] = useState(0);

     return (
     <div className="w-full flex flex-col gap-6 p-6 min-h-screen">
          <header className="flex items-center justify-between">
               <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">
                    Agendamentos
               </h1>
          </header>

          <TabelaAgendamentos atualizarTabela={reloadTabela}/>
     </div>
     );
}

export default Agendamento;