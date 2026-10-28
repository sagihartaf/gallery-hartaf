import { config, fields, collection } from '@keystatic/core';

const series = [
  { label: 'Machines', value: 'machines' },
  { label: 'Ports & Landscapes', value: 'ports' },
  { label: 'Cities', value: 'cities' },
  { label: 'Abstract', value: 'abstract' },
  { label: 'Portrait', value: 'portrait' },
];

const categories = [
  { label: 'Paintings', value: 'paintings' },
  { label: 'Objects', value: 'objects' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Food', value: 'food' },
];

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Gallery Hartaf' },
    navigation: ['artworks'],
  },
  collections: {
    artworks: collection({
      label: 'Artworks',
      slugField: 'title',
      path: 'src/content/artworks/*',
      format: 'yaml',
      entryLayout: 'form',
      previewUrl: '/works/{slug}',
      columns: ['category', 'series', 'medium'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { isRequired: true },
          },
        }),
        medium: fields.text({
          label: 'Medium',
          defaultValue: 'Oil on canvas',
          description: 'For example: Oil on canvas, Acrylic on canvas, Mixed media.',
        }),
        size: fields.text({
          label: 'Size',
          description: 'As it should be printed, in centimetres. Example: 80 × 120 cm',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          options: categories,
          defaultValue: 'paintings',
          description: 'Paintings, Objects, Furniture, or Food.',
        }),
        series: fields.select({
          label: 'Series',
          options: series,
          defaultValue: 'abstract',
          description: 'Shown as a filter on Paintings. Not used for Objects, Furniture, or Food.',
        }),
        featured: fields.checkbox({
          label: 'Show on the home page',
          defaultValue: false,
          description: 'Adds a painting to Selected works. Has no effect on other categories.',
        }),
        hero: fields.checkbox({
          label: 'Use for the home share image',
          defaultValue: false,
          description: 'The painting used when the home page is shared. Choose one. The home page cycles through every painting.',
        }),
        order: fields.integer({
          label: 'Sort order',
          defaultValue: 100,
          description: 'Lower numbers appear first.',
          validation: { isRequired: true, min: 0 },
        }),
        image: fields.image({
          label: 'Photograph',
          description: 'A clear photograph of the whole painting.',
          directory: 'src/assets/artworks',
          publicPath: '../../assets/artworks',
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
