// src/plugins/align-content.js
class AlignContentPlugin {
  constructor() {
    this.name = 'align-content';
  }

  createUtilities() {
    // Align content properties
    const alignContentProperties = {
      'content-normal': 'normal',
      'content-center': 'center',
      'content-start': 'flex-start',
      'content-end': 'flex-end',
      'content-between': 'space-between',
      'content-around': 'space-around',
      'content-evenly': 'space-evenly',
      'content-baseline': 'baseline',
      'content-stretch': 'stretch'
    };

    let styles = '';

    // Generate align-content utilities
    Object.entries(alignContentProperties).forEach(([className, value]) => {
      styles += `.${className} {
  align-content: ${value};
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
    <!-- Normal alignment -->
    <div class="content-normal">...</div>

    <!-- Center alignment -->
    <div class="content-center">...</div>

    <!-- Start alignment -->
    <div class="content-start">...</div>

    <!-- End alignment -->
    <div class="content-end">...</div>

    <!-- Space between -->
    <div class="content-between">...</div>

    <!-- Space around -->
    <div class="content-around">...</div>

    <!-- Space evenly -->
    <div class="content-evenly">...</div>

    <!-- Baseline alignment -->
    <div class="content-baseline">...</div>

    <!-- Stretch alignment -->
    <div class="content-stretch">...</div>

    <!-- Responsive variants -->
    <div class="content-start md:content-center lg:content-end">...</div>
    `;
  }
}

export default AlignContentPlugin;
