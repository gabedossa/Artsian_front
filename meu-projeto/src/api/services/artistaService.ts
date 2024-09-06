import { api } from '../API';
import { Artista } from '../Types';

export const artistaService = {
  getArtistas: async (): Promise<Artista[]> => {
    const response = await api.get<Artista[]>('/artistas');
    return response.data;
  },

  getArtista: async (id: number): Promise<Artista> => {
    const response = await api.get<Artista>(`/artistas/${id}`);
    return response.data;
  },

  createArtista: async (artista: Omit<Artista, 'id_artista'>): Promise<Artista> => {
    const response = await api.post<Artista>('/artistas', artista);
    return response.data;
  },

  updateArtista: async (id: number, artista: Partial<Artista>): Promise<Artista> => {
    const response = await api.put<Artista>(`/artistas/${id}`, artista);
    return response.data;
  },

  deleteArtista: async (id: number): Promise<void> => {
    await api.delete(`/artistas/${id}`);
  },
};