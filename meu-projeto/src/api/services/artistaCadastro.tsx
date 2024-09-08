import { Artista } from "../Types";

export interface ArtistaCadastro extends Omit<Artista, 'id_artista'> {
    senha: string;
    tipo_Usuario: string;
  }