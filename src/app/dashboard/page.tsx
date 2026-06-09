import {
  BookOpen,
  Calendar,
  GraduationCap,
  Mail,
  User,
} from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import DashboardCard from "@/components/dashboard/DashboardCard";
import StudentExamTable from "@/components/exams/StudentExamTable";
import Navbar from "@/components/layout/Navbar";
import { getStudentDashboardData } from "@/lib/students/getStudentDashboard";

function formatoDaten(data: string) {
  return new Date(data).toLocaleDateString("sq-AL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PaneliStudentit() {
  const { student, provimet } = await getStudentDashboardData();

  const provimeTeKalura = provimet.filter((p) => p.status === "Kaluar").length;
  const provimeTeRegjistruara = provimet.length;

  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Paneli Personal
              </h1>
              <p className="mt-2 text-foreground/60">
                {student
                  ? `Mirë se vini, ${student.first_name} ${student.last_name}`
                  : "Mirë se vini në portalin tuaj personal të studentit"}
              </p>
            </div>
            <LogoutButton />
          </div>

          {!student ? (
            <div className="card-elegant rounded-2xl p-12 text-center">
              <User className="mx-auto h-12 w-12 text-foreground/30" />
              <h2 className="mt-4 text-lg font-semibold text-foreground/70">
                Profili i studentit nuk u gjet.
              </h2>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                  titulli="Viti Akademik"
                  vlera={student.academic_year}
                  pershkrimi="Viti aktual i studimeve"
                  ikona="graduation"
                />
                <DashboardCard
                  titulli="Provimet"
                  vlera={provimeTeRegjistruara}
                  pershkrimi="Provime të regjistruara"
                  ikona="book"
                />
                <DashboardCard
                  titulli="Të Kaluara"
                  vlera={provimeTeKalura}
                  pershkrimi="Provime me status Kaluar"
                  ikona="calendar"
                />
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-3">
                <div className="card-elegant rounded-2xl p-6 lg:col-span-1">
                  <div className="mb-6 flex items-center gap-3">
                    <User className="h-6 w-6 text-gold" />
                    <h2 className="text-lg font-semibold text-foreground">
                      Profili Im
                    </h2>
                  </div>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-foreground/50">Emri</dt>
                      <dd className="font-medium text-foreground">
                        {student.first_name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground/50">Mbiemri</dt>
                      <dd className="font-medium text-foreground">
                        {student.last_name}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-foreground/50">
                        <Mail className="h-4 w-4" />
                        Email
                      </dt>
                      <dd className="font-medium text-foreground">
                        {student.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground/50">Datëlindja</dt>
                      <dd className="font-medium text-foreground">
                        {formatoDaten(student.birth_date)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground/50">Numri ID</dt>
                      <dd className="font-medium text-foreground">
                        {student.id_number}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-foreground/50">Mosha</dt>
                      <dd className="font-medium text-foreground">
                        {student.age} vjeç
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="lg:col-span-2">
                  <div className="mb-4 flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-gold" />
                    <h2 className="text-lg font-semibold text-foreground">
                      Të Dhënat Akademike
                    </h2>
                  </div>
                  <div className="card-elegant rounded-2xl p-6">
                    <dl className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-foreground/50">
                          Viti Akademik
                        </dt>
                        <dd className="mt-1 text-lg font-semibold gold-accent">
                          Viti {student.academic_year}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-foreground/50">Dega</dt>
                        <dd className="mt-1 font-medium text-foreground">
                          {student.branches
                            ? `${student.branches.code} — ${student.branches.name}`
                            : "—"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-8">
                    <div className="mb-4 flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-gold" />
                      <h2 className="text-lg font-semibold text-foreground">
                        Provimet e Mia
                      </h2>
                    </div>
                    <StudentExamTable provimet={provimet} />
                  </div>
                </div>
              </div>

              <div className="mt-8 card-elegant rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-gold" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Statistika të Shkurtra
                  </h2>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-purple/20 p-4 text-center">
                    <p className="text-2xl font-bold gold-accent">
                      {provimeTeRegjistruara}
                    </p>
                    <p className="mt-1 text-xs text-foreground/60">
                      Provime totale
                    </p>
                  </div>
                  <div className="rounded-xl bg-purple/20 p-4 text-center">
                    <p className="text-2xl font-bold gold-accent">
                      {provimeTeKalura}
                    </p>
                    <p className="mt-1 text-xs text-foreground/60">
                      Të kaluara
                    </p>
                  </div>
                  <div className="rounded-xl bg-purple/20 p-4 text-center">
                    <p className="text-2xl font-bold gold-accent">
                      {provimeTeRegjistruara - provimeTeKalura}
                    </p>
                    <p className="mt-1 text-xs text-foreground/60">
                      Të pakaluara
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
