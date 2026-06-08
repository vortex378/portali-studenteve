import { BookOpen, Calendar, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ExamTable from "@/components/exams/ExamTable";

export default function PaneliStudentit() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground">
              Paneli Personal
            </h1>
            <p className="mt-2 text-foreground/60">
              Mirë se vini në portalin tuaj personal të studentit
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              titulli="Profili"
              vlera="—"
              pershkrimi="Të dhënat personale do të shfaqen pas autentifikimit"
              ikona="user"
            />
            <DashboardCard
              titulli="Provimet"
              vlera="0"
              pershkrimi="Provimet tuaja akademike"
              ikona="book"
            />
            <DashboardCard
              titulli="Datat e Ardhshme"
              vlera="0"
              pershkrimi="Provime të planifikuara"
              ikona="calendar"
            />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="card-elegant rounded-2xl p-6 lg:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <User className="h-6 w-6 text-gold" />
                <h2 className="text-lg font-semibold text-foreground">
                  Profili Im
                </h2>
              </div>
              <p className="text-sm text-foreground/60">
                Informacionet e profilit tuaj do të ngarkohen pas lidhjes me
                Supabase Auth.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-gold" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Provimet e Mia
                  </h2>
                </div>
              </div>
              <ExamTable provimet={[]} />
            </div>
          </div>

          <div className="mt-8 card-elegant rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-gold" />
              <h2 className="text-lg font-semibold text-foreground">
                Të Dhënat Akademike
              </h2>
            </div>
            <p className="mt-3 text-sm text-foreground/60">
              Të dhënat akademike do të jenë të disponueshme pas konfigurimit të
              bazës së të dhënave.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
