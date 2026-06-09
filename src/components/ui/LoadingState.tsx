import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  mesazhi?: string;
}

export default function LoadingState({
  mesazhi = "Duke ngarkuar...",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl" />
        <Loader2 className="relative h-10 w-10 animate-spin text-accent" />
      </div>
      <p className="text-sm text-muted">{mesazhi}</p>
    </div>
  );
}
