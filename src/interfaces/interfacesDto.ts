export interface CreateAgendamentoDto {
    dataHoraConsulta: Date;
    tipoConsulta: number;
    pacienteId: number;
}

export interface CreateArquivoHasManyConsultas {
    arquivoId: number;
    consultaId: number;
}

export interface CreateConsultasRealizadasDto {
    dataHoraConsulta: Date;
    pacienteId: number;
    descricao: string;
    tipoConsulta: number;
}

export interface CreateConsultaEArquivosDto{
    consultas: CreateConsultasRealizadasDto[];
    arquivos: CreateUpdateArquivoConsultas[];
}

export interface CreatePacienteDto {
    nome: string;
    dataNascimento: Date;
    telefone: string;
    email: string;
    cpf: string;
}

export interface CreateUpdateArquivoConsultas {
    arquivo: File; // ou Blob, dependendo do uso
}

export interface CreateUsuario {
    username: string;
    password: string;
    rePassword: string;
}

export interface LoginUsuarioDto {
    username: string;
    password: string;
}

export interface RespoLogin
{
     status: string;
     token: string;
}

export interface ReadAgendamentoDto {
    id: number;
    dataHoraConsulta: Date;
    tipoConsulta: TipoConsulta;
    paciente: Paciente;
}

export interface ReadArquivoConsultasDto {
    id: number;
    nomeArquivo: string;
    contentType: string;
    urlDownload: string;
}

export interface ReadArquivoHasManyConsultasDto {
    id: number;
    arquivo: ReadArquivoConsultasDto;
    consulta: ReadConsultasRealizadasDto;
}

export interface ReadConsultasRealizadasDto {
    id: number;
    dataHoraConsulta: Date;
    descricao: string;
    tipoConsulta: TipoConsulta;
    paciente: Paciente;
}

export interface ReadPacienteDto {
    id: number;
    nome: string;
    dataNascimento: Date;
    telefone: string;
    email: string;
    cpf: string;
}

export interface ReadUsuarioDto {
    id: string;
    userName: string;
    email: string;
}

export interface UpdateAgendamentoDto {
    dataHoraConsulta: Date;
    tipoConsulta: number;
    pacienteId: number;
}

export interface UpdateArquivoHasManyConsultasDto {
    arquivoId: number;
    consultaId: number;
}

export interface UpdateConsultasRealizadasDto {
    dataHoraConsulta: Date;
    pacienteId: number;
    descricao: string;
    tipoConsulta: TipoConsulta;
}

export interface UpdatePacienteDto {
    nome: string;
    dataNascimento: Date;
    telefone: string;
    email: string;
    cpf: string;
}

export interface Paciente {
    id: number;
    nome: string;
    dataNascimento: Date;
    telefone: string;
    email: string;
    cpf: string;
}

export enum TipoConsulta {
  AvaliacaoPsicologica = 'Avaliação Psicológica',
  PsicoterapiaIndividual = 'Psicoterapia Individual',
  PsicoterapiaCasal = 'Psicoterapia de Casal',
  PsicoterapiaFamiliar = 'Psicoterapia Familiar',
  PsicoterapiaInfantil = 'Psicoterapia Infantil',
  AcompanhamentoPsicologico = 'Acompanhamento Psicológico',
  OrientacaoProfissional = 'Orientação Profissional',
  Retorno = 'Retorno',
  Teleatendimento = 'Teleatendimento'
}

export const TipoConsultaLabel: Record<number, string> = {
  1: TipoConsulta.AvaliacaoPsicologica,
  2: TipoConsulta.PsicoterapiaIndividual,
  3: TipoConsulta.PsicoterapiaCasal,
  4: TipoConsulta.PsicoterapiaFamiliar,
  5: TipoConsulta.PsicoterapiaInfantil,
  6: TipoConsulta.AcompanhamentoPsicologico,
  7: TipoConsulta.OrientacaoProfissional,
  8: TipoConsulta.Retorno,
  9: TipoConsulta.Teleatendimento,
};
