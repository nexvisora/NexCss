// src/plugins/font-size.js
class FontSizePlugin {
  constructor() {
    this.name = 'font-size';
  }

  createUtilities() {
    // Font size properties with corresponding line heights
    const fontSizeProperties = {
      'text-xs': {
        fontSize: '0.75rem',   // 12px
        lineHeight: '1rem'     // 16px
      },
      'text-sm': {
        fontSize: '0.875rem',  // 14px
        lineHeight: '1.25rem'  // 20px
      },
      'text-base': {
        fontSize: '1rem',      // 16px
        lineHeight: '1.5rem'   // 24px
      },
      'text-lg': {
        fontSize: '1.125rem',  // 18px
        lineHeight: '1.75rem'  // 28px
      },
      'text-xl': {
        fontSize: '1.25rem',   // 20px
        lineHeight: '1.75rem'  // 28px
      },
      'text-2xl': {
        fontSize: '1.5rem',    // 24px
        lineHeight: '2rem'     // 32px
      },
      'text-3xl': {
        fontSize: '1.875rem',  // 30px
        lineHeight: '2.25rem'  // 36px
      },
      'text-4xl': {
        fontSize: '2.25rem',   // 36px
        lineHeight: '2.5rem'   // 40px
      },
      'text-5xl': {
        fontSize: '3rem',      // 48px
        lineHeight: '1'
      },
      'text-6xl': {
        fontSize: '3.75rem',   // 60px
        lineHeight: '1'
      },
      'text-7xl': {
        fontSize: '4.5rem',    // 72px
        lineHeight: '1'
      },
      'text-8xl': {
        fontSize: '6rem',      // 96px
        lineHeight: '1'
      },
      'text-9xl': {
        fontSize: '8rem',      // 128px
        lineHeight: '1'
      }
    };

    let styles = '';

    // Generate font-size utilities
    Object.entries(fontSizeProperties).forEach(([className, { fontSize, lineHeight }]) => {
      styles += `.${className} {
  font-size: ${fontSize}; /* ${parseFloat(fontSize) * 16}px */
  line-height: ${lineHeight}${lineHeight === '1' ? '' : ` /* ${parseFloat(lineHeight) * 16}px */`};
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
    <!-- Basic font sizes -->
    <p class="text-xs">Extra small text</p>
    <p class="text-sm">Small text</p>
    <p class="text-base">Base text size</p>
    <p class="text-lg">Large text</p>
    <p class="text-xl">Extra large text</p>

    <!-- Larger sizes for headings -->
    <h1 class="text-4xl">Large heading</h1>
    <h2 class="text-3xl">Medium heading</h2>
    <h3 class="text-2xl">Small heading</h3>

    <!-- Display text sizes -->
    <h1 class="text-8xl">Display heading</h1>
    <h1 class="text-9xl">Largest display heading</h1>

    <!-- Responsive text sizes -->
    <p class="text-base md:text-lg lg:text-xl">
      Responsive text that grows with screen size
    </p>

    <!-- Mixing with other typography utilities -->
    <h1 class="text-4xl font-bold text-center">
      Styled heading
    </h1>
    `;
  }
}

export default FontSizePlugin;
