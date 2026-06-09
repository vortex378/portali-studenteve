"use client";

import { Trash2 } from "lucide-react";

interface DeleteExamButtonProps {
  onFshi: () => void;
  dukeFshire?: boolean;
}

export default function DeleteExamButton({
  onFshi,
  dukeFshire = false,
}: DeleteExamButtonProps) {
  return (
    <button
      type="button"
      onClick={onFshi}
      disabled={dukeFshire}
      className="btn-danger inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {dukeFshire ? "Duke fshirë..." : "Fshi"}
    </button>
  );
}
