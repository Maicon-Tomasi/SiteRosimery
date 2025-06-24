export interface CreateAgendamentoDto {
    dataHoraConsulta: Date;
    tipoConsulta: TipoConsulta;
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
    tipoConsulta: TipoConsulta;
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
    tipoConsulta: TipoConsulta;
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

// Tipos auxiliares (ajuste conforme necessário)
export type TipoConsulta = 'Tipo1' | 'Tipo2'; // Substitua pelos valores reais do enum
export interface Paciente {
    id: number;
    nome: string;
    dataNascimento: Date;
    telefone: string;
    email: string;
    cpf: string;
}