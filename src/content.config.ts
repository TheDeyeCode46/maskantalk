import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    cover: z.string().optional(),
    category: z.string().default('خبر'),
    tags: z.array(z.string()).default([]),
    aparatHash: z.string().optional(),
    instagramUrl: z.string().optional(),
    duration: z.string().optional(),
    author: z.string().default('تحریریه'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { articles };