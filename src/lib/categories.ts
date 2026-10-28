export const categories = [
  { id: 'paintings', label: 'Paintings', path: '/paintings' },
  { id: 'objects', label: 'Objects', path: '/objects' },
  { id: 'furniture', label: 'Furniture', path: '/furniture' },
  { id: 'food', label: 'Food', path: '/food' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export function isCategory(value: string): value is CategoryId {
  return categories.some((category) => category.id === value);
}

export function categoryLabel(id: string) {
  return categories.find((category) => category.id === id)?.label ?? id;
}
