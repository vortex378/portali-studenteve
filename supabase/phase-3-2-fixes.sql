-- ============================================================
-- Faza 3.2 — Rregullime akademike dhe provime
-- Ekzekuto në Supabase SQL Editor PAS schema.sql dhe grants.sql
-- ============================================================

-- 1. Ndrysho kodin e degës MN → MND
UPDATE public.branches
SET code = 'MND'
WHERE code = 'MN';

-- 2. Viti akademik: nga 1–5 në 1–4
UPDATE public.students SET academic_year = 4 WHERE academic_year > 4;
UPDATE public.exams SET academic_year = 4 WHERE academic_year > 4;

ALTER TABLE public.students
  DROP CONSTRAINT IF EXISTS students_academic_year_check;

ALTER TABLE public.students
  ADD CONSTRAINT students_academic_year_check
  CHECK (academic_year >= 1 AND academic_year <= 4);

ALTER TABLE public.exams
  DROP CONSTRAINT IF EXISTS exams_academic_year_check;

ALTER TABLE public.exams
  ADD CONSTRAINT exams_academic_year_check
  CHECK (academic_year >= 1 AND academic_year <= 4);

-- 3. Shto kolonën grade në exams (nota 4–10)
ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS grade NUMERIC(4, 1);

ALTER TABLE public.exams
  DROP CONSTRAINT IF EXISTS exams_grade_check;

ALTER TABLE public.exams
  ADD CONSTRAINT exams_grade_check
  CHECK (grade IS NULL OR (grade >= 4 AND grade <= 10));

-- 4. Grants (nëse mungojnë pas ndryshimeve)
GRANT SELECT ON public.branches TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.exams TO authenticated, service_role;
