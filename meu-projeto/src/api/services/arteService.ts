import { api } from '../API';
import { Arte } from '../Types';

export const arteService = {
  getArtes: async (): Promise<Arte[]> => {
    const response = await api.get<Arte[]>('/artes');
    return response.data;
  },

  getArte: async (id: number): Promise<Arte> => {
    const response = await api.get<Arte>(`/artes/${id}`);
    return response.data;
  },

  createArte: async (arte: Omit<Arte, 'id_arte'>): Promise<Arte> => {
    const response = await api.post<Arte>('/artes', arte);
    return response.data;
  },

  updateArte: async (id: number, arte: Partial<Arte>): Promise<Arte> => {
    const response = await api.put<Arte>(`/artes/${id}`, arte);
    return response.data;
  },

  deleteArte: async (id: number): Promise<void> => {
    await api.delete(`/artes/${id}`);
  },
};