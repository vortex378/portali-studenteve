# Portali i Studentëve - Akademia e Forcave të Armatosura

Portali zyrtar i studentëve për Akademinë e Forcave të Armatosura. Platforma ofron menaxhimin e profileve studentore, të dhënave akademike dhe provimeve, me role të ndara për administratorë dhe studentë.

## Teknologjitë e përdorura

- **Next.js** — framework web modern me App Router
- **TypeScript** — tipizim i fortë për kod më të sigurt
- **Tailwind CSS** — stilizim modern dhe responsive
- **Supabase** — backend si shërbim
- **Supabase Auth** — autentifikimi i përdoruesve
- **Supabase PostgreSQL** — baza e të dhënave relacionale
- **GitHub** — versionimi dhe ruajtja e kodit
- **Vercel** — hostimi dhe deploy automatik

## Struktura e projektit

```
src/
├── app/              # Faqet dhe layout-et
│   └── api/register/ # Regjistrimi publik i studentëve
├── components/       # Komponentët e riutilizueshëm
├── lib/
│   ├── auth/         # Logjika e roleve (admin/student)
│   ├── branches/     # Leximi i degëve (server-side)
│   └── supabase/     # Klientët Supabase (browser, server, admin)
├── middleware.ts     # Mbrojtja e faqeve sipas rolit
└── types/            # Tipet TypeScript
docs/
├── database-design.md    # CDM, LDM, RDM, normalizim, siguri
├── relational-model.md   # Modeli relacional + diagram ASCII
├── project-report.md     # Raport i përmbledhur (~5 faqe)
└── presentation-flow.md  # Flow për prezantim live
supabase/
├── schema.sql            # Skema PostgreSQL + RLS
├── reports.sql           # SQL reports (SELECT, JOIN, subquery)
├── views-and-triggers.sql # VIEW + TRIGGER
└── admin-setup.sql       # Konfigurimi i adminit
```

## Instalimi lokal

1. Klono repozitorin nga GitHub:

```bash
git clone <url-i-i-repozitorit>
cd portali-studenteve
```

2. Instalo varësitë:

```bash
npm install
```

3. Krijo skedarin `.env.local` bazuar në `.env.example` dhe plotëso variablat e Supabase (pas konfigurimit të projektit Supabase):

```bash
cp .env.example .env.local
```

4. Nis serverin e zhvillimit:

```bash
npm run dev
```

Hap [http://localhost:3000](http://localhost:3000) në shfletuesin tënd.

## Build për prodhim

```bash
npm run build
```

Pas build-it të suksesshëm, mund të nisësh serverin e prodhimit me:

```bash
npm run start
```

## Konfigurimi i Supabase

### 1. Krijo projekt në Supabase

Hyr në [supabase.com](https://supabase.com), krijo një projekt të ri dhe prit derisa të jetë gati.

### 2. Merr Project URL

Në Supabase Dashboard → **Project Settings** → **API** → kopjo **Project URL**.

### 3. Merr anon public key

Në të njëjtën faqe API, kopjo **anon public** key.

### 4. Merr service role key

Në të njëjtën faqe API, kopjo **service_role** key. Ky çelës përdoret **vetëm në server** dhe nuk duhet ekspozuar kurrë në frontend.

### 5. Vendosi në `.env.local`

```bash
cp .env.example .env.local
```

Plotëso variablat:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=celesi-anon
SUPABASE_SERVICE_ROLE_KEY=celesi-service-role
```

### 6. Hap SQL Editor në Supabase

Në Supabase Dashboard → **SQL Editor** → **New query**.

### 7. Ekzekuto `supabase/schema.sql`

Kopjo përmbajtjen e skedarit `supabase/schema.sql` dhe ekzekutoje në SQL Editor. Kjo krijon tabelat `branches`, `students`, `exams`, `admin_users` dhe aktivizon Row Level Security.

### 8. Krijo user-in për Arkel Lahi në Supabase Auth

Në Supabase Dashboard → **Authentication** → **Users** → **Add user**:

- Email: `arkellahi81@gmail.com`
- Vendos një fjalëkalim të sigurt
- Konfirmo krijimin e përdoruesit

### 9. Merr `user_id` të Arkel

Pas krijimit, hap profilin e përdoruesit dhe kopjo **User UID** (UUID).

### 10. Shto në tabelën `admin_users`

Hap skedarin `supabase/admin-setup.sql`, zëvendëso `VENDOS_USER_ID_E_ARKEL_KETU` me UUID-n e Arkel nga Supabase Auth, pastaj ekzekutoje në SQL Editor.

### 11. Verifiko konfigurimin nga terminali

```bash
npm run verify:supabase
```

Ky komandë kontrollon që variablat e mjedisit ekzistojnë (pa i shfaqur vlerat) dhe teston lidhjen me Supabase. Nëse tabela `branches` nuk ekziston, do të kërkojë ekzekutimin manual të `schema.sql`.

### 12. Testo login-in

1. Nis serverin: `npm run dev`
2. Hap [http://localhost:3000/login](http://localhost:3000/login)
3. Hyr me `arkellahi81@gmail.com` dhe fjalëkalimin e krijuar në Supabase Auth
4. Nëse je administrator, duhet të ridrejtohesh në `/admin`
5. Nëse shfaqet mesazhi *"Llogaria u gjet, por nuk ka profil të lidhur në sistem"*, kontrollo që `user_id` është shtuar në `admin_users`

### 13. Hyr në portal

Pas këtyre hapave, Arkel Lahi mund të hyjë në `/login` dhe do të ridrejtohet automatikisht në `/admin`.

> **Shënim:** Supabase CLI nuk është i lidhur me këtë projekt (`supabase/config.toml` mungon). Prandaj `schema.sql` dhe `admin-setup.sql` duhen ekzekutuar manualisht në Supabase SQL Editor.

## Variablat e mjedisit (Supabase)

Kopjo `.env.example` në `.env.local` për zhvillim lokal. Për prodhim në Vercel, shto të njëjtat variabla në panelin e Vercel.

| Variabla | Përshkrimi |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL e projektit Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Çelësi publik anonim i Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Çelësi i shërbimit (vetëm server, mos e ekspozo në frontend) |

> **Shënim:** Mos vendos asnjë çelës real Supabase në kod. Të gjitha konfigurimet përdorin environment variables.

## Deploy në Vercel

1. **Lidhu me GitHub** — Ngarko projektin në një repozitor GitHub.
2. **Importo në Vercel** — Hyr në [vercel.com](https://vercel.com), kliko "Add New Project" dhe importo repozitorin nga GitHub.
3. **Shto environment variables** — Në cilësimet e projektit në Vercel, shko te "Environment Variables" dhe shto:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. **Bëj deploy** — Vercel do të detektojë automatikisht Next.js dhe do të kryejë build-in. Çdo push në GitHub do të aktivizojë deploy të ri automatikisht.

## Rolet e përdoruesve

### Administrator
Administratori kryesor i sistemit është **Arkel Lahi** (`arkellahi81@gmail.com`). Ai do të lidhet përmes Supabase Auth dhe tabelës `admin_users` — nuk është hardcoded në frontend.

Administratori ka akses në:
- Panelin e administratorit (`/admin`)
- Menaxhimin e studentëve
- Menaxhimin e provimeve

### Student
Studentët mund të regjistrohen vetë ose të shtohen nga administratori. Pas hyrjes, kanë akses vetëm te:
- Profili personal
- Të dhënat akademike
- Provimet dhe statuset e tyre

## Regjistrimi i studentëve

Studentët mund të regjistrohen vetë në faqen `/register` duke plotësuar të dhënat personale, akademike dhe kredencialet e hyrjes.

- Sistemi kërkon **email** dhe **fjalëkalim** (minimumi 6 karaktere).
- Fjalëkalimi ruhet vetëm në **Supabase Auth** — nuk ruhet në tabelën `students`.
- Pas regjistrimit, studenti merr një **email verifikimi** nga Supabase.
- Email-i duhet të verifikohet përpara hyrjes në portal.
- Pas verifikimit dhe hyrjes, studenti ridrejtohet te `/dashboard` dhe sheh vetëm të dhënat e veta.
- **Administratori** vazhdon të mund të shtojë studentë manualisht nga `/admin/students/new` (pa kërkuar verifikim email-i nga studenti, sipas konfigurimit aktual të admin flow).

> **Shënim:** Në Supabase Dashboard → **Authentication** → **Providers** → **Email**, sigurohu që "Confirm email" është aktivizuar që verifikimi të funksionojë për regjistrimin publik.

## Faqet kryesore

| Rruga | Përshkrimi |
|-------|------------|
| `/` | Faqja kryesore prezantuese |
| `/login` | Hyrja në portal |
| `/register` | Regjistrimi i studentëve |
| `/dashboard` | Paneli personal i studentit |
| `/admin` | Paneli i administratorit |
| `/admin/students` | Lista e studentëve |
| `/admin/students/new` | Shto student të ri |
| `/admin/exams` | Lista e provimeve |
| `/admin/exams/new` | Shto provim të ri |

## Përputhja me kërkesat e projektit final

Projekti plotëson kërkesat akademike të lëndës **Sistemet e Menaxhimit të Databazave** (Fakulteti i Mbrojtjes dhe Sigurisë, TIK në Fushën e Mbrojtjes):

| Kërkesa | Ku gjendet |
|---------|------------|
| **Kodi burimor** | Repozitori GitHub — Next.js, TypeScript, Supabase |
| **Raporti** | [`docs/project-report.md`](docs/project-report.md) |
| **CDM / LDM / RDM** | [`docs/database-design.md`](docs/database-design.md), [`docs/relational-model.md`](docs/relational-model.md) |
| **SQL reports** | [`supabase/reports.sql`](supabase/reports.sql) — DISTINCT, LIMIT, operatorë logjikë, LIKE, IN, BETWEEN, JOIN, subquery |
| **VIEW** | [`supabase/views-and-triggers.sql`](supabase/views-and-triggers.sql) — `student_exam_overview` |
| **TRIGGER** | [`supabase/views-and-triggers.sql`](supabase/views-and-triggers.sql) — `set_exam_status_from_grade` |
| **GUI** | Ndërfaqe web funksionale — admin panel, student dashboard, regjistrim |
| **Demo live** | [`docs/presentation-flow.md`](docs/presentation-flow.md) |
| **Deploy** | [https://portali-studenteve.vercel.app](https://portali-studenteve.vercel.app) |

### SQL në Supabase SQL Editor

Pas `schema.sql`, ekzekuto manualisht (në këtë rend):

1. **`supabase/views-and-triggers.sql`** — krijon VIEW dhe TRIGGER (e nevojshme për kërkesat akademike).
2. **`supabase/reports.sql`** — query raportuese për demonstrim (opsionale, mund të ekzekutohen pjesë-pjesë).

> **Shënim:** `reports.sql` nuk modifikon skemën; `views-and-triggers.sql` shton VIEW dhe TRIGGER në databazë.

## Licenca

Projekt privat — Akademia e Forcave të Armatosura.
