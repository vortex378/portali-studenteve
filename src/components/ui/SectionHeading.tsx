import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  titulli: string;
  pershkrimi?: string;
  ikona?: LucideIcon;
  className?: string;
  veprim?: React.ReactNode;
}

export default function SectionHeading({
  titulli,
  pershkrimi,
  ikona: Ikona,
  className,
  veprim,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {Ikona && (
          <div className="icon-accent-box flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
            <Ikona className="h-5 w-5 text-accent" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {titulli}
          </h1>
          {pershkrimi && (
            <p className="mt-1.5 text-sm text-muted sm:text-base">
              {pershkrimi}
            </p>
          )}
        </div>
      </div>
      {veprim && <div className="shrink-0">{veprim}</div>}
    </div>
  );
}
