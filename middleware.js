import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware executado');
  const token = request.cookies.get('token')?.value;

  // Permite acesso livre à página de login e à raiz /
  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/login')
  ) {
    return NextResponse.next();
  }

  // Se não autenticado, redireciona para /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};