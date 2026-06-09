import AddExamForm from "@/components/exams/AddExamForm";
import PageContainer from "@/components/ui/PageContainer";
import { getStudentsForAdmin } from "@/lib/students/getStudentsForAdmin";

export default async function ShtoProvim() {
  const studentet = await getStudentsForAdmin();

  return (
    <PageContainer narrow>
      <AddExamForm studentet={studentet} />
    </PageContainer>
  );
}
