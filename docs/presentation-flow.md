# Flow për Prezantim Live — Portali i Studentëve

**Kohëzgjatja e sugjeruar:** 10–15 minuta  
**URL production:** https://portali-studenteve.vercel.app  
**URL lokal (rezervë):** http://localhost:3000

---

## 1. Hap faqen kryesore (`/`)

- Prezanto titullin: **Portali i Studentëve — Akademia e Forcave të Armatosura**.
- Shpjego që është një **sistem menaxhimi databaze** për studentët.
- Trego hero section, veçoritë dhe dizajnin profesional.

---

## 2. Shpjego arkitekturën (30 sekonda)

- **Frontend:** Next.js + TypeScript
- **Databaza:** Supabase PostgreSQL
- **Auth:** Supabase Auth
- **Siguria:** Row Level Security (RLS)
- **Deploy:** Vercel

---

## 3. Login si administrator

1. Shko te `/login`.
2. Hyr me llogarinë e adminit (Arkel Lahi).
3. Ridrejtim automatik në `/admin`.

---

## 4. Shto një student (opsional — nëse nuk ekziston)

1. `/admin/students/new`
2. Plotëso: emër, mbiemër, datëlindje, ID, vit, mosha, degë, email, fjalëkalim.
3. Shpjego: studenti krijohet në **Auth** dhe në tabelën **students**.

---

## 5. Shto një provim për studentin

1. `/admin/exams/new`
2. Zgjidh studentin, lëndën, vitin, sezonin, notën.
3. Shpjego: **statusi llogaritet automatikisht** (nota ≥ 5 → Kaluar).

---

## 6. Shfaq listat

- `/admin/students` — lista e studentëve me degë, email, ID.
- `/admin/exams` — lista e provimeve me status (jeshile/kuqe).

---

## 7. Logout

- Dil nga llogaria e adminit.

---

## 8. Login si student

1. `/login` me kredencialet e studentit të testuar.
2. Ridrejtim në `/dashboard`.

---

## 9. Shfaq dashboard-in e studentit

- Profili personal (emër, email, ID, mosha).
- Të dhënat akademike (viti, dega).
- **Provimet e Mia** — vetëm provimet e atij studenti.
- Statistika: totale, të kaluara, të pakaluara, mesatarja.

---

## 10. Thekso sigurinë

- Studenti **nuk** sheh provimet e studentëve të tjerë.
- Studenti **nuk** ka akses në `/admin`.
- **RLS** në PostgreSQL kufizon leximin.
- **Supabase Auth** menaxhon fjalëkalimet.
- Admin përdor **service role** vetëm server-side.

---

## 11. (Opsional) SQL në Supabase

Nëse kërkohet pjesa databazë:

1. Hap Supabase SQL Editor.
2. Ekzekuto një query nga `supabase/reports.sql` (p.sh. JOIN).
3. Shfaq VIEW `student_exam_overview`.
4. Shpjego TRIGGER për statusin e provimit.

---

## 12. Përfundim

- Projekti plotëson kërkesat: CDM/LDM/RDM, SQL reports, VIEW, TRIGGER, GUI, deploy live.
- Link GitHub dhe Vercel për komisionin.
