import { getCurrentUserRole } from "@/lib/auth/getCurrentUserRole";
import { createClient } from "@/lib/supabase/server";

export async function verifyAdminRequest() {
  const supabase = await createClient();
  const { role, userId } = await getCurrentUserRole(supabase);

  if (role !== "admin" || !userId) {
    return null;
  }

  return { supabase, userId };
}
