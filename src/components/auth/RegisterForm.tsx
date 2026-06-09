"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingState from "@/components/ui/LoadingState";
import Select from "@/components/ui/Select";
import SuccessMessage from "@/components/ui/SuccessMessage";
import { VITET_AKADEMIKE } from "@/lib/constants/academic";
import type { Branch } from "@/types/database";

interface RegisterFormProps {
  degët: Branch[];
}

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
  confirm_password: "",
};

export default function RegisterForm({ degët }: RegisterFormProps) {
  const [form, setForm] = useState(fushatBosh);
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const [gabim, setGabim] = useState("");
  const [sukses, setSukses] = useState("");

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
      const response = await fetch("/api/register", {
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
          confirm_password: form.confirm_password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGabim(data.error ?? "Ndodhi një gabim gjatë regjistrimit.");
        return;
      }

      setSukses(
        data.message ??
          "Regjistrimi u krye me sukses. Ju lutem kontrolloni email-in për të verifikuar llogarinë."
      );
      setForm(fushatBosh);
    } catch {
      setGabim("Ndodhi një gabim gjatë regjistrimit.");
    } finally {
      setDukeRuajtur(false);
    }
  };

  if (dukeRuajtur) {
    return (
      <div className="card-glass mx-auto w-full max-w-3xl animate-fade-in rounded-2xl p-6 sm:p-8">
        <LoadingState mesazhi="Duke u regjistruar..." />
      </div>
    );
  }

  return (
    <div className="card-glass mx-auto w-full max-w-3xl animate-slide-up rounded-2xl p-5 sm:p-8">
      <div className="mb-8 text-center">
        <div className="icon-accent-box mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
          <UserPlus className="h-7 w-7 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Regjistrohu</h1>
        <p className="mt-2 text-sm text-muted">
          Krijoni llogarinë tuaj studentore
        </p>
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
            href="/login"
            className="btn-primary mt-4 inline-block rounded-xl px-6 py-2.5 text-sm"
          >
            Shko te hyrja
          </Link>
        </div>
      )}

      {!sukses && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
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

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
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

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
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

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
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
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="mb-2 block text-sm font-medium text-foreground/85"
              >
                Konfirmo fjalëkalimin
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="Përsërit fjalëkalimin"
                className="input-field w-full rounded-xl px-4 py-3"
                required
                minLength={6}
                disabled={dukeRuajtur}
              />
            </div>
          </div>

          <p className="text-xs text-muted">
            Fjalëkalimi përdoret vetëm për hyrjen në portal (Supabase Auth) dhe
            nuk ruhet në bazën e të dhënave.
          </p>

          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full rounded-xl py-3.5 text-sm font-semibold"
              disabled={dukeRuajtur}
            >
              Regjistrohu
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 border-t border-white/8 pt-6 text-center">
        <p className="text-sm text-muted">
          Keni tashmë llogari?{" "}
          <Link
            href="/login"
            className="font-medium text-accent-light underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Hyni këtu
          </Link>
        </p>
      </div>
    </div>
  );
}
