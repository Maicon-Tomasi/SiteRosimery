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
import { useEffect, useState } from "react";

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
  
  const [novoPost, setNovoPost] = useState<CreateBlogPostDto>({
    titulo: "",
    conteudo: "",
    imagemUrl: ""
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

  const uploadImagem = async (blogId: string) => {
    if (!imagemSelecionada) return novoPost.imagemUrl;

    const formData = new FormData();
    formData.append("file", imagemSelecionada);
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
      // Primeiro cria o post para ter um ID (ou usa 'temp' se preferir)
      // O backend retorna o ReadBlogPostDto que tem o ID.
      // Mas o usuário quer as imagens em pastas com o ID.
      // Então talvez devêssemos criar o post primeiro com imagem vazia, depois atualizar?
      // Ou gerar um ID aleatório/temporário.
      
      const postCriado = await postBlog(novoPost);
      
      let finalImagemUrl = novoPost.imagemUrl;
      if (imagemSelecionada) {
        finalImagemUrl = await uploadImagem(postCriado.id.toString());
        // Atualiza o post com a URL final
        await putBlog(postCriado.id, { ...novoPost, imagemUrl: finalImagemUrl });
      }

      setMensagemSucesso("Sucesso! Seu post foi publicado");
      setMostrarModalSucesso(true);
      setMostrarModal(false);
      setReloadTabela(reloadTabela + 1);
      setNovoPost({ titulo: "", conteudo: "", imagemUrl: "" });
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
      imagemUrl: post.imagemUrl
    });
  };

  const onParaEdicao = () => {
    setEditando(false);
    setNovoPost({ titulo: "", conteudo: "", imagemUrl: "" });
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
        finalImagemUrl = await uploadImagem(idPost.toString());
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
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Título do Post</label>
          <Input
            type="text"
            placeholder="Digite o título do post"
            valueParam={novoPost.titulo}
            onChangeParam={(val) => setNovoPost({ ...novoPost, titulo: val })}
            classes="w-full border border-slate-300 rounded px-3 py-2"
          />
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
              {imagemSelecionada ? imagemSelecionada.name : "Selecionar Imagem"}
            </label>
            {novoPost.imagemUrl && !imagemSelecionada && (
              <span className="text-xs text-slate-500">Imagem atual: {novoPost.imagemUrl}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Conteúdo (HTML)</label>
          <textarea
            className="w-full min-h-[300px] border border-slate-300 rounded px-3 py-2 font-mono text-sm"
            placeholder="Escreva o conteúdo do post em HTML..."
            value={novoPost.conteudo}
            onChange={(e) => setNovoPost({ ...novoPost, conteudo: e.target.value })}
          />
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
