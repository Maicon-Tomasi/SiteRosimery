"use cliente";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useState } from "react";
import { ReadArquivoConsultasDto} from "@/interfaces/interfacesDto";
import { Download, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip } from "@radix-ui/react-tooltip";

interface TableProps {
    //  atualizarTabela: number,
    //  onEditarAgendamento: (agendamentoSelecionado: ReadAgendamentoDto) => void,
    onDeletarArquivo: (arquivoDeltadoId: number) => void,
    arquivos: ReadArquivoConsultasDto[]
}

const TabelaArquivosConsultasRealizadas = ({ arquivos, onDeletarArquivo } :TableProps) => {
  const { downloadArquivoConsulta } = useApi();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState(""); 
  const [idParaExcluir, setIdParaExcluir] = useState<number>(0); 
  const [skip, setSkip] = useState(0);

  const abrirModalExclusao = (id: number) => {
    setIdParaExcluir(id); // Define o ID da entrada a ser excluída
    setMostrarModal(true); // Exibe a modal
  };

  const onBaixarArquivo = async (id: number) => {
    try {
      await downloadArquivoConsulta(id); // apenas aguarde, sem armazenar retorno
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
    }
  };

  
  const cancelarModal = () => {
    setIdParaExcluir(0); // Reseta o ID
    setMostrarModal(false); // Fecha a modal
  };

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
              onClick={() => {
                onDeletarArquivo(idParaExcluir)
                setMostrarModal(false);
              }}
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
          <TableCaption className="text-slate-500">Lista de arquivos.</TableCaption>

          <TableHeader className="bg-slate-100 dark:bg-slate-800">
            <TableRow>
              <TableHead className="text-slate-700 dark:text-slate-300">Nome Arquivo</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {arquivos.map((arquivo) => (
              <TableRow key={arquivo.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{arquivo.nomeArquivo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <button
                        title="Baixar Arquivo"
                        className="p-2 rounded-md bg-green-100 text-yellow-600 hover:bg-green-200 transition cursor-pointer"
                        onClick={() => onBaixarArquivo(arquivo.id)}
                      >
                        <Download />
                      </button>
                    </Tooltip>

                    <Tooltip> 
                      <button
                        title="Excluir"
                        className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                        onClick={() => abrirModalExclusao(arquivo.id)}
                      >
                        <Trash />
                      </button>
                    </Tooltip>
                    
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setSkip(0)}
              className="px-3 py-1 bg-white rounded hover:bg-gray-300 cursor-pointer"
             
            >
              Ínicio
            </button>
            <button
              onClick={() => setSkip(() => skip > 0 ? skip - 10 : 0)}
              className="px-3 py-1 bg-white rounded hover:bg-gray-300 cursor-pointer"
             
            >
              Anterior
            </button>
            <button onClick={() => setSkip(() => arquivos.length <= 0 ? skip : skip + 10)}
              className="px-3 py-1 bg-white rounded hover:bg-gray-300 cursor-pointer"
              
            >
              Próxima
            </button>
          </div>
      </div>
    </div>
  );
};

export default TabelaArquivosConsultasRealizadas;