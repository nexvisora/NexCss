// src/plugins/justify-content.js
class JustifyContentPlugin {
  constructor() {
    this.name = 'justify-content';
  }

  createUtilities() {
    // Justify content properties
    const justifyContentProperties = {
      'justify-normal': 'normal',
      'justify-start': 'flex-start',
      'justify-end': 'flex-end',
      'justify-center': 'center',
      'justify-between': 'space-between',
      'justify-around': 'space-around',
      'justify-evenly': 'space-evenly',
      'justify-stretch': 'stretch'
    };

    let styles = '';

    // Generate justify-content utilities
    Object.entries(justifyContentProperties).forEach(([className, value]) => {
      styles += `.${className} {
  justify-content: ${value};
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
    <!-- Normal justification -->
    <div class="justify-normal">...</div>

    <!-- Start justification -->
    <div class="justify-start">...</div>

    <!-- End justification -->
    <div class="justify-end">...</div>

    <!-- Center justification -->
    <div class="justify-center">...</div>

    <!-- Space between -->
    <div class="justify-between">...</div>

    <!-- Space around -->
    <div class="justify-around">...</div>

    <!-- Space evenly -->
    <div class="justify-evenly">...</div>

    <!-- Stretch -->
    <div class="justify-stretch">...</div>

    <!-- Responsive variants -->
    <div class="justify-start md:justify-center lg:justify-end">...</div>

    <!-- Common flex container example -->
    <div class="flex justify-between">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

    <!-- Grid container example -->
    <div class="grid justify-evenly">
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </div>
    `;
  }
}

export default JustifyContentPlugin;
