export type HeroData = {
  liveBadge: { enabled: boolean; text: string };
  headline: string;
  gradientHeadline: string;
  subheadline: string;
  primaryCTA: { text: string; link: string };
  secondaryCTA: { text: string; link: string };
  saleBadge: { enabled: boolean; text: string };
  backgroundImage: string;

  // Mobile
  mobileBackgroundImage: string;
  isActive: boolean;
  startAt: string | null;
  endAt: string | null;
  sortOrder: number;
};
