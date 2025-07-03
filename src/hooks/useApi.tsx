import { CreateAgendamentoDto, CreateConsultaEArquivosDto, CreateConsultasRealizadasDto, CreateUpdateArquivoConsultas, LoginUsuarioDto, ReadAgendamentoDto, ReadConsultasRealizadasDto, ReadPacienteDto, RespoLogin } from "@/interfaces/interfacesDto";
import { useApiContext } from "../context/ApiContext";
import Cookies from 'js-cookie';

export const useApi = () => {
  const { api } = useApiContext();

  function toISOStringLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }

  
  const getAgendamentos = async (skip: number | null, take: number | null) => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

    let response

    if (skip != null && take != null) {
      response = await api.get(`/api/Agendamentos?skip=${skip}&take=${take}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });  
    }
    else
    {
      response = await api.get('/api/Agendamentos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    }

    

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    let agendamentoDto: ReadAgendamentoDto[] = response.data.map((agendamento: ReadAgendamentoDto) => ({
      id: Number(agendamento.id),
      dataHoraConsulta: agendamento.dataHoraConsulta,
      tipoConsulta: Number(agendamento.tipoConsulta),
      paciente: {
        id: agendamento.paciente.id,
        nome: agendamento.paciente.nome,
        dataNascimento: agendamento.paciente.dataNascimento,
        telefone: agendamento.paciente.telefone,
        email: agendamento.paciente.email,
        cpf: agendamento.paciente.cpf
      }
    }));


    return agendamentoDto;
  };

  const getPacientes = async () => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const response = await api.get('/api/Paciente', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }


    let pacientesDto: ReadPacienteDto[] = response.data.result.map((paciente: ReadPacienteDto) => ({
      id: paciente.id,
      nome: paciente.nome,
      dataNascimento: paciente.dataNascimento,
      telefone: paciente.telefone,
      email: paciente.email,
      cpf: paciente.cpf
    }));

    return pacientesDto;
  }
  
  const getConsutlasRealizadas = async () => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const response = await api.get('/api/ConsultasRealizadas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }


    let ConsultasRealizadasDto: ReadConsultasRealizadasDto[] = response.data.map((consulta: ReadConsultasRealizadasDto) => ({
      id: consulta.id,
      dataHoraConsulta: consulta.dataHoraConsulta,
      descricao: consulta.descricao,
      tipoConsulta: Number(consulta.tipoConsulta),
      paciente: {
        id: consulta.paciente.id,
        nome: consulta.paciente.nome,
        dataNascimento: consulta.paciente.dataNascimento,
        telefone: consulta.paciente.telefone,
        email: consulta.paciente.email,
        cpf: consulta.paciente.cpf
      }
    }));

    return ConsultasRealizadasDto;
  }
  

  const postUsuarioLogin = async (login: LoginUsuarioDto) => {
    const response = await api.post('/Usuario/Login', login)
    let resposta: RespoLogin = {
      status: response.data.status,
      token: response.data.token
    };
    return resposta;
  }

  const postAgendamento = async (agendamento: CreateAgendamentoDto) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const data = new Date(agendamento.dataHoraConsulta);

    const dataUtc = new Date(
      Date.UTC(
        data.getFullYear(),
        data.getMonth(),
        data.getDate(),
        data.getHours(),
        data.getMinutes(),
        0
      )
    );

    let novoAgendamento: CreateAgendamentoDto[] = [{
      dataHoraConsulta: dataUtc,
      tipoConsulta: agendamento.tipoConsulta,
      pacienteId: agendamento.pacienteId
    }];

    const response = await api.post('/api/Agendamentos', novoAgendamento,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response; // Retorna a resposta completa do servidor

  }
  
  const postConsultaRealizada = async (consultaRealizada: CreateConsultasRealizadasDto) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const data = new Date(consultaRealizada.dataHoraConsulta);

    const dataUtc = new Date(
      Date.UTC(
        data.getFullYear(),
        data.getMonth(),
        data.getDate(),
        data.getHours(),
        data.getMinutes(),
        0
      )
    );

    let novaConsultaRealizada: CreateConsultasRealizadasDto[] = [{
      dataHoraConsulta: dataUtc,
      tipoConsulta: consultaRealizada.tipoConsulta,
      pacienteId: consultaRealizada.pacienteId,
      descricao: consultaRealizada.descricao
    }];

    const response = await api.post('/api/ConsultasRealizadas', novaConsultaRealizada,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response; // Retorna a resposta completa do servidor

  }

  const postArquivosConsulta = async (arquivos: CreateUpdateArquivoConsultas) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    let arquivosEnviados: CreateUpdateArquivoConsultas[] = [{
      arquivo: arquivos.arquivo
    }];

    const response = await api.post('/api/ArquivosConsulta', arquivosEnviados,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response; // Retorna a resposta completa do servidor

  }

  const postCriaArquivoEConsulta = async (consultaRealizada: CreateConsultaEArquivosDto) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const primeiraConsulta = consultaRealizada.consultas[0];

    const data = new Date(primeiraConsulta.dataHoraConsulta);

    const dataUtc = new Date(
      Date.UTC(
        data.getFullYear(),
        data.getMonth(),
        data.getDate(),
        data.getHours(),
        data.getMinutes(),
        0
      )
    );

     const formData = new FormData();

      // Adiciona os dados da consulta
      formData.append("dataHoraConsulta", dataUtc.toISOString());
      formData.append("pacienteId", primeiraConsulta.pacienteId.toString());
      formData.append("descricao", primeiraConsulta.descricao.toString());
      formData.append("tipoConsulta", primeiraConsulta.tipoConsulta.toString());

      // Adiciona os arquivos
      consultaRealizada.arquivos.forEach((item, index) => {
        formData.append("arquivo", item.arquivo); // o backend espera só `arquivo` se for 1 único
      });

      console.log("Descricao antes do envio:", primeiraConsulta.descricao);


    const response = await api.post('/api/ConsultasRealizadas/relacionaArquivos', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response; // Retorna a resposta completa do servidor

  };

  


  const deleteAgendamento = async (id: number) => {
    const token = Cookies.get('token');
    const response = await api.delete(`/api/Agendamentos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

      let agendamento = response.data.result;

      if (Array.isArray(agendamento)) {
        // Se for array, pegue o primeiro ou trate como lista
        agendamento = agendamento[0];
      }
      return response.status;
  }
  
  const deletarConsultaRealizada = async (id: number) => {
    const token = Cookies.get('token');
    const response = await api.delete(`/api/Agendamentos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

      let agendamento = response.data.result;

      if (Array.isArray(agendamento)) {
        // Se for array, pegue o primeiro ou trate como lista
        agendamento = agendamento[0];
      }
      return response.status;
  }

  return {
    getAgendamentos,
    getPacientes,
    getConsutlasRealizadas,
    postUsuarioLogin,
    postConsultaRealizada,
    postArquivosConsulta,
    postCriaArquivoEConsulta,
    postAgendamento,
    deleteAgendamento
  };
};
