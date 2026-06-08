"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import SuccessMessage from "@/components/ui/SuccessMessage";
import type { ExamStatus } from "@/types";

const statuset: { vlera: ExamStatus; etiketa: string }[] = [
  { vlera: "planifikuar", etiketa: "Planifikuar" },
  { vlera: "ne_progres", etiketa: "Në Progres" },
  { vlera: "perfunduar", etiketa: "Përfunduar" },
  { vlera: "anuluar", etiketa: "Anuluar" },
];

export default function AddExamForm() {
  const [titulli, setTitulli] = useState("");
  const [pershkrimi, setPershkrimi] = useState("");
  const [data, setData] = useState("");
  const [statusi, setStatusi] = useState<ExamStatus>("planifikuar");
  const [mesazh, setMesazh] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMesazh(
      "Formulari është gati. Ruajtja e provimeve do të aktivizohet pas lidhjes me Supabase."
    );
  };

  return (
    <div className="card-elegant rounded-2xl p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/40">
          <BookOpen className="h-6 w-6 text-gold" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Shto Provim të Ri</h2>
          <p className="text-sm text-foreground/60">
            Plotësoni të dhënat e provimit
          </p>
        </div>
      </div>

      {mesazh && (
        <div className="mb-6">
          <SuccessMessage mesazhi={mesazh} titulli="Informacion" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="titulli"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Titulli i Provimit
          </label>
          <input
            id="titulli"
            type="text"
            value={titulli}
            onChange={(e) => setTitulli(e.target.value)}
            placeholder="Titulli i provimit"
            className="input-field w-full rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="pershkrimi"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Përshkrimi
          </label>
          <textarea
            id="pershkrimi"
            value={pershkrimi}
            onChange={(e) => setPershkrimi(e.target.value)}
            placeholder="Përshkrimi i provimit"
            rows={4}
            className="input-field w-full resize-none rounded-xl px-4 py-3"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="data"
              className="mb-2 block text-sm font-medium text-foreground/80"
            >
              Data e Provimit
            </label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="input-field w-full rounded-xl px-4 py-3"
              required
            />
          </div>
          <div>
            <label
              htmlFor="statusi"
              className="mb-2 block text-sm font-medium text-foreground/80"
            >
              Statusi
            </label>
            <select
              id="statusi"
              value={statusi}
              onChange={(e) => setStatusi(e.target.value as ExamStatus)}
              className="input-field w-full rounded-xl px-4 py-3"
            >
              {statuset.map((s) => (
                <option key={s.vlera} value={s.vlera}>
                  {s.etiketa}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="submit"
            className="btn-primary rounded-xl px-8 py-3 text-sm"
          >
            Ruaj Provimin
          </button>
          <Link
            href="/admin/exams"
            className="btn-secondary rounded-xl px-8 py-3 text-center text-sm"
          >
            Anulo
          </Link>
        </div>
      </form>
    </div>
  );
}
