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
        <LoaderCircle className="animate-spin text-[#dba952] w-12 h-12" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Post não encontrado.</p>
        <button 
          onClick={() => router.push("/main/blog")}
          className="bg-[#dba952] text-white px-6 py-2 rounded hover:bg-[#c9a34b] transition"
        >
          Voltar ao Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8ebeb]">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => router.push("/main/blog")}
          className="flex items-center bg-white p-2 rounded-2xl gap-2 text-[#dba952] hover:bg-gray-200 font-semibold mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} /> Voltar ao Blog
        </button>

        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1f2937] mb-6 leading-tight">
            {post.titulo}
          </h1>
          <div className="flex justify-center items-center text-sm text-gray-500 gap-4">
            <span className="bg-white text-[#dba952] px-3 py-1 rounded-full font-medium text-base">{post.tipo}</span>
            <time className="text-base" dateTime={post.dataPublicacao}>{formatDate(new Date(post.dataPublicacao))}</time>
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

        <div className="prose prose-lg max-w-none text-[#1f2937] leading-relaxed">
          {/* Usando dangerouslySetInnerHTML pois o sistema administrativo envia o HTML completo */}
          <div 
            className="blog-content-container" 
            dangerouslySetInnerHTML={{ __html: post.conteudo }} 
          />
        </div>

        <style jsx global>{`
          .blog-content-container {
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          .blog-content-container p {
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
            line-height: 1.75;
          }
          .blog-content-container h1,
          .blog-content-container h2,
          .blog-content-container h3,
          .blog-content-container h4 {
            color: #1f2937;
            font-weight: 700;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            line-height: 1.2;
          }
          .blog-content-container h1 { font-size: 2.25rem; }
          .blog-content-container h2 { font-size: 1.875rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
          .blog-content-container h3 { font-size: 1.5rem; }
          .blog-content-container h4 { font-size: 1.25rem; }

          .blog-content-container img {
            max-width: 100%;
            height: auto !important;
            border-radius: 0.75rem;
            margin: 2.5rem auto;
            display: block;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }

          .blog-content-container figure {
            margin: 2.5rem 0;
          }

          .blog-content-container figcaption {
            text-align: center;
            color: #64748b;
            font-size: 0.875rem;
            margin-top: 0.75rem;
          }

          .blog-content-container ul, .blog-content-container ol {
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;
            list-style-position: outside;
          }
          .blog-content-container ul { list-style-type: disc; }
          .blog-content-container ol { list-style-type: decimal; }
          
          .blog-content-container li {
            margin-bottom: 0.5rem;
            padding-left: 0.5rem;
          }

          .blog-content-container blockquote {
            border-left: 4px solid #dba952;
            padding-left: 1.5rem;
            font-style: italic;
            color: #4b5563;
            margin: 2rem 0;
            background-color: #fffaf0;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 0 0.5rem 0.5rem 0;
          }

          .blog-content-container table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            overflow-x: auto;
            display: block;
          }

          .blog-content-container th, .blog-content-container td {
            border: 1px solid #e2e8f0;
            padding: 0.75rem;
            text-align: left;
          }

          .blog-content-container th {
            background-color: #f8fafc;
            font-weight: 600;
          }

          /* Responsividade para vídeos (IFrames como YouTube) */
          .blog-content-container iframe {
            width: 100%;
            aspect-ratio: 16 / 9;
            height: auto;
            border-radius: 0.75rem;
            margin: 2.5rem 0;
          }

          .blog-content-container a {
            color: #dba952;
            text-decoration: underline;
            transition: color 0.2s;
          }

          .blog-content-container a:hover {
            color: #c9a34b;
          }

          @media (max-width: 768px) {
            .blog-content-container h1 { font-size: 1.875rem; }
            .blog-content-container h2 { font-size: 1.5rem; }
            .blog-content-container h3 { font-size: 1.25rem; }
            .blog-content-container p { font-size: 1rem; }
          }
        `}</style>
      </article>
    </div>
  );
}
