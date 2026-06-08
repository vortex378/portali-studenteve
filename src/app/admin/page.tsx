import Link from "next/link";
import { BookOpen, UserPlus, Users } from "lucide-react";

const veprimet = [
  {
    href: "/admin/students",
    titulli: "Studentët",
    pershkrimi: "Shiko dhe menaxho listën e studentëve",
    ikona: Users,
    ngjyra: "bg-purple/30",
  },
  {
    href: "/admin/students/new",
    titulli: "Shto Student",
    pershkrimi: "Regjistro një student të ri në sistem",
    ikona: UserPlus,
    ngjyra: "bg-navy-light/50",
  },
  {
    href: "/admin/exams",
    titulli: "Provimet",
    pershkrimi: "Shiko dhe menaxho provimet e studentëve",
    ikona: BookOpen,
    ngjyra: "bg-purple/30",
  },
  {
    href: "/admin/exams/new",
    titulli: "Shto Provim",
    pershkrimi: "Krijo një provim të ri për studentët",
    ikona: BookOpen,
    ngjyra: "bg-navy-light/50",
  },
];

export default function PaneliAdmin() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">
          Paneli Kryesor
        </h1>
        <p className="mt-2 text-foreground/60">
          Menaxhoni studentët, provimet dhe të dhënat e portalit
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {veprimet.map((veprim) => {
          const Ikona = veprim.ikona;
          return (
            <Link
              key={veprim.href}
              href={veprim.href}
              className="card-elegant group rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${veprim.ngjyra}`}
                >
                  <Ikona className="h-6 w-6 text-gold transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                    {veprim.titulli}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/60">
                    {veprim.pershkrimi}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 card-elegant rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Statusi i Sistemit
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Supabase nuk është lidhur ende. Pas konfigurimit, këtu do të shfaqen
          statistikat e studentëve dhe provimeve.
        </p>
      </div>
    </div>
  );
}
