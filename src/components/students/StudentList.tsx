"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";
import type { StudentWithBranch } from "@/types/database";
import StudentCard from "./StudentCard";

interface StudentListProps {
  studentet: StudentWithBranch[];
}

export default function StudentList({ studentet }: StudentListProps) {
  const router = useRouter();
  const [lista, setLista] = useState(studentet);
  const [dukeFshire, setDukeFshire] = useState<string | null>(null);
  const [gabim, setGabim] = useState("");
  const [sukses, setSukses] = useState("");

  const handleFshi = async (studentId: string, emri: string) => {
    const konfirmuar = window.confirm(
      `A jeni i sigurt që dëshironi të fshini këtë student?\n\n${emri}`
    );

    if (!konfirmuar) return;

    setGabim("");
    setSukses("");
    setDukeFshire(studentId);

    try {
      const response = await fetch("/api/admin/students/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGabim(data.error ?? "Dështoi fshirja e studentit.");
        return;
      }

      setLista((prev) => prev.filter((s) => s.id !== studentId));
      setSukses(data.message ?? "Studenti u fshi me sukses.");
      router.refresh();
    } catch {
      setGabim("Dështoi fshirja e studentit.");
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onFshi={() =>
              handleFshi(
                student.id,
                `${student.first_name} ${student.last_name}`
              )
            }
            dukeFshire={dukeFshire === student.id}
          />
        ))}
      </div>
    </div>
  );
}
