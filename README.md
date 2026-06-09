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
├── components/       # Komponentët e riutilizueshëm
├── lib/
│   ├── auth/         # Logjika e roleve (admin/student)
│   └── supabase/     # Klientët Supabase (browser, server, admin)
├── middleware.ts     # Mbrojtja e faqeve sipas rolit
└── types/            # Tipet TypeScript
supabase/
└── schema.sql        # Skema PostgreSQL + RLS
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
Studentët shtohen nga administratori dhe kanë akses vetëm te:
- Profili personal
- Të dhënat akademike
- Provimet dhe statuset e tyre

## Faqet kryesore

| Rruga | Përshkrimi |
|-------|------------|
| `/` | Faqja kryesore prezantuese |
| `/login` | Hyrja në portal |
| `/dashboard` | Paneli personal i studentit |
| `/admin` | Paneli i administratorit |
| `/admin/students` | Lista e studentëve |
| `/admin/students/new` | Shto student të ri |
| `/admin/exams` | Lista e provimeve |
| `/admin/exams/new` | Shto provim të ri |

## Licenca

Projekt privat — Akademia e Forcave të Armatosura.
