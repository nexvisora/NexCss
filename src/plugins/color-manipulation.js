import { NexCssPlugin } from './plugin-interface.js';

export class ColorManipulationPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('color-manipulation', options);
    
    this.defaults = {
      adjustments: {
        'lighten': [10, 20, 30, 40, 50],
        'darken': [10, 20, 30, 40, 50],
        'saturate': [10, 20, 30, 40, 50],
        'desaturate': [10, 20, 30, 40, 50],
        'opacity': [10, 20, 30, 40, 50, 60, 70, 80, 90]
      }
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';

    // CSS Custom Properties for color manipulation
    styles += `:root {
      --color-mix-rgb: 255, 255, 255;
      --color-mix-weight: 0;
    }\n\n`;

    // Helper functions using CSS color-mix
    const colorFunctions = {
      lighten: (amount) => `color-mix(in srgb, white var(${amount}%), currentColor)`,
      darken: (amount) => `color-mix(in srgb, black var(${amount}%), currentColor)`,
      saturate: (amount) => `color(currentColor saturation ${100 + amount}%)`,
      desaturate: (amount) => `color(currentColor saturation ${100 - amount}%)`,
      opacity: (amount) => `color(currentColor alpha ${amount}%)`
    };

    // Generate color manipulation classes
    Object.entries(this.options.adjustments).forEach(([adjustment, amounts]) => {
      amounts.forEach(amount => {
        // Text color
        styles += `.text-${adjustment}-${amount} { color: ${colorFunctions[adjustment](amount)}; }\n`;
        
        // Background color
        styles += `.bg-${adjustment}-${amount} { background-color: ${colorFunctions[adjustment](amount)}; }\n`;
        
        // Border color
        styles += `.border-${adjustment}-${amount} { border-color: ${colorFunctions[adjustment](amount)}; }\n`;
      });
    });

    // Color blend modes
    const blendModes = [
      'multiply', 'screen', 'overlay', 'darken', 'lighten',
      'color-dodge', 'color-burn', 'hard-light', 'soft-light',
      'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
    ];

    blendModes.forEach(mode => {
      styles += `.blend-${mode} { mix-blend-mode: ${mode}; }\n`;
      styles += `.bg-blend-${mode} { background-blend-mode: ${mode}; }\n`;
    });

    // Color filters
    const filters = {
      'grayscale': [0, 50, 100],
      'sepia': [0, 50, 100],
      'invert': [0, 100],
      'brightness': [50, 75, 90, 100, 110, 125, 150],
      'contrast': [50, 75, 100, 125, 150],
      'hue-rotate': [0, 90, 180, 270]
    };

    Object.entries(filters).forEach(([filter, values]) => {
      values.forEach(value => {
        const unit = filter === 'hue-rotate' ? 'deg' : '%';
        styles += `.filter-${filter}-${value} { filter: ${filter}(${value}${unit}); }\n`;
      });
    });

    // Color gradient utilities
    const gradientDirections = {
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left'
    };

    Object.entries(gradientDirections).forEach(([key, value]) => {
      styles += `.gradient-${key} { background-image: linear-gradient(${value}, var(--gradient-from), var(--gradient-to)); }\n`;
    });

    // Radial and conic gradients
    styles += '.gradient-radial { background-image: radial-gradient(var(--gradient-from), var(--gradient-to)); }\n';
    styles += '.gradient-conic { background-image: conic-gradient(var(--gradient-from), var(--gradient-to)); }\n';

    return styles;
  }
}
