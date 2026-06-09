import { FileText } from "lucide-react";
import type { Exam } from "@/types/database";
import ExamResultBadge from "./ExamResultBadge";

interface StudentExamTableProps {
  provimet: Exam[];
}

export default function StudentExamTable({ provimet }: StudentExamTableProps) {
  if (provimet.length === 0) {
    return (
      <div className="card-elegant rounded-2xl p-12 text-center">
        <FileText className="mx-auto h-12 w-12 text-foreground/30" />
        <h3 className="mt-4 text-lg font-semibold text-foreground/70">
          Nuk ka provime të regjistruara.
        </h3>
      </div>
    );
  }

  return (
    <div className="card-elegant overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gold/10 bg-navy-light/50">
              <th className="px-6 py-4 font-semibold text-gold">Lënda</th>
              <th className="px-6 py-4 font-semibold text-gold">Viti</th>
              <th className="px-6 py-4 font-semibold text-gold">Sezoni</th>
              <th className="px-6 py-4 font-semibold text-gold">Nota</th>
              <th className="px-6 py-4 font-semibold text-gold">Statusi</th>
            </tr>
          </thead>
          <tbody>
            {provimet.map((provim) => (
              <tr
                key={provim.id}
                className="border-b border-gold/5 transition-colors hover:bg-purple/10"
              >
                <td className="px-6 py-4 font-medium">{provim.exam_name}</td>
                <td className="px-6 py-4 text-foreground/70">
                  Viti {provim.academic_year}
                </td>
                <td className="px-6 py-4 text-foreground/70">{provim.season}</td>
                <td className="px-6 py-4 text-foreground/70">
                  {provim.grade ?? "—"}
                </td>
                <td className="px-6 py-4">
                  <ExamResultBadge statusi={provim.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
