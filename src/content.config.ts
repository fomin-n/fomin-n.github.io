import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Nikita Fomin'),
    tags: z.array(z.string()).optional(),
    source: z.string().optional(),
  }),
});

export const collections = { articles };
