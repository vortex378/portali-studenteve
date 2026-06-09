import Link from "next/link";
import { BookOpen } from "lucide-react";
import ExamList from "@/components/exams/ExamList";
import { getExamsForAdmin } from "@/lib/exams/getExamsForAdmin";

export default async function ListaProvimeve() {
  const provimet = await getExamsForAdmin();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Provimet</h1>
          <p className="mt-2 text-foreground/60">
            Lista e të gjitha provimeve të regjistruara
          </p>
        </div>
        <Link
          href="/admin/exams/new"
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm"
        >
          <BookOpen className="h-5 w-5" />
          Shto Provim
        </Link>
      </div>

      <ExamList provimet={provimet} />
    </div>
  );
}
