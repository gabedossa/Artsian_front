import { api } from '../API';
import { Servico } from '../Types';

export const servicoService = {
  getServicos: async (): Promise<Servico[]> => {
    const response = await api.get<Servico[]>('/servicos');
    return response.data;
  },

  getServico: async (id: number): Promise<Servico> => {
    const response = await api.get<Servico>(`/servicos/${id}`);
    return response.data;
  },

  createServico: async (servico: Omit<Servico, 'id_servico'>): Promise<Servico> => {
    const response = await api.post<Servico>('/servicos', servico);
    return response.data;
  },

  updateServico: async (id: number, servico: Partial<Servico>): Promise<Servico> => {
    const response = await api.put<Servico>(`/servicos/${id}`, servico);
    return response.data;
  },

  deleteServico: async (id: number): Promise<void> => {
    await api.delete(`/servicos/${id}`);
  },
};