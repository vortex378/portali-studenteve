import type { ExamSeason } from "@/types/database";

export const VITET_AKADEMIKE = [1, 2, 3, 4] as const;

export type VitiAkademik = (typeof VITET_AKADEMIKE)[number];

export const SEZONET: ExamSeason[] = ["Sezoni Dimëror", "Sezoni Veror"];

export const NOTA_MIN = 4;
export const NOTA_MAX = 10;
export const NOTA_KALUES = 5;

export function llogaritStatusinNgaNota(nota: number): "Kaluar" | "Nuk ka kaluar" {
  return nota >= NOTA_KALUES ? "Kaluar" : "Nuk ka kaluar";
}

export function eshteVitiAkademikValid(viti: number): viti is VitiAkademik {
  return Number.isInteger(viti) && viti >= 1 && viti <= 4;
}

export function eshteNotaValid(nota: number): boolean {
  return !Number.isNaN(nota) && nota >= NOTA_MIN && nota <= NOTA_MAX;
}

export function eshteSezoniValid(sezoni: string): sezoni is ExamSeason {
  return SEZONET.includes(sezoni as ExamSeason);
}

export function llogaritMesatarenNotave(notat: (number | null)[]): number | null {
  const teVlefshme = notat.filter((n): n is number => n !== null);
  if (teVlefshme.length === 0) return null;
  const shuma = teVlefshme.reduce((acc, n) => acc + n, 0);
  return Math.round((shuma / teVlefshme.length) * 10) / 10;
}
