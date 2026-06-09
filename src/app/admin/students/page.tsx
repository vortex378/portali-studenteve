import Link from "next/link";
import { UserPlus, Users } from "lucide-react";
import StudentList from "@/components/students/StudentList";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/ui/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { getStudentsForAdmin } from "@/lib/students/getStudentsForAdmin";

export default async function ListaStudenteve() {
  const studentet = await getStudentsForAdmin();

  return (
    <PageContainer>
      <SectionHeading
        titulli="Studentët"
        pershkrimi="Lista e të gjithë studentëve të regjistruar"
        ikona={Users}
        veprim={
          <Link
            href="/admin/students/new"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm sm:w-auto"
          >
            <UserPlus className="h-5 w-5" />
            Shto Student
          </Link>
        }
      />

      {studentet.length === 0 ? (
        <EmptyState
          ikona={Users}
          titulli="Nuk ka studentë të regjistruar."
          pershkrimi="Filloni duke shtuar studentin e parë në sistem."
          veprim={
            <Link
              href="/admin/students/new"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm"
            >
              <UserPlus className="h-5 w-5" />
              Shto Studentin e Parë
            </Link>
          }
        />
      ) : (
        <StudentList studentet={studentet} />
      )}
    </PageContainer>
  );
}
