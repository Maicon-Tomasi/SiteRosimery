"use cliente";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { File, Pen} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import { ReadConsultasRealizadasDto } from "@/interfaces/ReadDtos/ReadConsultasRealizadasDto";

interface TableProps {
     atualizarTabela: number;
     onEditarConsultaRealizada: (consultaSelecionada: ReadConsultasRealizadasDto) => void
}

const TabelaConsultasRealizadas = ({ atualizarTabela, onEditarConsultaRealizada } :TableProps) => {
  const router = useRouter();
  const { getConsutlasRealizadas } = useApi();
  const [consultasRealizadas, setConsultasRealizadas] = useState<ReadConsultasRealizadasDto[]>([]);
  // const [pesquisaNome, setPesquisaNome] = useState('');
  // const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [skip, setSkip] = useState(0);


  const carregarConsultas = async () => {
    const dados = await getConsutlasRealizadas();
    const ordenados = [...dados].sort(
        (a, b) => new Date(a.dataHoraConsulta).getTime() - new Date(b.dataHoraConsulta).getTime()
    );

    if (dados.length <= 0) {
      setSkip(skip - 10);
      return;
    }

    setConsultasRealizadas(ordenados);
    console.log("Consultas ordenados", ordenados);
  };

  const onVisualizarArquivos = (id: string, dataHoraConsulta: Date, paciente: string) => {
    const data = new Date(dataHoraConsulta);
    const dataEncoded = encodeURIComponent(data.toISOString());
    const pacienteEncoded = encodeURIComponent(paciente);

    router.push(`ConsultasRealizadas/arquivosConsulta/${id}?data=${dataEncoded}&paciente=${pacienteEncoded}`);
  };


  useEffect(() => {
    carregarConsultas();
    setMensagemErro("oi");
    setMensagemSucesso("oi");
  }, [atualizarTabela, skip]);

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
              <TableHead className="text-slate-700 dark:text-slate-300">Descrição</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Valor Da Consulta</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultasRealizadas.map((consulta) => (
              <TableRow key={consulta.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{consulta.paciente.nome}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{consulta.paciente.telefone}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{formatDate(consulta.dataHoraConsulta)}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{consulta.tipoConsulta.descricao}</TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 break-words max-w-xs whitespace-normal">
                  {consulta.descricao}
                </TableCell>
                <TableCell className="text-slate-800 dark:text-slate-100 break-words max-w-xs whitespace-normal">R$ 00,00</TableCell>
              <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <button
                        title="Editar"
                        className="p-2 rounded-md bg-green-100 text-yellow-600 hover:bg-green-200 transition cursor-pointer"
                        onClick={() => onEditarConsultaRealizada(consulta)}
                      >
                        <Pen />
                      </button>
                    </Tooltip>
                    
                    <Tooltip>
                      <button
                        title="Visualizar Arquivos"
                        className="p-2 rounded-md bg-red-100 text-green-700 hover:bg-red-200 transition cursor-pointer"
                        onClick={() => onVisualizarArquivos(consulta.id.toString(), consulta.dataHoraConsulta, consulta.paciente.nome)}
                      >
                        <File />
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
            <button onClick={() => setSkip(() => consultasRealizadas.length <= 0 ? skip : skip + 10)}
              className="px-3 py-1 bg-white rounded hover:bg-gray-300 cursor-pointer"
              
            >
              Próxima
            </button>
          </div>
      </div>
    </div>
  );
};

export default TabelaConsultasRealizadas;