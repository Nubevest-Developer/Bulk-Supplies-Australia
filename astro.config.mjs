// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bulksuppliesaustralia.com.au',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
