"use cliente";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { ReadPacienteDto } from "@/interfaces/interfacesDto";
import { Pen, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip } from "@radix-ui/react-tooltip";
import { aplicarMascaraCPF, aplicarMascaraTelefone } from "@/utils/mascaras";
import { calculaIdadePaciente, formatDate } from "@/utils/formatDate";

interface TableProps {
     atualizarTabela: number,
     onEditarPaciente: (pacienteSelecionado: ReadPacienteDto) => void
}

const TabelaPacientes = ({ atualizarTabela, onEditarPaciente } :TableProps) => {
  const { getPacientes, deletePaciente } = useApi();
  const [pacientes, setPacientes] = useState<ReadPacienteDto[]>([]);
  // const [pesquisaNome, setPesquisaNome] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState<number>(0); 
  const [skip, setSkip] = useState(0);


  const carregarPacientes = async () => {
    const dados = await getPacientes();
    setPacientes(dados);
  };

  const onDeletarPaciente = async () => {
      try {
        await deletePaciente(idParaExcluir);

        carregarPacientes();
        setMostrarModal(false); // Fecha a modal após a exclusão
        setIdParaExcluir(0); // Reseta o ID após a exclusão
      } catch (error) {
        console.error("Erro ao excluir cidade:", error);
      }
  };

  const abrirModalExclusao = (id: number) => {
    setIdParaExcluir(id); 
    setMostrarModal(true); 
  };

  const cancelarModal = () => {
    setIdParaExcluir(0); // Reseta o ID
    setMostrarModal(false); // Fecha a modal
  };

  useEffect(() => {
    carregarPacientes();
  }, [atualizarTabela, skip]);
  
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
              Tem certeza que deseja deletar este paciente? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={onDeletarPaciente}
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

      {/* <Dialog open={mostrarModalErro} onOpenChange={setMostrarModalErro}>
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
      </Dialog> */}
      
      {/* <Dialog open={mostrarModalSucesso} onOpenChange={setMostrarModalSucesso}>
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
      </Dialog> */}


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
          <TableCaption className="text-slate-500">Lista de pacientes.</TableCaption>

          <TableHeader className="bg-slate-100 dark:bg-slate-800">
            <TableRow>
              <TableHead className="text-slate-700 dark:text-slate-300">Paciente</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Telefone</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">CPF</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Email</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Idade</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Data De Nascimento</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{paciente.nome}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{aplicarMascaraTelefone(paciente.telefone)}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{aplicarMascaraCPF(paciente.cpf)}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{paciente.email}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{calculaIdadePaciente(paciente.dataNascimento)} anos</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{formatDate(paciente.dataNascimento).split(" ")[0]}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <button
                        title="Editar"
                        className="p-2 rounded-md bg-green-100 text-yellow-600 hover:bg-green-200 transition cursor-pointer"
                        onClick={() => onEditarPaciente(paciente)}
                      >
                        <Pen />
                      </button>
                    </Tooltip>

                    <Tooltip> 
                      <button
                        title="Excluir"
                        className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                        onClick={() => abrirModalExclusao(paciente.id)}
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
            <button onClick={() => setSkip(() => pacientes.length <= 0 ? skip : skip + 10)}
              className="px-3 py-1 bg-white rounded hover:bg-gray-300 cursor-pointer"
              
            >
              Próxima
            </button>
          </div>
      </div>
    </div>
  );
};

export default TabelaPacientes;