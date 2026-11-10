// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { astroRedirects } from './src/data/alte-links.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://di-coco.com',
  trailingSlash: 'ignore',
  // Alte Links von dein-bizz.de landen auf der passenden neuen Seite
  redirects: astroRedirects(),
  integrations: [sitemap()],
});
