import { api } from '../API';
import { Portfolio} from '../Types';

export const portfolioService = {
  getPortfolios: async (): Promise<Portfolio[]> => {
    const response = await api.get<Portfolio[]>('/portfolio');
    return response.data;
  },

  getPortifolioByArtista: async (idArtista: number): Promise<Portfolio> => {
    const response = await api.get<Portfolio>(`/portfolio/artista/${idArtista}`);
    return response.data;
  },

  getPortfolio: async (id: number): Promise<Portfolio> => {
    const response = await api.get<Portfolio>(`/portfolio/${id}`);
    return response.data;
  },

  createPortfolio: async (portfolio: Omit<Portfolio, 'id_portfolio'>): Promise<Portfolio> => {
    const response = await api.post<Portfolio>('/portfolio', portfolio);
    return response.data;
  },

  updatePortfolio: async (id: number, portfolio: Partial<Portfolio>): Promise<Portfolio> => {
    const response = await api.put<Portfolio>(`/portfolio/${id}`, portfolio);
    return response.data;
  },

  deletePortfolio: async (id: number): Promise<void> => {
    await api.delete(`/portfolio/${id}`);
  },
};