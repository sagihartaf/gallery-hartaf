# Gallery Hartaf

English gallery for the painter Shmuel Hartaf. Live site: https://hrtf.co.il

## Stack

Astro static site, TypeScript. The published build has no server and no admin.

Keystatic runs in local mode only. `npm run admin` starts the dev server; the GUI is at http://127.0.0.1:4387/keystatic. Keystatic is registered only while `astro dev` is running, so `npm run build` stays a static site.

## Project structure

- Artworks: `src/content/artworks/*.yaml` plus `src/assets/artworks/<slug>/image.jpg`. The site image is the cropped canvas only.
- Untouched painting photographs: `originals/artworks/`.
- Studio photographs used on About: `src/assets/studio/`.
- Untouched studio photographs: `originals/studio/`.
- Categories: `paintings`, `objects`, `furniture`, `food`. The field is on each artwork. Paintings keep series filters. The other three categories are empty until works are added.
- Contact details: `src/lib/contact.ts` (`zoreffhartaf@gmail.com`, WhatsApp `972547073333`, displayed as `054 707 3333`).
- Artist statement: `src/content/artist-statement.ts`.

Detail pages stay at `/works/<slug>`. Category indexes are `/paintings`, `/objects`, `/furniture`, and `/food`.

## Rules

- English only.
- No prices anywhere. Enquiry is email and WhatsApp only.
- Keep the original uncropped photographs in `originals/`. Do not delete or overwrite them.
- Run `npm run build` before committing. It regenerates Open Graph images and `dist/`.

## Local commands

Node.js 22 or newer. The dev server is http://127.0.0.1:4387.

```sh
npm install
npm run dev      # preview
npm run admin    # Keystatic GUI at /keystatic
npm run build    # static output in dist/
```

`npm run dev` and `npm run admin` both start `astro dev`. The admin is not included in `dist/`.

## Deployment

Pushing to `main` auto-deploys on Netlify. The Netlify site is `gallery-hartaf`. The public domain is https://hrtf.co.il.

`netlify.toml` sets the build command, the `dist` publish directory, Node 22, and `SITE_URL`. The default origin in `astro.config.mjs` is the same URL. Canonical links, Open Graph, JSON-LD, `robots.txt`, and the sitemap use that origin.
