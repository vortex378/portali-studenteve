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
    ikona: Users,
    titulli: "Menaxhim Studentësh",
    pershkrimi:
      "Regjistrimi, përditësimi dhe menaxhimi i studentëve në një panel të centralizuar.",
  },
  {
    ikona: BookOpen,
    titulli: "Rezultate Provimesh",
    pershkrimi:
      "Regjistrimi i notave, sezoneve akademike dhe statusit të kalimit për çdo provim.",
  },
  {
    ikona: GraduationCap,
    titulli: "Panel Personal",
    pershkrimi:
      "Çdo student sheh profilin, të dhënat akademike dhe provimet e veta në kohë reale.",
  },
  {
    ikona: Shield,
    titulli: "Siguri me Supabase",
    pershkrimi:
      "Autentifikim i sigurt, role të ndara dhe mbrojtje e të dhënave me teknologji moderne.",
  },
];

export default function Kryefaqja() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <section className="gradient-hero pattern-bg relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),transparent_55%)]" />
          <div className="relative mx-auto max-w-7xl text-center animate-fade-in">
            <div className="icon-accent-box mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl">
              <Shield className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gold-accent">Portali i Studentëve</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80 sm:text-xl">
              Akademia e Forcave të Armatosura
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted">
              Platforma zyrtare për menaxhimin e studentëve, provimeve dhe
              profileve akademike. Një sistem modern, i sigurt dhe i përshtatshëm
              për institucionin tonë.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="btn-primary w-full rounded-xl px-8 py-3.5 text-sm font-semibold sm:w-auto"
              >
                Hyr në Portal
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center animate-slide-up">
              <h2 className="text-3xl font-bold text-foreground">
                Veçoritë Kryesore
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted">
                Gjithçka që nevojitet për menaxhimin akademik të studentëve
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {vecorite.map((vecoria, index) => {
                const Ikona = vecoria.ikona;
                const delayClass =
                  index === 0
                    ? "animate-slide-up"
                    : index === 1
                      ? "animate-slide-up-delay-1"
                      : index === 2
                        ? "animate-slide-up-delay-2"
                        : "animate-slide-up-delay-3";

                return (
                  <div
                    key={vecoria.titulli}
                    className={`card-elegant rounded-2xl p-6 ${delayClass}`}
                  >
                    <div className="icon-accent-box mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                      <Ikona className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {vecoria.titulli}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {vecoria.pershkrimi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-white/8 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground">
              Gati për të filluar?
            </h2>
            <p className="mt-4 text-muted">
              Identifikohuni për të aksesuar panelin tuaj personal
            </p>
            <Link
              href="/login"
              className="btn-primary mt-8 inline-block rounded-xl px-8 py-3.5 text-sm font-semibold"
            >
              Hyr Tani
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-surface px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Akademia e Forcave të Armatosura —
            Portali i Studentëve
          </p>
        </div>
      </footer>
    </>
  );
}
