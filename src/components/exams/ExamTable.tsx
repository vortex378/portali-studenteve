import { FileText } from "lucide-react";
import type { ExamWithStudent } from "@/types/database";
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
              <th className="px-4 py-4 font-semibold text-gold">Studenti</th>
              <th className="px-4 py-4 font-semibold text-gold">Nr. ID</th>
              <th className="px-4 py-4 font-semibold text-gold">Dega</th>
              <th className="px-4 py-4 font-semibold text-gold">Lënda</th>
              <th className="px-4 py-4 font-semibold text-gold">Viti</th>
              <th className="px-4 py-4 font-semibold text-gold">Sezoni</th>
              <th className="px-4 py-4 font-semibold text-gold">Nota</th>
              <th className="px-4 py-4 font-semibold text-gold">Statusi</th>
              {onFshi && (
                <th className="px-4 py-4 font-semibold text-gold">Veprim</th>
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
                  className="border-b border-gold/5 transition-colors hover:bg-purple/10"
                >
                  <td className="px-4 py-4 font-medium">{emriStudentit}</td>
                  <td className="px-4 py-4 text-foreground/70">
                    {studenti?.id_number ?? "—"}
                  </td>
                  <td className="px-4 py-4 text-foreground/70">
                    {studenti?.branches?.code ?? "—"}
                  </td>
                  <td className="px-4 py-4 font-medium">{provim.exam_name}</td>
                  <td className="px-4 py-4 text-foreground/70">
                    Viti {provim.academic_year}
                  </td>
                  <td className="px-4 py-4 text-foreground/70">
                    {provim.season}
                  </td>
                  <td className="px-4 py-4 text-foreground/70">
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
      </div>
    </div>
  );
}
