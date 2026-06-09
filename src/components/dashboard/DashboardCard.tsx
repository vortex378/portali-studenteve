import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  User,
} from "lucide-react";

const ikonaMap: Record<string, LucideIcon> = {
  user: User,
  book: BookOpen,
  calendar: Calendar,
  graduation: GraduationCap,
};

interface DashboardCardProps {
  titulli: string;
  vlera: string | number;
  pershkrimi: string;
  ikona?: string;
}

export default function DashboardCard({
  titulli,
  vlera,
  pershkrimi,
  ikona = "user",
}: DashboardCardProps) {
  const Ikona = ikonaMap[ikona] ?? User;

  return (
    <div className="stat-card rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">{titulli}</p>
          <p className="mt-2 text-3xl font-bold gold-accent">{vlera}</p>
          <p className="mt-2 text-sm text-muted">{pershkrimi}</p>
        </div>
        <div className="icon-accent-box shrink-0 rounded-xl p-3">
          <Ikona className="h-6 w-6 text-accent" />
        </div>
      </div>
    </div>
  );
}
