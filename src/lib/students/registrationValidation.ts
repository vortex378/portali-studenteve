import { eshteVitiAkademikValid } from "@/lib/constants/academic";

export interface RegistrationInput {
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  id_number?: string;
  academic_year?: number;
  age?: number;
  branch_id?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export function validoTeDhenatERegjistrimit(
  body: RegistrationInput
): { valid: true; data: Required<RegistrationInput> } | { valid: false; error: string } {
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
    confirm_password,
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
    !password ||
    !confirm_password
  ) {
    return { valid: false, error: "Të gjitha fushat janë të detyrueshme." };
  }

  const vitiAkademik = Number(academic_year);
  const mosha = Number(age);

  if (!eshteVitiAkademikValid(vitiAkademik)) {
    return {
      valid: false,
      error: "Viti akademik duhet të jetë nga 1 deri në 4.",
    };
  }

  if (!Number.isInteger(mosha) || mosha <= 0) {
    return { valid: false, error: "Mosha duhet të jetë më e madhe se 0." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: "Formati i email-it nuk është i vlefshëm." };
  }

  if (password.length < 6) {
    return {
      valid: false,
      error: "Fjalëkalimi duhet të ketë minimumi 6 karaktere.",
    };
  }

  if (password !== confirm_password) {
    return {
      valid: false,
      error: "Fjalëkalimet nuk përputhen.",
    };
  }

  return {
    valid: true,
    data: {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      birth_date: birth_date.trim(),
      id_number: id_number.trim(),
      academic_year: vitiAkademik,
      age: mosha,
      branch_id: branch_id.trim(),
      email: email.trim(),
      password,
      confirm_password,
    },
  };
}

export function mesazhGabimiAuth(errorMessage: string): string {
  const msg = errorMessage.toLowerCase();

  if (msg.includes("already been registered") || msg.includes("already exists")) {
    return "Ky email është tashmë i regjistruar.";
  }

  if (msg.includes("password")) {
    return "Fjalëkalimi nuk plotëson kërkesat e sigurisë.";
  }

  return "Dështoi krijimi i përdoruesit në sistem.";
}

export function mesazhGabimiDb(errorMessage: string): string {
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
