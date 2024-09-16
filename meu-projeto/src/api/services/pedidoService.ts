import { api } from '../API';
import { Pedido } from '../Types';

export const pedidoService = {

  // Buscar todos os pedidos
  getPedidos: async (): Promise<Pedido[]> => {
    const response = await api.get<Pedido[]>('/pedido');
    return response.data;
  },

  // Buscar um pedido pelo ID
  getPedido: async (id: number): Promise<Pedido> => {
    const response = await api.get<Pedido>(`/pedido/${id}`);
    return response.data;
  },

  // Buscar pedidos pelo ID do Artista (corrigido)
  getPedidosPorIdArtista: async (idArtista: number): Promise<Pedido[]> => {
    const response = await api.get<Pedido[]>(`/pedido/artista/${idArtista}`);
    return response.data;
  },

  // Buscar pedidos pelo ID do Cliente
  getPedidosPorIdCliente: async (idCliente: number): Promise<Pedido[]> => {
    const response = await api.get<Pedido[]>(`/pedido/cliente/${idCliente}`);
    return response.data;
  },

  // Criar um novo pedido
  createPedido: async (pedido: Omit<Pedido, 'id_pedido'>): Promise<Pedido> => {
    const response = await api.post<Pedido>('/pedido/create', pedido);
    return response.data;
  },

  // Atualizar um pedido existente
  updatePedido: async (id: number, pedido: Partial<Pedido>): Promise<Pedido> => {
    const response = await api.put<Pedido>(`/pedido/update/${id}`, pedido);
    return response.data;
  },

  // Excluir um pedido
  deletePedido: async (id: number): Promise<void> => {
    await api.delete(`/pedido/delete/${id}`);
  },
};
