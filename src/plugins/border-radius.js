// src/plugins/border-radius.js
class BorderRadiusPlugin {
  constructor() {
    this.name = 'border-radius';
  }

  createUtilities() {
    // Border radius sizes
    const radiusSizes = {
      'none': '0px',
      'sm': '0.125rem', // 2px
      '': '0.25rem',    // 4px
      'md': '0.375rem', // 6px
      'lg': '0.5rem',   // 8px
      'xl': '0.75rem',  // 12px
      '2xl': '1rem',    // 16px
      '3xl': '1.5rem',  // 24px
      'full': '9999px'
    };

    // Corner mappings for logical properties
    const corners = {
      // All corners
      '': {
        property: 'border-radius'
      },
      // Sides
      's': {
        properties: ['border-start-start-radius', 'border-end-start-radius']
      },
      'e': {
        properties: ['border-start-end-radius', 'border-end-end-radius']
      },
      't': {
        properties: ['border-top-left-radius', 'border-top-right-radius']
      },
      'r': {
        properties: ['border-top-right-radius', 'border-bottom-right-radius']
      },
      'b': {
        properties: ['border-bottom-right-radius', 'border-bottom-left-radius']
      },
      'l': {
        properties: ['border-top-left-radius', 'border-bottom-left-radius']
      },
      // Individual corners
      'ss': {
        property: 'border-start-start-radius'
      },
      'se': {
        property: 'border-start-end-radius'
      },
      'ee': {
        property: 'border-end-end-radius'
      },
      'es': {
        property: 'border-end-start-radius'
      },
      'tl': {
        property: 'border-top-left-radius'
      },
      'tr': {
        property: 'border-top-right-radius'
      },
      'br': {
        property: 'border-bottom-right-radius'
      },
      'bl': {
        property: 'border-bottom-left-radius'
      }
    };

    let styles = '';

    // Generate utilities for each combination
    Object.entries(corners).forEach(([cornerKey, cornerConfig]) => {
      Object.entries(radiusSizes).forEach(([sizeKey, value]) => {
        const className = `rounded${cornerKey ? `-${cornerKey}` : ''}${sizeKey ? `-${sizeKey}` : ''}`;

        if (cornerConfig.property) {
          // Single property
          styles += `.${className} {
  ${cornerConfig.property}: ${value};
}\n`;
        } else if (cornerConfig.properties) {
          // Multiple properties
          styles += `.${className} {
  ${cornerConfig.properties.map(prop => `${prop}: ${value}`).join(';\n  ')};
}\n`;
        }
      });
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
    <!-- All corners -->
    <div class="rounded-none">Square corners</div>
    <div class="rounded-sm">Small radius</div>
    <div class="rounded">Default radius</div>
    <div class="rounded-md">Medium radius</div>
    <div class="rounded-lg">Large radius</div>
    <div class="rounded-full">Fully rounded</div>

    <!-- Individual sides -->
    <div class="rounded-t-lg">Top corners rounded</div>
    <div class="rounded-r-lg">Right corners rounded</div>
    <div class="rounded-b-lg">Bottom corners rounded</div>
    <div class="rounded-l-lg">Left corners rounded</div>

    <!-- Individual corners -->
    <div class="rounded-tl-lg">Top left rounded</div>
    <div class="rounded-tr-lg">Top right rounded</div>
    <div class="rounded-br-lg">Bottom right rounded</div>
    <div class="rounded-bl-lg">Bottom left rounded</div>

    <!-- Logical properties -->
    <div class="rounded-s-lg">Start side rounded</div>
    <div class="rounded-e-lg">End side rounded</div>
    <div class="rounded-ss-lg">Start-start corner rounded</div>
    <div class="rounded-se-lg">Start-end corner rounded</div>

    <!-- Mixed radiuses -->
    <div class="rounded-t-lg rounded-b-sm">
      Different top and bottom radius
    </div>

    <!-- Responsive variants -->
    <div class="rounded-none md:rounded-lg lg:rounded-full">
      Radius changes at different breakpoints
    </div>

    <!-- Common use cases -->
    <button class="rounded-lg">
      Rounded button
    </button>

    <div class="rounded-t-lg">
      Card with only top corners rounded
    </div>

    <img class="rounded-full" src="avatar.jpg" alt="Avatar">
    `;
  }
}

export default BorderRadiusPlugin;
