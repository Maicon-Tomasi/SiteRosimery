export interface LoginUsuarioDto {
    username: string;
    password: string;
}

export interface RespoLogin
{
     status: string;
     token: string;
}

export interface Paciente{
    id: number;
    nome: string;
    dataNascimento: Date;
    telefone: string;
    email: string;
    cpf: string;
}
