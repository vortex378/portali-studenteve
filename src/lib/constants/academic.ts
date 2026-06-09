export const VITET_AKADEMIKE = [1, 2, 3, 4] as const;

export type VitiAkademik = (typeof VITET_AKADEMIKE)[number];

export const NOTA_MIN = 4;
export const NOTA_MAX = 10;
export const NOTA_KALUES = 5;

export function llogaritStatusinNgaNota(nota: number): "Kaluar" | "Nuk ka kaluar" {
  return nota >= NOTA_KALUES ? "Kaluar" : "Nuk ka kaluar";
}

export function eshteVitiAkademikValid(viti: number): viti is VitiAkademik {
  return Number.isInteger(viti) && viti >= 1 && viti <= 4;
}
