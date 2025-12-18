// utils/buildCategoryTree.ts
import type { Category } from "@/types/category";

export function buildCategoryTree(categories: Category[]) {
  const main = categories.filter((c) => !c.isSub);
  const subs = categories.filter((c) => c.isSub);

  return main.map((m) => ({
    ...m,
    children: subs.filter((s) => s.parent === m._id),
  }));
}
