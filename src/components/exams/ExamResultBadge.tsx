import type { ExamStatus } from "@/types/database";
import Badge from "@/components/ui/Badge";

interface ExamResultBadgeProps {
  statusi: ExamStatus;
}

export default function ExamResultBadge({ statusi }: ExamResultBadgeProps) {
  const variant = statusi === "Kaluar" ? "success" : "error";

  return (
    <Badge variant={variant} glow>
      {statusi}
    </Badge>
  );
}
