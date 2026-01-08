import { ReadArquivoConsultasDto } from "./ReadArquivoConsultasDto";
import { ReadConsultasRealizadasDto } from "./ReadConsultasRealizadasDto";

export interface ReadArquivoHasManyConsultasDto {
    id: number;
    arquivo: ReadArquivoConsultasDto;
    consulta: ReadConsultasRealizadasDto;
}