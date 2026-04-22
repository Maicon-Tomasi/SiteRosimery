"use client";
import { useApi } from "@/hooks/useApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { ReadBlogPostDto } from "@/interfaces/ReadDtos/ReadBlogPostDto";
import { Pen, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { formatDate } from "@/utils/formatDate";

interface TableProps {
     atualizarTabela: number,
     onEditarPost: (postSelecionado: ReadBlogPostDto) => void
}

const TabelaBlog = ({ atualizarTabela, onEditarPost } :TableProps) => {
  const { getPosts, deleteBlog } = useApi();
  const [posts, setPosts] = useState<ReadBlogPostDto[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState<number>(0); 

  const carregarPosts = async () => {
    try {
      const dados = await getPosts();
      setPosts(dados);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const onDeletarPost = async () => {
      try {
        await deleteBlog(idParaExcluir);
        carregarPosts();
        setMostrarModal(false);
        setIdParaExcluir(0);
      } catch (error) {
        console.error("Erro ao excluir post:", error);
      }
  };

  const abrirModalExclusao = (id: number) => {
    setIdParaExcluir(id); 
    setMostrarModal(true); 
  };

  const cancelarModal = () => {
    setIdParaExcluir(0);
    setMostrarModal(false);
  };

  useEffect(() => {
    carregarPosts();
  }, [atualizarTabela]);

  return (
    <div>
      <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={onDeletarPost}
            >
              Confirmar
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={cancelarModal}
            >
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="overflow-x-auto">
        <TooltipProvider>
          <Table className="min-w-full rounded-md border border-slate-200 overflow-hidden shadow-sm bg-white dark:bg-slate-900">
            <TableCaption className="text-slate-500">Lista de posts do blog.</TableCaption>

            <TableHeader className="bg-slate-100 dark:bg-slate-800">
              <TableRow>
                <TableHead className="text-slate-700 dark:text-slate-300">Título</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Tipo</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Data Publicação</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Avaliação</TableHead>
                <TableHead className="text-slate-700 dark:text-slate-300">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{post.titulo}</TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{post.tipo || "-"}</TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{formatDate(new Date(post.dataPublicacao))}</TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-100 whitespace-nowrap">{post.mediaAvaliacao} ({post.totalAvaliacoes})</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="p-2 rounded-md bg-green-100 text-yellow-600 hover:bg-green-200 transition cursor-pointer"
                            onClick={() => onEditarPost(post)}
                          >
                            <Pen size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                      </Tooltip>

                      <Tooltip> 
                        <TooltipTrigger asChild>
                          <button
                            className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                            onClick={() => abrirModalExclusao(post.id)}
                          >
                            <Trash size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Excluir</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TabelaBlog;
