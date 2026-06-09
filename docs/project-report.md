# Raport i Përmbledhur — Portali i Studentëve

**Lënda:** Sistemet e Menaxhimit të Databazave  
**Programi:** Teknologji Informacioni dhe Komunikimi në Fushën e Mbrojtjes  
**Fakulteti:** Fakulteti i Mbrojtjes dhe Sigurisë  
**Tema:** Portali i Studentëve — Akademia e Forcave të Armatosura  
**Autor:** Arkel Lahi  
**Repository:** https://github.com/vortex378/portali-studenteve  
**Deploy:** https://portali-studenteve.vercel.app

---

## 1. Hyrje

Ky projekt zhvillon një portal web për menaxhimin e studentëve dhe provimeve në Akademinë e Forcave të Armatosura. Sistemi kombinon një ndërfaqe moderne me një bazë të dhënash relacionale të sigurt, duke përdorur Supabase (PostgreSQL + Auth) si backend.

---

## 2. Qëllimi i projektit

- Menaxhim i centralizuar i të dhënave akademike të studentëve.
- Regjistrim dhe autentifikim i sigurt.
- Menaxhim i provimeve dhe rezultateve.
- Ndërfaqe e ndarë për administratorë dhe studentë.
- Demonstrim i konceptimit të databazës (CDM, LDM, RDM), query-ve SQL dhe sigurisë (RLS).

---

## 3. Veçoritë kryesore

| Veçori | Përshkrimi |
|--------|------------|
| Panel admin | Shtim/fshirje studentësh dhe provimesh |
| Dashboard studenti | Profili, të dhënat akademike, provimet personale |
| Regjistrim publik | `/register` me verifikim email |
| Role-based access | Admin vs student |
| Statistika | Provime totale, të kaluara, mesatarja e notave |

---

## 4. Implementimi teknik

### Frontend
Next.js 16, TypeScript, Tailwind CSS 4. Dizajn black/charcoal + portokalli, responsive, në shqip.

### Backend
API routes server-side (`/api/admin/*`, `/api/register`). Validim i të dhënave në shqip.

### Databaza
PostgreSQL në Supabase: `branches`, `students`, `exams`, `admin_users`.

### Auth
Supabase Auth — email/password. Fjalëkalimi nuk ruhet në tabelat publike.

### Siguria
RLS, middleware Next.js, service role vetëm server-side, verifikim email për regjistrimin publik.

---

## 5. Konceptimi i bazës së të dhënave

### CDM
Entitetet: AuthUser, Student, Branch, Exam, AdminUser. Marrëdhëniet 1:N dhe 1:1.

### LDM
Atributet, çelësat primarë, të huaj dhe kufizimet logjike.

### RDM
Implementim në PostgreSQL me UUID, CHECK, UNIQUE, ON DELETE CASCADE.

Detaje në `docs/database-design.md` dhe `docs/relational-model.md`.

---

## 6. Përpunimi i të dhënave

| Teknika | Skedar | Shembull |
|---------|--------|----------|
| SELECT DISTINCT, LIMIT | `reports.sql` | 5 studentët më të fundit |
| Operatorë logjikë | `reports.sql` | Studentë viti 3, TIK |
| LIKE, IN, BETWEEN | `reports.sql` | Email gmail, nota 5–10 |
| JOIN | `reports.sql` | Student + degë + provim |
| VIEW | `views-and-triggers.sql` | `student_exam_overview` |
| Subquery | `reports.sql` | Mesatarja mbi mesataren |
| TRIGGER | `views-and-triggers.sql` | Statusi nga nota |

---

## 7. Ndërfaqia grafike (GUI)

| Faqe | Funksioni |
|------|-----------|
| `/` | Prezantim i portalit |
| `/login`, `/register` | Hyrje dhe regjistrim |
| `/admin/*` | Menaxhim nga administratori |
| `/dashboard` | Panel personal i studentit |

GUI lexon/shkruan të dhëna reale nga Supabase — pa hardkodim.

---

## 8. Deploy dhe demonstrim live

- **GitHub:** versionim i kodit burimor.
- **Vercel:** https://portali-studenteve.vercel.app
- **Supabase:** databazë cloud me RLS.

Flow prezantimi: `docs/presentation-flow.md`.

---

## 9. Përfundim

Projekti plotëson kërkesat e një sistemi menaxhimi databaze: konceptim (CDM/LDM/RDM), implementim relacional, query raportuese, VIEW, subquery, TRIGGER, GUI funksionale dhe siguri. Sistemi është gati për përdorim dhe demonstrim akademik.

---

## 10. Përmirësime të mundshme

- SMTP custom për email verifikimi.
- Eksport PDF/Excel i raporteve.
- Audit log për veprimet e adminit.
- Politika RLS të zgjeruara për operacionet e shkrimit nga admin përmes PostgREST.
