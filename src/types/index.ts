export type ExamStatus = "planifikuar" | "ne_progres" | "perfunduar" | "anuluar";

export interface Student {
  id: string;
  emri: string;
  mbiemri: string;
  email: string;
  numriIdentifikimit: string;
  dataRegjistrimit: string;
}

export interface Exam {
  id: string;
  titulli: string;
  pershkrimi: string;
  data: string;
  statusi: ExamStatus;
  studentId?: string;
}

export interface DashboardStat {
  titulli: string;
  vlera: string | number;
  pershkrimi: string;
  ikona: string;
}
