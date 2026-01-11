import { Paciente } from "../interfacesDto";
import { TipoConsulta } from "./ReadTipoConsultaDto";

export interface ReadAgendamentoDto {
    id: number;
    dataHoraConsulta: Date;
    tipoConsulta: TipoConsulta;
    paciente: Paciente;
}