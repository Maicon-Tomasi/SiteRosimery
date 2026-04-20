"use client";
import { useApi } from "@/hooks/useApi";
import { ReadBlogPostDto } from "@/interfaces/ReadDtos/ReadBlogPostDto";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function BlogList() {
  const { getPosts } = useApi();
  const [posts, setPosts] = useState<ReadBlogPostDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoaderCircle className="animate-spin text-yellow-600 w-12 h-12" />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-600 mb-4">Blog & Artigos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore conteúdos sobre psicologia perinatal, obstetrícia e bem-estar emocional para mães e famílias.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={post.imagemUrl || "/imagensSite/gravidez-img.jpg"} 
                alt={post.titulo}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                <span>{formatDate(new Date(post.dataPublicacao))}</span>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">{post.tipo}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">{post.titulo}</h2>
              <div className="text-gray-600 text-sm mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.conteudo.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' }} />
              <div className="mt-auto">
                <Link 
                  href={`/main/blog/${post.id}`}
                  className="inline-block text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
                >
                  Ler artigo completo →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Nenhum artigo publicado ainda. Volte em breve!</p>
        </div>
      )}
    </main>
  );
}
