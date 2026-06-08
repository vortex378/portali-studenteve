import { CheckCircle2 } from "lucide-react";

interface SuccessMessageProps {
  mesazhi: string;
  titulli?: string;
}

export default function SuccessMessage({
  mesazhi,
  titulli = "Sukses",
}: SuccessMessageProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
      <div>
        <p className="font-semibold text-emerald-300">{titulli}</p>
        <p className="mt-1 text-sm text-emerald-200/80">{mesazhi}</p>
      </div>
    </div>
  );
}
