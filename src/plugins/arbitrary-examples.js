// src/plugins/arbitrary-examples.js
import ArbitraryUtilities from '../core/arbitrary-utilities';

class ArbitraryExamplesPlugin {
  constructor() {
    this.name = 'arbitrary-examples';
    this.arbitraryUtils = new ArbitraryUtilities();
  }

  createUtilities() {
    // Base component styles
    const componentStyles = `
      @layer components {
        .card {
          background-color: theme('colors.white');
          border-radius: theme('borderRadius.lg');
          padding: theme('spacing.6');
          box-shadow: theme('boxShadow.xl');
        }
      }
    `;

    // Custom utilities
    const utilityStyles = `
      @layer utilities {
        .content-auto {
          content-visibility: auto;
        }
        .content-visible {
          content-visibility: visible;
        }
      }
    `;

    // Example arbitrary values
    const arbitraryStyles = [
      // Mask type example
      this.arbitraryUtils.generateArbitraryCss(
        '.\\[mask-type\\:luminance\\]',
        '[mask-type:luminance]'
      ),

      // CSS variable example
      this.arbitraryUtils.generateArbitraryCss(
        '.\\[--scroll-offset\\:56px\\]',
        '[--scroll-offset:56px]'
      ),

      // Grid template example
      this.arbitraryUtils.generateArbitraryCss(
        '.grid-cols-\\[1fr_500px_2fr\\]',
        '[grid-template-columns:1fr 500px 2fr]'
      ),

      // Complex selector example
      this.arbitraryUtils.generateArbitraryCss(
        '.lg\\:hover\\:\\[\\&\\:nth-child\\(3\\)\\]\\:underline',
        '@media (min-width: 1024px) { &:hover &:nth-child(3) { text-decoration: underline; } }'
      )
    ].join('\n');

    return `
      ${componentStyles}
      ${utilityStyles}
      ${arbitraryStyles}
    `;
  }

  // Add responsive variants
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

  // Example usage patterns
  getExamples() {
    return `
    <!-- Basic arbitrary values -->
    <div class="[mask-type:luminance]">
      Using arbitrary mask type
    </div>

    <!-- Arbitrary values with state modifiers -->
    <div class="[--button-color:blue] hover:[--button-color:red]">
      Color changes on hover
    </div>

    <!-- Complex grid layouts -->
    <div class="grid grid-cols-[1fr_500px_2fr]">
      <div>Flexible column</div>
      <div>500px column</div>
      <div>2fr column</div>
    </div>

    <!-- Custom components with utility overrides -->
    <div class="card [--card-padding:2rem] lg:[--card-padding:4rem]">
      Card with custom padding
    </div>

    <!-- Complex responsive patterns -->
    <div class="[grid-area:sidebar] lg:[grid-area:main]">
      Changes grid area at different breakpoints
    </div>

    <!-- Type-hinted variables -->
    <div class="text-[length:var(--custom-size)] bg-[color:var(--custom-bg)]">
      Using type hints for variables
    </div>

    <!-- Custom content visibility -->
    <div class="content-auto lg:content-visible">
      Content with custom visibility
    </div>
    `;
  }
}

export default ArbitraryExamplesPlugin;
