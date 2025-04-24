// src/plugins/z-index.js
class ZIndexPlugin {
  constructor() {
    this.name = 'z-index';
  }

  createUtilities() {
    // Z-index values
    const zIndexValues = {
      'z-0': 0,
      'z-10': 10,
      'z-20': 20,
      'z-30': 30,
      'z-40': 40,
      'z-50': 50,
      'z-auto': 'auto'
    };

    let styles = '';

    // Generate z-index utilities
    Object.entries(zIndexValues).forEach(([className, value]) => {
      styles += `.${className} {
  z-index: ${value};
}\n`;
    });

    return styles;
  }

  // Optional: Add responsive variants
  createResponsiveUtilities(breakpoints) {
    const baseUtilities = this.createUtilities();
    let responsiveStyles = '';

    Object.entries(breakpoints).forEach(([breakpoint, minWidth]) => {
      responsiveStyles += `@media (min-width: ${minWidth}) {\n`;
      responsiveStyles += baseUtilities.split('\n')
        .filter(line => line.trim())
        .map(line => `  .${breakpoint}\\:${line.trim().substring(1)}`)
        .join('\n');
      responsiveStyles += '\n}\n';
    });

    return responsiveStyles;
  }
}

export default ZIndexPlugin;
