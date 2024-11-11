// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr"; // Importa o cliente do Supabase para uso no servidor

export async function middleware(request: NextRequest) {
  // Cria uma resposta que pode ser manipulada para configurar cookies
  const response = NextResponse.next();

  // Inicializa o cliente Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Retorna cookies disponíveis
        getAll() {
          return request.cookies.getAll();
        },
        // Configura cookies usando `response.cookies.set`
        async setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Obtém o usuário autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Páginas de login e callback são acessíveis sem autenticação
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname.startsWith("/auth/callback")
  ) {
    return response;
  }

  // Se o usuário não está autenticado, redireciona para a página de login
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Caso contrário, permite o acesso à página protegida
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
