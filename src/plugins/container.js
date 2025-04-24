// src/plugins/container.js
class ContainerPlugin {
  constructor() {
    this.name = 'container';
    this.breakpoints = {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    };
  }

  createUtilities() {
    let styles = '';
    
    // Base container style
    styles += `.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}\n`;

    // Add max-width for each breakpoint
    Object.entries(this.breakpoints).forEach(([breakpoint, width]) => {
      styles += `@media (min-width: ${width}) {
  .container {
    max-width: ${width};
  }
}\n`;
    });

    return styles;
  }

  // Optional: Add container modifiers
  createModifiers() {
    return `
.container-fluid {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.container-none {
  padding-left: 0;
  padding-right: 0;
}`;
  }
}

export default ContainerPlugin;
