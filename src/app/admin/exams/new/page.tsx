import AddExamForm from "@/components/exams/AddExamForm";
import { getStudentsForAdmin } from "@/lib/students/getStudentsForAdmin";

export default async function ShtoProvim() {
  const studentet = await getStudentsForAdmin();

  return (
    <div className="mx-auto max-w-2xl">
      <AddExamForm studentet={studentet} />
    </div>
  );
}
