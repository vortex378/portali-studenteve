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
├── lib/supabase/     # Konfigurimi i Supabase (environment variables)
└── types/            # Tipet TypeScript
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
