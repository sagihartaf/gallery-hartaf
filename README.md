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
| `/` | Home: a full-screen slider of every painting, then a short selection |
| `/paintings` | Every painting, with the series filters |
| `/paintings/series/machines` | Series filter. Also `ports`, `cities`, `abstract`, `portrait` |
| `/objects`, `/furniture`, `/food` | Those categories. Empty until works are added |
| `/works/bmw-engine` | One work, with the previous and the next |
| `/about` | The artist, a statement, and the studio |
| `/contact` | Email and WhatsApp |
| `/keystatic` | Admin, only while `npm run dev` or `npm run admin` is running |

```sh
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`. The Keystatic admin is not part of that build.

## Add a work

An optional public price lives on the artwork record. Set `priceUsd` to a whole number of US dollars (the site shows it as `$33,000`), or set `sold: true` to show “Sold”. Leave both off if the work has no public price. Do not invent a figure.

### With the form

1. Run `npm run admin` (or `npm run dev`).
2. Open [http://127.0.0.1:4387/keystatic](http://127.0.0.1:4387/keystatic).
3. Open **Artworks**, then **Add**.
4. Fill in the title, medium, size, series, and sort order, and upload a photograph of the whole painting. Add a price in US dollars, or mark the work as sold. Leave the price empty if it should stay off the site.
5. Choose a **Category**: Paintings, Objects, Furniture, or Food. For a painting, also choose a series. Tick **Show on the home page** to include a painting in Selected works. Tick **Use for the home share image** for the picture used when the home page is shared. Keep a single share image.
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
category: paintings
series: abstract
featured: false
hero: false
order: 30
priceUsd: 2000
image: ../../assets/artworks/my-painting/image.jpg
```

`priceUsd` is the public price in US dollars. Omit it when there is no public price. For a sold work, write `sold: true` instead of a price.

Put the photograph at `src/assets/artworks/my-painting/image.jpg`. The path in the YAML has to stay in that shape, or the admin cannot find the file later.

`category` is one of `paintings`, `objects`, `furniture`, `food`.

`series` is one of `machines`, `ports`, `cities`, `abstract`, `portrait`. It filters Paintings. It is ignored for the other categories.

`order` is the sequence through the gallery. Lower numbers come first. Previous and next follow that order within the same category and wrap at the ends.

`featured: true` places a painting in Selected works on the home page. `hero: true` chooses the painting on the home share image. Use one hero. The home slider already includes every painting.

Keep the whole canvas in the photograph. The site does not crop.

## Contact

Enquire opens the visitor’s mail app to `zoreffhartaf@gmail.com`. On an artwork page the subject is `Enquiry: {title}`. Elsewhere it is `Enquiry`.

WhatsApp uses `054 707 3333` (`https://wa.me/972547073333`). A small button sits at the corner of every page. On a work, the message is `Hello, I'm interested in "{title}"`. The same link sits beside Enquire. Contact lists the number as well.

## Deploy on Netlify

`netlify.toml` sets the build command to `npm run build`, the publish directory to `dist`, Node to 22, and `SITE_URL` to `https://hrtf.co.il`. Pushing to `main` auto-deploys the Netlify site `gallery-hartaf` to [https://hrtf.co.il](https://hrtf.co.il).

The public site URL defaults to `https://hrtf.co.il` in `astro.config.mjs`. Set `SITE_URL` only if the domain changes. The build writes a sitemap, canonical links, and a 1200×630 share image for the home page and for every work.

`/works` redirects to `/paintings`. A series address such as `/works/series/machines` redirects to `/paintings/series/machines`. A single work stays at `/works/{slug}`.

## Photographs

The site shows the canvas only. Frames, walls, and studio floors have been cropped out, with the perspective straightened where the photograph was taken at an angle. The untouched photographs are in `originals/artworks/`. The cropped files the site uses are `src/assets/artworks/{slug}/image.jpg`.

On an artwork page, **On a wall** places the canvas at its size in centimetres beside a bench of 200 cm and a figure of 170 cm.

Studio photographs on About are cropped to the artist and the painting, then given a soft, warm, slightly desaturated grade: gentle diffusion, a light vignette, and deeper shadows. The untouched files are in `originals/studio/`. The artist statement lives in `src/content/artist-statement.ts`. A studio film appears on About only when a file is added at `src/assets/studio/studio.mp4` or `studio.webm`.

A few originals are small, so those paintings look soft when the browser enlarges them. To replace one, keep the filename `image.jpg` in that painting’s folder and swap the file. Astro generates the responsive sizes at build time.
