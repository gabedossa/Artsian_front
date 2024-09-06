import { api } from '../API';
import { Portifolio } from '../Types';

export const portfolioService = {
  getPortfolios: async (): Promise<Portifolio[]> => {
    const response = await api.get<Portifolio[]>('/portfolios');
    return response.data;
  },

  getPortfolio: async (id: number): Promise<Portifolio> => {
    const response = await api.get<Portifolio>(`/portfolios/${id}`);
    return response.data;
  },

  createPortfolio: async (portfolio: Omit<Portifolio, 'id_portifolio'>): Promise<Portifolio> => {
    const response = await api.post<Portifolio>('/portfolios', portfolio);
    return response.data;
  },

  updatePortfolio: async (id: number, portfolio: Partial<Portifolio>): Promise<Portifolio> => {
    const response = await api.put<Portifolio>(`/portfolios/${id}`, portfolio);
    return response.data;
  },

  deletePortfolio: async (id: number): Promise<void> => {
    await api.delete(`/portfolios/${id}`);
  },
};