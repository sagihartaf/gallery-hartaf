import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategoryId } from './categories';

export type Work = CollectionEntry<'artworks'>;

export async function getWorks() {
  const works = await getCollection('artworks');
  return works.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

export async function getByCategory(category: CategoryId) {
  const works = await getWorks();
  return works.filter((work) => work.data.category === category);
}

export function workPath(work: Work) {
  return `/works/${work.id}`;
}

export function neighbours(works: Work[], id: string) {
  const index = works.findIndex((work) => work.id === id);
  if (index < 0) return { prev: undefined, next: undefined };
  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];
  return { prev, next };
}
