import _fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { _fileURLToPath } from 'url';

export class ConfigProcessor {
  constructor() {
    this.defaultConfig = {
      content: [],
      theme: {},
      plugins: [],
      pluginOptions: {},
      postcss: {}
    };
  }

  async loadConfig(configPath) {
    try {
      const configFile = await import(configPath);
      return this.processConfig(configFile.default);
    } catch (error) {
      console.error('Error loading configuration:', error);
      return this.defaultConfig;
    }
  }

  processConfig(userConfig) {
    // Deep merge user config with default config
    const config = this.mergeConfigs(this.defaultConfig, userConfig);

    // Process content paths
    config.content = this.processContentPaths(config.content);

    // Process theme
    config.theme = this.processTheme(config.theme);

    return config;
  }

  mergeConfigs(target, source) {
    const merged = { ...target };

    for (const key in source) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        merged[key] = this.mergeConfigs(merged[key] || {}, source[key]);
      } else {
        merged[key] = source[key];
      }
    }

    return merged;
  }

  processContentPaths(contentPaths) {
    if (!Array.isArray(contentPaths)) return [];

    return contentPaths.map(pattern => {
      // Convert glob patterns to absolute paths if necessary
      if (pattern.startsWith('./') || pattern.startsWith('../')) {
        return path.resolve(process.cwd(), pattern);
      }
      return pattern;
    });
  }

  processTheme(theme) {
    // Process theme values and convert to CSS custom properties
    const processedTheme = { ...theme };

    // Process colors
    if (processedTheme.colors) {
      processedTheme.colors = this.processColors(processedTheme.colors);
    }

    // Process spacing
    if (processedTheme.spacing) {
      processedTheme.spacing = this.processSpacing(processedTheme.spacing);
    }

    return processedTheme;
  }

  processColors(colors) {
    const processed = {};

    for (const [key, value] of Object.entries(colors)) {
      if (typeof value === 'string') {
        processed[key] = value;
      } else if (typeof value === 'object') {
        // Handle color objects (like primary: { 500: '#fff' })
        for (const [shade, color] of Object.entries(value)) {
          processed[`${key}-${shade}`] = color;
        }
      }
    }

    return processed;
  }

  processSpacing(spacing) {
    const processed = {};

    for (const [key, value] of Object.entries(spacing)) {
      if (typeof value === 'string') {
        processed[key] = value;
      } else if (typeof value === 'number') {
        processed[key] = `${value}px`;
      }
    }

    return processed;
  }

  generateCustomProperties(theme) {
    let css = ':root {\n';

    // Generate custom properties for colors
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([name, value]) => {
        css += `  --color-${name}: ${value};\n`;
      });
    }

    // Generate custom properties for spacing
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([name, value]) => {
        css += `  --spacing-${name}: ${value};\n`;
      });
    }

    // Generate custom properties for other theme values
    // ... add more theme property processors as needed

    css += '}\n';
    return css;
  }

  async generatePluginConfig(config) {
    const pluginConfigs = {};

    for (const plugin of config.plugins) {
      const pluginOptions = config.pluginOptions[plugin] || {};
      const themeOptions = config.theme[plugin] || {};

      pluginConfigs[plugin] = {
        ...pluginOptions,
        theme: themeOptions
      };
    }

    return pluginConfigs;
  }
}
