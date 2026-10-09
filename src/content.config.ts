import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const optionalInt = z.preprocess(
  (val) => {
    if (val === null || val === undefined) return undefined;
    if (typeof val === 'number') return Number.isFinite(val) ? Math.trunc(val) : undefined;
    if (typeof val === 'string') {
      const s = val.trim();
      if (s === '') return undefined;
      const n = Number(s);
      return Number.isFinite(n) ? Math.trunc(n) : undefined;
    }
    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        if (val.length === 0) return undefined;
        const n = Number(val[0]);
        return Number.isFinite(n) ? Math.trunc(n) : undefined;
      }
      const keys = Object.keys(val as object);
      if (keys.length === 0) return undefined;
      const inner = (val as any).value;
      if (inner !== undefined) {
        const n = Number(inner);
        return Number.isFinite(n) ? Math.trunc(n) : undefined;
      }
    }
    return undefined;
  },
  z.number().int().optional()
);

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    publishDate: z.coerce.date(),
    cover: z.string().optional(),
    category: z.string().default('خبر'),
    tags: z.array(z.string()).default([]),
    aparatHash: z.string().optional(),
    videoFile: z.string().optional(),
    videoUrl: z.string().optional(),
    instagramUrl: z.string().optional(),
    duration: z.string().optional(),
    episode: optionalInt,
    author: z.string().default('تحریریه'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { articles };
