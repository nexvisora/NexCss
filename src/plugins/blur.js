// src/plugins/blur.js
class BlurPlugin {
  constructor() {
    this.name = 'blur';
  }

  createUtilities() {
    // Blur sizes
    const blurSizes = {
      'none': '',
      'sm': '4px',
      '': '8px',
      'md': '12px',
      'lg': '16px',
      'xl': '24px',
      '2xl': '40px',
      '3xl': '64px'
    };

    let styles = '';

    // Generate blur utilities
    Object.entries(blurSizes).forEach(([key, value]) => {
      const className = `blur${key ? `-${key}` : ''}`;
      styles += `.${className} {
  filter: ${value ? `blur(${value})` : ''};
}\n`;
    });

    // Add backdrop blur utilities
    Object.entries(blurSizes).forEach(([key, value]) => {
      const className = `backdrop-blur${key ? `-${key}` : ''}`;
      styles += `.${className} {
  backdrop-filter: ${value ? `blur(${value})` : ''};
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
    <!-- Basic blur effects -->
    <div class="blur-none">No blur effect</div>
    <div class="blur-sm">Small blur (4px)</div>
    <div class="blur">Default blur (8px)</div>
    <div class="blur-md">Medium blur (12px)</div>
    <div class="blur-lg">Large blur (16px)</div>
    <div class="blur-xl">Extra large blur (24px)</div>
    <div class="blur-2xl">2x large blur (40px)</div>
    <div class="blur-3xl">3x large blur (64px)</div>

    <!-- Backdrop blur effects -->
    <div class="backdrop-blur-sm">
      Small backdrop blur
    </div>
    <div class="backdrop-blur">
      Default backdrop blur
    </div>
    <div class="backdrop-blur-lg">
      Large backdrop blur
    </div>

    <!-- Common use cases -->
    <!-- Blurred image -->
    <img class="blur-sm hover:blur-none transition-filter"
         src="image.jpg" 
         alt="Image with hover effect">

    <!-- Frosted glass effect -->
    <div class="backdrop-blur-md bg-white/30">
      Content with frosted glass effect
    </div>

    <!-- Loading state -->
    <div class="blur-sm animate-pulse">
      Loading content...
    </div>

    <!-- Modal backdrop -->
    <div class="fixed inset-0 backdrop-blur-sm bg-black/30">
      Modal content
    </div>

    <!-- Responsive blur -->
    <div class="blur-none md:blur-sm lg:blur">
      Blur increases at different breakpoints
    </div>

    <!-- Combining with other effects -->
    <div class="blur-sm opacity-75 hover:blur-none hover:opacity-100 transition-all">
      Interactive element with multiple effects
    </div>
    `;
  }
}

export default BlurPlugin;
