"use client";
import Input from "@/app/ComponentsSistema/input/input";
import BotaoAmarelo from "@/components/botaoAmarelo/botaoAmarelo";
import BotaoVermelho from "@/components/botaoVermelho/botaoAzul";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import TabelaPacientes from "@/components/TablePacientes/page";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import { CreateAgendamentoDto, CreatePacienteDto, ReadAgendamentoDto, TipoConsultaLabel, UpdateAgendamentoDto } from "@/interfaces/interfacesDto";
import { aplicarMascaraCPF, aplicarMascaraTelefone, filtrarCaracteresEmail } from "@/utils/mascaras";
import { Calendar, LoaderCircle, PlusCircle, Send, Table, X } from "lucide-react";
import { useEffect, useState } from "react";


const Pacientes = () =>{
     const { postPaciente } = useApi();
     const [carregando, setCarregando] = useState(false);
     const [editando, setEditando] = useState(false);
     const [mensagemErro, setMensagemErro] = useState("");
     const [reloadTabela, setReloadTabela] = useState(0);
     const [mostrarModal, setMostrarModal] = useState(false); 
     const [mostrarModalErro, setMostrarModalErro] = useState(false); 
     const [mostrarModeSucesso, setMostrarModalSucesso] = useState(false); 
     const [mostrarModalEdicao, setmostrarModalEdicao] = useState(false);
     const [idPaciente, setIdPaciente] = useState<number>(0);
     const [novoPaciente, setNovoPaciente] = useState<CreatePacienteDto>({
          nome: "",
          cpf: "",
          dataNascimento: "",
          email: "",
          telefone: ""
     });

     const onConfirmarCadastroPaciente = () => {
          setCarregando(true);
          setMostrarModal(true);
     }

     const onCloseModal = () => {
          setCarregando(false);
          setMostrarModal(false);
          setMostrarModalErro(false);
     }

     const onCadastraPaciente = async () => {
          setCarregando(true);
          try {
               await postPaciente(novoPaciente);
               setMostrarModalSucesso(true);
               setMostrarModal(false);
               setTimeout(() => {
                    setMostrarModalSucesso(false);
                    setReloadTabela(reloadTabela + 1);
                    setCarregando(false);    
                    setNovoPaciente({
                         nome: "",
                         cpf: "",
                         dataNascimento: "",
                         email: "",
                         telefone: ""
                    });
               }, 3000);
          } catch (error: any) {
               setCarregando(false);

               if (error.response) {
                    // Erro de resposta da API
                   if (error.status === 400) {
                         setMensagemErro(error.response.data?.title ?? 'Erro desconhecido.');
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

     // const onParaEdicao = () => 
     // {
     //      setEditando(false);

     //      setNovoAgendamento({
     //           dataHoraConsulta: new Date(),
     //           pacienteId: 0,
     //           tipoConsulta: 1
     //      });
     // }

     // const onEditarAgendamento = async (agendamentoSelecionado: ReadAgendamentoDto) => {
     //      console.log(agendamentoSelecionado);
     //      setEditando(true);

     //      setIdAgendamento(agendamentoSelecionado.id);

     //      setNovoAgendamento({
     //           dataHoraConsulta: agendamentoSelecionado.dataHoraConsulta,
     //           pacienteId: agendamentoSelecionado.paciente.id,
     //           tipoConsulta: Number(agendamentoSelecionado.tipoConsulta)
     //      });

     // };
     
     // const editaAgendamentoPosConfirmacao = async () => {
     //      try {
     //           setCarregando(true);
     //           const agendamentoAAtualziar: UpdateAgendamentoDto = {
     //                dataHoraConsulta: novoAgendamento.dataHoraConsulta,
     //                pacienteId: novoAgendamento.pacienteId,
     //                tipoConsulta: Number(novoAgendamento.tipoConsulta)
     //           }
     //           await putEditarAgendamento(idAgendamento, agendamentoAAtualziar);
     //           setReloadTabela(prev => prev + 1);
     //           setNovoAgendamento({
     //                dataHoraConsulta: new Date(),
     //                pacienteId: 0,
     //                tipoConsulta: 1
     //           });
     //           setMostrarModalSucesso(true);
     //           setmostrarModalEdicao(false);
     //      }
     //      catch (error: any) {
     //           setMensagemErro('Verifique os campos preenchidos');
     //           console.log(error);
     //           setMostrarModalErro(true)
     //      }
     //      finally {
     //           setCarregando(false);
     //           setEditando(false);
     //           setNovoAgendamento({
     //                dataHoraConsulta: new Date(),
     //                pacienteId: 0,
     //                tipoConsulta: 1
     //           });;
     //      }
     // };

     const onConfirmarEdicao = () => {
          setmostrarModalEdicao(true);
     }

     useEffect(() => {
          console.log(novoPaciente);
     }, [novoPaciente])

     return (
     <div className="w-full flex flex-col gap-6 p-6 min-h-screen">

          <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Confirmar Cadastro De Paciente</DialogTitle>
                         <DialogDescription>
                              Tem certeza que deseja realizar este cadastro?
                         </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                         <button
                         className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                         onClick={onCadastraPaciente}
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
                              <DialogTitle>Sucesso!</DialogTitle>
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
                         <label className="text-[16px] text-slate-600">Nome</label>
                         <Input
                              type="text"
                              classes="w-full border border-slate-300 rounded px-3 py-2 justify-between text-left text-sm font-medium shadow-sm bg-white hover:bg-muted transition" 
                              placeholder="Nome Paciente" 
                              onChangeParam={(value) => {

                                   setNovoPaciente({
                                        ...novoPaciente,
                                        nome: value,
                                   })
                              }}
                              valueParam={novoPaciente.nome}
                         />
                    </div>
                    <div className="flex flex-col">
                         <label className="text-[16px] text-slate-600">CPF</label>
                         <Input
                              type="text"
                              classes="w-full border border-slate-300 rounded px-3 py-2 justify-between text-left text-sm font-medium shadow-sm bg-white hover:bg-muted transition" 
                              placeholder="000.000.000-00" 
                              onChangeParam={(value) => {
                                   const apenasNumeros = value.replace(/\D/g, '');
                                   setNovoPaciente({
                                        ...novoPaciente,
                                        cpf: apenasNumeros,
                                   })
                              }}
                              valueParam={aplicarMascaraCPF(novoPaciente.cpf)}
                              maxLengthParam={14}
                         />
                         </div>
                    <div>
                         <label className="text-sm text-slate-600">Telefone</label>
                         <Input
                              type="text" 
                              classes="w-full border border-slate-300 rounded px-3 py-2 justify-between text-left text-sm font-medium shadow-sm bg-white hover:bg-muted transition" 
                              placeholder="(00) 0 0000-0000" 
                              onChangeParam={(value) => {
                                   
                                   const apenasNumeros = value.replace(/\D/g, '');
                                   setNovoPaciente({
                                        ...novoPaciente,
                                        telefone: apenasNumeros,
                                   })
                              }}
                              valueParam={aplicarMascaraTelefone(novoPaciente.telefone)}
                         />
                    </div>
                   
                    <div>
                         <label className="text-sm text-slate-600">E-mail</label>
                         <Input
                              type="text" 
                              classes="w-full border border-slate-300 rounded px-3 py-2 justify-between text-left text-sm font-medium shadow-sm bg-white hover:bg-muted transition" 
                              placeholder="email@gmail.com" 
                              onChangeParam={(value) => {
                                    const emailLimpo = filtrarCaracteresEmail(value);
                                   setNovoPaciente({
                                        ...novoPaciente,
                                        email: value,
                                   })
                              }}
                              valueParam={novoPaciente.email}
                         />
                    </div>

                    <div className="flex flex-col">
                         <label className="text-[16px] text-slate-600">Data de nascimento</label>
                         <DatePicker
                         value={novoPaciente.dataNascimento ? new Date(novoPaciente.dataNascimento) : undefined}
                         onChange={(value) =>
                              setNovoPaciente({
                              ...novoPaciente,
                              dataNascimento: value.toISOString().split("T")[0], // só a data no formato YYYY-MM-DD
                              })
                         }
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

                              <BotaoVermelho disabled={carregando}>
                                   <X size={20} className="w-4 h-4" /> Parar Edição
                              </BotaoVermelho>
                         </div>
                         ) : (
                         <BotaoAmarelo onClick={onConfirmarCadastroPaciente} disabled={carregando}>
                              {carregando ? (
                                   <LoaderCircle className="animate-spin w-4 h-4" />
                              ) : (
                                   <Send className="w-4 h-4 mr-2" />
                              )}
                                   Cadastrar
                         </BotaoAmarelo>
                         )}

                         
                    </div>
               </div>

          </section>

          <TabelaPacientes atualizarTabela={reloadTabela} />
     </div>
     );
}

export default Pacientes;