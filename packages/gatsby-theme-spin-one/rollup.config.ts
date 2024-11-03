import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';

const config: RollupOptions = {
  input: {
    'gatsby-node': 'src/gatsby-node.ts',
    'scripts/contentful-setup': 'src/scripts/contentful-setup.ts',
    'scripts/contentful-media-sync': 'src/scripts/contentful-media-sync.ts',
  },
  output: [
    {
      dir: 'dist',
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
