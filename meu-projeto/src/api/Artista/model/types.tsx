//Criação de tipos de usuarios;

export interface userArtistas{
    id: number;
    nome: string;
    descricao: string;
    email: string;
    senha: string;
    tipoUsuario: 'admin' | 'usuario' | 'artista';
}