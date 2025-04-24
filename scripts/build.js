import { build } from 'esbuild';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function buildPackage() {
  try {
    // Ensure dist directory exists
    await fs.mkdir(join(rootDir, 'dist'), { recursive: true });

    // Copy base CSS file
    await fs.copyFile(
      join(rootDir, 'src/styles/base.css'),
      join(rootDir, 'dist/index.css')
    );

    // Build ESM version
    await build({
      entryPoints: [join(rootDir, 'src/index.js')],
      outfile: join(rootDir, 'dist/index.mjs'),
      format: 'esm',
      bundle: true,
      platform: 'node',
      external: ['postcss'],
      minify: true,
    });

    // Build CJS version
    await build({
      entryPoints: [join(rootDir, 'src/index.js')],
      outfile: join(rootDir, 'dist/index.js'),
      format: 'cjs',
      bundle: true,
      platform: 'node',
      external: ['postcss'],
      minify: true,
    });

    // Build PostCSS plugin
    await build({
      entryPoints: [join(rootDir, 'src/index.js')],
      outfile: join(rootDir, 'dist/postcss.js'),
      format: 'cjs',
      bundle: true,
      platform: 'node',
      external: ['postcss'],
      minify: true,
    });

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildPackage();
