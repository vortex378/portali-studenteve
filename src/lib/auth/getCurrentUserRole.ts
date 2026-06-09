import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserRole } from "@/types/database";

export interface CurrentUserRoleResult {
  role: UserRole;
  userId: string | null;
}

export async function getCurrentUserRole(
  supabase: SupabaseClient
): Promise<CurrentUserRoleResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { role: "guest", userId: null };
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminUser) {
    return { role: "admin", userId: user.id };
  }

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (student) {
    return { role: "student", userId: user.id };
  }

  return { role: "unknown", userId: user.id };
}
