import Link from "next/link";
import { UserPlus, Users } from "lucide-react";
import StudentList from "@/components/students/StudentList";
import { getStudentsForAdmin } from "@/lib/students/getStudentsForAdmin";

export default async function ListaStudenteve() {
  const studentet = await getStudentsForAdmin();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Studentët</h1>
          <p className="mt-2 text-foreground/60">
            Lista e të gjithë studentëve të regjistruar
          </p>
        </div>
        <Link
          href="/admin/students/new"
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm"
        >
          <UserPlus className="h-5 w-5" />
          Shto Student
        </Link>
      </div>

      {studentet.length === 0 ? (
        <div className="card-elegant rounded-2xl p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-foreground/30" />
          <h3 className="mt-4 text-lg font-semibold text-foreground/70">
            Nuk ka studentë të regjistruar.
          </h3>
          <Link
            href="/admin/students/new"
            className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm"
          >
            <UserPlus className="h-5 w-5" />
            Shto Studentin e Parë
          </Link>
        </div>
      ) : (
        <StudentList studentet={studentet} />
      )}
    </div>
  );
}
