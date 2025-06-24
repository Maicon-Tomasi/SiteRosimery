'use client';

import React, { ReactHTMLElement, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { LoginUsuarioDto } from "@/interfaces/interfacesDto";

export default function LoginPage() {
  const router = useRouter();
  const { postUsuarioLogin } = useApi();
  const [form, setForm] = useState<LoginUsuarioDto>(
    { 
      username: "",
      password: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("Form data:", form);
    setErro("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    try {
      const resp = await postUsuarioLogin(form);
      if(resp.status === 'success') {
        document.cookie = `token=${resp.token}; path=/; max-age=3600; secure; SameSite=Strict`;
        router.push("/Produtos");
      }
      else
      {
        setErro("Usuário não encontrado");
      }
    } catch {
      setErro("Erro ao tentar logar. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
          Bem-vindo ao <span className="text-purple-500">EasyStorage</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="usuario">
              Usuário
            </label>
            <input
              id="usuario"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          {erro && (
            <div className="text-red-500 text-sm text-center">{erro}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} EasyStorage. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}