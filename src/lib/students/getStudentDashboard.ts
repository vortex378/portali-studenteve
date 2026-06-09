import { createClient } from "@/lib/supabase/server";
import type { Exam, StudentWithBranch } from "@/types/database";

export interface StudentDashboardData {
  student: StudentWithBranch | null;
  provimet: Exam[];
}

export async function getStudentDashboardData(): Promise<StudentDashboardData> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { student: null, provimet: [] };
  }

  const { data: student, error: studentError } = await supabase
    .from("students")
    .select(
      `
      *,
      branches ( code, name )
    `
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (studentError || !student) {
    return { student: null, provimet: [] };
  }

  const { data: provimet } = await supabase
    .from("exams")
    .select("*")
    .eq("student_id", student.id)
    .order("created_at", { ascending: false });

  return {
    student: student as StudentWithBranch,
    provimet: (provimet ?? []) as Exam[],
  };
}
