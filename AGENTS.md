## Site

The live site is https://hrtf.co.il. That origin is the default in `astro.config.mjs` and `SITE_URL` in `netlify.toml`. Canonical links, Open Graph, JSON-LD, `public/robots.txt`, and the sitemap follow it. Do not point them back at the old Netlify subdomain.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

The configured port is 4387 (`astro.config.mjs`). Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Keystatic is registered only while `astro dev` is running, so `astro build` stays a static site. The admin is at `/keystatic`. Each painting is `src/content/artworks/{slug}.yaml` plus `src/assets/artworks/{slug}/image.jpg`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
