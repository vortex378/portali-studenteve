import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Shield,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const vecorite = [
  {
    ikona: GraduationCap,
    titulli: "Menaxhim Akademik",
    pershkrimi:
      "Aksesoni të dhënat tuaja akademike, notat dhe progresin në kohë reale.",
  },
  {
    ikona: BookOpen,
    titulli: "Provimet",
    pershkrimi:
      "Shikoni provimet tuaja, datat e planifikuara dhe statuset e tyre.",
  },
  {
    ikona: Users,
    titulli: "Profili Personal",
    pershkrimi:
      "Menaxhoni profilin tuaj personal dhe informacionet e identifikimit.",
  },
  {
    ikona: Shield,
    titulli: "Siguri e Lartë",
    pershkrimi:
      "Të dhënat tuaja mbrohen me sisteme moderne autentifikimi dhe enkriptimi.",
  },
];

export default function Kryefaqja() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="gradient-hero relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple/40">
              <Shield className="h-10 w-10 text-gold" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gold-accent">Portali i Studentëve</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70 sm:text-xl">
              Akademia e Forcave të Armatosura
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base text-foreground/60">
              Platforma zyrtare për menaxhimin e të dhënave akademike, provimeve
              dhe profilit personal të studentëve të Akademisë së Forcave të
              Armatosura.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="btn-primary rounded-xl px-8 py-3 text-sm font-semibold"
              >
                Hyr në Portal
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary rounded-xl px-8 py-3 text-sm font-semibold"
              >
                Paneli i Studentit
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Veçoritë Kryesore
              </h2>
              <p className="mt-4 text-foreground/60">
                Gjithçka që ju nevojitet për menaxhimin e studimeve tuaja
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {vecorite.map((vecoria) => {
                const Ikona = vecoria.ikona;
                return (
                  <div
                    key={vecoria.titulli}
                    className="card-elegant rounded-2xl p-6"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple/30">
                      <Ikona className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {vecoria.titulli}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/60">
                      {vecoria.pershkrimi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-gold/10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Gati për të filluar?
            </h2>
            <p className="mt-4 text-foreground/60">
              Identifikohuni për të aksesuar panelin tuaj personal
            </p>
            <Link
              href="/login"
              className="btn-primary mt-8 inline-block rounded-xl px-8 py-3 text-sm font-semibold"
            >
              Hyr Tani
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gold/10 bg-navy/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} Akademia e Forcave të Armatosura — Portali
            i Studentëve
          </p>
        </div>
      </footer>
    </>
  );
}
