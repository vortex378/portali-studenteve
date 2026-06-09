import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/verifyAdmin";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface DeleteStudentBody {
  student_id?: string;
}

export async function POST(request: Request) {
  const admin = await verifyAdminRequest();

  if (!admin) {
    return NextResponse.json(
      { error: "Nuk keni leje për këtë veprim." },
      { status: 403 }
    );
  }

  let body: DeleteStudentBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Të dhënat e dërguara nuk janë të vlefshme." },
      { status: 400 }
    );
  }

  const { student_id } = body;

  if (!student_id?.trim()) {
    return NextResponse.json(
      { error: "Mungon identifikuesi i studentit." },
      { status: 400 }
    );
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, user_id")
    .eq("id", student_id.trim())
    .maybeSingle();

  if (studentError || !student) {
    return NextResponse.json(
      { error: "Studenti nuk u gjet." },
      { status: 404 }
    );
  }

  const { error: authDeleteError } =
    await supabaseAdmin.auth.admin.deleteUser(student.user_id);

  if (authDeleteError) {
    const { error: rowDeleteError } = await supabaseAdmin
      .from("students")
      .delete()
      .eq("id", student.id);

    if (rowDeleteError) {
      return NextResponse.json(
        { error: "Dështoi fshirja e studentit." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    message: "Studenti u fshi me sukses.",
  });
}
