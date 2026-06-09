-- ============================================================
-- Portali i Studentëve — SQL Reports (SMD)
-- Akademia e Forcave të Armatosura
-- Ekzekuto në Supabase SQL Editor (pas schema.sql)
-- VIEW dhe TRIGGER: shiko views-and-triggers.sql
-- ============================================================

-- ============================================================
-- RAPORTI 1 — SELECT me DISTINCT dhe LIMIT
-- ============================================================

-- Degët unike ku ka studentë të regjistruar
SELECT DISTINCT
  b.code AS dega_kodi,
  b.name AS dega_emri
FROM public.branches b
INNER JOIN public.students s ON s.branch_id = b.id
ORDER BY b.code;

-- 5 studentët më të fundit të regjistruar
SELECT
  s.first_name AS emri,
  s.last_name AS mbiemri,
  s.email,
  s.id_number AS numri_id,
  s.created_at AS data_regjistrimit
FROM public.students s
ORDER BY s.created_at DESC
LIMIT 5;


-- ============================================================
-- RAPORTI 2 — SELECT me operatorë logjikë (AND, OR, NOT)
-- ============================================================

-- Studentët e vitit 3 në degën TIK
SELECT
  s.first_name AS emri,
  s.last_name AS mbiemri,
  s.academic_year AS viti_akademik,
  b.code AS dega
FROM public.students s
INNER JOIN public.branches b ON s.branch_id = b.id
WHERE s.academic_year = 3
  AND b.code = 'TIK';

-- Provimet e kaluara me notë >= 8
SELECT
  s.first_name AS emri,
  s.last_name AS mbiemri,
  e.exam_name AS lenda,
  e.grade AS nota,
  e.status AS statusi
FROM public.exams e
INNER JOIN public.students s ON e.student_id = s.id
WHERE e.status = 'Kaluar'
  AND e.grade >= 8;


-- ============================================================
-- RAPORTI 3 — SELECT me operatorë specialë (LIKE, IN, BETWEEN)
-- ============================================================

-- Studentët me email që përmban 'gmail.com'
SELECT
  first_name AS emri,
  last_name AS mbiemri,
  email
FROM public.students
WHERE email LIKE '%gmail.com%';

-- Studentët në vitin 1 ose 2
SELECT
  first_name AS emri,
  last_name AS mbiemri,
  academic_year AS viti_akademik
FROM public.students
WHERE academic_year IN (1, 2);

-- Provimet me notë nga 5 deri në 10
SELECT
  exam_name AS lenda,
  grade AS nota,
  status AS statusi,
  season AS sezoni
FROM public.exams
WHERE grade BETWEEN 5 AND 10;


-- ============================================================
-- RAPORTI 4 — JOIN (students + branches + exams)
-- ============================================================

SELECT
  s.id AS student_id,
  s.first_name AS emri,
  s.last_name AS mbiemri,
  s.email,
  s.id_number AS numri_id,
  b.code AS dega_kodi,
  b.name AS dega_emri,
  e.exam_name AS lenda,
  e.academic_year AS viti_provimit,
  e.season AS sezoni,
  e.grade AS nota,
  e.status AS statusi
FROM public.students s
LEFT JOIN public.branches b ON s.branch_id = b.id
LEFT JOIN public.exams e ON e.student_id = s.id
ORDER BY s.last_name, s.first_name, e.exam_name;

-- Për VIEW student_exam_overview, shiko supabase/views-and-triggers.sql


-- ============================================================
-- RAPORTI 5 — Subquery
-- ============================================================

-- Studentët që kanë të paktën një provim të pakaluar
SELECT
  s.first_name AS emri,
  s.last_name AS mbiemri,
  s.email
FROM public.students s
WHERE s.id IN (
  SELECT e.student_id
  FROM public.exams e
  WHERE e.status = 'Nuk ka kaluar'
);

-- Studentët me notë mbi mesataren e përgjithshme të të gjitha provimeve
SELECT
  s.first_name AS emri,
  s.last_name AS mbiemri,
  ROUND(AVG(e.grade), 2) AS mesatarja_studentit
FROM public.students s
INNER JOIN public.exams e ON e.student_id = s.id
WHERE e.grade IS NOT NULL
GROUP BY s.id, s.first_name, s.last_name
HAVING AVG(e.grade) > (
  SELECT AVG(grade)
  FROM public.exams
  WHERE grade IS NOT NULL
)
ORDER BY mesatarja_studentit DESC;
