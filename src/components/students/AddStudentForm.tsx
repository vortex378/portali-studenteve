"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import SuccessMessage from "@/components/ui/SuccessMessage";

export default function AddStudentForm() {
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [email, setEmail] = useState("");
  const [numriIdentifikimit, setNumriIdentifikimit] = useState("");
  const [mesazh, setMesazh] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMesazh(
      "Formulari është gati. Ruajtja e studentëve do të aktivizohet pas lidhjes me Supabase."
    );
  };

  return (
    <div className="card-elegant rounded-2xl p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/40">
          <UserPlus className="h-6 w-6 text-gold" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Shto Student të Ri</h2>
          <p className="text-sm text-foreground/60">
            Plotësoni të dhënat e studentit
          </p>
        </div>
      </div>

      {mesazh && (
        <div className="mb-6">
          <SuccessMessage mesazhi={mesazh} titulli="Informacion" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="emri"
              className="mb-2 block text-sm font-medium text-foreground/80"
            >
              Emri
            </label>
            <input
              id="emri"
              type="text"
              value={emri}
              onChange={(e) => setEmri(e.target.value)}
              placeholder="Emri i studentit"
              className="input-field w-full rounded-xl px-4 py-3"
              required
            />
          </div>
          <div>
            <label
              htmlFor="mbiemri"
              className="mb-2 block text-sm font-medium text-foreground/80"
            >
              Mbiemri
            </label>
            <input
              id="mbiemri"
              type="text"
              value={mbiemri}
              onChange={(e) => setMbiemri(e.target.value)}
              placeholder="Mbiemri i studentit"
              className="input-field w-full rounded-xl px-4 py-3"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Adresa Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@shembull.com"
            className="input-field w-full rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="numriIdentifikimit"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Numri i Identifikimit
          </label>
          <input
            id="numriIdentifikimit"
            type="text"
            value={numriIdentifikimit}
            onChange={(e) => setNumriIdentifikimit(e.target.value)}
            placeholder="Nr. identifikimit ushtarak"
            className="input-field w-full rounded-xl px-4 py-3"
            required
          />
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="submit"
            className="btn-primary rounded-xl px-8 py-3 text-sm"
          >
            Ruaj Studentin
          </button>
          <Link
            href="/admin/students"
            className="btn-secondary rounded-xl px-8 py-3 text-center text-sm"
          >
            Anulo
          </Link>
        </div>
      </form>
    </div>
  );
}
