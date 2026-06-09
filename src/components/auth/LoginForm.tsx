"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock } from "lucide-react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingState from "@/components/ui/LoadingState";
import { getCurrentUserRole } from "@/lib/auth/getCurrentUserRole";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fjalekalimi, setFjalekalimi] = useState("");
  const [gabim, setGabim] = useState("");
  const [dukeNgarkuar, setDukeNgarkuar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGabim("");
    setDukeNgarkuar(true);

    try {
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: fjalekalimi,
      });

      if (authError) {
        const msg = authError.message.toLowerCase();
        if (
          msg.includes("email not confirmed") ||
          msg.includes("not confirmed") ||
          msg.includes("email address not confirmed")
        ) {
          setGabim(
            "Ju lutem verifikoni email-in përpara hyrjes në portal."
          );
          return;
        }
        setGabim("Email ose fjalëkalimi është i gabuar.");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && !user.email_confirmed_at) {
        await supabase.auth.signOut();
        setGabim("Ju lutem verifikoni email-in përpara hyrjes në portal.");
        return;
      }

      const { role } = await getCurrentUserRole(supabase);

      if (role === "admin") {
        router.push("/admin");
        router.refresh();
        return;
      }

      if (role === "student") {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      await supabase.auth.signOut();
      setGabim("Llogaria u gjet, por nuk ka profil të lidhur në sistem.");
    } catch {
      setGabim("Ndodhi një gabim gjatë hyrjes. Provoni përsëri.");
    } finally {
      setDukeNgarkuar(false);
    }
  };

  if (dukeNgarkuar) {
    return (
      <div className="card-glass mx-auto w-full max-w-md animate-fade-in rounded-2xl p-8">
        <LoadingState mesazhi="Duke u identifikuar..." />
      </div>
    );
  }

  return (
    <div className="card-glass mx-auto w-full max-w-md animate-slide-up rounded-2xl p-6 sm:p-8">
      <div className="mb-8 text-center">
        <div className="icon-accent-box mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
          <LogIn className="h-7 w-7 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Hyrja në Portal</h1>
        <p className="mt-2 text-sm text-muted">
          Vendosni kredencialet tuaja për të vazhduar
        </p>
      </div>

      {gabim && (
        <div className="mb-6">
          <ErrorMessage mesazhi={gabim} titulli="Gabim" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground/85"
          >
            Adresa Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@shembull.com"
              className="input-field w-full rounded-xl py-3 pl-11 pr-4"
              required
              disabled={dukeNgarkuar}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="fjalekalimi"
            className="mb-2 block text-sm font-medium text-foreground/85"
          >
            Fjalëkalimi
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              id="fjalekalimi"
              type="password"
              value={fjalekalimi}
              onChange={(e) => setFjalekalimi(e.target.value)}
              placeholder="••••••••"
              className="input-field w-full rounded-xl py-3 pl-11 pr-4"
              required
              disabled={dukeNgarkuar}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full rounded-xl py-3.5 text-sm"
          disabled={dukeNgarkuar}
        >
          Hyr
        </button>
      </form>

      <div className="mt-6 border-t border-white/8 pt-6 text-center">
        <p className="text-sm text-muted">
          Nuk keni llogari?{" "}
          <Link
            href="/register"
            className="font-medium text-accent-light underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Regjistrohu
          </Link>
        </p>
      </div>

      <p className="mt-3 text-center text-sm text-muted">
        <Link
          href="/"
          className="text-accent-light transition-colors hover:text-accent"
        >
          Kthehu në kryefaqe
        </Link>
      </p>
    </div>
  );
}
