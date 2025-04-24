// src/plugins/float.js
class FloatPlugin {
  constructor() {
    this.name = 'float';
  }

  createUtilities() {
    const floatValues = {
      'left': 'left',
      'right': 'right',
      'none': 'none'
    };

    let styles = '';

    // Generate float utilities
    Object.entries(floatValues).forEach(([key, value]) => {
      styles += `
.float-${key} {
  float: ${value};
}`;
    });

    // Add clearfix utility
    styles += `
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}`;

    return styles;
  }

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

  getExamples() {
    return `
    <!-- Basic float utilities -->
    <div class="float-left">Float left</div>
    <div class="float-right">Float right</div>
    <div class="float-none">No float</div>

    <!-- Clearfix -->
    <div class="clearfix">
      <div class="float-left">Floated left</div>
      <div class="float-right">Floated right</div>
    </div>

    <!-- Responsive floats -->
    <div class="float-none md:float-left lg:float-right">
      Changes float behavior at different breakpoints
    </div>

    <!-- Common use cases -->
    <div class="clearfix">
      <img class="float-left mr-4" src="image.jpg" alt="Floated image">
      <p>Text wraps around the floated image...</p>
    </div>

    <!-- Float patterns -->
    <div class="clearfix">
      <div class="float-left w-1/3">Sidebar</div>
      <div class="float-right w-2/3">Main content</div>
    </div>
    `;
  }
}

export default FloatPlugin;
