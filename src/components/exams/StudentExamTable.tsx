import { FileText } from "lucide-react";
import type { Exam } from "@/types/database";
import EmptyState from "@/components/ui/EmptyState";
import TableWrapper from "@/components/ui/TableWrapper";
import ExamResultBadge from "./ExamResultBadge";

interface StudentExamTableProps {
  provimet: Exam[];
}

export default function StudentExamTable({ provimet }: StudentExamTableProps) {
  if (provimet.length === 0) {
    return (
      <EmptyState
        ikona={FileText}
        titulli="Nuk ka provime të regjistruara."
      />
    );
  }

  return (
    <TableWrapper>
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="table-header">
            <th className="px-5 py-4 font-semibold text-accent-light">Lënda</th>
            <th className="px-5 py-4 font-semibold text-accent-light">Viti</th>
            <th className="px-5 py-4 font-semibold text-accent-light">
              Sezoni
            </th>
            <th className="px-5 py-4 font-semibold text-accent-light">Nota</th>
            <th className="px-5 py-4 font-semibold text-accent-light">
              Statusi
            </th>
          </tr>
        </thead>
        <tbody>
          {provimet.map((provim) => (
            <tr
              key={provim.id}
              className="table-row border-b border-white/5 transition-colors duration-300"
            >
              <td className="px-5 py-4 font-medium">{provim.exam_name}</td>
              <td className="px-5 py-4 text-muted">
                Viti {provim.academic_year}
              </td>
              <td className="px-5 py-4 text-muted">{provim.season}</td>
              <td className="px-5 py-4 text-muted">
                {provim.grade ?? "—"}
              </td>
              <td className="px-5 py-4">
                <ExamResultBadge statusi={provim.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}
