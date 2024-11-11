// app\page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js"; // Importe o tipo User do supabase-js

const supabase = createClient();

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null); // Defina o tipo explicitamente

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Erro ao buscar dados do usuário:", error.message);
      } else {
        setUser(user);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Protegida</h1>
      {user ? (
        <div className="text-center">
          <h2>Bem-vindo, {user.email || "Email não disponível"}!</h2>
          <p>ID do usuário: {user.id || "ID não disponível"}</p>
          <p>Nome: {user.user_metadata?.name || "Nome não disponível"}</p>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
}
