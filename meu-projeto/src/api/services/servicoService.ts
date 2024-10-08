import { api } from '../API';
import { Servico } from '../Types';

export const servicoService = {
  getServicos: async (): Promise<Servico[]> => {
    const response = await api.get<Servico[]>('/servico');
    return response.data;
  },

  getServico: async (id: number): Promise<Servico> => {
    const response = await api.get<Servico>(`/servico/${id}`);
    return response.data;
  },

  // Buscar todos os serviços de um artista específico
  getServicosByArtista: async (idArtista: number): Promise<Servico[]> => {
    const response = await api.get<Servico[]>(`/servico/artista/${idArtista}`);
    return response.data;
  },

  createServico: async (servico: Omit<Servico, 'id_servico'>): Promise<Servico> => {
    const response = await api.post<Servico>('/servico/create', servico);
    return response.data;
  },

  updateServico: async (id: number, servico: Partial<Servico>): Promise<Servico> => {
    const response = await api.put<Servico>(`/servico/${id}`, servico);
    return response.data;
  },

  deleteServico: async (id: number): Promise<void> => {
    await api.delete(`/servico/delete/${id}`);
  },
};