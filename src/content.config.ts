import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const series = ['machines', 'ports', 'cities', 'abstract', 'portrait'] as const;

const artworks = defineCollection({
  loader: glob({ base: './src/content/artworks', pattern: '**/*.{yaml,yml}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      medium: z.string(),
      size: z.string(),
      series: z.enum(series),
      featured: z.boolean().default(false),
      hero: z.boolean().default(false),
      order: z.number().int(),
      image: image(),
    }),
});

export const collections = { artworks };
