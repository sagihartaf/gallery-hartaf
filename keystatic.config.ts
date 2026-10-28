import { config, fields, collection } from '@keystatic/core';

const series = [
  { label: 'Machines', value: 'machines' },
  { label: 'Ports & Landscapes', value: 'ports' },
  { label: 'Cities', value: 'cities' },
  { label: 'Abstract', value: 'abstract' },
  { label: 'Portrait', value: 'portrait' },
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
      columns: ['series', 'medium'],
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
        series: fields.select({
          label: 'Series',
          options: series,
          defaultValue: 'abstract',
          description: 'Choose the group this painting belongs to.',
        }),
        featured: fields.checkbox({
          label: 'Show on the home page',
          defaultValue: false,
          description: 'Adds the painting to Selected works.',
        }),
        hero: fields.checkbox({
          label: 'Use as the home page hero',
          defaultValue: false,
          description: 'The large painting at the top of the home page. Choose one.',
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
