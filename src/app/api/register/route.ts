import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  mesazhGabimiAuth,
  mesazhGabimiDb,
  validoTeDhenatERegjistrimit,
  type RegistrationInput,
} from "@/lib/students/registrationValidation";

function urlRidrejtimi(request: Request): string {
  const origin = request.headers.get("origin");
  if (origin) return `${origin}/login`;

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}/login`;
}

export async function POST(request: Request) {
  let body: RegistrationInput;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Të dhënat e dërguara nuk janë të vlefshme." },
      { status: 400 }
    );
  }

  const validim = validoTeDhenatERegjistrimit(body);

  if (!validim.valid) {
    return NextResponse.json({ error: validim.error }, { status: 400 });
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
  } = validim.data;

  const { data: ekzistonId } = await supabaseAdmin
    .from("students")
    .select("id")
    .eq("id_number", id_number)
    .maybeSingle();

  if (ekzistonId) {
    return NextResponse.json(
      { error: "Ky numër identifikimi ekziston tashmë." },
      { status: 400 }
    );
  }

  const { data: ekzistonEmail } = await supabaseAdmin
    .from("students")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (ekzistonEmail) {
    return NextResponse.json(
      { error: "Ky email ekziston tashmë në listën e studentëve." },
      { status: 400 }
    );
  }

  const { data: dega } = await supabaseAdmin
    .from("branches")
    .select("id")
    .eq("id", branch_id)
    .maybeSingle();

  if (!dega) {
    return NextResponse.json(
      { error: "Dega e zgjedhur nuk është e vlefshme." },
      { status: 400 }
    );
  }

  const redirectUrl = urlRidrejtimi(request);

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
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

  const { error: studentError } = await supabaseAdmin.from("students").insert({
    user_id: userId,
    first_name,
    last_name,
    birth_date,
    id_number,
    academic_year,
    age,
    branch_id,
    email,
  });

  if (studentError) {
    await supabaseAdmin.auth.admin.deleteUser(userId);

    return NextResponse.json(
      { error: mesazhGabimiDb(studentError.message) },
      { status: 400 }
    );
  }

  const { error: resendError } = await supabaseAdmin.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });

  if (resendError) {
    console.error(
      "Dështoi dërgimi i email-it të verifikimit:",
      resendError.message
    );
  }

  return NextResponse.json({
    message:
      "Regjistrimi u krye me sukses. Ju lutem kontrolloni email-in për të verifikuar llogarinë.",
  });
}
