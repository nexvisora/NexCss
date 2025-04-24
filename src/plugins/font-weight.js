// src/plugins/font-weight.js
class FontWeightPlugin {
  constructor() {
    this.name = 'font-weight';
  }

  createUtilities() {
    // Font weight properties
    const fontWeightProperties = {
      'font-thin': 100,
      'font-extralight': 200,
      'font-light': 300,
      'font-normal': 400,
      'font-medium': 500,
      'font-semibold': 600,
      'font-bold': 700,
      'font-extrabold': 800,
      'font-black': 900
    };

    let styles = '';

    // Generate font-weight utilities
    Object.entries(fontWeightProperties).forEach(([className, weight]) => {
      styles += `.${className} {
  font-weight: ${weight};
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
    <!-- Basic font weights -->
    <p class="font-thin">Thin text (100)</p>
    <p class="font-extralight">Extra light text (200)</p>
    <p class="font-light">Light text (300)</p>
    <p class="font-normal">Normal text (400)</p>
    <p class="font-medium">Medium text (500)</p>
    <p class="font-semibold">Semibold text (600)</p>
    <p class="font-bold">Bold text (700)</p>
    <p class="font-extrabold">Extra bold text (800)</p>
    <p class="font-black">Black text (900)</p>

    <!-- Common heading patterns -->
    <h1 class="text-4xl font-bold">Bold heading</h1>
    <h2 class="text-3xl font-semibold">Semibold heading</h2>
    <h3 class="text-2xl font-medium">Medium heading</h3>

    <!-- Responsive font weights -->
    <p class="font-normal md:font-medium lg:font-bold">
      Text that gets bolder on larger screens
    </p>

    <!-- Combining with other typography utilities -->
    <p class="text-xl font-bold text-center">
      Large, bold, centered text
    </p>

    <!-- Article title example -->
    <article>
      <h1 class="text-3xl font-extrabold">Article Title</h1>
      <p class="text-lg font-normal">Article content...</p>
    </article>
    `;
  }
}

export default FontWeightPlugin;
