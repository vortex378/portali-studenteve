import type { ExamStatus } from "@/types/database";

const statusConfig: Record<
  ExamStatus,
  { etiketa: string; klasa: string }
> = {
  Kaluar: {
    etiketa: "Kaluar",
    klasa:
      "bg-emerald-500/25 text-emerald-300 border-emerald-400/50 shadow-[0_0_12px_rgba(52,211,153,0.35)]",
  },
  "Nuk ka kaluar": {
    etiketa: "Nuk ka kaluar",
    klasa:
      "bg-red-500/25 text-red-300 border-red-400/50 shadow-[0_0_12px_rgba(248,113,113,0.35)]",
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
