import postcss from 'postcss';
import { PluginSystem } from './plugin-system.js';

class PluginTester {
  constructor(options = {}) {
    this.pluginSystem = new PluginSystem();
    this.options = {
      verbose: false,
      ...options
    };
  }

  /**
   * Test a plugin's CSS output
   * @param {object} plugin - Plugin instance
   * @param {object} config - Test configuration
   * @returns {Promise<object>} Test results
   */
  async testPlugin(plugin, config = {}) {
    const results = {
      css: null,
      errors: [],
      warnings: [],
      metrics: {
        selectors: 0,
        declarations: 0,
        mediaQueries: 0,
        specificity: {
          max: 0,
          average: 0
        },
        size: {
          original: 0,
          minified: 0
        }
      }
    };

    try {
      // Register plugin
      this.pluginSystem.register(plugin.name, plugin);

      // Generate CSS
      const css = await this.pluginSystem.generateCSS(config);
      results.css = css;

      // Process with PostCSS
      const processed = await postcss([
        // Add test-specific PostCSS plugins
        {
          postcssPlugin: 'css-metrics',
          Once(root) {
            // Count selectors
            root.walkRules(rule => {
              results.metrics.selectors++;
              
              // Calculate specificity
              const specificity = this.calculateSpecificity(rule.selector);
              results.metrics.specificity.max = Math.max(
                results.metrics.specificity.max,
                specificity
              );
            });

            // Count declarations
            root.walkDecls(decl => {
              results.metrics.declarations++;
            });

            // Count media queries
            root.walkAtRules('media', () => {
              results.metrics.mediaQueries++;
            });
          }
        }
      ]).process(css, { from: undefined });

      // Measure sizes
      results.metrics.size.original = css.length;
      results.metrics.size.minified = processed.css.length;

      // Calculate average specificity
      if (results.metrics.selectors > 0) {
        results.metrics.specificity.average = 
          results.metrics.specificity.max / results.metrics.selectors;
      }

    } catch (error) {
      results.errors.push(error);
    }

    return results;
  }

  /**
   * Test plugin performance
   * @param {object} plugin - Plugin instance
   * @param {object} config - Test configuration
   * @returns {Promise<object>} Performance metrics
   */
  async testPerformance(plugin, config = {}) {
    const metrics = {
      generateTime: 0,
      processTime: 0,
      memory: {
        before: 0,
        after: 0,
        diff: 0
      }
    };

    try {
      // Measure memory before
      metrics.memory.before = process.memoryUsage().heapUsed;

      // Measure generation time
      const generateStart = performance.now();
      const css = await plugin.generateClasses(config);
      metrics.generateTime = performance.now() - generateStart;

      // Measure processing time
      const processStart = performance.now();
      await postcss([]).process(css, { from: undefined });
      metrics.processTime = performance.now() - processStart;

      // Measure memory after
      metrics.memory.after = process.memoryUsage().heapUsed;
      metrics.memory.diff = metrics.memory.after - metrics.memory.before;

    } catch (error) {
      console.error('Performance test error:', error);
    }

    return metrics;
  }

  /**
   * Validate plugin output
   * @param {object} plugin - Plugin instance
   * @param {object} config - Test configuration
   * @returns {Promise<object>} Validation results
   */
  async validatePlugin(plugin, config = {}) {
    const validation = {
      valid: true,
      errors: [],
      warnings: []
    };

    try {
      if (!plugin || typeof plugin !== 'object') {
        throw new Error('Plugin must be an object');
      }
      if (!plugin.name || typeof plugin.name !== 'string') {
        throw new Error('Plugin must have a name property of type string');
      }
      if (!plugin.process || typeof plugin.process !== 'function') {
        throw new Error('Plugin must have a process method');
      }
      if (!plugin.generateClasses || typeof plugin.generateClasses !== 'function') {
        throw new Error('Plugin must have a generateClasses method');
      }

      // Generate and validate CSS
      const css = await plugin.generateClasses(config);
      if (typeof css !== 'string') {
        validation.errors.push('generateClasses must return a string');
        validation.valid = false;
      }
    } catch (error) {
      validation.errors.push(`Error in plugin validation: ${error.message}`);
      validation.valid = false;
    }

    return validation;
  }

  /**
   * Calculate selector specificity
   * @param {string} selector - CSS selector
   * @returns {number} Specificity score
   */
  calculateSpecificity(selector) {
    let score = 0;
    
    // Split selector into parts
    const parts = selector.split(/\s+|>|\+|~/g).filter(part => part);

    for (const part of parts) {
      // Count ID selectors (#)
      const idCount = (part.match(/#/g) || []).length;
      score += idCount * 100;

      // Count class selectors (.) and attribute selectors ([])
      const classCount = (part.match(/\./g) || []).length;
      const attrCount = (part.match(/\[/g) || []).length;
      score += (classCount + attrCount) * 10;

      // Count pseudo-classes (:) but not pseudo-elements (::)
      const pseudoClassCount = (part.match(/:[^:]/g) || []).length;
      score += pseudoClassCount * 10;

      // Count element selectors (excluding pseudo-elements)
      const elementCount = part.match(/^[a-zA-Z][a-zA-Z0-9-_]*/g) ? 1 : 0;
      score += elementCount;

      // Count pseudo-elements (::)
      const pseudoElementCount = (part.match(/::/g) || []).length;
      if (pseudoElementCount > 0) {
        score = 31; // Fixed score for pseudo-elements
      }
    }

    return score;
  }

  /**
   * Generate test report
   * @param {object} results - Test results
   * @returns {string} Formatted report
   */
  generateReport(results) {
    return `
Plugin Test Report
=================

CSS Metrics:
-----------
Selectors: ${results.metrics.selectors}
Declarations: ${results.metrics.declarations}
Media Queries: ${results.metrics.mediaQueries}

Specificity:
-----------
Max: ${results.metrics.specificity.max}
Average: ${results.metrics.specificity.average.toFixed(2)}

Size:
-----
Original: ${results.metrics.size.original} bytes
Minified: ${results.metrics.size.minified} bytes
Reduction: ${((1 - results.metrics.size.minified / results.metrics.size.original) * 100).toFixed(2)}%

${results.errors.length > 0 ? `
Errors:
-------
${results.errors.map(err => `- ${err}`).join('\n')}
` : ''}

${results.warnings.length > 0 ? `
Warnings:
---------
${results.warnings.map(warn => `- ${warn}`).join('\n')}
` : ''}
    `.trim();
  }
}

export { PluginTester };

export const createTester = () => new PluginTester();

export const testPlugin = (plugin, options = {}) => {
  const tester = new PluginTester();
  return tester.testPlugin(plugin, options);
};

// Export utility functions
export const utils = {
  calculateSpecificity: (selector) => new PluginTester().calculateSpecificity(selector),
  // Add other utility functions here
};
