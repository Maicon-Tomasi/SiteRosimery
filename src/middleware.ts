// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Intercepta o subdomínio da NR1 (ajustar de acordo com o subdomínio escolhido, ex: nr1.psicologarosimery.com.br)
  // Ocultado temporariamente a pedido do usuário
  // if (hostname.includes('nr1.psicologarosimery.com.br') || hostname.includes('empresas.psicologarosimery.com.br')) {
  //   if (url.pathname !== '/landing-nr1' && url.pathname === '/') {
  //     return NextResponse.rewrite(new URL('/landing-nr1', request.url));
  //   }
  // }

  // --- Lógica original para o /sistema ---
  const token = request.cookies.get('token')?.value;

  if (url.pathname.startsWith('/sistema')) {
    // Se estiver tentando acessar o sistema e não tiver token → redireciona
    if (!token && url.pathname !== '/sistema/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Se estiver no login (antigo ou novo) com token → vai pro Dashboard
    if ((url.pathname === '/sistema/login' || url.pathname === '/sistema') && token) {
      return NextResponse.redirect(new URL('/sistema/Dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// O matcher intercepta todas as rotas EXCETO os arquivos estáticos, API, etc.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp).*)',
  ],
};
