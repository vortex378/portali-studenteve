import Link from "next/link";
import { BookOpen, UserPlus, Users } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { getStudentCountForAdmin } from "@/lib/students/getStudentsForAdmin";
import { getExamsForAdmin } from "@/lib/exams/getExamsForAdmin";

export default async function PaneliAdmin() {
  const [numriStudenteve, provimet] = await Promise.all([
    getStudentCountForAdmin(),
    getExamsForAdmin(),
  ]);

  const numriProvimeve = provimet.length;
  const provimeTeKalura = provimet.filter((p) => p.status === "Kaluar").length;

  const veprimet = [
    {
      href: "/admin/students",
      titulli: "Studentët",
      pershkrimi: `Shiko dhe menaxho listën e studentëve (${numriStudenteve} të regjistruar)`,
      ikona: Users,
    },
    {
      href: "/admin/students/new",
      titulli: "Shto Student",
      pershkrimi: "Regjistro një student të ri në sistem",
      ikona: UserPlus,
    },
    {
      href: "/admin/exams",
      titulli: "Provimet",
      pershkrimi: "Shiko dhe menaxho provimet e studentëve",
      ikona: BookOpen,
    },
    {
      href: "/admin/exams/new",
      titulli: "Shto Provim",
      pershkrimi: "Krijo një provim të ri për studentët",
      ikona: BookOpen,
    },
  ];

  return (
    <PageContainer>
      <SectionHeading
        titulli="Paneli Kryesor"
        pershkrimi="Menaxhoni studentët, provimet dhe të dhënat e portalit"
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="stat-card animate-slide-up rounded-2xl p-5">
          <p className="text-sm text-muted">Studentë të regjistruar</p>
          <p className="mt-2 text-3xl font-bold gold-accent">{numriStudenteve}</p>
        </div>
        <div className="stat-card animate-slide-up-delay-1 rounded-2xl p-5">
          <p className="text-sm text-muted">Provime totale</p>
          <p className="mt-2 text-3xl font-bold gold-accent">{numriProvimeve}</p>
        </div>
        <div className="stat-card animate-slide-up-delay-2 rounded-2xl p-5">
          <p className="text-sm text-muted">Provime të kaluara</p>
          <p className="mt-2 text-3xl font-bold gold-accent">{provimeTeKalura}</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {veprimet.map((veprim, index) => {
          const Ikona = veprim.ikona;
          const delayClass =
            index < 2 ? "animate-slide-up" : "animate-slide-up-delay-1";

          return (
            <Link
              key={veprim.href}
              href={veprim.href}
              className={`card-elegant group rounded-2xl p-6 ${delayClass}`}
            >
              <div className="flex items-start gap-4">
                <div className="icon-accent-box flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Ikona className="h-6 w-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent-light">
                    {veprim.titulli}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{veprim.pershkrimi}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}
