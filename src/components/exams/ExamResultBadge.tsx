import type { ExamStatus } from "@/types/database";

const statusConfig: Record<
  ExamStatus,
  { etiketa: string; klasa: string }
> = {
  Kaluar: {
    etiketa: "Kaluar",
    klasa: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  "Nuk ka kaluar": {
    etiketa: "Nuk ka kaluar",
    klasa: "bg-red-500/20 text-red-300 border-red-500/30",
  },
};

interface ExamResultBadgeProps {
  statusi: ExamStatus;
}

export default function ExamResultBadge({ statusi }: ExamResultBadgeProps) {
  const config = statusConfig[statusi];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${config.klasa}`}
    >
      {config.etiketa}
    </span>
  );
}
