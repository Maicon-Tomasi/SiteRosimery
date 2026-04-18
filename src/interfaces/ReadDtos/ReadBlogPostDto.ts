export interface ReadBlogPostDto {
  id: number;
  titulo: string;
  conteudo: string;
  imagemUrl: string;
  dataPublicacao: string;
  mediaAvaliacao: number;
  totalAvaliacoes: number;
  comentarios: ReadComentarioDto[];
}

export interface ReadComentarioDto {
  id: number;
  autor: string;
  conteudo: string;
  dataCriacao: string;
}
