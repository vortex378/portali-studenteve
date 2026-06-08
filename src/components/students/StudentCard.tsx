import { Mail, User } from "lucide-react";
import type { Student } from "@/types";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="card-elegant rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/40">
          <User className="h-6 w-6 text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-foreground">
            {student.emri} {student.mbiemri}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          <p className="mt-1 text-xs text-foreground/40">
            Nr. Identifikimit: {student.numriIdentifikimit}
          </p>
          <p className="mt-1 text-xs text-foreground/40">
            Regjistruar: {student.dataRegjistrimit}
          </p>
        </div>
      </div>
    </div>
  );
}
