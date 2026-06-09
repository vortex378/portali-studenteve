import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  mesazhi: string;
  titulli?: string;
}

export default function ErrorMessage({
  mesazhi,
  titulli = "Gabim",
}: ErrorMessageProps) {
  return (
    <div className="animate-slide-up flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/8 p-4 backdrop-blur-sm">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      <div>
        <p className="font-semibold text-red-300">{titulli}</p>
        <p className="mt-1 text-sm text-red-200/75">{mesazhi}</p>
      </div>
    </div>
  );
}
