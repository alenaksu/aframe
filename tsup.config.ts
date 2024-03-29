import { defineConfig } from 'tsup';

export default defineConfig({
  shims: true,
  clean: true,
  dts: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  entryPoints: ['src/index.ts'],
  define: {
    'process.env.INSPECTOR_VERSION': JSON.stringify(process.env.INSPECTOR_VERSION ?? ''),
  },
  outDir: 'dist',
});
