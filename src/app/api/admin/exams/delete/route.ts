import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/verifyAdmin";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface DeleteExamBody {
  exam_id?: string;
}

export async function POST(request: Request) {
  const admin = await verifyAdminRequest();

  if (!admin) {
    return NextResponse.json(
      { error: "Nuk keni leje për këtë veprim." },
      { status: 403 }
    );
  }

  let body: DeleteExamBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Të dhënat e dërguara nuk janë të vlefshme." },
      { status: 400 }
    );
  }

  const { exam_id } = body;

  if (!exam_id?.trim()) {
    return NextResponse.json(
      { error: "Mungon identifikuesi i provimit." },
      { status: 400 }
    );
  }

  const { data: exam, error: examError } = await supabaseAdmin
    .from("exams")
    .select("id")
    .eq("id", exam_id.trim())
    .maybeSingle();

  if (examError || !exam) {
    return NextResponse.json(
      { error: "Provimi nuk u gjet." },
      { status: 404 }
    );
  }

  const { error: deleteError } = await supabaseAdmin
    .from("exams")
    .delete()
    .eq("id", exam.id);

  if (deleteError) {
    return NextResponse.json(
      { error: "Dështoi fshirja e provimit." },
      { status: 500 }
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/exams");
  revalidatePath("/dashboard");

  return NextResponse.json({
    message: "Provimi u fshi me sukses.",
  });
}
