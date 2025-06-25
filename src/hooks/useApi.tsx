import { LoginUsuarioDto, RespoLogin } from "@/interfaces/interfacesDto";
import { useApiContext } from "../context/ApiContext";
import Cookies from 'js-cookie';

export const useApi = () => {
  const { api } = useApiContext();
  
  const getAgendamentos = async () => {
    const token = Cookies.get('token'); // nome do cookie
    if (!token) throw new Error('Token não encontrado nos cookies');

    const response = await api.get('/api/Agendamento', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar agendamentos');
    }

    return response.data;
  };

  const postUsuarioLogin = async (login: LoginUsuarioDto) => {
    const response = await api.post('/Usuario/Login', login)
    let resposta: RespoLogin = {
      status: response.data.status,
      token: response.data.token
    };
    return resposta;
  }


  const deleteAgendamento = async (id: number) => {
    const response = await api.delete(`/api/Agendamento/${id}`);
    return response.data;
  }

  return {
    postUsuarioLogin,
    getAgendamentos,
    deleteAgendamento
  };
};
