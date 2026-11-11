import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    discipline: z.string(),
    period: z.string(),
    role: z.string(),
    tools: z.array(z.string()),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.string(),
    coverAlt: z.string(),
    coverFit: z.enum(["cover", "contain"]).default("cover"),
    media: z.array(z.object({
      type: z.enum(["image", "video"]).default("image"),
      src: z.string(),
      alt: z.string(),
      caption: z.string(),
      poster: z.string().optional(),
      mime: z.string().optional(),
    })).default([]),
    downloads: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});
export const collections = { projects };
