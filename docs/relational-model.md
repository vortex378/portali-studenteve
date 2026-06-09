# Modeli Relacional — Portali i Studentëve

## Struktura e tabelave

### branches

```
branches (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT        UNIQUE NOT NULL,
  name        TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
)
```

### students

```
students (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name      TEXT        NOT NULL,
  last_name       TEXT        NOT NULL,
  birth_date      DATE        NOT NULL,
  id_number       TEXT        UNIQUE NOT NULL,
  academic_year   INTEGER     NOT NULL CHECK (academic_year BETWEEN 1 AND 4),
  age             INTEGER     NOT NULL CHECK (age > 0),
  branch_id       UUID        REFERENCES branches(id),
  email           TEXT        UNIQUE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
)
```

### exams

```
exams (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      UUID        REFERENCES students(id) ON DELETE CASCADE,
  exam_name       TEXT        NOT NULL,
  academic_year   INTEGER     NOT NULL CHECK (academic_year BETWEEN 1 AND 4),
  season          TEXT        NOT NULL CHECK (season IN ('Sezoni Dimëror', 'Sezoni Veror')),
  grade           NUMERIC(4,1) CHECK (grade IS NULL OR (grade BETWEEN 4 AND 10)),
  status          TEXT        NOT NULL CHECK (status IN ('Kaluar', 'Nuk ka kaluar')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
)
```

### admin_users

```
admin_users (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT        UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
)
```

### auth.users (Supabase Auth — jashtë skemës publike)

```
auth.users (
  id          UUID        PRIMARY KEY,
  email       TEXT,
  ...
)
```

---

## Diagram ASCII i marrëdhënieve

```
                    ┌─────────────────┐
                    │   auth.users    │
                    │   (Supabase)    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │ 1:0..1       │       1:0..1 │
              ▼              │              ▼
     ┌────────────────┐    │    ┌────────────────┐
     │    students    │    │    │  admin_users   │
     │────────────────│    │    │────────────────│
     │ id (PK)        │    │    │ id (PK)        │
     │ user_id (FK,UQ)│    │    │ user_id (FK,UQ)│
     │ first_name     │    │    │ email (UQ)     │
     │ last_name      │    │    └────────────────┘
     │ id_number (UQ) │    │
     │ email (UQ)     │    │
     │ branch_id (FK) │────┼──────────┐
     └───────┬────────┘    │          │
             │ 1:N         │          │ N:1
             ▼             │          ▼
     ┌────────────────┐   │   ┌────────────────┐
     │     exams      │   │   │    branches    │
     │────────────────│   │   │────────────────│
     │ id (PK)        │   │   │ id (PK)        │
     │ student_id(FK) │   │   │ code (UQ)      │
     │ exam_name      │   │   │ name           │
     │ grade          │   │   └────────────────┘
     │ status         │   │
     └────────────────┘   │
```

---

## Legjenda

| Simbol | Kuptimi |
|--------|---------|
| PK | Primary Key |
| FK | Foreign Key |
| UQ | Unique |
| 1:N | Një-me-shumë |
| 1:0..1 | Një-me-zero-ose-një |

---

## VIEW akademik

`public.student_exam_overview` — bashkon studentët, degët dhe provimet në një pamje të lexueshme. Përkufizimi në `supabase/views-and-triggers.sql`.
