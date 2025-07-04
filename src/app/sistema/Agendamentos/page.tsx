"use client";
import BotaoAmarelo from "@/components/botaoAmarelo/botaoAmarelo";
import BotaoVermelho from "@/components/botaoVermelho/botaoAzul";
import Calendario from "@/components/Calendario/Calendario";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import TabelaAgendamentos from "@/components/TableAgendamentos/page";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import { CreateAgendamentoDto, ReadAgendamentoDto, ReadPacienteDto, TipoConsulta, TipoConsultaLabel, UpdateAgendamentoDto } from "@/interfaces/interfacesDto";
import { addHours } from "date-fns";
import { Calendar, LoaderCircle, PlusCircle, Send, Table, X } from "lucide-react";
import { useEffect, useState } from "react";


const Agendamento = () =>{
     const { getPacientes, postAgendamento, putEditarAgendamento} = useApi();
     const [modoDeVisualizacao, setModoDeVisualizacao] = useState(false);
     const [carregando, setCarregando] = useState(false);
     const [editando, setEditando] = useState(false);
     const [mensagemErro, setMensagemErro] = useState("");
     const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null)
     const [opcoesPaciente, setOpcoesPaciente] = useState<{ value: string; label: string }[]>([]);
     const [reloadTabela, setReloadTabela] = useState(0);
     const [mostrarModal, setMostrarModal] = useState(false); 
     const [mostrarModalErro, setMostrarModalErro] = useState(false); 
     const [mostrarModeSucesso, setMostrarModalSucesso] = useState(false); 
     const [mostrarModalEdicao, setmostrarModalEdicao] = useState(false); 
     const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<ReadAgendamentoDto>();
     const [idAgendamento, setIdAgendamento] = useState<number>(0);
     const [novoAgendamento, setNovoAgendamento] = useState<CreateAgendamentoDto>({
          dataHoraConsulta: new Date(),
          tipoConsulta: 0,
          pacienteId: 0
     });

     const carregarPacientes = async () => {
      const dados = await getPacientes();
     const formatadas = dados.map((p) => ({
     value: p.id.toString(),
     label: p.nome
     }));

      setOpcoesPaciente(formatadas);

      console.log(dados);
    };

    const opcoesTipoConsulta = Object.entries(TipoConsultaLabel).map(([value, label]) => ({
          value,
          label,
     }));

     const confirmaCriacaoDeAgendamento = () => {
          setCarregando(true);
          setMostrarModal(true);
     }

     const onCloseModal = () => {
          setCarregando(false);
          setMostrarModal(false);
          setMostrarModalErro(false);
     }

     const onCadastarAgendamento = async () => {
          setCarregando(true);
          try {
               const response = await postAgendamento(novoAgendamento);
               setMostrarModalSucesso(true);
               setMostrarModal(false);
               setTimeout(() => {
                    setMostrarModalSucesso(false);
                    setReloadTabela(reloadTabela + 1);
                    setCarregando(false);
                    setNovoAgendamento({
                         dataHoraConsulta: new Date(),
                         tipoConsulta: 0,
                         pacienteId: 0
                    });
               }, 3000);
          } catch (error: any) {
               setCarregando(false);
               if (error.response) {
                    // Erro de resposta da API
                    if (error.status === 400) {
                         setMensagemErro(error.response.data);
                    } else {
                         setMensagemErro("Erro ao realizar agendamento, verifique as informações");
                    }
                    setMostrarModalErro(true);
               } else {
                    // Erro de rede ou outro
                    setMostrarModalErro(true);
                    setMensagemErro("Erro de conexão ou inesperado.");
               }
          }
     };

     const onParaEdicao = () => 
     {
          setEditando(false);

          setNovoAgendamento({
               dataHoraConsulta: new Date(),
               pacienteId: 0,
               tipoConsulta: 1
          });
     }

     const onEditarAgendamento = async (agendamentoSelecionado: ReadAgendamentoDto) => {
          console.log(agendamentoSelecionado);
          setEditando(true);

          setIdAgendamento(agendamentoSelecionado.id);

          setNovoAgendamento({
               dataHoraConsulta: agendamentoSelecionado.dataHoraConsulta,
               pacienteId: agendamentoSelecionado.paciente.id,
               tipoConsulta: Number(agendamentoSelecionado.tipoConsulta)
          });

     };
     
     const editaAgendamentoPosConfirmacao = async () => {
          try {
               setCarregando(true);
               let agendamentoAAtualziar: UpdateAgendamentoDto = {
                    dataHoraConsulta: novoAgendamento.dataHoraConsulta,
                    pacienteId: novoAgendamento.pacienteId,
                    tipoConsulta: Number(novoAgendamento.tipoConsulta)
               }
               await putEditarAgendamento(idAgendamento, agendamentoAAtualziar);
               setReloadTabela(prev => prev + 1);
               setNovoAgendamento({
                    dataHoraConsulta: new Date(),
                    pacienteId: 0,
                    tipoConsulta: 1
               });
          }
          catch (error: any) {
               setMensagemErro('Preencha todos os campos obrigatórios! E verifque se não há duplicação de código de produto!');
               setMostrarModalErro(true)
          }
          finally {
               setCarregando(false);
               setEditando(false);
               setNovoAgendamento({
                    dataHoraConsulta: new Date(),
                    pacienteId: 0,
                    tipoConsulta: 1
               });;
          }
     };

     const onConfirmarEdicao = () => {
          setmostrarModalEdicao(true);
     }

    useEffect(() => {
        carregarPacientes();
     }, []);

     return (
     <div className="w-full flex flex-col gap-6 p-6 min-h-screen">

          <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Confirmar Agendamento</DialogTitle>
                         <DialogDescription>
                              Tem certeza que deseja realizar este agendamento?
                         </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                         <button
                         className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                         onClick={onCadastarAgendamento}
                         >
                              Confirmar
                         </button>
                         <button
                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                         onClick={onCloseModal}
                         >
                              Cancelar
                         </button>
                    </div>
               </DialogContent>
          </Dialog>
          
          <Dialog open={mostrarModalEdicao} onOpenChange={setmostrarModalEdicao}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Confirmar Edição</DialogTitle>
                         <DialogDescription>
                              Tem certeza que deseja realizar esta edição?
                         </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                         <button
                         className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                         onClick={editaAgendamentoPosConfirmacao}
                         >
                              Confirmar
                         </button>
                         <button
                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                         onClick={onCloseModal}
                         >
                              Cancelar
                         </button>
                    </div>
               </DialogContent>
          </Dialog>

               <Dialog open={mostrarModalErro} onOpenChange={setMostrarModalErro}>
                    <DialogContent>
                         <DialogHeader>
                              <DialogTitle>Erro</DialogTitle>
                         <DialogDescription>
                              {mensagemErro}
                         </DialogDescription>
                         </DialogHeader>
                              <div className="flex justify-end gap-4 mt-4">
                                   <button
                                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                   onClick={onCloseModal}
                                   >
                                        Cancelar
                                   </button>
                              </div>
                    </DialogContent>
               </Dialog>

                <Dialog open={mostrarModeSucesso} onOpenChange={setMostrarModalSucesso}>
                    <DialogContent>
                         <DialogHeader>
                              <DialogTitle>Agendamento Realizado</DialogTitle>
                         <DialogDescription>
                             Sucesso! Agendamento realizado com sucesso. <br />
                              Está modal será fechada em 3 segundos.
                         </DialogDescription>
                         </DialogHeader>
                    </DialogContent>
               </Dialog>


          <header className="flex items-center justify-between">
               <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">
                    Agendamentos
               </h1>
          </header>

          <section className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
               <div className="flex gap-4 flex-wrap">
                    <div>
                         <label className="text-[16px] text-slate-600">Paciente</label>
                         <ComboboxDemo
                              opcoes={opcoesPaciente}
                              onSelectProp={(value) => setNovoAgendamento({ ...novoAgendamento, pacienteId:  Number(value) })}
                              value={novoAgendamento.pacienteId.toString()}
                         />
                    </div>
                    <div className="flex flex-col">
                         <label className="text-[16px] text-slate-600">Data e hora do agendamento</label>
                         <DatePicker
                              value={novoAgendamento.dataHoraConsulta}
                              onChange={(value) =>
                                   setNovoAgendamento({
                                        ...novoAgendamento,
                                        dataHoraConsulta: value instanceof Date ? value : new Date(value),
                                   })
                              }
                         />                    </div>

                    <div>
                         <label className="text-sm text-slate-600">Tipo consulta*</label>
                         <ComboboxDemo
                                   opcoes={opcoesTipoConsulta}
                                   onSelectProp={(value) => setNovoAgendamento({ ...novoAgendamento, tipoConsulta: Number(value) })}
                                   value={novoAgendamento.tipoConsulta.toString()}
                              />
                    </div>
                    
                    
                    <div className="flex gap-5 mt-6 items-center justify-center">
                         <div className="">
                              <BotaoAmarelo >
                                   <PlusCircle size={16}/>
                              </BotaoAmarelo>
                         </div>

                         {editando ? (
                         <div className="flex gap-4">
                              <BotaoAmarelo disabled={carregando} onClick={onConfirmarEdicao}>
                              {carregando ? (
                                   <LoaderCircle className="animate-spin w-4 h-4" />
                              ) : (
                                   <PlusCircle className="w-4 h-4 mr-2" />
                              )}
                              Editar
                              </BotaoAmarelo>

                              <BotaoVermelho onClick={onParaEdicao} disabled={carregando}>
                                   <X size={20} className="w-4 h-4" /> Parar Edição
                              </BotaoVermelho>
                         </div>
                         ) : (
                         <BotaoAmarelo onClick={confirmaCriacaoDeAgendamento} disabled={carregando}>
                              {carregando ? (
                                   <LoaderCircle className="animate-spin w-4 h-4" />
                              ) : (
                                   <Send className="w-4 h-4 mr-2" />
                              )}
                                   Agendar
                         </BotaoAmarelo>
                         )}

                         
                    </div>
               </div>

          </section>
          <div className="flex justify-center gap-4 w-25 bg-white p-1 rounded-md shadow-sm border border-slate-200">
          <Table
               onClick={() => setModoDeVisualizacao(false)}
               className={
                    !modoDeVisualizacao
                    ? "text-center bg-[#d49f43] rounded-[10px] w-1/2 cursor-pointer"
                    : "rounded-xl hover:bg-[#f5e7d0] w-1/2 cursor-pointer"
               }
               color={!modoDeVisualizacao ? "white" : "#d49f43"}
          />

          <Calendar
               onClick={() => setModoDeVisualizacao(true)}
               className={
                    modoDeVisualizacao
                    ? "text-center bg-[#d49f43] rounded-2xl w-1/2 cursor-pointer"
                    : "text-center rounded-2xl hover:bg-[#f5e7d0] w-1/2 cursor-pointer"
               }
               color={modoDeVisualizacao ? "white" : "#d49f43"}
          />
          </div>

          {!modoDeVisualizacao ? <TabelaAgendamentos atualizarTabela={reloadTabela} onEditarAgendamento={onEditarAgendamento}/> : <Calendario />}
     </div>
     );
}

export default Agendamento;