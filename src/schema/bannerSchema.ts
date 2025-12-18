// src/schemas/bannerSchema.ts
import { z } from "zod";

const BadgeSchema = z.object({
  enabled: z.boolean(),
  text: z.string().max(120),
});

const CTASchema = z.object({
  text: z.string().max(80),
  link: z
    .string()
    .min(1)
    .refine(
      (val) => {
        // allow absolute URLs or paths starting with '/'
        try {
          // if it's an absolute url, new URL won't throw
          // else treat as path if starts with '/'
          if (val.startsWith("/")) return true;

          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Link must be a path (starting with '/') or a valid URL." }
    ),
});

export const BannerSchema = z.object({
  liveBadge: BadgeSchema,
  headline: z.string().min(1).max(200),
  gradientHeadline: z.string().max(200),
  subheadline: z.string().max(600),
  primaryCTA: CTASchema,
  secondaryCTA: CTASchema,
  saleBadge: BadgeSchema,
  backgroundImage: z.string().optional().or(z.literal("")).default(""),
  backgroundPublicId: z.string().nullable().optional(),
});

export const BannersArraySchema = z
  .array(BannerSchema)
  .min(3, "At least 3 banners are required.")
  .max(5, "Maximum 5 banners are allowed.");

export type BannerInput = z.infer<typeof BannerSchema>;
export type BannersInput = z.infer<typeof BannersArraySchema>;
