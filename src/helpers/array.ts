// src/lib/helpers/array.ts
export const safeArray = <T>(arr: T[] | null | undefined): T[] =>
  Array.isArray(arr) ? arr : [];
