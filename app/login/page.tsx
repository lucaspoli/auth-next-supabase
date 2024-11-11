// app\login\page.tsx
"use client";

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
  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Faça login ou cadastre-se usando apenas seu email ou conta Google.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Label>E-mail:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@exemplo.com"
              autoComplete="email"
            />
            <Button>Magic Login</Button>
          </form>
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
