"use cliente";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { CreateConsultaEArquivosDto, CreateConsultasRealizadasDto, CreateUpdateArquivoConsultas, ReadAgendamentoDto, TipoConsulta, TipoConsultaLabel } from "@/interfaces/interfacesDto";
import { Check, Pen, Trash, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip } from "@radix-ui/react-tooltip";

interface TableProps {
     atualizarTabela: number;
     // onEditarCidade: (cidade: any) => void; // Ajuste o tipo conforme necessário
}

const TabelaAgendamentos = ({ atualizarTabela } :TableProps) => {
  const { getAgendamentos, deleteAgendamento, postCriaArquivoEConsulta } = useApi();
  const [agendamentos, setAgendamentos] = useState<ReadAgendamentoDto[]>([]);
  const [pesquisaNome, setPesquisaNome] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mostrarModalSubirArquivos, setmostrarModalSubirArquivos] = useState(false); 
  const [idParaExcluir, setIdParaExcluir] = useState<number>(0); 
  const [arquivosSelecionados, setArquivosSelecionados] = useState<CreateUpdateArquivoConsultas[]>([]);
  const [consultaRealizadaSelecionada, setConsultaRealizadaSelecionada] = useState<CreateConsultasRealizadasDto[]>();

  const carregarAgendamentos = async () => {
      const dados = await getAgendamentos();
      setAgendamentos(dados);
      console.log(dados);
  };

  const onDeletarAgendamento = async () => {
      try {
        await deleteAgendamento(idParaExcluir);

        carregarAgendamentos();
        setMostrarModal(false); // Fecha a modal após a exclusão
        setIdParaExcluir(0); // Reseta o ID após a exclusão
      } catch (error) {
        console.error("Erro ao excluir cidade:", error);
      }
  };

  const onConfimarConsultaRealizada = async () =>{
    let criaERelacionaArquivos: CreateConsultaEArquivosDto = {
      consultas: consultaRealizadaSelecionada ? consultaRealizadaSelecionada : [],
      arquivos: arquivosSelecionados
    }

    console.log(consultaRealizadaSelecionada);
    console.log(arquivosSelecionados);
    console.log("cria", criaERelacionaArquivos);
    try
    {
      var response = await postCriaArquivoEConsulta(criaERelacionaArquivos);
      if (response.status == 200 || response.status == 204) {
        setMensagemSucesso("Sua consulta foi confirmada e salva com sucesso");
        setMostrarModalSucesso(true);
        setmostrarModalSubirArquivos(false);
        setArquivosSelecionados([]);
        setConsultaRealizadaSelecionada([]);
        await carregarAgendamentos();
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

  const abrirModalExclusao = (id: number) => {
    setIdParaExcluir(id); // Define o ID da entrada a ser excluída
    setMostrarModal(true); // Exibe a modal
  };
  
  const abriModalConfirmarConsulta = (data: Date, paciente: number, tipoConsulta: number) => {
    if (new Date(data) > new Date()) {
      setMensagemErro("Você nao pode confirmar uma consulta que está no futuro");
      setMostrarModalErro(true);
      return;
    }

    setConsultaRealizadaSelecionada([
      {
        dataHoraConsulta: data,
        pacienteId: paciente,
        tipoConsulta: tipoConsulta,
        descricao: ""
      }
    ]);

    setmostrarModalSubirArquivos(true); // Exibe a modal
  };

  const cancelarModal = () => {
    setIdParaExcluir(0); // Reseta o ID
    setMostrarModal(false); // Fecha a modal
  };

  const cancelarModalSubirArquivos = () =>{
    setmostrarModalSubirArquivos(false);
    setArquivosSelecionados([]);
  }

  const removerArquivo = (idx: number) => {
    setArquivosSelecionados(arquivosSelecionados.filter((_, i) => i !== idx));
  }

  useEffect(() => {
    carregarAgendamentos();
  }, [atualizarTabela]);
  
  useEffect(() => {
    console.log(consultaRealizadaSelecionada);
  }, [consultaRealizadaSelecionada]);

//   useEffect(() => {
//     const carregarCidadesPorPesquisa = async () => {
//       try {
//         if (pesquisaNome) {
//           const dados = await getAgendamentos(pesquisaNome);
//           if (dados && dados.length > 0) {
//             setCidades(dados);
//           } else {
//             setCidades([]);
//             console.warn("Nenhuma cidade encontrada.");
//           }
//         } else {
//           const dados = await getCidades();
//           setCidades(dados);
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.warn("Nenhuma cidade encontrada (Erro 404).");
//           setCidades([]);
//         } else {
//           console.error("Erro ao carregar cidades:", error);
//         }
//       }
//     };

//     carregarCidadesPorPesquisa();
//   }, [pesquisaNome]);

  const padZero = (num: number) => num.toString().padStart(2, '0');

  const formatDate = (dateString: Date) => {
    const data = new Date(dateString);
    const dia = padZero(data.getDate());
    const mes = padZero(data.getMonth() + 1);
    const ano = data.getFullYear();
    const horas = padZero(data.getHours());
    const minutos = padZero(data.getMinutes());
    const segundos = padZero(data.getSeconds());

    return `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;
  };

  return (
    <div>

      <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={onDeletarAgendamento}
            >
              Confirmar
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={cancelarModal}
            >
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={mostrarModalSubirArquivos} onOpenChange={setmostrarModalSubirArquivos}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Consulta</DialogTitle>
            <DialogDescription>
              Coloque uma descrição para esta consulta, e suba os arquivos se necessário!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-end gap-4 mt-4">
            <div>
              <textarea
                className="w-full border-2 border-yellow-600 outline-0 min-h-48 p-2"
                placeholder="Digite aqui sua descricao"
                name="descricao"
                id="descricaoConsulta"
                onChange={e => setConsultaRealizadaSelecionada(prev => 
                  prev
                    ? [
                        { ...prev[0], descricao: e.target.value },
                        ...prev.slice(1)
                      ] 
                    : prev
                )}
               />
            </div>

            <div>
              <label htmlFor="arquivosConsulta" className="block mb-2 text-slate-700">Anexar arquivos</label>
              <input
                type="file"
                id="arquivosConsulta"
                name="arquivosConsulta"
                multiple
                className="block w-full text-slate-700 border border-yellow-600 rounded p-2"
                onChange={e => {
                  const files = Array.from(e.target.files ?? []);
                  setArquivosSelecionados(files.map(file => ({ arquivo: file })));
                  // Se quiser salvar no estado principal:
                  // setConsultaRealizada({ ...consultaRealizada, arquivos: files });
                }}
              />
              {/* Lista dos arquivos selecionados */}
              {arquivosSelecionados.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-slate-700">
                  {arquivosSelecionados.map((file, idx) => (
                    <div key={idx} className="flex justify-between mt-2 p-1 border-b-2 border-gray-300">
                      <li>{file.arquivo.name}</li>
                      <button onClick={() => removerArquivo(idx)} className="cursor-pointer"><X color="red"/></button>
                    </div>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => onConfimarConsultaRealizada()}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={cancelarModalSubirArquivos}
              >
                Cancelar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={mostrarModalErro} onOpenChange={setMostrarModalErro}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erro</DialogTitle>
            <DialogDescription>
              {
                typeof mensagemErro === "string"
                  ? mensagemErro
                  : JSON.stringify(mensagemErro, null, 2)
                }
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      <Dialog open={mostrarModalSucesso} onOpenChange={setMostrarModalSucesso}>
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


      <div className="flex gap-3 my-5">
        {/* <Input
          type="text"
          placeholder="Pesquisar por Nome da Cidade"
          classes="w-full border border-slate-300 rounded px-2 py-1 mt-4"
          onChangeParam={(value) => setPesquisaNome(value)}
          valueParam={pesquisaNome}
        /> */}
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full rounded-md border border-slate-200 overflow-hidden shadow-sm bg-white dark:bg-slate-900">
          <TableCaption className="text-slate-500">Lista de agendamentos.</TableCaption>

          <TableHeader className="bg-slate-100 dark:bg-slate-800">
            <TableRow>
              <TableHead className="text-slate-700 dark:text-slate-300">Paciente</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Telefone</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Data E Hora Consulta</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Tipo De Consulta</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Valor Da Consulta</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {agendamentos.map((agendamento) => (
              <TableRow key={agendamento.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{agendamento.paciente.nome}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{agendamento.paciente.telefone}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{formatDate(agendamento.dataHoraConsulta)}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{TipoConsultaLabel[Number(agendamento.tipoConsulta)]}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">R$ 00,00</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <button
                        title="Editar"
                        className="p-2 rounded-md bg-green-100 text-yellow-600 hover:bg-green-200 transition cursor-pointer"
                      >
                        <Pen />
                      </button>
                    </Tooltip>

                    <Tooltip> 
                      <button
                        title="Excluir"
                        className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                        onClick={() => abrirModalExclusao(agendamento.id)}
                      >
                        <Trash />
                      </button>
                    </Tooltip>
                    
                    <Tooltip>
                      <button
                        title="Excluir"
                        className="p-2 rounded-md bg-red-100 text-green-700 hover:bg-red-200 transition cursor-pointer"
                        onClick={() => abriModalConfirmarConsulta(agendamento.dataHoraConsulta, Number(agendamento.paciente.id), Number(agendamento.tipoConsulta))}
                      >
                        <Check />
                      </button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TabelaAgendamentos;