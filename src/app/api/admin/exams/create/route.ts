import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/verifyAdmin";
import {
  eshteNotaValid,
  eshteSezoniValid,
  eshteVitiAkademikValid,
  llogaritStatusinNgaNota,
} from "@/lib/constants/academic";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface CreateExamBody {
  student_id?: string;
  exam_name?: string;
  academic_year?: number;
  season?: string;
  grade?: number;
}

export async function POST(request: Request) {
  const admin = await verifyAdminRequest();

  if (!admin) {
    return NextResponse.json(
      { error: "Nuk keni leje për këtë veprim." },
      { status: 403 }
    );
  }

  let body: CreateExamBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Të dhënat e dërguara nuk janë të vlefshme." },
      { status: 400 }
    );
  }

  const { student_id, exam_name, academic_year, season, grade } = body;

  if (
    !student_id?.trim() ||
    !exam_name?.trim() ||
    academic_year === undefined ||
    !season?.trim() ||
    grade === undefined
  ) {
    return NextResponse.json(
      { error: "Të gjitha fushat janë të detyrueshme." },
      { status: 400 }
    );
  }

  const vitiAkademik = Number(academic_year);
  const nota = Number(grade);

  if (!eshteVitiAkademikValid(vitiAkademik)) {
    return NextResponse.json(
      { error: "Viti akademik duhet të jetë nga 1 deri në 4." },
      { status: 400 }
    );
  }

  if (!eshteSezoniValid(season)) {
    return NextResponse.json(
      { error: "Sezoni i zgjedhur nuk është i vlefshëm." },
      { status: 400 }
    );
  }

  if (!eshteNotaValid(nota)) {
    return NextResponse.json(
      { error: "Nota duhet të jetë nga 4 deri në 10." },
      { status: 400 }
    );
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id")
    .eq("id", student_id.trim())
    .maybeSingle();

  if (studentError || !student) {
    return NextResponse.json(
      { error: "Studenti i zgjedhur nuk u gjet." },
      { status: 400 }
    );
  }

  const status = llogaritStatusinNgaNota(nota);

  const { error: insertError } = await supabaseAdmin.from("exams").insert({
    student_id: student_id.trim(),
    exam_name: exam_name.trim(),
    academic_year: vitiAkademik,
    season,
    grade: nota,
    status,
  });

  if (insertError) {
    return NextResponse.json(
      { error: "Dështoi ruajtja e provimit." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Provimi u shtua me sukses.",
  });
}
