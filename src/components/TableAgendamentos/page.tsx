"use cliente";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";

interface TableProps {
     atualizarTabela: number;
     // onEditarCidade: (cidade: any) => void; // Ajuste o tipo conforme necessário
}

const TabelaAgendamentos = ({ atualizarTabela } :TableProps) => {
  const { getAgendamentos, deleteAgendamento } = useApi();
  const [cidades, setCidades] = useState([]);
  const [pesquisaNome, setPesquisaNome] = useState('');

//   const onDeletarCidade = async (id) => {
//     if (confirm("Você tem certeza que deseja excluir este agendamento?")) {
//       try {
//         await deleteAgendamento(id);

//         const carregarCidades = async () => {
//           const dados = await getAgendamentos();
//           setCidades(dados);
//         };

//         carregarCidades();
//       } catch (error) {
//         console.error("Erro ao excluir cidade:", error);
//       }
//     }
//   };

  useEffect(() => {
    const carregarCidades = async () => {
      const dados = await getAgendamentos();
      setCidades(dados);
    };

    carregarCidades();
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

  return (
    <div>
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
              <TableHead className="text-slate-700 dark:text-slate-300">Nome</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Estado</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Ações</TableHead>
            </TableRow>
          </TableHeader>

          {/* <TableBody>
            {cidades.map((cidade) => (
              <TableRow key={cidade.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{cidade.nomeCidade}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{cidade.estado}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      title="Editar"
                      className="p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition cursor-pointer"
                      onClick={() => onEditarCidade(cidade)}
                    >
                      <FaPen />
                    </button>

                    <button
                      title="Excluir"
                      className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                      onClick={() => onDeletarCidade(cidade.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </div>
    </div>
  );
};

export default TabelaAgendamentos;