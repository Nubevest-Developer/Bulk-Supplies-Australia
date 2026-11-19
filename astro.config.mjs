// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nubevest-developer.github.io',
  base: '/Bulk-Supplies-Australia/',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
