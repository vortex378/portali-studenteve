"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";
import type { ExamWithStudent } from "@/types/database";
import ExamTable from "./ExamTable";

interface ExamListProps {
  provimet: ExamWithStudent[];
}

export default function ExamList({ provimet }: ExamListProps) {
  const router = useRouter();
  const [lista, setLista] = useState(provimet);
  const [dukeFshire, setDukeFshire] = useState<string | null>(null);
  const [gabim, setGabim] = useState("");
  const [sukses, setSukses] = useState("");

  const handleFshi = async (examId: string, lenda: string) => {
    const konfirmuar = window.confirm(
      `A jeni i sigurt që dëshironi të fshini këtë provim?\n\n${lenda}`
    );

    if (!konfirmuar) return;

    setGabim("");
    setSukses("");
    setDukeFshire(examId);

    try {
      const response = await fetch("/api/admin/exams/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam_id: examId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGabim(data.error ?? "Dështoi fshirja e provimit.");
        return;
      }

      setLista((prev) => prev.filter((p) => p.id !== examId));
      setSukses(data.message ?? "Provimi u fshi me sukses.");
      router.refresh();
    } catch {
      setGabim("Dështoi fshirja e provimit.");
    } finally {
      setDukeFshire(null);
    }
  };

  return (
    <div>
      {gabim && (
        <div className="mb-6">
          <ErrorMessage mesazhi={gabim} />
        </div>
      )}

      {sukses && (
        <div className="mb-6">
          <SuccessMessage mesazhi={sukses} />
        </div>
      )}

      <ExamTable
        provimet={lista}
        onFshi={handleFshi}
        dukeFshireId={dukeFshire}
      />
    </div>
  );
}
