import type { ExamStatus } from "@/types";

const statusConfig: Record<
  ExamStatus,
  { etiketa: string; klasa: string }
> = {
  planifikuar: {
    etiketa: "Planifikuar",
    klasa: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  ne_progres: {
    etiketa: "Në Progres",
    klasa: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  perfunduar: {
    etiketa: "Përfunduar",
    klasa: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  anuluar: {
    etiketa: "Anuluar",
    klasa: "bg-red-500/20 text-red-300 border-red-500/30",
  },
};

interface StatusBadgeProps {
  statusi: ExamStatus;
}

export default function StatusBadge({ statusi }: StatusBadgeProps) {
  const config = statusConfig[statusi];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${config.klasa}`}
    >
      {config.etiketa}
    </span>
  );
}
