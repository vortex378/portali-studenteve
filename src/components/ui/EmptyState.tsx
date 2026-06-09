import type { LucideIcon } from "lucide-react";
import Card from "./Card";

interface EmptyStateProps {
  ikona: LucideIcon;
  titulli: string;
  pershkrimi?: string;
  veprim?: React.ReactNode;
}

export default function EmptyState({
  ikona: Ikona,
  titulli,
  pershkrimi,
  veprim,
}: EmptyStateProps) {
  return (
    <Card padding="lg" className="animate-slide-up text-center">
      <div className="icon-accent-box mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
        <Ikona className="h-7 w-7 text-accent" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground/85">
        {titulli}
      </h3>
      {pershkrimi && (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">{pershkrimi}</p>
      )}
      {veprim && <div className="mt-6">{veprim}</div>}
    </Card>
  );
}
