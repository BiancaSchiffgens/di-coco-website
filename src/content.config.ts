import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    slug: z.string(),
    color: z.enum(["orange", "blau", "violett", "schwarz"]),
    navLabel: z.string(),
    pageTitle: z.string(),
    metaDescription: z.string(),
    ueberzeile: z.string(),
    heroHeadline: z.string(),
    heroSubline: z.string(),
    ctaButtonLabel: z.string(),
    referenz: z
      .object({
        zitat: z.string(),
        name: z.string(),
        rolle: z.string(),
      })
      .optional(),
    ctaHeadline: z.string(),
    ctaText: z.string(),
  }),
});

export const collections = { services };
