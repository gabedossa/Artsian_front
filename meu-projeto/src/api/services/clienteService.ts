import { api } from '../API';
import { Cliente } from '../Types';

export const clienteService = {
  getClientes: async (): Promise<Cliente[]> => {
    const response = await api.get<Cliente[]>('/clientes');
    return response.data;
  },

  getCliente: async (id: number): Promise<Cliente> => {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },

  createCliente: async (cliente: Omit<Cliente, 'id_cliente'>): Promise<Cliente> => {
    const response = await api.post<Cliente>('/clientes', cliente);
    return response.data;
  },

  updateCliente: async (id: number, cliente: Partial<Cliente>): Promise<Cliente> => {
    const response = await api.put<Cliente>(`/clientes/${id}`, cliente);
    return response.data;
  },

  deleteCliente: async (id: number): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  },
};