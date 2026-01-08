import { CreateAgendamentoDto, CreateConsultaEArquivosDto, CreateConsultasRealizadasDto, CreatePacienteDto, CreateUpdateArquivoConsultas, LoginUsuarioDto, ReadAgendamentoDto, ReadArquivoConsultasDto, ReadConsultasRealizadasDto, ReadPacienteDto, RespoLogin, UpdateAgendamentoDto, UpdateConsultasRealizadasDto, UpdatePacienteDto } from "@/interfaces/interfacesDto";
import { useApiContext } from "../context/ApiContext";
import Cookies from 'js-cookie';

export const useApi = () => {
  const { api } = useApiContext();
  
  const getQuantidadeTotalAgendamentos = async () => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

      const response = await api.get('/api/Agendamentos/total', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    return response.data;
  };
  
  const getQuantidadeTotalConsultasRealizadas = async () => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

      const response = await api.get('/api/ConsultasRealizadas/total', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    return response.data;
  };
  
  const getQuantidadeTotalPacientes = async () => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

      const response = await api.get('/api/Paciente/total', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    return Number(response.data.result);
  };
  
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

    const agendamentoDto: ReadAgendamentoDto[] = response.data.map((agendamento: ReadAgendamentoDto) => ({
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


    const pacientesDto: ReadPacienteDto[] = response.data.map((paciente: ReadPacienteDto) => ({
      id: paciente.id,
      nome: paciente.nome,
      dataNascimento: paciente.dataNascimento,
      telefone: paciente.telefone,
      email: paciente.email,
      cpf: paciente.cpf
    }));

    return pacientesDto;
  }

  const getQuantidadeTotalConsultasRealizadasPorMes = async (ano: number) => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

      const response = await api.get(`/api/ConsultasRealizadas/qtdConsultaPorMes/${ano}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    return response.data;
  };
  
  const getQuantidadeTotalConsultasRealizadasPorTipoConsulta = async (ano: number) => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

      const response = await api.get(`/api/ConsultasRealizadas/qtdConsultaPorTipo/${ano}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    return response.data;
  };
  
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


    const ConsultasRealizadasDto: ReadConsultasRealizadasDto[] = response.data.map((consulta: ReadConsultasRealizadasDto) => ({
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
  
  const getArquivosConsutlasRealizadas = async (idConsulta: number) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const response = await api.get(`/api/ArquivosConsulta/arquivosConsulta/${idConsulta}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status > 299) {
      throw new Error('Erro ao buscar agendamentos');
    }


    const arquivosConsultasRealizadasDto: ReadArquivoConsultasDto[] = response.data.map((arquivo: ReadArquivoConsultasDto) => ({
       id: Number(arquivo.id),
       nomeArquivo: arquivo.nomeArquivo.toString(),
       contentType: arquivo.contentType,
       urlDownload: arquivo.urlDownload
    }));

    return arquivosConsultasRealizadasDto;
  }
  
  const downloadArquivoConsulta = async (idArquivo: number) => {
    const token = Cookies.get("token");

    if (!token) throw new Error("Token não encontrado");

    const response = await api.get(`/api/ArquivosConsulta/download/${idArquivo}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // IMPORTANTÍSSIMO para pegar arquivo binário
    });

    console.log(response);

    // Testa o tamanho do blob (deve ser maior que zero)
    if (response.data.size === 0) {
      throw new Error("Arquivo vazio recebido da API");
    }

    const blob = new Blob([response.data], { type: response.data.type });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // Tenta extrair o nome do arquivo do header content-disposition
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "arquivo";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };


  

  const postUsuarioLogin = async (login: LoginUsuarioDto) => {
    const response = await api.post('/Usuario/Login', login)
    const resposta: RespoLogin = {
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

    const novoAgendamento: CreateAgendamentoDto[] = [{
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

    const novaConsultaRealizada: CreateConsultasRealizadasDto[] = [{
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

  const postArquivosConsulta = async (arquivos: CreateUpdateArquivoConsultas[], idConsulta: number) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const formData = new FormData();
      formData.append("idConsulta", idConsulta.toString());

    arquivos.forEach((item) => {
        formData.append("arquivos", item.arquivo); 
      });

    const response = await api.post('/api/ArquivosConsulta', formData,
      {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    return response; // Retorna a resposta completa do servidor

  }
  
  const postPaciente = async (pacientes: CreatePacienteDto) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const pacientesArray: CreatePacienteDto[] = [{
      nome: pacientes.nome,
      cpf: pacientes.cpf,
      dataNascimento: pacientes.dataNascimento,
      telefone: pacientes.telefone,
      email: pacientes.email 
    }];

    const response = await api.post('/api/Paciente', pacientesArray,
      {
      headers: {
        Authorization: `Bearer ${token}`
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
      consultaRealizada.arquivos.forEach((item) => {
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

  const putEditarAgendamento = async (id: number, agendamento: UpdateAgendamentoDto) => {
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

    const agendamentoEditado: UpdateAgendamentoDto = {
      dataHoraConsulta: dataUtc,
      tipoConsulta: agendamento.tipoConsulta,
      pacienteId: agendamento.pacienteId
    };

    const response = await api.put(`/api/Agendamentos/${id}`, agendamentoEditado,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response; // Retorna a resposta completa do servidor

  }
  
  const putEditarConsulta = async (id: number, consultaRealizada: UpdateConsultasRealizadasDto) => {
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

    const consultaRealizadaEditado: UpdateConsultasRealizadasDto = {
      dataHoraConsulta: dataUtc,
      tipoConsulta: consultaRealizada.tipoConsulta,
      pacienteId: consultaRealizada.pacienteId,
      descricao: consultaRealizada.descricao
    };

    const response = await api.put(`/api/ConsultasRealizadas/${id}`, consultaRealizadaEditado,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response; // Retorna a resposta completa do servidor

  }
  
  const putEditarPaciente = async (id: number, pacienteEditado: UpdatePacienteDto) => {
    const token = Cookies.get('token'); // nome do cookie

    if (!token) throw new Error('Token não encontrado nos cookies');

    const response = await api.put(`/api/paciente/${id}`, pacienteEditado,
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
      return response.status;
  }
  
  const deletePaciente = async (id: number) => {
    const token = Cookies.get('token');
    const response = await api.delete(`/api/Paciente/${id}`, {
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
  
  // const deletarConsultaRealizada = async (id: number) => {
  //   const token = Cookies.get('token');
  //   const response = await api.delete(`/api/Agendamentos/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (response.status !== 200) {
  //     throw new Error('Erro ao buscar agendamentos');
  //   }

  //     let agendamento = response.data.result;

  //     if (Array.isArray(agendamento)) {
  //       // Se for array, pegue o primeiro ou trate como lista
  //       agendamento = agendamento[0];
  //     }
  //     return response.status;
  // }
  
  const deletarArquivo = async (id: number) => {
    const token = Cookies.get('token');
    const response = await api.delete(`/api/ArquivosConsulta/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar Arquivos');
    }

    return response.status;
  }

  const getTiposConsultas = async () => {
    const token = Cookies.get('token');
    const response = await api.get(`/api/tipoConsulta`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar Arquivos');
    }

    return response.data;
  };


  return {
    getQuantidadeTotalAgendamentos,
    getQuantidadeTotalConsultasRealizadas,
    getQuantidadeTotalPacientes,
    getAgendamentos,
    getPacientes,
    getQuantidadeTotalConsultasRealizadasPorMes,
    getQuantidadeTotalConsultasRealizadasPorTipoConsulta,
    getConsutlasRealizadas,
    getArquivosConsutlasRealizadas,
    getTiposConsultas,
    postUsuarioLogin,
    postConsultaRealizada,
    postArquivosConsulta,
    postCriaArquivoEConsulta,
    postAgendamento,
    postPaciente,
    putEditarAgendamento,
    putEditarConsulta,
    putEditarPaciente,
    deleteAgendamento,
    deletarArquivo,
    deletePaciente,
    downloadArquivoConsulta
  };
};
