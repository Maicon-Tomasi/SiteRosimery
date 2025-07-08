"use client";

import { useParams, useSearchParams } from "next/navigation";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import FileUploader from "@/components/fileUploader/FileUploader";
import { useApi } from "@/hooks/useApi";
import { ReadArquivoConsultasDto } from "@/interfaces/interfacesDto";

const Page = () => {
     const params = useParams();
     const searchParams = useSearchParams();
     const { getArquivosConsutlasRealizadas } = useApi();
     const [arquivos, setArquivos] = useState<ReadArquivoConsultasDto[]>([]);

     const id = params.id as string;
     const paciente = searchParams.get("paciente");
     const dataEncoded = searchParams.get("data");
     const data = dataEncoded ? new Date(decodeURIComponent(dataEncoded)) : null;

     const carregaArquivos = async () => {
          let arquivos = await getArquivosConsutlasRealizadas(Number(id));
          setArquivos(arquivos);
     }

     useEffect(() => {
          carregaArquivos();
     }, [])

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
                    <FileUploader
                         onFilesSelected={(oi) => {}} 
                         // onFilesSelected={(arquivos) => {
                         //      const arquivosFormatados = arquivos.map((file) => ({
                         //           arquivo: file,
                         //      }));

                         //      setArquivosSelecionados(arquivosFormatados);
                         // }}
                    />
               </div>
          </section>
     </div>
     );
};

export default Page;
