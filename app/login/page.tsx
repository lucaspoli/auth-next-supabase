// app\login\page.tsx
"use client";

import { useState } from "react";
import { Button } from "../_components/ui/button";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { Label } from "../_components/ui/label";
import { Input } from "../_components/ui/input";

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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleMagicLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);

    if (error) {
      console.error("Erro ao enviar link mágico:", error.message);
      setMessage("Erro ao enviar link mágico. Tente novamente.");
    } else {
      setMessage("Link mágico enviado! Verifique seu e-mail.");
    }
  }

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Faça login ou cadastre-se usando apenas seu email ou conta Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMagicLogin}>
            <Label htmlFor="email">E-mail:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@exemplo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Magic Login"}
            </Button>
          </form>
          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"outline"} onClick={signInWithGoogle}>
            Login com Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
