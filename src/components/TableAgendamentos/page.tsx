"use cliente";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { ReadAgendamentoDto, TipoConsulta, TipoConsultaLabel } from "@/interfaces/interfacesDto";
import { Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface TableProps {
     atualizarTabela: number;
     // onEditarCidade: (cidade: any) => void; // Ajuste o tipo conforme necessário
}

const TabelaAgendamentos = ({ atualizarTabela } :TableProps) => {
  const { getAgendamentos, deleteAgendamento } = useApi();
  const [agendamentos, setAgendamentos] = useState<ReadAgendamentoDto[]>([]);
  const [pesquisaNome, setPesquisaNome] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false); 
  const [idParaExcluir, setIdParaExcluir] = useState<number>(0); // Armazena o ID da entrada a ser excluída


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

  const abrirModalExclusao = (id: number) => {
    setIdParaExcluir(id); // Define o ID da entrada a ser excluída
    setMostrarModal(true); // Exibe a modal
  };

  const cancelarExclusao = () => {
    setIdParaExcluir(0); // Reseta o ID
    setMostrarModal(false); // Fecha a modal
  };

  useEffect(() => {
    carregarAgendamentos();
  }, [atualizarTabela]);

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
              Tem certeza que deseja excluir esta entrada? Esta ação não pode ser desfeita.
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
              onClick={cancelarExclusao}
            >
              Cancelar
            </button>
          </div>
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
                    <button
                      title="Editar"
                      className="p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition cursor-pointer"
                    >
                    </button>

                    <button
                      title="Excluir"
                      className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                      onClick={() => abrirModalExclusao(agendamento.id)}
                    >
                      <Trash />
                    </button>
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