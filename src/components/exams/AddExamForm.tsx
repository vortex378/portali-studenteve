"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  SEZONET,
  VITET_AKADEMIKE,
  eshteNotaValid,
  llogaritStatusinNgaNota,
} from "@/lib/constants/academic";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingState from "@/components/ui/LoadingState";
import SuccessMessage from "@/components/ui/SuccessMessage";
import type { StudentWithBranch } from "@/types/database";
import ExamResultBadge from "./ExamResultBadge";

interface AddExamFormProps {
  studentet: StudentWithBranch[];
}

const fushatBosh = {
  student_id: "",
  exam_name: "",
  academic_year: "",
  season: "",
  grade: "",
};

export default function AddExamForm({ studentet }: AddExamFormProps) {
  const [form, setForm] = useState(fushatBosh);
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const [gabim, setGabim] = useState("");
  const [sukses, setSukses] = useState("");

  const notaNumerike = parseFloat(form.grade.replace(",", "."));
  const statusPreview = useMemo(() => {
    if (!form.grade || Number.isNaN(notaNumerike)) return null;
    if (!eshteNotaValid(notaNumerike)) return null;
    return llogaritStatusinNgaNota(notaNumerike);
  }, [form.grade, notaNumerike]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGabim("");
    setSukses("");
    setDukeRuajtur(true);

    try {
      const response = await fetch("/api/admin/exams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: form.student_id,
          exam_name: form.exam_name,
          academic_year: Number(form.academic_year),
          season: form.season,
          grade: notaNumerike,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGabim(data.error ?? "Ndodhi një gabim gjatë shtimit të provimit.");
        return;
      }

      setSukses(data.message ?? "Provimi u shtua me sukses.");
      setForm(fushatBosh);
    } catch {
      setGabim("Ndodhi një gabim gjatë shtimit të provimit.");
    } finally {
      setDukeRuajtur(false);
    }
  };

  if (studentet.length === 0) {
    return (
      <div className="card-elegant rounded-2xl p-8 text-center">
        <p className="text-foreground/70">
          Nuk ka studentë të regjistruar. Shtoni një student përpara se të
          regjistroni provime.
        </p>
        <Link
          href="/admin/students/new"
          className="btn-primary mt-6 inline-block rounded-xl px-6 py-3 text-sm"
        >
          Shto Student
        </Link>
      </div>
    );
  }

  return (
    <div className="card-elegant rounded-2xl p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/40">
          <BookOpen className="h-6 w-6 text-gold" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Shto Provim të Ri</h2>
          <p className="text-sm text-foreground/60">
            Regjistroni një provim për studentin e zgjedhur
          </p>
        </div>
      </div>

      {gabim && (
        <div className="mb-6">
          <ErrorMessage mesazhi={gabim} />
        </div>
      )}

      {sukses && (
        <div className="mb-6">
          <SuccessMessage mesazhi={sukses} />
          <Link
            href="/admin/exams"
            className="btn-secondary mt-4 inline-block rounded-xl px-6 py-2 text-sm"
          >
            Shiko listën e provimeve
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="student_id"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Studenti
          </label>
          <select
            id="student_id"
            name="student_id"
            value={form.student_id}
            onChange={handleChange}
            className="input-field w-full rounded-xl px-4 py-3"
            required
            disabled={dukeRuajtur}
          >
            <option value="">Zgjidh studentin</option>
            {studentet.map((s) => (
              <option key={s.id} value={s.id}>
                {s.first_name} {s.last_name} — {s.id_number} —{" "}
                {s.branches?.code ?? "?"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="exam_name"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Lënda
          </label>
          <input
            id="exam_name"
            name="exam_name"
            type="text"
            value={form.exam_name}
            onChange={handleChange}
            placeholder="Bazat e Programimit"
            className="input-field w-full rounded-xl px-4 py-3"
            required
            disabled={dukeRuajtur}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="academic_year"
              className="mb-2 block text-sm font-medium text-foreground/80"
            >
              Viti Akademik i Provimit
            </label>
            <select
              id="academic_year"
              name="academic_year"
              value={form.academic_year}
              onChange={handleChange}
              className="input-field w-full rounded-xl px-4 py-3"
              required
              disabled={dukeRuajtur}
            >
              <option value="">Zgjidh vitin</option>
              {VITET_AKADEMIKE.map((viti) => (
                <option key={viti} value={viti}>
                  Viti {viti}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="season"
              className="mb-2 block text-sm font-medium text-foreground/80"
            >
              Sezoni
            </label>
            <select
              id="season"
              name="season"
              value={form.season}
              onChange={handleChange}
              className="input-field w-full rounded-xl px-4 py-3"
              required
              disabled={dukeRuajtur}
            >
              <option value="">Zgjidh sezonin</option>
              {SEZONET.map((sezoni) => (
                <option key={sezoni} value={sezoni}>
                  {sezoni}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="grade"
            className="mb-2 block text-sm font-medium text-foreground/80"
          >
            Nota
          </label>
          <input
            id="grade"
            name="grade"
            type="text"
            inputMode="decimal"
            value={form.grade}
            onChange={handleChange}
            placeholder="4 – 10 (p.sh. 8.5)"
            className="input-field w-full rounded-xl px-4 py-3"
            required
            disabled={dukeRuajtur}
          />
          {statusPreview && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-foreground/60">
                Parapamje statusi (Nota {notaNumerike}):
              </span>
              <ExamResultBadge statusi={statusPreview} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="submit"
            className="btn-primary rounded-xl px-8 py-3 text-sm"
            disabled={dukeRuajtur}
          >
            {dukeRuajtur ? "Duke ruajtur..." : "Ruaj Provimin"}
          </button>
          <Link
            href="/admin/exams"
            className="btn-secondary rounded-xl px-8 py-3 text-center text-sm"
          >
            Anulo
          </Link>
        </div>
      </form>

      {dukeRuajtur && (
        <div className="mt-6">
          <LoadingState mesazhi="Duke shtuar provimin..." />
        </div>
      )}
    </div>
  );
}
