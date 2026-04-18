"use client";
import BotaoAmarelo from "@/components/botaoAmarelo/botaoAmarelo";
import BotaoVermelho from "@/components/botaoVermelho/botaoAzul";
import CalendarioConsultasRealizadas from "@/components/Calendario/CalendarioConsultasRealizadas";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import Input from "@/app/ComponentsSistema/input/input";
import TabelaConsultasRealizadas from "@/components/TableConsultasRealizadas/page";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import { CreateConsultaEArquivosDto, CreateConsultasRealizadasDto, CreateUpdateArquivoConsultas, ReadConsultasRealizadasDto, TipoConsultaLabel, UpdateConsultasRealizadasDto } from "@/interfaces/interfacesDto";
import { Calendar, LoaderCircle, PlusCircle, Table, X } from "lucide-react";
import { useEffect, useState } from "react";


const ConsutasRealizadas = () =>{
     const { getPacientes, postCriaArquivoEConsulta, putEditarConsulta} = useApi();
     const [modoDeVisualizacao, setModoDeVisualizacao] = useState(false);
     const [carregando, setCarregando] = useState(false);
     const [editando, setEditando] = useState(false);
     const [mensagemErro, setMensagemErro] = useState("");
     const [mensagemSucesso, setMensagemSucesso] = useState("");
     const [opcoesPaciente, setOpcoesPaciente] = useState<{ value: string; label: string }[]>([]);
     const [reloadTabela, setReloadTabela] = useState(0);
     const [mostrarModal, setMostrarModal] = useState(false); 
     const [mostrarModalErro, setMostrarModalErro] = useState(false); 
     const [mostrarModeSucesso, setMostrarModalSucesso] = useState(false); 
     const [mostrarModalEdicao, setmostrarModalEdicao] = useState(false); 
     const [idConsultaRealizada, setIdConsultaRealizada] = useState<number>(0); 
     const [arquivosSelecionados, setArquivosSelecionados] = useState<CreateUpdateArquivoConsultas[]>([]);
     const [novaConsultaRealizada, setNovaConsultaRealizada] = useState<CreateConsultasRealizadasDto[]>([{
          dataHoraConsulta: new Date(),
          tipoConsulta: 0,
          pacienteId: 0,
          descricao: ""
     }])
     ;

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

     const onCloseModal = () => {
          setCarregando(false);
          setMostrarModal(false);
          setMostrarModalErro(false);
          setmostrarModalEdicao(false);
          setMostrarModalSucesso(false);
     }

     const onConfimarConsultaRealizada = async () =>{
         const criaERelacionaArquivos: CreateConsultaEArquivosDto = {
           consultas: novaConsultaRealizada ? novaConsultaRealizada : [],
           arquivos: arquivosSelecionados
         }
     
         try
         {
           const response = await postCriaArquivoEConsulta(criaERelacionaArquivos);
           if (response.status == 200 || response.status == 204) {
             setMensagemSucesso("Sua consulta foi confirmada e salva com sucesso");
             setMostrarModalSucesso(true);
             setArquivosSelecionados([]);
             setReloadTabela((prev) => prev + 1);
           }
         }
         catch (error: any)
         {
           if (error.response) {
               if (error.status === 400) {
                     setMensagemErro(error.response.data);
               } else {
                     setMensagemErro("Erro ao realizar consulta, verifique as informações");
               }
               setMostrarModalErro(true);
           } else {
               setMostrarModalErro(true);
               setMensagemErro("Erro de conexão ou inesperado.");
           }
         }
     };

     const onEditar = async (consultaRealizada: ReadConsultasRealizadasDto) => {
          setEditando(true);
          setIdConsultaRealizada(consultaRealizada.id);

          setNovaConsultaRealizada([{
               dataHoraConsulta: new Date(consultaRealizada.dataHoraConsulta),
               pacienteId: consultaRealizada.paciente.id,
               tipoConsulta: Number(consultaRealizada.tipoConsulta),
               descricao: consultaRealizada.descricao
          }]);
     };

     const onPararEdicao = () => {
          setEditando(false);
          setNovaConsultaRealizada([{
               dataHoraConsulta: new Date(),
               pacienteId: 0,
               tipoConsulta: 0,
               descricao: ""
          }]);
     }

     const onConfirmarEdicao = () => {
          setmostrarModalEdicao(true);
     }

     const editaConsultaPosConfirmacao = async () => {
          try {
               setCarregando(true);
               const consultaAAtualziar: UpdateConsultasRealizadasDto = {
                    dataHoraConsulta: novaConsultaRealizada[0].dataHoraConsulta,
                    pacienteId: novaConsultaRealizada[0].pacienteId,
                    tipoConsulta: Number(novaConsultaRealizada[0].tipoConsulta),
                    descricao: novaConsultaRealizada[0].descricao
               }
               await putEditarConsulta(idConsultaRealizada, consultaAAtualziar);
               setReloadTabela(prev => prev + 1);
               onPararEdicao();
               setMensagemSucesso("Sucesso!! Sua consulta foi editada!")
               setMostrarModalSucesso(true);
               setmostrarModalEdicao(false);
          }
          catch (error: unknown) {
               setMensagemErro('Verifique os campos preenchidos');
               setMostrarModalErro(true)
          }
          finally {
               setCarregando(false);
          }
     };

    useEffect(() => {
        carregarPacientes();
     }, []);

     return (
     <div className="w-full flex flex-col gap-6 p-6 min-h-screen">

          <Dialog open={mostrarModeSucesso} onOpenChange={setMostrarModalSucesso}>
               <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Sucesso!</DialogTitle>
                    <DialogDescription>
                         {mensagemSucesso}
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                         <button
                         className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                         onClick={onCloseModal}
                         >
                              OK
                         </button>
                    </div>
               </DialogContent>
          </Dialog>

          <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Confirmar Consulta Realizada</DialogTitle>
                    <DialogDescription>
                         Tem certeza que deseja cadastrar esta consulta?
                    </DialogDescription>
                    </DialogHeader>
                         <div className="flex justify-end gap-4 mt-4">
                              <button
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                              onClick={onConfimarConsultaRealizada}
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
                                        Fechar
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
                              onClick={editaConsultaPosConfirmacao}
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


          <header className="flex items-center justify-between">
               <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">
                    Consultas Realizadas
               </h1>
          </header>

          <section className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
               <div className="flex flex-wrap gap-4">
                    {/* Paciente */}
                    <div className="flex flex-col min-w-[250px] flex-1">
                         <label className="text-[16px] text-slate-600">Paciente</label>
                         <ComboboxDemo
                         opcoes={opcoesPaciente}
                         onSelectProp={(value) =>{
                                   const novasConsultas = [...novaConsultaRealizada];
                                   novasConsultas[0].pacienteId = Number(value);
                                   setNovaConsultaRealizada(novasConsultas);
                              }
                         }
                         value={novaConsultaRealizada[0].pacienteId.toString()}
                         />
                    </div>

                    {/* Data e hora */}
                    <div className="flex flex-col min-w-[250px] flex-1">
                         <label className="text-[16px] text-slate-600">Data e hora do agendamento</label>
                         <DatePicker
                         value={novaConsultaRealizada[0].dataHoraConsulta}
                         onChange={(value) =>{
                              const novasConsultas = [...novaConsultaRealizada]
                              novasConsultas[0].dataHoraConsulta = value;
                              setNovaConsultaRealizada(novasConsultas);
                         }}
                         />
                    </div>
                    
                    <div className="flex flex-col min-w-[250px] flex-1">
                         <label className="text-[16px] text-slate-600">Valor</label>
                         <Input
                              type="text" 
                              disabled={true} 
                              classes="w-full border border-slate-300 rounded px-3 py-2 justify-between text-left text-sm font-medium shadow-sm bg-white hover:bg-muted transition" 
                              placeholder="Valor da consulta" 
                              onChangeParam={(aaa) => console.log(aaa)}
                         />
                    </div>

                    {/* Tipo de consulta */}
                    <div className="flex flex-col min-w-[250px] flex-1">
                         <label className="text-sm text-slate-600">Tipo consulta*</label>
                         <ComboboxDemo
                         opcoes={opcoesTipoConsulta}
                         onSelectProp={(value) =>
                              {
                                   const novasConsultas = [...novaConsultaRealizada]
                                   novasConsultas[0].tipoConsulta = Number(value);
                                   setNovaConsultaRealizada(novasConsultas);     
                              }
                         }
                         value={novaConsultaRealizada[0].tipoConsulta.toString()}
                         />
                    </div>
               </div>

               {/* Textarea de descrição */}
               <div className="mt-4">
                    <label className="text-sm text-slate-600">Descrição*</label>
                    <textarea
                    placeholder="Descrição"
                    className="w-full p-2 resize-y border border-slate-300 rounded-md"
                    rows={4}
                    onChange={(e) =>{
                              const novasConsultas = [...novaConsultaRealizada]
                              novasConsultas[0].descricao = e.target.value;
                              setNovaConsultaRealizada(novasConsultas);     
                         }
                    }
                    value={novaConsultaRealizada[0].descricao.toString()}
                    ></textarea>
               </div>

               {/* Botões */}
               <div className="flex gap-5 mt-6 items-center justify-center flex-wrap">

               {editando ? (
                    <div className="flex gap-4 flex-wrap">
                    <BotaoAmarelo disabled={carregando} onClick={onConfirmarEdicao}>
                         {carregando ? (
                         <LoaderCircle className="animate-spin w-4 h-4" />
                         ) : (
                         <>
                         <PlusCircle className="w-4 h-4 mr-2" />
                         Editar
                         </>
                         )}
                    </BotaoAmarelo>

                    <BotaoVermelho disabled={carregando} onClick={onPararEdicao}>
                         <X size={20} className="w-4 h-4" /> Parar Edição
                    </BotaoVermelho>
                    </div>
               ) : (
                    ''
               )}
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

          {!modoDeVisualizacao ? <TabelaConsultasRealizadas atualizarTabela={reloadTabela} onEditarConsultaRealizada={onEditar}/> : <CalendarioConsultasRealizadas />}
     </div>
     );
}

export default ConsutasRealizadas;
