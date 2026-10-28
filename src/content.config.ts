import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const series = ['machines', 'ports', 'cities', 'abstract', 'portrait'] as const;
const categories = ['paintings', 'objects', 'furniture', 'food'] as const;

const artworks = defineCollection({
  loader: glob({ base: './src/content/artworks', pattern: '**/*.{yaml,yml}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      medium: z.string(),
      size: z.string(),
      category: z.enum(categories).default('paintings'),
      series: z.enum(series).default('abstract'),
      featured: z.boolean().default(false),
      hero: z.boolean().default(false),
      order: z.number().int(),
      image: image(),
    }),
});

export const collections = { artworks };
