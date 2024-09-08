import { api } from '../API'; // Verifique se a importação está correta
import { Cliente, ClienteCadastro } from '../Types'; // Importando os tipos corretos

export const clienteService = {
  getClientes: async (): Promise<Cliente[]> => {
    const response = await api.get<Cliente[]>('/clientes');
    return response.data;
  },

  getCliente: async (id: number): Promise<Cliente> => {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },

  createCliente: async (cliente: ClienteCadastro): Promise<ClienteCadastro> => {
    try {
      const response = await api.post<ClienteCadastro>('/cliente', cliente); // Certifique-se que o endpoint '/clientes' está correto no backend
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar cliente:", error.response?.data || error.message);
      throw new Error(error.response?.data || "Erro ao criar cliente");
    }
  },

  updateCliente: async (id: number, cliente: Partial<Cliente>): Promise<Cliente> => {
    const response = await api.put<Cliente>(`/clientes/${id}`, cliente);
    return response.data;
  },

  deleteCliente: async (id: number): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  },
};

