import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  build: {
    ssr: 'src/cli.tsx',
    target: 'node20',
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'ink', 'ink-select-input', 'node:fs', 'node:path', 'node:util'],
      output: {
        format: 'esm', 
        entryFileNames: '[name].js', 
      },
    },
  },
});
