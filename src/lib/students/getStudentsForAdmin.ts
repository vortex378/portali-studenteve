import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { StudentWithBranch } from "@/types/database";

export type { StudentWithBranch };

export async function getStudentsForAdmin(): Promise<StudentWithBranch[]> {
  const { data, error } = await supabaseAdmin
    .from("students")
    .select(
      `
      *,
      branches ( code, name )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gabim gjatë leximit të studentëve:", error.message);
    return [];
  }

  return (data ?? []) as StudentWithBranch[];
}

export async function getStudentCountForAdmin(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("students")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Gabim gjatë numërimit të studentëve:", error.message);
    return 0;
  }

  return count ?? 0;
}
