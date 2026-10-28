# Gallery Hartaf

English gallery site for the painter Shmuel Hartaf. The paintings are the page. The interface stays quiet: warm paper, ink type, and a small bronze note in the wordmark.

The site is a static [Astro](https://astro.build) build. Each painting is one YAML file, so adding a work is a single new file plus a photograph. While you are developing, [Keystatic](https://keystatic.com) (local mode) offers a simple form for the same thing. The published site does not include the admin.

## Run locally

Node.js 22 or newer.

```sh
npm install
npm run dev
```

The site is at [http://127.0.0.1:4387](http://127.0.0.1:4387).

| Path | Page |
| --- | --- |
| `/` | Home: one large painting, then a short selection |
| `/works` | Every painting, at its true proportion |
| `/works/series/machines` | Series filter. Also `ports`, `cities`, `abstract`, `portrait` |
| `/works/bmw-engine` | One painting, with the previous and the next |
| `/about` | A short note, and photographs of the studio |
| `/contact` | Email |
| `/keystatic` | Admin, only while `npm run dev` is running |

```sh
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`. The Keystatic admin is not part of that build.

## Add a work

There are no prices on the site. Leave them out of the text.

### With the form

1. Run `npm run dev`.
2. Open [http://127.0.0.1:4387/keystatic](http://127.0.0.1:4387/keystatic).
3. Open **Artworks**, then **Add**.
4. Fill in the title, medium, size, series, and sort order, and upload a photograph of the whole painting.
5. Tick **Show on the home page** to include it in Selected works. Tick **Use as the home page hero** for the large painting at the top. Keep a single hero.
6. Save.

The form writes:

- `src/content/artworks/{slug}.yaml`
- `src/assets/artworks/{slug}/image.jpg`

The slug comes from the title. Size is printed exactly as you type it, for example `80 × 120 cm`. The old records do not say which number is height, so do not swap them.

### By hand

Create `src/content/artworks/my-painting.yaml`:

```yaml
title: "My Painting"
medium: "Oil on canvas"
size: "80 × 120 cm"
series: abstract
featured: false
hero: false
order: 30
image: ../../assets/artworks/my-painting/image.jpg
```

Put the photograph at `src/assets/artworks/my-painting/image.jpg`. The path in the YAML has to stay in that shape, or the admin cannot find the file later.

`series` is one of `machines`, `ports`, `cities`, `abstract`, `portrait`.

`order` is the sequence through the gallery. Lower numbers come first. Previous and next follow that order and wrap at the ends.

`featured: true` places it on the home page. `hero: true` makes it the large painting there. Use one hero, and do not also mark that painting as featured.

Keep the whole canvas in the photograph. The site does not crop.

## Contact

Enquire opens the visitor’s mail app to `hartafgallery@gmail.com`. On an artwork page the subject is `Enquiry: {title}`. Elsewhere it is `Enquiry`.

WhatsApp is ready and stays hidden until a number is set. In `src/lib/contact.ts`, set `whatsapp` to digits only, with no plus sign:

```ts
whatsapp: '972501234567',
```

It then appears on Contact and beside Enquire on each painting.

## Deploy on Netlify

`netlify.toml` already sets the build command to `npm run build`, the publish directory to `dist`, and Node to 22.

In the Netlify site settings, add:

```
SITE_URL=https://your-domain.example
```

With that set, the build emits a sitemap and absolute canonical and Open Graph URLs. Without it, the site still builds. Those absolute links are left out, so a preview deploy does not advertise `localhost`.

## Photographs

The pictures shipped with the site are the family originals, including frames and studio walls. A few of those files are small, and they will look soft when the browser enlarges them. To replace one, keep the filename `image.jpg` in that painting’s folder and swap the file. Astro generates the responsive sizes at build time.
