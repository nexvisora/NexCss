#!/usr/bin/env node

import { Command } from 'commander';
import { initializeProject } from './cli/init.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import { ConfigProcessor } from './config-processor.js';

// Import plugins
import { FlexboxPlugin } from './plugins/flexbox.js';
import { TypographyPlugin } from './plugins/typography.js';
import { GridPlugin } from './plugins/grid.js';
import { ColorPlugin } from './plugins/colors.js';
import { TransitionsPlugin } from './plugins/transitions.js';
import { AnimationsPlugin } from './plugins/animations.js';
import { ResetPlugin } from './plugins/reset.js';
import { ColorManipulationPlugin } from './plugins/color-manipulation.js';
import { DarkModePlugin } from './plugins/dark-mode.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const program = new Command();

program
  .name('nexcss')
  .description('NexCSS CLI tool')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new NexCSS project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-t, --template <template>', 'Project template (react, vue, svelte, vanilla)')
  .action(initializeProject);

program
  .command('build')
  .description('Build the CSS file')
  .option('-c, --config <path>', 'Path to config file', 'nexcss.config.js')
  .option('-o, --output <path>', 'Output path', 'dist/nexcss.css')
  .option('-w, --watch', 'Watch for changes')
  .action(async (options) => {
    try {
      const configProcessor = new ConfigProcessor();
      const config = await configProcessor.loadConfig(
        path.resolve(process.cwd(), options.config)
      );

      // Initialize plugins with config
      const pluginConfigs = await configProcessor.generatePluginConfig(config);
      const plugins = [
        new ResetPlugin(pluginConfigs.reset),
        new FlexboxPlugin(pluginConfigs.flexbox),
        new TypographyPlugin(pluginConfigs.typography),
        new GridPlugin(pluginConfigs.grid),
        new ColorPlugin(pluginConfigs.colors),
        new TransitionsPlugin(pluginConfigs.transitions),
        new AnimationsPlugin(pluginConfigs.animations),
        new ColorManipulationPlugin(pluginConfigs.colorManipulation),
        new DarkModePlugin(pluginConfigs.darkMode)
      ];

      const buildStyles = async () => {
        let styles = '';
        
        // Generate CSS custom properties
        styles += configProcessor.generateCustomProperties(config.theme);
        
        // Run beforeGenerate hooks
        for (const plugin of plugins) {
          if (plugin.beforeGenerate) {
            plugin.beforeGenerate();
          }
        }

        // Generate plugin classes
        for (const plugin of plugins) {
          styles += plugin.generateClasses();
        }

        // Run afterGenerate hooks
        for (const plugin of plugins) {
          if (plugin.afterGenerate) {
            plugin.afterGenerate();
          }
        }

        // Process with PostCSS
        const result = await postcss([
          ...config.postcss.plugins || []
        ]).process(styles, {
          from: undefined,
          to: options.output
        });

        // Ensure output directory exists
        const outputDir = path.dirname(options.output);
        await fs.mkdir(outputDir, { recursive: true });

        // Write output
        await fs.writeFile(options.output, result.css);
        console.log(`CSS generated successfully at ${options.output}`);
      };

      // Initial build
      await buildStyles();

      // Watch mode
      if (options.watch) {
        console.log('Watching for changes...');
        const chokidar = (await import('chokidar')).default;
        
        // Watch config file and content files
        const watchPaths = [
          options.config,
          ...config.content,
          'src/**/*.js',
          'src/**/*.css'
        ];

        const watcher = chokidar.watch(watchPaths, {
          ignoreInitial: true
        });
        
        watcher.on('change', async (path) => {
          console.log(`Changes detected in ${path}, rebuilding...`);
          await buildStyles();
        });
      }
    } catch (error) {
      console.error('Error building CSS:', error);
      process.exit(1);
    }
  });

program.parse();
