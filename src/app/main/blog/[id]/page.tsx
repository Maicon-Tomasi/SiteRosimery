"use client";
import { useApi } from "@/hooks/useApi";
import { ReadBlogPostDto } from "@/interfaces/ReadDtos/ReadBlogPostDto";
import { formatDate } from "@/utils/formatDate";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderCircle, ArrowLeft } from "lucide-react";

export default function BlogPostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { getPostById } = useApi();
  const [post, setPost] = useState<ReadBlogPostDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const data = await getPostById(Number(id));
          setPost(data);
        }
      } catch (error) {
        console.error("Erro ao carregar post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoaderCircle className="animate-spin text-yellow-600 w-12 h-12" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Post não encontrado.</p>
        <button 
          onClick={() => router.push("/main/blog")}
          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
        >
          Voltar ao Blog
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={() => router.push("/main/blog")}
        className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Voltar ao Blog
      </button>

      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
          {post.titulo}
        </h1>
        <div className="flex justify-center items-center text-sm text-gray-500 gap-4">
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">Artigo</span>
          <time dateTime={post.dataPublicacao}>{formatDate(post.dataPublicacao)}</time>
        </div>
      </header>

      {post.imagemUrl && (
        <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden rounded-2xl mb-12 shadow-md">
          <img 
            src={post.imagemUrl} 
            alt={post.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {/* Usando dangerouslySetInnerHTML pois o sistema administrativo envia o HTML completo */}
        <div 
          className="blog-content-container" 
          dangerouslySetInnerHTML={{ __html: post.conteudo }} 
        />
      </div>

      <style jsx global>{`
        .blog-content-container p {
          margin-bottom: 1.5rem;
        }
        .blog-content-container h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content-container h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #334155;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content-container img {
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }
        .blog-content-container ul, .blog-content-container ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-content-container li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </article>
  );
}
