"use client";
import BotaoAmarelo from "@/components/botaoAmarelo/botaoAmarelo";
import BotaoVermelho from "@/components/botaoVermelho/botaoAzul";
import Calendario from "@/components/Calendario/Calendario";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import FileUploader from "@/components/fileUploader/FileUploader";
import Input from "@/components/input/input";
import TabelaAgendamentos from "@/components/TableAgendamentos/page";
import TabelaConsultasRealizadas from "@/components/TableConsultasRealizadas/page";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import { CreateAgendamentoDto, CreateConsultaEArquivosDto, CreateConsultasRealizadasDto, CreateUpdateArquivoConsultas, ReadAgendamentoDto, ReadPacienteDto, TipoConsulta, TipoConsultaLabel } from "@/interfaces/interfacesDto";
import { addHours } from "date-fns";
import { Calendar, LoaderCircle, PlusCircle, Send, Table, X } from "lucide-react";
import { useEffect, useState } from "react";


const ConsutasRealizadas = () =>{
     const { getPacientes, postCriaArquivoEConsulta} = useApi();
     const [modoDeVisualizacao, setModoDeVisualizacao] = useState(false);
     const [carregando, setCarregando] = useState(false);
     const [editando, setEditando] = useState(false);
     const [mensagemErro, setMensagemErro] = useState("");
     const [mensagemSucesso, setMensagemSucesso] = useState("");
     const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null)
     const [opcoesPaciente, setOpcoesPaciente] = useState<{ value: string; label: string }[]>([]);
     const [reloadTabela, setReloadTabela] = useState(0);
     const [mostrarModal, setMostrarModal] = useState(false); 
     const [mostrarModalErro, setMostrarModalErro] = useState(false); 
     const [mostrarModeSucesso, setMostrarModalSucesso] = useState(false); 
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

     const confirmaCriacaoDeConsultaRealizada = () => {
          setCarregando(true);
          setMostrarModal(true);
     }

     const onCloseModal = () => {
          setCarregando(false);
          setMostrarModal(false);
          setMostrarModalErro(false);
     }

     const onConfimarConsultaRealizada = async () =>{
         let criaERelacionaArquivos: CreateConsultaEArquivosDto = {
           consultas: novaConsultaRealizada ? novaConsultaRealizada : [],
           arquivos: arquivosSelecionados
         }
     
         console.log(novaConsultaRealizada);
         console.log(arquivosSelecionados);
         console.log("cria", criaERelacionaArquivos);
         try
         {
           var response = await postCriaArquivoEConsulta(criaERelacionaArquivos);
           if (response.status == 200 || response.status == 204) {
             setMensagemSucesso("Sua consulta foi confirmada e salva com sucesso");
             setMostrarModalSucesso(true);
             setArquivosSelecionados([]);
             setReloadTabela((prev) => prev + 1);
           }
           console.log(response);
         }
         catch (error: any)
         {
           // setCarregando(false);
           if (error.response) {
               // Erro de resposta da API
               if (error.status === 400) {
                     setMensagemErro(error.response.data);
               } else {
                     setMensagemErro("Erro ao realizar consulta, verifique as informações");
               }
               setMostrarModalErro(true);
           } else {
               // Erro de rede ou outro
               setMostrarModalErro(true);
               setMensagemErro("Erro de conexão ou inesperado.");
           }
         }
     
       };

    useEffect(() => {
        carregarPacientes();
     }, []);
    
     useEffect(() => {
        console.log(novaConsultaRealizada);
     }, [novaConsultaRealizada]);
     
     useEffect(() => {
        console.log(arquivosSelecionados);
     }, [arquivosSelecionados]);

     return (
     <div className="w-full flex flex-col gap-6 p-6 min-h-screen">

          <Dialog open={mostrarModeSucesso} onOpenChange={setMostrarModalSucesso}>
               <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Sucesso!</DialogTitle>
                    <DialogDescription>
                    {
                         typeof mensagemSucesso === "string"
                         ? mensagemSucesso
                         : JSON.stringify(mensagemSucesso, null, 2)
                         }
                    </DialogDescription>
                    </DialogHeader>
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
                                   setNovaConsultaRealizada(novaConsultaRealizada);
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
                              setNovaConsultaRealizada(novaConsultaRealizada);
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
                                   setNovaConsultaRealizada(novaConsultaRealizada);     
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
                              setNovaConsultaRealizada(novaConsultaRealizada);     
                         }
                    }
                    ></textarea>
               </div>

               
               <div className="mt-4">
                    <label className="text-sm text-slate-600">Arquivos*</label>
                    <FileUploader 
                         onFilesSelected={(arquivos) => {
                              const arquivosFormatados = arquivos.map((file) => ({
                                   arquivo: file,
                              }));

                              setArquivosSelecionados(arquivosFormatados);
                         }}
                    />
               </div>

               {/* Botões */}
               <div className="flex gap-5 mt-6 items-center justify-center flex-wrap">
               <BotaoAmarelo>
                    <PlusCircle size={16} />
               </BotaoAmarelo>

               {editando ? (
                    <div className="flex gap-4 flex-wrap">
                    <BotaoAmarelo disabled={carregando}>
                         {carregando ? (
                         <LoaderCircle className="animate-spin w-4 h-4" />
                         ) : (
                         <>
                         <PlusCircle className="w-4 h-4 mr-2" />
                         Editar
                         </>
                         )}
                    </BotaoAmarelo>

                    <BotaoVermelho disabled={carregando}>
                         <X size={20} className="w-4 h-4" /> Parar Edição
                    </BotaoVermelho>
                    </div>
               ) : (
                    <BotaoAmarelo onClick={confirmaCriacaoDeConsultaRealizada} disabled={carregando}>
                    {carregando ? (
                         <LoaderCircle className="animate-spin w-4 h-4" />
                    ) : (
                         <>
                         <Send className="w-4 h-4 mr-2" />
                         Cadastrar
                         </>
                    )}
                    </BotaoAmarelo>
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

          {!modoDeVisualizacao ? <TabelaConsultasRealizadas atualizarTabela={reloadTabela}/> : <Calendario />}
     </div>
     );
}

export default ConsutasRealizadas;