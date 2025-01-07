import { NexCssPlugin } from './plugin-interface.js';

export class TypographyPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('typography', options);
    
    this.defaults = {
      fontFamilies: {
        'sans': 'ui-sans-serif, system-ui, -apple-system, sans-serif',
        'serif': 'ui-serif, Georgia, serif',
        'mono': 'ui-monospace, monospace'
      },
      lineHeights: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
        'relaxed': '1.75',
        'loose': '2'
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em'
      }
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';

    // Font families
    Object.entries(this.options.fontFamilies).forEach(([name, value]) => {
      styles += `.font-${name} { font-family: ${value}; }\n`;
    });

    // Line heights
    Object.entries(this.options.lineHeights).forEach(([name, value]) => {
      styles += `.leading-${name} { line-height: ${value}; }\n`;
    });

    // Letter spacing
    Object.entries(this.options.letterSpacing).forEach(([name, value]) => {
      styles += `.tracking-${name} { letter-spacing: ${value}; }\n`;
    });

    // Text decoration
    const decorations = ['underline', 'line-through', 'no-underline'];
    decorations.forEach(decoration => {
      styles += `.${decoration} { text-decoration: ${decoration}; }\n`;
    });

    // Text transform
    const transforms = {
      'uppercase': 'uppercase',
      'lowercase': 'lowercase',
      'capitalize': 'capitalize',
      'normal-case': 'none'
    };

    Object.entries(transforms).forEach(([key, value]) => {
      styles += `.${key} { text-transform: ${value}; }\n`;
    });

    // Text overflow
    styles += '.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n';
    styles += '.overflow-ellipsis { text-overflow: ellipsis; }\n';
    styles += '.text-clip { text-overflow: clip; }\n';

    return styles;
  }
}
