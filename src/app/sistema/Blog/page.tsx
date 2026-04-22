"use client";
import Input from "@/app/ComponentsSistema/input/input";
import BotaoAmarelo from "@/components/botaoAmarelo/botaoAmarelo";
import BotaoVermelho from "@/components/botaoVermelho/botaoAzul";
import TabelaBlog from "@/components/TableBlog/page";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import { CreateBlogPostDto } from "@/interfaces/CreateDtos/CreateBlogPostDto";
import { ReadBlogPostDto } from "@/interfaces/ReadDtos/ReadBlogPostDto";
import { UpdateBlogPostDto } from "@/interfaces/UpdateDtos/UpdateBlogPostDto";
import { LoaderCircle, PlusCircle, Send, X, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useMemo, useRef, useCallback } from "react";

// Importação dinâmica do ReactQuill para evitar erro de SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;
// @ts-expect-error
import "react-quill-new/dist/quill.snow.css";

const Blog = () => {
  const { postBlog, putBlog } = useApi();
  const [carregando, setCarregando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [reloadTabela, setReloadTabela] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
  const [idPost, setIdPost] = useState<number>(0);
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const quillRef = useRef<any>(null);
  
  const [novoPost, setNovoPost] = useState<CreateBlogPostDto>({
    titulo: "",
    conteudo: "",
    imagemUrl: "",
    tipo: ""
  });

  const onConfirmarCadastroPost = () => {
    setMostrarModal(true);
  };

  const onCloseModal = () => {
    setCarregando(false);
    setMostrarModal(false);
    setMostrarModalErro(false);
    setMostrarModalEdicao(false);
    setMostrarModalSucesso(false);
  };

  const uploadImagem = async (blogId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("blogId", blogId);

    const response = await fetch("/api/upload-blog-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer upload da imagem");
    }

    const data = await response.json();
    return data.url;
  };

  const onCadastraPost = async () => {
    setCarregando(true);
    try {
      // Cria o post inicial
      const postCriado = await postBlog(novoPost);
      
      let finalImagemUrl = novoPost.imagemUrl;
      if (imagemSelecionada) {
        finalImagemUrl = await uploadImagem(postCriado.id.toString(), imagemSelecionada);
        // Atualiza o post com a URL final da capa
        await putBlog(postCriado.id, { ...novoPost, imagemUrl: finalImagemUrl });
      }

      setMensagemSucesso("Sucesso! Seu post foi publicado");
      setMostrarModalSucesso(true);
      setMostrarModal(false);
      setReloadTabela(reloadTabela + 1);
      setNovoPost({ titulo: "", conteudo: "", imagemUrl: "", tipo: "" });
      setImagemSelecionada(null);
    } catch (error: any) {
      setMensagemErro("Erro ao publicar post. " + (error.message || ""));
      setMostrarModalErro(true);
    } finally {
      setCarregando(false);
    }
  };

  const onEditarPost = (post: ReadBlogPostDto) => {
    setEditando(true);
    setIdPost(post.id);
    setNovoPost({
      titulo: post.titulo,
      conteudo: post.conteudo,
      imagemUrl: post.imagemUrl,
      tipo: post.tipo || ""
    });
  };

  const onParaEdicao = () => {
    setEditando(false);
    setNovoPost({ titulo: "", conteudo: "", imagemUrl: "", tipo: "" });
    setImagemSelecionada(null);
  };

  const onConfirmarEdicao = () => {
    setMostrarModalEdicao(true);
  };

  const editaPostPosConfirmacao = async () => {
    setCarregando(true);
    try {
      let finalImagemUrl = novoPost.imagemUrl;
      if (imagemSelecionada) {
        finalImagemUrl = await uploadImagem(idPost.toString(), imagemSelecionada);
      }

      const postAAtualizar: UpdateBlogPostDto = {
        ...novoPost,
        imagemUrl: finalImagemUrl
      };

      await putBlog(idPost, postAAtualizar);
      setMensagemSucesso("Sucesso! Seu post foi editado");
      setMostrarModalSucesso(true);
      setMostrarModalEdicao(false);
      setReloadTabela(reloadTabela + 1);
      onParaEdicao();
    } catch (error: any) {
      setMensagemErro("Erro ao editar post. " + (error.message || ""));
      setMostrarModalErro(true);
    } finally {
      setCarregando(false);
    }
  };

  // Handler para upload de imagens dentro do editor
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          // Usamos 'temp' se estivermos criando um novo post, ou idPost se estivermos editando
          const blogId = editando ? idPost.toString() : "temp";
          const url = await uploadImagem(blogId, file);
          
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          if (range) {
            quill?.insertEmbed(range.index, "image", url);
          }
        } catch (error) {
          console.error("Erro ao inserir imagem no editor:", error);
        }
      }
    };
  }, [editando, idPost]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "link",
    "image",
  ];

  return (
    <div className="w-full flex flex-col gap-6 p-6 min-h-screen">
      {/* Modais de Confirmação e Status */}
      <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Publicação</DialogTitle>
            <DialogDescription>Tem certeza que deseja publicar este post?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700" onClick={onCadastraPost}>Confirmar</button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={onCloseModal}>Cancelar</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={mostrarModalEdicao} onOpenChange={setMostrarModalEdicao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Edição</DialogTitle>
            <DialogDescription>Tem certeza que deseja salvar as alterações?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700" onClick={editaPostPosConfirmacao}>Confirmar</button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={onCloseModal}>Cancelar</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={mostrarModalErro} onOpenChange={setMostrarModalErro}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erro</DialogTitle>
            <DialogDescription>{mensagemErro}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={onCloseModal}>Fechar</button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={mostrarModalSucesso} onOpenChange={setMostrarModalSucesso}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sucesso!</DialogTitle>
            <DialogDescription>{mensagemSucesso}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={onCloseModal}>OK</button>
          </div>
        </DialogContent>
      </Dialog>

      <header>
        <h1 className="text-3xl font-bold text-yellow-600 tracking-tight">Blog - Gerenciamento de Posts</h1>
      </header>

      <section className="bg-white p-6 rounded-md shadow-sm border border-slate-200 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Título do Post</label>
            <Input
              type="text"
              placeholder="Ex: Como lidar com a ansiedade"
              valueParam={novoPost.titulo}
              onChangeParam={(val) => setNovoPost({ ...novoPost, titulo: val })}
              classes="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Tipo do Post</label>
            <Input
              type="text"
              placeholder="Ex: Artigo, Notícia, Dica"
              valueParam={novoPost.tipo}
              onChangeParam={(val) => setNovoPost({ ...novoPost, tipo: val })}
              classes="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Imagem de Capa</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagemSelecionada(e.target.files?.[0] || null)}
              className="hidden"
              id="upload-imagem"
            />
            <label
              htmlFor="upload-imagem"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-300 rounded cursor-pointer hover:bg-slate-200 transition"
            >
              <ImageIcon size={18} />
              {imagemSelecionada ? imagemSelecionada.name : "Selecionar Imagem de Capa"}
            </label>
            {novoPost.imagemUrl && !imagemSelecionada && (
              <span className="text-xs text-slate-500 truncate max-w-xs">Capa atual: {novoPost.imagemUrl}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Conteúdo do Post</label>
          <div className="min-h-[400px] mb-12">
            <ReactQuill
              theme="snow"
              value={novoPost.conteudo}
              onChange={(content: string) => setNovoPost({ ...novoPost, conteudo: content })}
              modules={modules}
              formats={formats}
              ref={quillRef}
              style={{ height: "350px" }}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-2 justify-end">
          {editando ? (
            <>
              <BotaoAmarelo onClick={onConfirmarEdicao} disabled={carregando}>
                {carregando ? <LoaderCircle className="animate-spin w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                Salvar Alterações
              </BotaoAmarelo>
              <BotaoVermelho onClick={onParaEdicao} disabled={carregando}>
                <X className="w-4 h-4 mr-2" /> Cancelar
              </BotaoVermelho>
            </>
          ) : (
            <BotaoAmarelo onClick={onConfirmarCadastroPost} disabled={carregando}>
              {carregando ? <LoaderCircle className="animate-spin w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
              Publicar Post
            </BotaoAmarelo>
          )}
        </div>
      </section>

      <TabelaBlog atualizarTabela={reloadTabela} onEditarPost={onEditarPost} />
    </div>
  );
};

export default Blog;
