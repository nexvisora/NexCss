import { build } from 'esbuild';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// List all external dependencies
const external = [
  // Core dependencies
  'postcss',
  'autoprefixer',
  'cssnano',
  'commander',
  'inquirer',
  'chalk',
  'ora',
  // Testing dependencies
  'puppeteer',
  'axe-core',
  'jsdom',
  'wcag-color',
  'color-namer',
  'lighthouse',
  'chrome-launcher',
  'css',
  // File system
  'fs',
  'path',
  'url',
  // Node built-ins
  'process',
  'module',
  'util',
  'stream',
  'events',
  'os',
  'http',
  'https',
  'net',
  'tls',
  'crypto',
  'zlib'
];

async function buildPackage() {
  // Ensure dist directory exists
  await fs.mkdir(join(rootDir, 'dist'), { recursive: true });

  // Build CLI
  await build({
    entryPoints: [join(rootDir, 'src/cli.js')],
    outfile: join(rootDir, 'dist/cli.js'),
    bundle: true,
    platform: 'node',
    format: 'esm',
    external,
    banner: {
      js: '#!/usr/bin/env node',
    },
    minify: true,
  });

  // Build main library
  await build({
    entryPoints: [join(rootDir, 'src/index.js')],
    outfile: join(rootDir, 'dist/index.js'),
    bundle: true,
    platform: 'node',
    format: 'esm',
    external,
    minify: true,
  });

  // Copy CSS files
  await fs.copyFile(
    join(rootDir, 'src/index.css'),
    join(rootDir, 'dist/index.css')
  );

  // Make CLI executable
  await fs.chmod(join(rootDir, 'dist/cli.js'), '755');

  console.log('Build completed successfully!');
}

buildPackage().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
