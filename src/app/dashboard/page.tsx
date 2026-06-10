import {
  BookOpen,
  Calendar,
  GraduationCap,
  Mail,
  User,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import LogoutButton from "@/components/auth/LogoutButton";
import DashboardCard from "@/components/dashboard/DashboardCard";
import StudentExamTable from "@/components/exams/StudentExamTable";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/ui/PageContainer";
import { llogaritMesatarenNotave } from "@/lib/constants/academic";
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
  const provimeTePakaluara = provimet.filter(
    (p) => p.status === "Nuk ka kaluar"
  ).length;
  const provimeTeRegjistruara = provimet.length;
  const mesatarjaNotave = llogaritMesatarenNotave(
    provimet.map((p) => p.grade)
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden py-8 sm:py-10">
        <PageContainer>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="animate-slide-up min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Paneli Personal
              </h1>
              <p className="mt-2 text-muted">
                {student
                  ? `Mirë se vini, ${student.first_name} ${student.last_name}`
                  : "Mirë se vini në portalin tuaj personal të studentit"}
              </p>
            </div>
            <LogoutButton />
          </div>

          {!student ? (
            <EmptyState
              ikona={User}
              titulli="Profili i studentit nuk u gjet."
            />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                  titulli="Provime Totale"
                  vlera={provimeTeRegjistruara}
                  pershkrimi="Të gjitha provimet e regjistruara"
                  ikona="book"
                />
                <DashboardCard
                  titulli="Të Kaluara"
                  vlera={provimeTeKalura}
                  pershkrimi="Provime me status Kaluar"
                  ikona="calendar"
                />
                <DashboardCard
                  titulli="Të Pakaluara"
                  vlera={provimeTePakaluara}
                  pershkrimi="Provime me status Nuk ka kaluar"
                  ikona="calendar"
                />
                <DashboardCard
                  titulli="Mesatarja"
                  vlera={mesatarjaNotave !== null ? mesatarjaNotave : "—"}
                  pershkrimi="Mesatarja e notave"
                  ikona="graduation"
                />
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">
                <Card className="animate-slide-up lg:col-span-1" padding="md">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="icon-accent-box rounded-lg p-2">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Profili Im
                    </h2>
                  </div>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-muted">Emri</dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {student.first_name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Mbiemri</dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {student.last_name}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-muted">
                        <Mail className="h-4 w-4" />
                        Email
                      </dt>
                      <dd className="mt-0.5 break-all font-medium text-foreground">
                        {student.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Datëlindja</dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {formatoDaten(student.birth_date)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Numri ID</dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {student.id_number}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Mosha</dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {student.age} vjeç
                      </dd>
                    </div>
                  </dl>
                </Card>

                <div className="space-y-6 lg:col-span-2">
                  <Card className="animate-slide-up-delay-1" padding="md">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="icon-accent-box rounded-lg p-2">
                        <GraduationCap className="h-5 w-5 text-accent" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Të Dhënat Akademike
                      </h2>
                    </div>
                    <dl className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-muted">Viti Akademik</dt>
                        <dd className="mt-1 text-lg font-semibold gold-accent">
                          Viti {student.academic_year}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted">Dega</dt>
                        <dd className="mt-1 font-medium text-foreground">
                          {student.branches
                            ? `${student.branches.code} — ${student.branches.name}`
                            : "—"}
                        </dd>
                      </div>
                    </dl>
                  </Card>

                  <div className="animate-slide-up-delay-2">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="icon-accent-box rounded-lg p-2">
                        <BookOpen className="h-5 w-5 text-accent" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Provimet e Mia
                      </h2>
                    </div>
                    <StudentExamTable provimet={provimet} />
                  </div>
                </div>
              </div>

              <Card className="mt-8 animate-slide-up-delay-3" padding="md">
                <div className="flex items-center gap-3">
                  <div className="icon-accent-box rounded-lg p-2">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Statistika të Shkurtra
                  </h2>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { vlera: provimeTeRegjistruara, etiketa: "Provime totale" },
                    { vlera: provimeTeKalura, etiketa: "Të kaluara" },
                    { vlera: provimeTePakaluara, etiketa: "Të pakaluara" },
                    {
                      vlera: mesatarjaNotave !== null ? mesatarjaNotave : "—",
                      etiketa: "Mesatarja e notave",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.etiketa}
                      className="stat-card rounded-xl p-4 text-center"
                    >
                      <p className="text-2xl font-bold gold-accent">
                        {stat.vlera}
                      </p>
                      <p className="mt-1 text-xs text-muted">{stat.etiketa}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </PageContainer>
      </main>
    </>
  );
}
