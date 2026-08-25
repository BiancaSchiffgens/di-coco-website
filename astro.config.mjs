// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://di-coco.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
