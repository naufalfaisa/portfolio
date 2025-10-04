import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://naufalfaisa.my.id',
  integrations: [sitemap()],
});
