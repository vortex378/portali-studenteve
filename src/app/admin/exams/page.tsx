import Link from "next/link";
import { BookOpen } from "lucide-react";
import ExamList from "@/components/exams/ExamList";
import PageContainer from "@/components/ui/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { getExamsForAdmin } from "@/lib/exams/getExamsForAdmin";

export default async function ListaProvimeve() {
  const provimet = await getExamsForAdmin();

  return (
    <PageContainer>
      <SectionHeading
        titulli="Provimet"
        pershkrimi="Lista e të gjitha provimeve të regjistruara"
        ikona={BookOpen}
        veprim={
          <Link
            href="/admin/exams/new"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm sm:w-auto"
          >
            <BookOpen className="h-5 w-5" />
            Shto Provim
          </Link>
        }
      />

      <ExamList provimet={provimet} />
    </PageContainer>
  );
}
