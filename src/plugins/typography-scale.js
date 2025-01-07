import { createPlugin } from '../plugin-system.js';

export default createPlugin('typography-scale', {
  init(options = {}) {
    this.options = {
      baseSize: '16px',
      scaleRatio: 1.25, // Perfect fourth
      includeRems: true,
      fluidScaling: true,
      verticalRhythm: true,
      customScales: {},
      ...options
    };

    // Pre-calculate scales
    this.scales = this.calculateScales();
  },

  calculateScales() {
    const scales = {
      modular: {},
      fluid: {},
      custom: {}
    };

    // Convert base size to number
    const baseSize = parseFloat(this.options.baseSize);

    // Calculate modular scale
    const steps = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
    steps.forEach(step => {
      const size = baseSize * Math.pow(this.options.scaleRatio, step);
      scales.modular[step] = {
        px: `${Math.round(size * 100) / 100}px`,
        rem: `${Math.round((size / baseSize) * 100) / 100}rem`
      };
    });

    // Calculate fluid scale
    if (this.options.fluidScaling) {
      steps.forEach(step => {
        const minSize = baseSize * Math.pow(this.options.scaleRatio, step);
        const maxSize = minSize * 1.2; // 20% larger at max viewport
        
        scales.fluid[step] = {
          value: `clamp(${minSize}px, ${minSize / 16}rem + ${(maxSize - minSize) / 16}vw, ${maxSize}px)`
        };
      });
    }

    // Add custom scales
    Object.entries(this.options.customScales).forEach(([name, scale]) => {
      scales.custom[name] = scale;
    });

    return scales;
  },

  generateClasses(config) {
    let css = '';

    // Root variables
    css += ':root {\n';
    css += `  --base-font-size: ${this.options.baseSize};\n`;
    css += `  --scale-ratio: ${this.options.scaleRatio};\n`;
    
    // Add scale variables
    Object.entries(this.scales.modular).forEach(([step, sizes]) => {
      css += `  --font-size-${step}: ${sizes.px};\n`;
      if (this.options.includeRems) {
        css += `  --font-size-${step}-rem: ${sizes.rem};\n`;
      }
    });
    
    css += '}\n\n';

    // Modular scale classes
    Object.entries(this.scales.modular).forEach(([step, sizes]) => {
      css += `.text-${step} {\n`;
      css += `  font-size: var(--font-size-${step});\n`;
      
      if (this.options.verticalRhythm) {
        const lineHeight = Math.max(1.2, Math.ceil((parseFloat(sizes.px) * 1.5) / parseFloat(this.options.baseSize)) * 1);
        css += `  line-height: ${lineHeight};\n`;
      }
      
      css += '}\n';
    });

    // Fluid scale classes
    if (this.options.fluidScaling) {
      Object.entries(this.scales.fluid).forEach(([step, { value }]) => {
        css += `.text-fluid-${step} {\n`;
        css += `  font-size: ${value};\n`;
        css += '}\n';
      });
    }

    // Custom scale classes
    Object.entries(this.scales.custom).forEach(([name, scale]) => {
      css += `.text-${name} {\n`;
      Object.entries(scale).forEach(([property, value]) => {
        css += `  ${property}: ${value};\n`;
      });
      css += '}\n';
    });

    // Responsive typography
    const breakpoints = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    };

    Object.entries(breakpoints).forEach(([breakpoint, minWidth]) => {
      css += `@media (min-width: ${minWidth}) {\n`;
      Object.entries(this.scales.modular).forEach(([step, sizes]) => {
        const scaledSize = parseFloat(sizes.px) * (1 + (Object.keys(breakpoints).indexOf(breakpoint) + 1) * 0.1);
        css += `  .${breakpoint}:text-${step} {\n`;
        css += `    font-size: ${scaledSize}px;\n`;
        if (this.options.includeRems) {
          css += `    font-size: ${scaledSize / parseFloat(this.options.baseSize)}rem;\n`;
        }
        css += '  }\n';
      });
      css += '}\n';
    });

    // Typography presets
    const presets = {
      'heading-1': {
        fontSize: 'var(--font-size-6)',
        fontWeight: '800',
        letterSpacing: '-0.025em',
        lineHeight: '1.125'
      },
      'heading-2': {
        fontSize: 'var(--font-size-5)',
        fontWeight: '700',
        letterSpacing: '-0.025em',
        lineHeight: '1.25'
      },
      'heading-3': {
        fontSize: 'var(--font-size-4)',
        fontWeight: '700',
        letterSpacing: '-0.025em',
        lineHeight: '1.375'
      },
      'body-large': {
        fontSize: 'var(--font-size-1)',
        lineHeight: '1.75'
      },
      'body': {
        fontSize: 'var(--font-size-0)',
        lineHeight: '1.625'
      },
      'body-small': {
        fontSize: 'var(--font-size--1)',
        lineHeight: '1.5'
      },
      'caption': {
        fontSize: 'var(--font-size--2)',
        lineHeight: '1.375'
      }
    };

    Object.entries(presets).forEach(([name, styles]) => {
      css += `.${name} {\n`;
      Object.entries(styles).forEach(([property, value]) => {
        css += `  ${property}: ${value};\n`;
      });
      css += '}\n';
    });

    return css;
  }
});
