import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { ExamWithStudent } from "@/types/database";

export async function getExamsForAdmin(): Promise<ExamWithStudent[]> {
  const { data, error } = await supabaseAdmin
    .from("exams")
    .select(
      `
      *,
      students (
        first_name,
        last_name,
        id_number,
        branches ( code, name )
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gabim gjatë leximit të provimeve:", error.message);
    return [];
  }

  return (data ?? []) as ExamWithStudent[];
}
