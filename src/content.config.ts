import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Nikita Fomin'),
    tags: z.array(z.string()).optional(),
    source: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    hideFirstHeading: z.boolean().default(false),
    wideMedia: z.boolean().default(false),
  }),
});

export const collections = { articles };
