import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.mjs'],
    exclude: [
      '**/node_modules/**',
      '**/.wizard-ai/**',
      '**/skills/**',
      '**/earendil-pi/**',
      '**/ecc/**',
      '**/caveman/**',
      '**/graphify-out/**'
    ]
  }
});
