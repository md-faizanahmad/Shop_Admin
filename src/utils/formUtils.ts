// src/utils/formUtils.ts
import type { BannerData } from "@/types/banner";

/**
 * Build FormData for PUT /v1/hero:
 * - banners: JSON.stringify([...])  // without newImageFile and id
 * - backgroundImages[index]: File // for each banner with newImageFile
 */
export function buildBannersFormData(banners: BannerData[]): FormData {
  const fd = new FormData();

  // create serializable copy without newImageFile and id
  const serializable = banners.map((b) => {
    const { id: _id, newImageFile: _newImageFile, ...rest } = b; // eslint-disable-line @typescript-eslint/no-unused-vars
    return rest;
  });

  fd.append("banners", JSON.stringify(serializable));

  banners.forEach((b, i) => {
    if (b.newImageFile) {
      fd.append(`backgroundImages[${i}]`, b.newImageFile);
    }
  });

  return fd;
}
