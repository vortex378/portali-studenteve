import { FileText } from "lucide-react";
import type { ExamWithStudent } from "@/types/database";
import EmptyState from "@/components/ui/EmptyState";
import TableWrapper from "@/components/ui/TableWrapper";
import DeleteExamButton from "./DeleteExamButton";
import ExamResultBadge from "./ExamResultBadge";

interface ExamTableProps {
  provimet: ExamWithStudent[];
  onFshi?: (examId: string, lenda: string) => void;
  dukeFshireId?: string | null;
}

export default function ExamTable({
  provimet,
  onFshi,
  dukeFshireId = null,
}: ExamTableProps) {
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
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead>
          <tr className="table-header">
            <th className="px-4 py-4 font-semibold text-accent-light">
              Studenti
            </th>
            <th className="px-4 py-4 font-semibold text-accent-light">
              Nr. ID
            </th>
            <th className="px-4 py-4 font-semibold text-accent-light">Dega</th>
            <th className="px-4 py-4 font-semibold text-accent-light">
              Lënda
            </th>
            <th className="px-4 py-4 font-semibold text-accent-light">Viti</th>
            <th className="px-4 py-4 font-semibold text-accent-light">
              Sezoni
            </th>
            <th className="px-4 py-4 font-semibold text-accent-light">Nota</th>
            <th className="px-4 py-4 font-semibold text-accent-light">
              Statusi
            </th>
            {onFshi && (
              <th className="px-4 py-4 font-semibold text-accent-light">
                Veprim
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {provimet.map((provim) => {
            const studenti = provim.students;
            const emriStudentit = studenti
              ? `${studenti.first_name} ${studenti.last_name}`
              : "—";

            return (
              <tr
                key={provim.id}
                className="table-row border-b border-white/5 transition-colors duration-300"
              >
                <td className="px-4 py-4 font-medium">{emriStudentit}</td>
                <td className="px-4 py-4 text-muted">
                  {studenti?.id_number ?? "—"}
                </td>
                <td className="px-4 py-4 text-muted">
                  {studenti?.branches?.code ?? "—"}
                </td>
                <td className="px-4 py-4 font-medium">{provim.exam_name}</td>
                <td className="px-4 py-4 text-muted">
                  Viti {provim.academic_year}
                </td>
                <td className="px-4 py-4 text-muted">{provim.season}</td>
                <td className="px-4 py-4 text-muted">
                  {provim.grade ?? "—"}
                </td>
                <td className="px-4 py-4">
                  <ExamResultBadge statusi={provim.status} />
                </td>
                {onFshi && (
                  <td className="px-4 py-4">
                    <DeleteExamButton
                      onFshi={() => onFshi(provim.id, provim.exam_name)}
                      dukeFshire={dukeFshireId === provim.id}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableWrapper>
  );
}
