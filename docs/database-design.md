# Konceptimi i Bazës së të Dhënave — Portali i Studentëve

**Lënda:** Sistemet e Menaxhimit të Databazave  
**Programi:** Teknologji Informacioni dhe Komunikimi në Fushën e Mbrojtjes  
**Institucioni:** Fakulteti i Mbrojtjes dhe Sigurisë  
**Tema:** Portali i Studentëve — Akademia e Forcave të Armatosura

---

## 1. Përshkrim i përgjithshëm

Baza e të dhënave e projektit menaxhon informacionin akademik të studentëve të Akademisë së Forcave të Armatosura. Sistemi përdor **PostgreSQL** në platformën **Supabase**, me autentifikim përmes **Supabase Auth** dhe mbrojtje të të dhënave përmes **Row Level Security (RLS)**.

Qëllimi kryesor është të ruajë në mënyrë të sigurt dhe të strukturuar:

- të dhënat personale dhe akademike të studentëve;
- degët e studimit;
- provimet dhe rezultatet;
- rolet e përdoruesve (administrator / student).

Aplikacioni web (Next.js) komunikon me databazën përmes API-ve server-side dhe klientëve Supabase, duke respektuar rregullat e sigurisë.

---

## 2. Entitetet kryesore

| Entitet | Përshkrimi |
|---------|------------|
| **AuthUser** | Përdoruesi i autentifikuar në Supabase Auth (`auth.users`). Ruajtja e fjalëkalimit bëhet vetëm këtu. |
| **Student** | Profili akademik i studentit, i lidhur 1:1 me AuthUser. |
| **Branch** | Dega e studimit (TIK, MND, SHK, SHU). |
| **Exam** | Provimi i një studenti me notë, sezon, vit akademik dhe status. |
| **AdminUser** | Lidhja e një AuthUser me rolin administrator. |

---

## 3. CDM — Modeli Konceptual i të Dhënave

Entitetet dhe marrëdhëniet konceptuale:

```
[AuthUser] ----(1:0..1)---- [Student]
[AuthUser] ----(1:0..1)---- [AdminUser]
[Branch]   ----(1:N)-------- [Student]
[Student]  ----(1:N)-------- [Exam]
```

**Atributet kryesore:**

- **Student:** emri, mbiemri, datëlindja, numri ID, viti akademik, mosha, email, dega.
- **Branch:** kodi, emri.
- **Exam:** emri i provimit, viti akademik, sezoni, nota, statusi.
- **AdminUser:** email, lidhja me përdoruesin Auth.

---

## 4. LDM — Modeli Logjik i të Dhënave

| Entitet | Atributet | Çelësat |
|---------|-----------|---------|
| Branch | id, code, name, created_at | PK: id, UNIQUE: code |
| Student | id, user_id, first_name, last_name, birth_date, id_number, academic_year, age, branch_id, email, created_at | PK: id, FK: user_id, branch_id, UNIQUE: user_id, id_number, email |
| Exam | id, student_id, exam_name, academic_year, season, grade, status, created_at | PK: id, FK: student_id |
| AdminUser | id, user_id, email, created_at | PK: id, FK: user_id, UNIQUE: user_id, email |

**Kardinalitetet:**

- Një **degë** ka **shumë studentë** (1:N).
- Një **student** ka **shumë provime** (1:N).
- Një **AuthUser** lidhet me **një student** ose **një admin** (jo të dyja në të njëjtën kohë në praktikë).
- Një **AuthUser** mund të jetë admin përmes tabelës `admin_users`.

---

## 5. RDM — Modeli Relacional i të Dhënave

Implementimi fizik në PostgreSQL:

- `public.branches`
- `public.students`
- `public.exams`
- `public.admin_users`
- `auth.users` (menaxhuar nga Supabase Auth)

Shiko `docs/relational-model.md` për strukturën e detajuar dhe diagramin ASCII.

---

## 6. Marrëdhëniet

| Marrëdhënia | Tipi | Shpjegimi |
|-------------|------|-----------|
| Branch → Student | 1:N | Çdo student i përket një dege. |
| Student → Exam | 1:N | Çdo provim i përket një studenti. |
| AuthUser → Student | 1:1 | Një përdorues Auth ka një profil studenti. |
| AuthUser → AdminUser | 1:1 | Një përdorues Auth mund të jetë administrator. |

---

## 7. Normalizimi

### Forma Normale e Parë (1NF)
Të gjitha atributet janë atomike. Nuk ka grupe të përsëritura në një rresht.

### Forma Normale e Dytë (2NF)
Të gjitha atributet jo-çelës varen plotësisht nga çelësi primar.

### Forma Normale e Tretë (3NF)

- **Tabela `branches`** shmang përsëritjen e emrave të degëve — studentët referencojnë `branch_id`.
- **Tabela `exams`** ndan provimet nga të dhënat e studentit — çdo provim referencon `student_id`.
- **Tabela `admin_users`** ndan rolin admin nga profili student — roli nuk ruhet në `students`.
- **Fjalëkalimi** nuk ruhet në `students` — vetëm në Supabase Auth.

Kjo redukton redundancën dhe përmirëson integritetin.

---

## 8. Integriteti i të dhënave

| Lloji | Implementimi |
|-------|--------------|
| **Primary Key** | `id UUID` në çdo tabelë publike |
| **Foreign Key** | `students.user_id → auth.users`, `students.branch_id → branches`, `exams.student_id → students`, `admin_users.user_id → auth.users` |
| **UNIQUE** | `branches.code`, `students.id_number`, `students.email`, `students.user_id`, `admin_users.email`, `admin_users.user_id` |
| **CHECK** | `academic_year` 1–4, `age > 0`, `grade` 4–10, `season` vlera të lejuara, `status` Kaluar / Nuk ka kaluar |
| **ON DELETE CASCADE** | Fshirja e Auth user fshin student/admin; fshirja e studentit fshin provimet |

---

## 9. Siguria

| Mekanizmi | Përshkrimi |
|-----------|------------|
| **Supabase Auth** | Hyrja me email dhe fjalëkalim; verifikim email për regjistrimin publik. |
| **Row Level Security** | Studenti lexon vetëm rreshtin e vet në `students` dhe provimet e veta në `exams`. |
| **Service Role Key** | Përdoret vetëm server-side (API routes) për operacionet admin; nuk ekspozohet në frontend. |
| **Middleware Next.js** | Mbron `/admin` dhe `/dashboard` sipas rolit. |
| **Trigger (opsional)** | `set_exam_status_from_grade` garanton statusin e provimit në databazë. |

---

## 10. Lidhja GUI ↔ Databaza

| Faqe GUI | Tabela / Operacion |
|----------|-------------------|
| `/register` | `auth.users` + `students` (API `/api/register`) |
| `/login` | Supabase Auth |
| `/dashboard` | `students`, `exams` (lexim me RLS) |
| `/admin/students` | `students`, `branches` (service role) |
| `/admin/exams` | `exams`, `students` (service role) |

Aplikacioni **nuk** hardkodon të dhëna — të gjitha lexohen dhe shkruhen nga Supabase PostgreSQL.

---

## 11. Skedarë SQL të projektit

| Skedar | Qëllimi |
|--------|---------|
| `supabase/schema.sql` | Skema fillestare + RLS |
| `supabase/reports.sql` | Query raportuese (SELECT, JOIN, subquery) |
| `supabase/views-and-triggers.sql` | VIEW dhe TRIGGER akademik |
