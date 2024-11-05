import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';

const config: RollupOptions = {
  input: {
    // for scripts
    'dist/scripts/contentful-setup': 'scripts/contentful-setup.ts',
    'dist/scripts/contentful-media-sync': 'scripts/contentful-media-sync.ts',
  },
  output: [
    {
      dir: '.',
      format: 'cjs',
      entryFileNames: '[name].js',
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
  external: ['contentful-management', 'contentful-import', 'dotenv', 'mime', 'node-html-parser'],
};

export default config;
