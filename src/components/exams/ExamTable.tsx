import { FileText } from "lucide-react";
import type { Exam } from "@/types";
import StatusBadge from "./StatusBadge";

interface ExamTableProps {
  provimet: Exam[];
}

export default function ExamTable({ provimet }: ExamTableProps) {
  if (provimet.length === 0) {
    return (
      <div className="card-elegant rounded-2xl p-12 text-center">
        <FileText className="mx-auto h-12 w-12 text-foreground/30" />
        <h3 className="mt-4 text-lg font-semibold text-foreground/70">
          Nuk ka provime
        </h3>
        <p className="mt-2 text-sm text-foreground/50">
          Provimet do të shfaqen këtu pasi të lidhen me Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="card-elegant overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gold/10 bg-navy-light/50">
              <th className="px-6 py-4 font-semibold text-gold">Titulli</th>
              <th className="px-6 py-4 font-semibold text-gold">Data</th>
              <th className="px-6 py-4 font-semibold text-gold">Statusi</th>
              <th className="px-6 py-4 font-semibold text-gold">Përshkrimi</th>
            </tr>
          </thead>
          <tbody>
            {provimet.map((provim) => (
              <tr
                key={provim.id}
                className="border-b border-gold/5 transition-colors hover:bg-purple/10"
              >
                <td className="px-6 py-4 font-medium">{provim.titulli}</td>
                <td className="px-6 py-4 text-foreground/70">{provim.data}</td>
                <td className="px-6 py-4">
                  <StatusBadge statusi={provim.statusi} />
                </td>
                <td className="max-w-xs truncate px-6 py-4 text-foreground/60">
                  {provim.pershkrimi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
