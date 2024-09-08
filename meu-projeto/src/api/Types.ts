export interface Artista {
    id_artista: number;
    nome: string;
    descricao: string;
    email: string;
    tipoUsuario: string;
  }
  
  export interface Cliente {
    id_cliente: number;
    nome: string;
    descriao?: string;
    tipoUsuario: string;
    email: string;
    telefone?: string;
  }

  export interface ClienteCadastro {
    nome: string;
   email: string;
   senha: string;
   tipoUsuario: string;  // Deve estar presente aqui
   telefone?: string;
   descricao?: string;
  }
  
  export interface Portifolio {
    id_portifolio: number;
    id_artista: number;
    titulo: string;
    descricao: string;
  }
  
  export interface Arte {
    id_arte: number;
    id_portifolio: number;
    titulo: string;
    descricao: string;
    vote: number;
  }
  
  export interface Servico {
    id_servico: number;
    id_artista: number;
    descricao: string;
    valor_servico: number;
  }
  
  export interface Pedido {
    id_pedido: number;
    id_cliente: number;
    id_artista: number;
    id_servico: number;
    id_arte: number;
    descricao: string;
    dt_pedido: Date;
    dt_previsao_entrega: Date;
    entregue: boolean;
    trabalhando: boolean;
  }

  export interface FormData {
    nome: string;
    email: string;
    senha: string;
    confirmaSenha?: string;
    tipoUsuario?: string;
  }

  export interface ArtistaCadastro extends Omit<Artista, 'id_artista'> {
    nome: string;
  email: string;
  senha: string;
  tipoUsuario: string;
  descricao: string;
  }