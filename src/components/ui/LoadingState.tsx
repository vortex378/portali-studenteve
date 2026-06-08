import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  mesazhi?: string;
}

export default function LoadingState({
  mesazhi = "Duke ngarkuar...",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <Loader2 className="h-10 w-10 animate-spin text-gold" />
      <p className="text-sm text-foreground/70">{mesazhi}</p>
    </div>
  );
}
