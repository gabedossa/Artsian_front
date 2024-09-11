import { api } from '../API';
import { Pedido } from '../Types';

export const pedidoService = {
  getPedidos: async (): Promise<Pedido[]> => {
    const response = await api.get<Pedido[]>('/pedido');
    return response.data;
  },

  getPedido: async (id: number): Promise<Pedido> => {
    const response = await api.get<Pedido>(`/pedido/${id}`);
    return response.data;
  },

  createPedido: async (pedido: Omit<Pedido, 'id_pedido'>): Promise<Pedido> => {
    const response = await api.post<Pedido>('/pedido', pedido);
    return response.data;
  },

  updatePedido: async (id: number, pedido: Partial<Pedido>): Promise<Pedido> => {
    const response = await api.put<Pedido>(`/pedido/${id}`, pedido);
    return response.data;
  },

  deletePedido: async (id: number): Promise<void> => {
    await api.delete(`/pedido/${id}`);
  },
};