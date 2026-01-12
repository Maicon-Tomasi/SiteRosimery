import { ReadPacienteDto } from "./ReadPacienteDto";
import { ReadTipoConsultaDto } from "./ReadTipoConsultaDto";

export interface ReadAgendamentoDto {
    id: number;
    dataHoraConsulta: Date;
    tipoConsulta: ReadTipoConsultaDto;
    paciente: ReadPacienteDto;
}