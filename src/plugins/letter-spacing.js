// src/plugins/letter-spacing.js
class LetterSpacingPlugin {
  constructor() {
    this.name = 'letter-spacing';
  }

  createUtilities() {
    // Letter spacing properties
    const letterSpacingProperties = {
      'tracking-tighter': '-0.05em',
      'tracking-tight': '-0.025em',
      'tracking-normal': '0em',
      'tracking-wide': '0.025em',
      'tracking-wider': '0.05em',
      'tracking-widest': '0.1em'
    };

    let styles = '';

    // Generate letter-spacing utilities
    Object.entries(letterSpacingProperties).forEach(([className, spacing]) => {
      styles += `.${className} {
  letter-spacing: ${spacing};
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
    <!-- Basic letter spacing -->
    <p class="tracking-tighter">Tighter letter spacing (-0.05em)</p>
    <p class="tracking-tight">Tight letter spacing (-0.025em)</p>
    <p class="tracking-normal">Normal letter spacing (0em)</p>
    <p class="tracking-wide">Wide letter spacing (0.025em)</p>
    <p class="tracking-wider">Wider letter spacing (0.05em)</p>
    <p class="tracking-widest">Widest letter spacing (0.1em)</p>

    <!-- Common heading patterns -->
    <h1 class="text-4xl tracking-tight font-bold">
      Tight tracking for large headings
    </h1>
    <h2 class="text-2xl tracking-wide font-semibold">
      Wide tracking for subheadings
    </h2>

    <!-- Responsive letter spacing -->
    <p class="tracking-normal md:tracking-wide lg:tracking-wider">
      Text with responsive letter spacing
    </p>

    <!-- Combining with other typography utilities -->
    <h1 class="text-5xl font-bold tracking-tight text-center">
      Large heading with tight tracking
    </h1>

    <!-- Common use cases -->
    <div class="uppercase tracking-widest text-sm">
      Small caps with wide tracking
    </div>

    <blockquote class="text-xl tracking-normal italic">
      Normal tracking for quotes
    </blockquote>

    <nav class="uppercase tracking-wider text-sm">
      Navigation menu with wide tracking
    </nav>

    <!-- Logo/Brand text -->
    <div class="text-2xl font-bold tracking-tight">
      Brand Name
    </div>
    `;
  }
}

export default LetterSpacingPlugin;
