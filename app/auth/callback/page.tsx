// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        // Se houver um erro ou o usuário não estiver autenticado, redireciona para o login
        router.replace("/login");
      } else {
        // Se o usuário estiver autenticado, redireciona para a homepage
        router.replace("/");
      }
    }

    checkUser();
  }, [router]);

  return (
    <div className="grid min-h-screen items-center justify-items-center">
      <p>Carregando...</p>
    </div>
  );
}
