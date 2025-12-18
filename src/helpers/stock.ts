import type { Product } from "@/types/analytics";

export type StockStatus = "dead" | "low" | "positive";

export const classifyStock = (p: Product): StockStatus => {
  if (p.stock < 2) return "dead";
  if (p.stock < 5) return "low";
  return "positive";
};
