export const seriesList = [
  { id: 'machines', label: 'Machines' },
  { id: 'ports', label: 'Ports & Landscapes' },
  { id: 'cities', label: 'Cities' },
  { id: 'abstract', label: 'Abstract' },
  { id: 'portrait', label: 'Portrait' },
] as const;

export type SeriesId = (typeof seriesList)[number]['id'];

export function isSeries(value: string): value is SeriesId {
  return seriesList.some((series) => series.id === value);
}

export function seriesLabel(id: string) {
  return seriesList.find((series) => series.id === id)?.label ?? id;
}
