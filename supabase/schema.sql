-- ============================================================
-- Portali i Studentëve — Skema e databazës PostgreSQL (Supabase)
-- ============================================================

-- 1. Tabela: branches (degët)
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.branches (code, name) VALUES
  ('TIK', 'Teknologji Informacioni & Komunikimi në fushën e mbrojtjes'),
  ('MN', 'Marrëdhënie ndërkombëtare në fushën e mbrojtjes'),
  ('SHK', 'Shkenca komunikimi në fushën e mbrojtjes'),
  ('SHU', 'Shkenca Ushtarake')
ON CONFLICT (code) DO NOTHING;

-- 2. Tabela: students
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  id_number TEXT UNIQUE NOT NULL,
  academic_year INTEGER NOT NULL CHECK (academic_year >= 1 AND academic_year <= 5),
  age INTEGER NOT NULL CHECK (age > 0),
  branch_id UUID REFERENCES public.branches(id),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela: exams
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  exam_name TEXT NOT NULL,
  academic_year INTEGER NOT NULL CHECK (academic_year >= 1 AND academic_year <= 5),
  season TEXT NOT NULL CHECK (season IN ('Sezoni Dimëror', 'Sezoni Veror')),
  status TEXT NOT NULL CHECK (status IN ('Kaluar', 'Nuk ka kaluar')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela: admin_users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- branches: përdoruesit e autentikuar mund të lexojnë degët
CREATE POLICY "Degët lexohen nga përdoruesit e autentikuar"
  ON public.branches
  FOR SELECT
  TO authenticated
  USING (true);

-- students: studenti lexon vetëm profilin e vet
CREATE POLICY "Studenti lexon profilin e vet"
  ON public.students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- exams: studenti lexon vetëm provimet e veta
CREATE POLICY "Studenti lexon provimet e veta"
  ON public.exams
  FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  );

-- admin_users: përdoruesi lexon vetëm rreshtin e vet
CREATE POLICY "Përdoruesi lexon rreshtin e vet në admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
