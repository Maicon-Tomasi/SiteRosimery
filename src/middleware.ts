// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware executado para:', request.nextUrl.pathname);

  const token = request.cookies.get('token')?.value;

  // Se estiver tentando acessar o sistema e não tiver token → redireciona
  if (request.nextUrl.pathname.startsWith('/sistema') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/sistema/login' || request.nextUrl.pathname === '/sistema' && token) {
    return NextResponse.redirect(new URL('/sistema/Dashboard', request.url));
  }

  return NextResponse.next();
}

// Apenas protege rotas que começam com /sistema
export const config = {
  matcher: ['/sistema/:path*'],
};
