"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Select from "@/components/ui/Select";
import LoadingState from "@/components/ui/LoadingState";
import SuccessMessage from "@/components/ui/SuccessMessage";
import { VITET_AKADEMIKE } from "@/lib/constants/academic";
import { createClient } from "@/lib/supabase/client";
import type { Branch } from "@/types/database";

const fushatBosh = {
  first_name: "",
  last_name: "",
  birth_date: "",
  id_number: "",
  academic_year: "",
  age: "",
  branch_id: "",
  email: "",
  password: "",
};

export default function AddStudentForm() {
  const [form, setForm] = useState(fushatBosh);
  const [degët, setDegët] = useState<Branch[]>([]);
  const [dukeNgarkuarDegët, setDukeNgarkuarDegët] = useState(true);
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const [gabim, setGabim] = useState("");
  const [sukses, setSukses] = useState("");

  useEffect(() => {
    async function ngarkoDegët() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("branches")
          .select("id, code, name, created_at")
          .order("code");

        if (error) {
          setGabim("Dështoi ngarkimi i degëve.");
          return;
        }

        setDegët(data ?? []);
      } catch {
        setGabim("Dështoi ngarkimi i degëve.");
      } finally {
        setDukeNgarkuarDegët(false);
      }
    }

    ngarkoDegët();
  }, []);

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
      const response = await fetch("/api/admin/students/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          birth_date: form.birth_date,
          id_number: form.id_number,
          academic_year: Number(form.academic_year),
          age: Number(form.age),
          branch_id: form.branch_id,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGabim(data.error ?? "Ndodhi një gabim gjatë krijimit të studentit.");
        return;
      }

      setSukses(data.message ?? "Studenti u krijua me sukses.");
      setForm(fushatBosh);
    } catch {
      setGabim("Ndodhi një gabim gjatë krijimit të studentit.");
    } finally {
      setDukeRuajtur(false);
    }
  };

  if (dukeNgarkuarDegët) {
    return (
      <div className="card-glass rounded-2xl p-8">
        <LoadingState mesazhi="Duke ngarkuar degët..." />
      </div>
    );
  }

  return (
    <div className="card-glass animate-slide-up rounded-2xl p-6 sm:p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="icon-accent-box flex h-12 w-12 items-center justify-center rounded-xl">
          <UserPlus className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Shto Student të Ri</h2>
          <p className="text-sm text-muted">
            Plotësoni të dhënat e studentit
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
            href="/admin/students"
            className="btn-secondary mt-4 inline-block rounded-xl px-6 py-2 text-sm"
          >
            Shiko listën e studentëve
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="mb-2 block text-sm font-medium text-foreground/85"
            >
              Emri
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Emri i studentit"
              className="input-field w-full rounded-xl px-4 py-3"
              required
              disabled={dukeRuajtur}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="mb-2 block text-sm font-medium text-foreground/85"
            >
              Mbiemri
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Mbiemri i studentit"
              className="input-field w-full rounded-xl px-4 py-3"
              required
              disabled={dukeRuajtur}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="birth_date"
              className="mb-2 block text-sm font-medium text-foreground/85"
            >
              Datëlindja
            </label>
            <input
              id="birth_date"
              name="birth_date"
              type="date"
              value={form.birth_date}
              onChange={handleChange}
              className="input-field w-full rounded-xl px-4 py-3"
              required
              disabled={dukeRuajtur}
            />
          </div>
          <div>
            <label
              htmlFor="id_number"
              className="mb-2 block text-sm font-medium text-foreground/85"
            >
              Numri ID
            </label>
            <input
              id="id_number"
              name="id_number"
              type="text"
              value={form.id_number}
              onChange={handleChange}
              placeholder="Nr. identifikimit"
              className="input-field w-full rounded-xl px-4 py-3"
              required
              disabled={dukeRuajtur}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="academic_year"
              className="mb-2 block text-sm font-medium text-foreground/85"
            >
              Viti Akademik
            </label>
            <Select
              id="academic_year"
              name="academic_year"
              value={form.academic_year}
              onChange={handleChange}
              required
              disabled={dukeRuajtur}
            >
              <option value="">Zgjidh vitin</option>
              {VITET_AKADEMIKE.map((viti) => (
                <option key={viti} value={viti}>
                  Viti {viti}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="age"
              className="mb-2 block text-sm font-medium text-foreground/85"
            >
              Mosha
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min={1}
              value={form.age}
              onChange={handleChange}
              placeholder="Mosha"
              className="input-field w-full rounded-xl px-4 py-3"
              required
              disabled={dukeRuajtur}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="branch_id"
            className="mb-2 block text-sm font-medium text-foreground/85"
          >
            Dega
          </label>
          <Select
            id="branch_id"
            name="branch_id"
            value={form.branch_id}
            onChange={handleChange}
            required
            disabled={dukeRuajtur || degët.length === 0}
          >
            <option value="">Zgjidh degën</option>
            {degët.map((dega) => (
              <option key={dega.id} value={dega.id}>
                {dega.code} — {dega.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-foreground/85"
          >
            Adresa Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@shembull.com"
            className="input-field w-full rounded-xl px-4 py-3"
            required
            disabled={dukeRuajtur}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-foreground/85"
          >
            Fjalëkalimi
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimumi 6 karaktere"
            className="input-field w-full rounded-xl px-4 py-3"
            required
            minLength={6}
            disabled={dukeRuajtur}
          />
          <p className="mt-1 text-xs text-muted">
            Fjalëkalimi përdoret vetëm për hyrjen në portal (Supabase Auth).
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="submit"
            className="btn-primary rounded-xl px-8 py-3 text-sm"
            disabled={dukeRuajtur}
          >
            {dukeRuajtur ? "Duke ruajtur..." : "Ruaj Studentin"}
          </button>
          <Link
            href="/admin/students"
            className="btn-secondary rounded-xl px-8 py-3 text-center text-sm"
          >
            Anulo
          </Link>
        </div>
      </form>

      {dukeRuajtur && (
        <div className="mt-6">
          <LoadingState mesazhi="Duke krijuar studentin..." />
        </div>
      )}
    </div>
  );
}
