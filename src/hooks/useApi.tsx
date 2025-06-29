import { CreateAgendamentoDto, LoginUsuarioDto, ReadAgendamentoDto, ReadPacienteDto, RespoLogin } from "@/interfaces/interfacesDto";
import { useApiContext } from "../context/ApiContext";
import Cookies from 'js-cookie';

export const useApi = () => {
  const { api } = useApiContext();

  function toISOStringLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }

  
  const getAgendamentos = async () => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

    const response = await api.get('/api/Agendamentos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    let agendamentoDto: ReadAgendamentoDto[] = response.data.result.map((agendamento: ReadAgendamentoDto) => ({
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

      // const agendamentoDto: ReadAgendamentoDto = {
      //   id: Number(agendamento.id),
      //   dataHoraConsulta: agendamento.dataHoraConsulta,
      //   tipoConsulta: agendamento.tipoConsulta,
      //   paciente: {
      //     id: Number(agendamento.paciente.id),
      //     nome: agendamento.paciente.nome,
      //     dataNascimento: agendamento.paciente.dataNascimento,
      //     telefone: agendamento.paciente.telefone,
      //     email: agendamento.paciente.email,
      //     cpf: agendamento.paciente.cpf
      //   }
      // };

      return response.status;
  }

  return {
    getAgendamentos,
    getPacientes,
    postUsuarioLogin,
    postAgendamento,
    deleteAgendamento
  };
};
