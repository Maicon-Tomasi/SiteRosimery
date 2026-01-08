import { Paciente } from "../interfacesDto";
import { TipoConsulta } from "./ReadTipoConsultaDto";

export interface ReadConsultasRealizadasDto {
    id: number;
    dataHoraConsulta: Date;
    descricao: string;
    tipoConsulta: TipoConsulta;
    paciente: Paciente;
}