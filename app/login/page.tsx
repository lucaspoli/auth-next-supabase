"use client"; // Adicione esta linha no topo do arquivo

import { Button } from "../_components/ui/button";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Erro ao autenticar com Google:", error.message);
  }
}

function LoginPage() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Login</h1>
      <Button onClick={signInWithGoogle}>Login com Google</Button>
    </div>
  );
}

export default LoginPage;
