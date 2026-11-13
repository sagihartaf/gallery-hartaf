// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

const isDev = process.argv.includes('dev');
const site = process.env.SITE_URL || 'https://hrtf.co.il';

/** @type {import('astro').AstroIntegration[]} */
const integrations = [
  sitemap({
    filter: (page) => {
      const path = new URL(page).pathname.replace(/\/$/, '') || '/';
      if (path === '/works') return false;
      if (path.startsWith('/works/series')) return false;
      return true;
    },
  }),
];

// Keystatic admin routes are server endpoints. They run during `astro dev`
// and stay out of the static build Netlify publishes.
if (isDev) integrations.push(react(), keystatic());

export default defineConfig({
  site,
  output: 'static',
  integrations,
  devToolbar: { enabled: false },
  server: {
    port: 4387,
    host: '127.0.0.1',
  },
});
