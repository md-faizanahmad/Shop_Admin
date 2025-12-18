// src/types/banner.ts
export type Badge = {
  enabled: boolean;
  text: string;
};

export type CTA = {
  text: string;
  link: string;
};

export type BannerData = {
  id: string; // UI-only id for reordering
  liveBadge: Badge;
  headline: string;
  gradientHeadline: string;
  subheadline: string;
  primaryCTA: CTA;
  secondaryCTA: CTA;
  saleBadge: Badge;
  backgroundImage: string; // persisted URL
  backgroundPublicId?: string | null;
  newImageFile?: File | null; // UI-only; when set, will be uploaded
};
