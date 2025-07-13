"use client";

import { useParams, useSearchParams } from "next/navigation";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import FileUploader from "@/components/fileUploader/FileUploader";
import { useApi } from "@/hooks/useApi";
import { CreateUpdateArquivoConsultas, ReadArquivoConsultasDto } from "@/interfaces/interfacesDto";
import TabelaArquivosConsultasRealizadas from "@/components/TableArquivosConsultasRealizadas/page";
import BotaoAmarelo from "@/components/botaoAmarelo/botaoAmarelo";
import { LoaderCircle, Send } from "lucide-react";
import { Console } from "console";

const Page = () => {
     const params = useParams();
     const searchParams = useSearchParams();
     const { getArquivosConsutlasRealizadas, deletarArquivo, postArquivosConsulta } = useApi();
     const [arquivos, setArquivos] = useState<ReadArquivoConsultasDto[]>([]);
     const [novosArquivos, setNovosArquivos] = useState<CreateUpdateArquivoConsultas[]>([]);
     const [carregando, setCarregando] = useState(false);
     const [limparArquivos, setLimparArquivos] = useState<number>(0);

     const id = params.id as string;
     const paciente = searchParams.get("paciente");
     const dataEncoded = searchParams.get("data");
     const data = dataEncoded ? new Date(decodeURIComponent(dataEncoded)) : null;

     const carregaArquivos = async () => {
          const arquivos = await getArquivosConsutlasRealizadas(Number(id));
          setArquivos(arquivos);
     };

     const enviaArquivos = async () => {
          try
          {
               console.log("aaaaaaaaaaaaa");
               setCarregando(true);
               console.log(novosArquivos);

               const response = await postArquivosConsulta(novosArquivos, Number(id));
               console.log(response);
               if (response.status > 299) {
                    throw new Error("Não foi possível enviar o arquivo");
               }
               
               carregaArquivos();
               setCarregando(false);
               setNovosArquivos([]);
               setLimparArquivos(prev => prev + 1);
          }
          catch (err: unknown)
          {
               console.log("EROOOOOOOOOOOOOO");
               console.log(err);
               console.log("EROOOOOOOOOOOOOO");
          }
     };

     const deletaArquivo = async (idArquivo: number) => {
     try {
          await deletarArquivo(idArquivo); 
          setArquivos((prevArquivos) => prevArquivos.filter(a => a.id !== idArquivo));
     } catch (error) {
          console.error("Erro ao deletar arquivo:", error);
     }
     };


     useEffect(() => {
          carregaArquivos();
     }, [id, novosArquivos])

     useEffect(() => {
          console.log(arquivos);
     }, [arquivos])

     return (
     <div className="w-full flex flex-col gap-6 p-6 min-h-screen">
          <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">
               Arquivos da consulta do paciente {paciente} na data e hora{" "}
               {data ? formatDate(data) : "Data inválida"}
          </h1>
          </header>

          <section className="bg-white p-4 rounded-md shadow-sm border border-slate-200">   
               <div className="mt-4">
                    <label className="text-sm text-slate-600">Arquivos*</label>
                    <FileUploader limpar={limparArquivos}
                         onFilesSelected={(arquivos) => {
                              const arquivosFormatados = arquivos.map((file) => ({
                                   arquivo: file,
                              }));

                              console.log(arquivosFormatados);

                              setNovosArquivos(arquivosFormatados);
                         }}
                    />
               </div>
               <div className="mt-5">
                    <BotaoAmarelo onClick={() => enviaArquivos()}>
                         {carregando ? (
                              <LoaderCircle className="animate-spin w-4 h-4" />
                         ) : (
                              <Send className="w-4 h-4 mr-2" />
                         )}
                              Enviar
                    </BotaoAmarelo>
               </div>
          </section>

          <TabelaArquivosConsultasRealizadas arquivos={arquivos} onDeletarArquivo={deletaArquivo} />
     </div>
     );
};

export default Page;
