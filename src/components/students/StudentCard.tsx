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
    <div className="card-elegant rounded-2xl p-5 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="icon-accent-box flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
          <User className="h-6 w-6 text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-foreground">
            {student.first_name} {student.last_name}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          <dl className="mt-3 space-y-1 text-xs text-muted">
            <div className="flex justify-between gap-2">
              <dt>Numri ID</dt>
              <dd className="font-medium text-foreground/80">
                {student.id_number}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Viti akademik</dt>
              <dd className="font-medium text-foreground/80">
                {student.academic_year}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Mosha</dt>
              <dd className="font-medium text-foreground/80">{student.age}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Dega</dt>
              <dd className="truncate text-right font-medium text-foreground/80">
                {degaLabel}
              </dd>
            </div>
          </dl>

          {onFshi && (
            <button
              type="button"
              onClick={onFshi}
              disabled={dukeFshire}
              className="btn-danger mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium disabled:opacity-50"
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
