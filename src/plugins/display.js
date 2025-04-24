// src/plugins/display.js
class DisplayPlugin {
  constructor() {
    this.name = 'display';
  }

  createUtilities() {
    // All display properties organized by type
    const displayProperties = {
      // Basic display values
      'block': 'block',
      'inline-block': 'inline-block',
      'inline': 'inline',
      
      // Flex display values
      'flex': 'flex',
      'inline-flex': 'inline-flex',
      
      // Grid display values
      'grid': 'grid',
      'inline-grid': 'inline-grid',
      
      // Table display values
      'table': 'table',
      'inline-table': 'inline-table',
      'table-caption': 'table-caption',
      'table-cell': 'table-cell',
      'table-column': 'table-column',
      'table-column-group': 'table-column-group',
      'table-footer-group': 'table-footer-group',
      'table-header-group': 'table-header-group',
      'table-row-group': 'table-row-group',
      'table-row': 'table-row',
      
      // Other display values
      'flow-root': 'flow-root',
      'contents': 'contents',
      'list-item': 'list-item',
      'hidden': 'none'
    };

    let styles = '';

    // Generate display utilities
    Object.entries(displayProperties).forEach(([className, value]) => {
      styles += `.${className} {
  display: ${value};
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

export default DisplayPlugin;
