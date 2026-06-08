"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Mail, Lock } from "lucide-react";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [fjalekalimi, setFjalekalimi] = useState("");
  const [gabim, setGabim] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGabim(
      "Autentifikimi do të aktivizohet pas lidhjes me Supabase Auth."
    );
  };

  return (
    <div className="card-elegant mx-auto w-full max-w-md rounded-2xl p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple/40">
          <LogIn className="h-7 w-7 text-gold" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Hyrja në Portal</h1>
        <p className="mt-2 text-sm text-foreground/60">
          Identifikohuni për të aksesuar panelin tuaj
        </p>
      </div>

      {gabim && (
        <div className="mb-6">
          <ErrorMessage mesazhi={gabim} titulli="Informacion" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Adresa Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@shembull.com"
              className="input-field w-full rounded-xl py-3 pl-11 pr-4"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="fjalekalimi"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Fjalëkalimi
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
            <input
              id="fjalekalimi"
              type="password"
              value={fjalekalimi}
              onChange={(e) => setFjalekalimi(e.target.value)}
              placeholder="••••••••"
              className="input-field w-full rounded-xl py-3 pl-11 pr-4"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full rounded-xl py-3 text-sm"
        >
          Hyr
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/50">
        <Link href="/" className="text-gold hover:underline">
          Kthehu në kryefaqe
        </Link>
      </p>
    </div>
  );
}
