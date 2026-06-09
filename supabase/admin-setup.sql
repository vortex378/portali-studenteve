-- ============================================================
-- Shtimi i administratorit kryesor: Arkel Lahi
-- ============================================================
-- Hapat manualë para ekzekutimit:
-- 1. Krijo përdoruesin arkellahi81@gmail.com në Supabase Auth
-- 2. Kopjo User UID nga Authentication → Users
-- 3. Zëvendëso VENDOS_USER_ID_E_ARKEL_KETU me UUID-n e vërtetë
-- 4. Ekzekuto këtë SQL në Supabase SQL Editor
-- ============================================================

INSERT INTO public.admin_users (user_id, email)
VALUES (
  'VENDOS_USER_ID_E_ARKEL_KETU',
  'arkellahi81@gmail.com'
);
