"use client";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { ReadPacienteDto } from "@/interfaces/interfacesDto";
import { Pen, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { aplicarMascaraCPF, aplicarMascaraTelefone } from "@/utils/mascaras";
import { calculaIdadePaciente, formatDate } from "@/utils/formatDate";

interface TableProps {
     atualizarTabela: number,
     onEditarPaciente: (pacienteSelecionado: ReadPacienteDto) => void
}

const TabelaPacientes = ({ atualizarTabela, onEditarPaciente } :TableProps) => {
  const { getPacientes, deletePaciente } = useApi();
  const [pacientes, setPacientes] = useState<ReadPacienteDto[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState<number>(0); 
  const [skip, setSkip] = useState(0);


  const carregarPacientes = async () => {
    try {
      const dados = await getPacientes();
      setPacientes(dados);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  const onDeletarPaciente = async () => {
      try {
        await deletePaciente(idParaExcluir);
        carregarPacientes();
        setMostrarModal(false);
        setIdParaExcluir(0);
      } catch (error) {
        console.error("Erro ao excluir paciente:", error);
      }
  };

  const abrirModalExclusao = (id: number) => {
    setIdParaExcluir(id); 
    setMostrarModal(true); 
  };

  const cancelarModal = () => {
    setIdParaExcluir(0);
    setMostrarModal(false);
  };

  useEffect(() => {
    carregarPacientes();
  }, [atualizarTabela, skip]);

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

      <div className="overflow-x-auto">
        <TooltipProvider>
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
                        <TooltipTrigger asChild>
                          <button
                            className="p-2 rounded-md bg-green-100 text-yellow-600 hover:bg-green-200 transition cursor-pointer"
                            onClick={() => onEditarPaciente(paciente)}
                          >
                            <Pen size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                      </Tooltip>

                      <Tooltip> 
                        <TooltipTrigger asChild>
                          <button
                            className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                            onClick={() => abrirModalExclusao(paciente.id)}
                          >
                            <Trash size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Excluir</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>

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
