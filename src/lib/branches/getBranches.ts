import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Branch } from "@/types/database";

export async function getBranchesForPublic(): Promise<Branch[]> {
  const { data, error } = await supabaseAdmin
    .from("branches")
    .select("id, code, name, created_at")
    .order("code");

  if (error) {
    console.error("Gabim gjatë leximit të degëve:", error.message);
    return [];
  }

  return (data ?? []) as Branch[];
}
