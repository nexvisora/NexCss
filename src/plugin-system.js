import path from 'path';
import { fileURLToPath } from 'url';

export class PluginSystem {
  constructor() {
    this.plugins = new Map();
    this.hooks = {
      beforeGenerate: new Set(),
      afterGenerate: new Set(),
      beforePostCSS: new Set(),
      afterPostCSS: new Set(),
      configurePostCSS: new Set()
    };
  }

  /**
   * Register a plugin with the system
   * @param {string} name - Plugin name
   * @param {object} plugin - Plugin instance
   */
  register(name, plugin) {
    if (this.plugins.has(name)) {
      throw new Error(`Plugin "${name}" is already registered`);
    }

    this.plugins.set(name, plugin);

    // Register hooks if plugin has them
    Object.keys(this.hooks).forEach(hookName => {
      if (typeof plugin[hookName] === 'function') {
        this.hooks[hookName].add(plugin[hookName].bind(plugin));
      }
    });
  }

  /**
   * Load a plugin from a file or npm package
   * @param {string} source - Plugin source (file path or package name)
   * @param {object} options - Plugin options
   */
  async load(source, options = {}) {
    try {
      let plugin;
      
      if (source.startsWith('./') || source.startsWith('../') || path.isAbsolute(source)) {
        // Load from file
        const modulePath = path.resolve(process.cwd(), source);
        plugin = await import(modulePath);
      } else {
        // Load from npm package
        plugin = await import(source);
      }

      if (plugin.default && typeof plugin.default === 'function') {
        const pluginInstance = new plugin.default(options);
        this.register(source, pluginInstance);
      } else {
        throw new Error(`Invalid plugin format: ${source}`);
      }
    } catch (error) {
      console.error(`Error loading plugin ${source}:`, error);
      throw error;
    }
  }

  /**
   * Run hooks in sequence
   * @param {string} hookName - Name of the hook to run
   * @param {any} context - Context to pass to hooks
   */
  async runHooks(hookName, context) {
    const hooks = this.hooks[hookName];
    if (!hooks) return;

    for (const hook of hooks) {
      await hook(context);
    }
  }

  /**
   * Generate CSS from all registered plugins
   * @param {object} config - Framework configuration
   */
  async generateCSS(config) {
    let css = '';

    // Run beforeGenerate hooks
    await this.runHooks('beforeGenerate', { config });

    // Generate CSS from each plugin
    for (const [name, plugin] of this.plugins) {
      if (typeof plugin.generateClasses === 'function') {
        const pluginCSS = await plugin.generateClasses(config);
        css += `/* ${name} */\n${pluginCSS}\n\n`;
      }
    }

    // Run afterGenerate hooks
    await this.runHooks('afterGenerate', { config, css });

    return css;
  }

  /**
   * Configure PostCSS plugins
   * @param {object} config - Framework configuration
   * @returns {Array} PostCSS plugins array
   */
  async configurePostCSS(config) {
    const plugins = [];

    // Run configurePostCSS hooks
    await this.runHooks('configurePostCSS', { config, plugins });

    return plugins;
  }

  /**
   * Create a new plugin
   * @param {string} name - Plugin name
   * @param {object} implementation - Plugin implementation
   */
  static createPlugin(name, implementation) {
    return class CustomPlugin {
      constructor(options = {}) {
        this.name = name;
        this.options = options;
        
        // Copy implementation methods
        Object.entries(implementation).forEach(([key, value]) => {
          if (typeof value === 'function') {
            this[key] = value.bind(this);
          }
        });
      }
    };
  }
}

// Plugin template for creating custom plugins
export const createPlugin = (name, implementation) => {
  return class CustomPlugin {
    constructor(options = {}) {
      this.name = name;
      this.options = options;

      // Initialize implementation
      if (implementation.init) {
        implementation.init.call(this, options);
      }
    }

    // Standard plugin methods
    beforeGenerate(context) {
      if (implementation.beforeGenerate) {
        return implementation.beforeGenerate.call(this, context);
      }
    }

    generateClasses(config) {
      if (implementation.generateClasses) {
        return implementation.generateClasses.call(this, config);
      }
      return '';
    }

    afterGenerate(context) {
      if (implementation.afterGenerate) {
        return implementation.afterGenerate.call(this, context);
      }
    }

    configurePostCSS(context) {
      if (implementation.configurePostCSS) {
        return implementation.configurePostCSS.call(this, context);
      }
    }
  };
};

// Example usage:
/*
const MyCustomPlugin = createPlugin('my-plugin', {
  init(options) {
    this.prefix = options.prefix || 'custom';
  },
  
  generateClasses(config) {
    return `.${this.prefix}-class { ... }`;
  },
  
  configurePostCSS({ plugins }) {
    plugins.push(require('postcss-some-plugin'));
  }
});
*/
