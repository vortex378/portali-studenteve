-- ============================================================
-- Portali i Studentëve — VIEW dhe TRIGGER (SMD)
-- Ekzekuto në Supabase SQL Editor PAS schema.sql
-- ============================================================

-- ============================================================
-- VIEW: student_exam_overview
-- ============================================================

CREATE OR REPLACE VIEW public.student_exam_overview AS
SELECT
  s.id AS student_id,
  s.first_name AS emri,
  s.last_name AS mbiemri,
  s.email,
  s.id_number,
  b.code AS branch_code,
  b.name AS branch_name,
  e.exam_name,
  e.academic_year,
  e.season,
  e.grade,
  e.status
FROM public.students s
LEFT JOIN public.branches b ON s.branch_id = b.id
LEFT JOIN public.exams e ON e.student_id = s.id;

COMMENT ON VIEW public.student_exam_overview IS
  'Pamje e përbashkët: studentët, degët dhe provimet — për raporte akademike.';


-- ============================================================
-- TRIGGER: set_exam_status_from_grade
-- Vendos automatikisht statusin sipas notës (mbrojtje në DB)
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_exam_status_from_grade()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.grade IS NOT NULL THEN
    IF NEW.grade >= 5 THEN
      NEW.status := 'Kaluar';
    ELSE
      NEW.status := 'Nuk ka kaluar';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_exam_status_from_grade ON public.exams;

CREATE TRIGGER trg_set_exam_status_from_grade
  BEFORE INSERT OR UPDATE OF grade
  ON public.exams
  FOR EACH ROW
  EXECUTE FUNCTION public.set_exam_status_from_grade();

COMMENT ON FUNCTION public.set_exam_status_from_grade() IS
  'Vendos statusin e provimit automatikisht: grade >= 5 => Kaluar, grade < 5 => Nuk ka kaluar.';
