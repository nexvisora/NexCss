// src/plugins/justify-items.js
class JustifyItemsPlugin {
  constructor() {
    this.name = 'justify-items';
  }

  createUtilities() {
    // Justify items properties
    const justifyItemsProperties = {
      'justify-items-start': 'start',
      'justify-items-end': 'end',
      'justify-items-center': 'center',
      'justify-items-stretch': 'stretch'
    };

    let styles = '';

    // Generate justify-items utilities
    Object.entries(justifyItemsProperties).forEach(([className, value]) => {
      styles += `.${className} {
  justify-items: ${value};
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

  // Add usage examples in comments
  getExamples() {
    return `
    <!-- Grid container with different justify-items values -->
    
    <!-- Start alignment -->
    <div class="grid justify-items-start">
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </div>

    <!-- End alignment -->
    <div class="grid justify-items-end">
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </div>

    <!-- Center alignment -->
    <div class="grid justify-items-center">
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </div>

    <!-- Stretch alignment -->
    <div class="grid justify-items-stretch">
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </div>

    <!-- Responsive variants -->
    <div class="grid justify-items-start md:justify-items-center lg:justify-items-end">
      <div>Responsive Grid Item</div>
      <div>Responsive Grid Item</div>
      <div>Responsive Grid Item</div>
    </div>
    `;
  }
}

export default JustifyItemsPlugin;
