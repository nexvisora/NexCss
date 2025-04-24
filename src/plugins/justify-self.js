// src/plugins/justify-self.js
class JustifySelfPlugin {
  constructor() {
    this.name = 'justify-self';
  }

  createUtilities() {
    // Justify self properties
    const justifySelfProperties = {
      'justify-self-auto': 'auto',
      'justify-self-start': 'start',
      'justify-self-end': 'end',
      'justify-self-center': 'center',
      'justify-self-stretch': 'stretch'
    };

    let styles = '';

    // Generate justify-self utilities
    Object.entries(justifySelfProperties).forEach(([className, value]) => {
      styles += `.${className} {
  justify-self: ${value};
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
    <!-- Grid container with items using different justify-self values -->
    <div class="grid grid-cols-3 gap-4">
      <!-- Auto justification -->
      <div class="justify-self-auto">
        Auto justified item
      </div>

      <!-- Start alignment -->
      <div class="justify-self-start">
        Start aligned item
      </div>

      <!-- End alignment -->
      <div class="justify-self-end">
        End aligned item
      </div>

      <!-- Center alignment -->
      <div class="justify-self-center">
        Centered item
      </div>

      <!-- Stretch alignment -->
      <div class="justify-self-stretch">
        Stretched item
      </div>

      <!-- Responsive alignment -->
      <div class="justify-self-start md:justify-self-center lg:justify-self-end">
        Responsive item
      </div>
    </div>

    <!-- Example with mixed alignments -->
    <div class="grid grid-cols-2">
      <div class="justify-self-start">Left aligned</div>
      <div class="justify-self-end">Right aligned</div>
      <div class="justify-self-center">Centered</div>
      <div class="justify-self-stretch">Stretched</div>
    </div>
    `;
  }
}

export default JustifySelfPlugin;
