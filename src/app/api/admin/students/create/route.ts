import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/verifyAdmin";
import { eshteVitiAkademikValid } from "@/lib/constants/academic";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface CreateStudentBody {
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  id_number?: string;
  academic_year?: number;
  age?: number;
  branch_id?: string;
  email?: string;
  password?: string;
}

function mesazhGabimiAuth(errorMessage: string): string {
  const msg = errorMessage.toLowerCase();

  if (msg.includes("already been registered") || msg.includes("already exists")) {
    return "Ky email është tashmë i regjistruar.";
  }

  if (msg.includes("password")) {
    return "Fjalëkalimi nuk plotëson kërkesat e sigurisë.";
  }

  return "Dështoi krijimi i përdoruesit në sistem.";
}

function mesazhGabimiDb(errorMessage: string): string {
  const msg = errorMessage.toLowerCase();

  if (msg.includes("students_id_number_key") || msg.includes("id_number")) {
    return "Ky numër identifikimi ekziston tashmë.";
  }

  if (msg.includes("students_email_key") || msg.includes("email")) {
    return "Ky email ekziston tashmë në listën e studentëve.";
  }

  if (msg.includes("branch")) {
    return "Dega e zgjedhur nuk është e vlefshme.";
  }

  return "Dështoi krijimi i profilit të studentit.";
}

export async function POST(request: Request) {
  const admin = await verifyAdminRequest();

  if (!admin) {
    return NextResponse.json(
      { error: "Nuk keni leje për këtë veprim." },
      { status: 403 }
    );
  }

  let body: CreateStudentBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Të dhënat e dërguara nuk janë të vlefshme." },
      { status: 400 }
    );
  }

  const {
    first_name,
    last_name,
    birth_date,
    id_number,
    academic_year,
    age,
    branch_id,
    email,
    password,
  } = body;

  if (
    !first_name?.trim() ||
    !last_name?.trim() ||
    !birth_date?.trim() ||
    !id_number?.trim() ||
    academic_year === undefined ||
    age === undefined ||
    !branch_id?.trim() ||
    !email?.trim() ||
    !password
  ) {
    return NextResponse.json(
      { error: "Të gjitha fushat janë të detyrueshme." },
      { status: 400 }
    );
  }

  const vitiAkademik = Number(academic_year);
  const mosha = Number(age);

  if (!eshteVitiAkademikValid(vitiAkademik)) {
    return NextResponse.json(
      { error: "Viti akademik duhet të jetë nga 1 deri në 4." },
      { status: 400 }
    );
  }

  if (!Number.isInteger(mosha) || mosha <= 0) {
    return NextResponse.json(
      { error: "Mosha duhet të jetë më e madhe se 0." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json(
      { error: "Formati i email-it nuk është i vlefshëm." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Fjalëkalimi duhet të ketë minimumi 6 karaktere." },
      { status: 400 }
    );
  }

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: email.trim(),
      password,
      email_confirm: true,
    });

  if (authError || !authData.user) {
    return NextResponse.json(
      {
        error: mesazhGabimiAuth(authError?.message ?? "Gabim i panjohur"),
      },
      { status: 400 }
    );
  }

  const userId = authData.user.id;
  console.log("[admin/students/create] auth user created:", userId);

  const { data: studentData, error: studentError } = await supabaseAdmin
    .from("students")
    .insert({
      user_id: userId,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      birth_date,
      id_number: id_number.trim(),
      academic_year: vitiAkademik,
      age: mosha,
      branch_id: branch_id.trim(),
      email: email.trim(),
    })
    .select("id")
    .single();

  if (studentError || !studentData) {
    await supabaseAdmin.auth.admin.deleteUser(userId);

    return NextResponse.json(
      { error: mesazhGabimiDb(studentError?.message ?? "Gabim i panjohur") },
      { status: 400 }
    );
  }

  console.log("[admin/students/create] student row inserted:", studentData.id);

  revalidatePath("/admin");
  revalidatePath("/admin/students");
  revalidatePath("/dashboard");

  return NextResponse.json({
    message: "Studenti u krijua me sukses.",
    student_id: studentData.id,
  });
}
