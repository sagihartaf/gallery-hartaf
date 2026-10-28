import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve('src/content/artworks');
const outDir = resolve('public/og');
const fonts = resolve('node_modules/@fontsource');
const serif = `${fonts}/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff`;
const italic = `${fonts}/cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff`;
const sans = `${fonts}/jost/files/jost-latin-300-normal.woff`;

mkdirSync(outDir, { recursive: true });

function field(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return '';
  let value = match[1].trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1).replace(/\\"/g, '"');
  }
  return value;
}

function esc(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function overlay({ title, subtitle, mark }) {
  const titleSize = title.length > 28 ? 36 : title.length > 20 ? 42 : 50;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style><![CDATA[
      @font-face { font-family: "CG"; src: url("${serif}"); font-weight: 500; }
      @font-face { font-family: "CGI"; src: url("${italic}"); font-weight: 600; font-style: italic; }
      @font-face { font-family: "Jost"; src: url("${sans}"); font-weight: 300; }
    ]]></style>
  </defs>
  <rect x="0" y="470" width="1200" height="160" fill="#f6f3ee"/>
  <text x="56" y="548" font-family="CG" font-size="${titleSize}" fill="#1c1916">${
    title === 'Gallery Hartaf'
      ? 'Gallery <tspan font-family="CGI" fill="#7a5c3a">Hartaf</tspan>'
      : esc(title)
  }</text>
  <text x="56" y="588" font-family="Jost" font-size="22" fill="#5c564c">${esc(subtitle)}</text>
  ${
    mark
      ? `<text x="1144" y="556" text-anchor="end" font-family="CG" font-size="32" fill="#1c1916">Gallery <tspan font-family="CGI" fill="#7a5c3a">Hartaf</tspan></text>`
      : ''
  }
</svg>`;
}

async function compose(imagePath, text) {
  const meta = await sharp(imagePath).metadata();
  const maxW = 1040;
  const maxH = 420;
  const scale = Math.min(maxW / meta.width, maxH / meta.height);
  const width = Math.max(1, Math.round(meta.width * scale));
  const height = Math.max(1, Math.round(meta.height * scale));
  const left = Math.round((1200 - width) / 2);
  const top = Math.round(28 + (maxH - height) / 2);
  const painting = await sharp(imagePath)
    .resize(width, height, { fit: 'inside' })
    .toBuffer();
  const base = sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#f6f3ee' },
  });
  return base
    .composite([
      { input: painting, left, top },
      { input: Buffer.from(overlay(text)), left: 0, top: 0 },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
}

const entries = readdirSync(root)
  .filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'))
  .map((name) => {
    const file = resolve(root, name);
    const text = readFileSync(file, 'utf8');
    return {
      slug: name.replace(/\.ya?ml$/, ''),
      title: field(text, 'title'),
      medium: field(text, 'medium'),
      category: field(text, 'category') || 'paintings',
      hero: field(text, 'hero') === 'true',
      order: Number(field(text, 'order') || 0),
      image: resolve(dirname(file), field(text, 'image')),
    };
  });

for (const entry of entries) {
  const card = await compose(entry.image, {
    title: entry.title,
    subtitle: entry.medium,
    mark: true,
  });
  await sharp(card).toFile(resolve(outDir, `${entry.slug}.jpg`));
}

const paintings = entries
  .filter((entry) => entry.category === 'paintings')
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
const hero = paintings.find((entry) => entry.hero) ?? paintings[0];
if (!hero) throw new Error('No painting available for the home share image.');

const home = await compose(hero.image, {
  title: 'Gallery Hartaf',
  subtitle: 'Paintings by Shmuel Hartaf',
  mark: false,
});
await sharp(home).toFile(resolve(outDir, 'home.jpg'));
console.log(`Wrote ${entries.length + 1} share images to public/og`);
