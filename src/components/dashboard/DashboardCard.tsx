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
    <div className="card-elegant rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-foreground/60">{titulli}</p>
          <p className="mt-2 text-3xl font-bold gold-accent">{vlera}</p>
          <p className="mt-2 text-sm text-foreground/50">{pershkrimi}</p>
        </div>
        <div className="rounded-xl bg-purple/30 p-3">
          <Ikona className="h-6 w-6 text-gold" />
        </div>
      </div>
    </div>
  );
}
