import { CreateConsultasRealizadasDto } from "./CreateConsultasRealizadasDto";
import { CreateUpdateArquivoConsultas } from "./CreateUpdateArquivoConsultasDto";

export interface CreateConsultaEArquivosDto{
    consultas: CreateConsultasRealizadasDto[];
    arquivos: CreateUpdateArquivoConsultas[];
}
