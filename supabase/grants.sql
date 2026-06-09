-- ============================================================
-- GRANT për Data API (PostgREST)
-- Ekzekuto në Supabase SQL Editor PAS schema.sql
-- ============================================================
-- Supabase nuk jep më GRANT automatik për tabela të reja.
-- Pa këto, service_role dhe authenticated nuk mund të lexojnë tabelat.

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT ON public.branches TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.exams TO authenticated, service_role;
GRANT SELECT ON public.admin_users TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_users TO service_role;
