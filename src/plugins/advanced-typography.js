import { createPlugin } from '../plugin-system.js';

export default createPlugin('advanced-typography', {
  init(options = {}) {
    this.options = {
      variableFonts: {
        enabled: true,
        defaults: {
          'wght': { min: 100, max: 900, default: 400 },
          'wdth': { min: 75, max: 125, default: 100 },
          'ital': { min: 0, max: 1, default: 0 },
          'slnt': { min: -10, max: 0, default: 0 },
          'opsz': { min: 8, max: 144, default: 14 }
        }
      },
      openType: {
        enabled: true,
        features: {
          'liga': true,  // Standard Ligatures
          'dlig': true,  // Discretionary Ligatures
          'salt': true,  // Stylistic Alternates
          'ss01': true,  // Stylistic Set 1
          'ss02': true,  // Stylistic Set 2
          'swsh': true,  // Swash
          'kern': true,  // Kerning
          'frac': true,  // Fractions
          'ordn': true,  // Ordinals
          'tnum': true,  // Tabular Numbers
          'pnum': true,  // Proportional Numbers
          'onum': true,  // Old-style Numbers
          'lnum': true,  // Lining Numbers
          'zero': true,  // Slashed Zero
          'case': true,  // Case-Sensitive Forms
          'cpsp': true,  // Capital Spacing
          'rlig': true,  // Required Ligatures
          'calt': true,  // Contextual Alternates
          'hist': true,  // Historical Forms
          'smcp': true,  // Small Capitals
          'c2sc': true,  // Small Capitals From Capitals
          'pcap': true,  // Petite Capitals
          'c2pc': true,  // Petite Capitals From Capitals
          'unic': true,  // Unicase
          'titl': true,  // Titling
          'sups': true,  // Superscript
          'subs': true,  // Subscript
          'sinf': true,  // Scientific Inferiors
          'locl': true   // Localized Forms
        }
      },
      smartypants: {
        enabled: true,
        quotes: true,
        dashes: true,
        ellipsis: true,
        mathSymbols: true
      },
      textStyles: {
        enabled: true,
        presets: {
          'prose': {
            'max-width': '65ch',
            'line-height': '1.75',
            'font-kerning': 'normal',
            'font-feature-settings': '"kern", "liga", "calt"',
            '> p': {
              'margin-bottom': '1.5em'
            },
            '> blockquote': {
              'font-style': 'italic',
              'border-left': '0.25em solid currentColor',
              'padding-left': '1em',
              'margin-left': '0'
            }
          }
        }
      },
      ...options
    };
  },

  generateClasses(config) {
    let css = '';

    // Variable font utilities
    if (this.options.variableFonts.enabled) {
      css += this.generateVariableFontUtilities();
    }

    // OpenType feature utilities
    if (this.options.openType.enabled) {
      css += this.generateOpenTypeUtilities();
    }

    // Text style presets
    if (this.options.textStyles.enabled) {
      css += this.generateTextStylePresets();
    }

    // Smartypants utilities
    if (this.options.smartypants.enabled) {
      css += this.generateSmartypantsUtilities();
    }

    return css;
  },

  generateVariableFontUtilities() {
    let css = '';

    // Variable font axis utilities
    Object.entries(this.options.variableFonts.defaults).forEach(([axis, range]) => {
      const steps = [
        range.min,
        range.min + Math.round((range.max - range.min) * 0.25),
        range.min + Math.round((range.max - range.min) * 0.5),
        range.min + Math.round((range.max - range.min) * 0.75),
        range.max
      ];

      steps.forEach(value => {
        css += `
.${axis}-${value} {
  font-variation-settings: '${axis}' ${value};
}`;
      });

      // Responsive variants
      const breakpoints = {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      };

      Object.entries(breakpoints).forEach(([breakpoint, minWidth]) => {
        steps.forEach(value => {
          css += `
@media (min-width: ${minWidth}) {
  .${breakpoint}\\:${axis}-${value} {
    font-variation-settings: '${axis}' ${value};
  }
}`;
        });
      });
    });

    return css;
  },

  generateOpenTypeUtilities() {
    let css = '';

    // OpenType feature utilities
    Object.entries(this.options.openType.features).forEach(([feature, enabled]) => {
      if (enabled) {
        css += `
.${feature} {
  font-feature-settings: '${feature}' 1;
}

.no-${feature} {
  font-feature-settings: '${feature}' 0;
}`;
      }
    });

    // Common combinations
    css += `
.standard-ligatures {
  font-feature-settings: 'liga' 1, 'calt' 1;
}

.all-small-caps {
  font-feature-settings: 'smcp' 1, 'c2sc' 1;
}

.lining-nums {
  font-feature-settings: 'lnum' 1, 'tnum' 1;
}

.oldstyle-nums {
  font-feature-settings: 'onum' 1, 'pnum' 1;
}

.all-features {
  font-feature-settings: ${Object.keys(this.options.openType.features)
    .map(feature => `'${feature}' 1`)
    .join(', ')};
}`;

    return css;
  },

  generateTextStylePresets() {
    let css = '';

    // Text style presets
    Object.entries(this.options.textStyles.presets).forEach(([preset, styles]) => {
      css += `
.${preset} {
${Object.entries(styles)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n')}
}`;
    });

    return css;
  },

  generateSmartypantsUtilities() {
    let css = '';

    if (this.options.smartypants.quotes) {
      css += `
.smartquotes {
  quotes: '"' '"' ''' ''';
}

.smartquotes::before {
  content: open-quote;
}

.smartquotes::after {
  content: close-quote;
}`;
    }

    if (this.options.smartypants.dashes) {
      css += `
.smart-dashes {
  --em-dash: '—';
  --en-dash: '–';
}`;
    }

    if (this.options.smartypants.ellipsis) {
      css += `
.smart-ellipsis::after {
  content: '…';
}`;
    }

    if (this.options.smartypants.mathSymbols) {
      css += `
.smart-math {
  --multiply: '×';
  --divide: '÷';
  --minus: '−';
  --plus-minus: '±';
}`;
    }

    return css;
  },

  // Helper: Generate font-feature-settings string
  generateFeatureSettings(features) {
    return Object.entries(features)
      .filter(([_, enabled]) => enabled)
      .map(([feature, _]) => `"${feature}" 1`)
      .join(', ');
  }
});
