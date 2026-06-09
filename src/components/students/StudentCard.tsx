import { Mail, Trash2, User } from "lucide-react";
import type { StudentWithBranch } from "@/types/database";

interface StudentCardProps {
  student: StudentWithBranch;
  onFshi?: () => void;
  dukeFshire?: boolean;
}

export default function StudentCard({
  student,
  onFshi,
  dukeFshire = false,
}: StudentCardProps) {
  const degaLabel = student.branches
    ? `${student.branches.code} — ${student.branches.name}`
    : "Pa degë";

  return (
    <div className="card-elegant rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/40">
          <User className="h-6 w-6 text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-foreground">
            {student.first_name} {student.last_name}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          <p className="mt-1 text-xs text-foreground/50">
            Numri ID: {student.id_number}
          </p>
          <p className="mt-1 text-xs text-foreground/50">
            Viti akademik: {student.academic_year}
          </p>
          <p className="mt-1 text-xs text-foreground/50">
            Mosha: {student.age}
          </p>
          <p className="mt-1 text-xs text-foreground/50">Dega: {degaLabel}</p>

          {onFshi && (
            <button
              type="button"
              onClick={onFshi}
              disabled={dukeFshire}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {dukeFshire ? "Duke fshirë..." : "Fshi"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
