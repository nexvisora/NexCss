// src/plugins/position.js
class PositionPlugin {
  constructor() {
    this.name = 'position';
  }

  createUtilities() {
    // Spacing scale in rems
    const spacingScale = {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem', // 2px
      '1': '0.25rem',    // 4px
      '1.5': '0.375rem', // 6px
      '2': '0.5rem',     // 8px
      '2.5': '0.625rem', // 10px
      '3': '0.75rem',    // 12px
      '3.5': '0.875rem', // 14px
      '4': '1rem',       // 16px
      '5': '1.25rem',    // 20px
      '6': '1.5rem',     // 24px
      '7': '1.75rem',    // 28px
      '8': '2rem',       // 32px
      '9': '2.25rem',    // 36px
      '10': '2.5rem',    // 40px
      '11': '2.75rem',   // 44px
      '12': '3rem',      // 48px
      '14': '3.5rem',    // 56px
      '16': '4rem',      // 64px
      '20': '5rem',      // 80px
      '24': '6rem',      // 96px
      '28': '7rem',      // 112px
      '32': '8rem',      // 128px
      '36': '9rem',      // 144px
      '40': '10rem',     // 160px
      '44': '11rem',     // 176px
      '48': '12rem',     // 192px
      '52': '13rem',     // 208px
      '56': '14rem',     // 224px
      '60': '15rem',     // 240px
      '64': '16rem',     // 256px
      '72': '18rem',     // 288px
      '80': '20rem',     // 320px
      '96': '24rem',     // 384px
    };

    // Fractional values
    const fractions = {
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      'full': '100%',
    };

    let styles = '';

    // Generate inset utilities
    Object.entries(spacingScale).forEach(([key, value]) => {
      // Full inset
      styles += `.inset-${key} { inset: ${value}; }\n`;
      styles += `.inset-x-${key} { left: ${value}; right: ${value}; }\n`;
      styles += `.inset-y-${key} { top: ${value}; bottom: ${value}; }\n`;
      
      // Individual positions
      styles += `.top-${key} { top: ${value}; }\n`;
      styles += `.right-${key} { right: ${value}; }\n`;
      styles += `.bottom-${key} { bottom: ${value}; }\n`;
      styles += `.left-${key} { left: ${value}; }\n`;
      
      // Logical properties
      styles += `.start-${key} { inset-inline-start: ${value}; }\n`;
      styles += `.end-${key} { inset-inline-end: ${value}; }\n`;
    });

    // Generate fractional utilities
    Object.entries(fractions).forEach(([key, value]) => {
      // Full inset
      styles += `.inset-${key} { inset: ${value}; }\n`;
      styles += `.inset-x-${key} { left: ${value}; right: ${value}; }\n`;
      styles += `.inset-y-${key} { top: ${value}; bottom: ${value}; }\n`;
      
      // Individual positions
      styles += `.top-${key} { top: ${value}; }\n`;
      styles += `.right-${key} { right: ${value}; }\n`;
      styles += `.bottom-${key} { bottom: ${value}; }\n`;
      styles += `.left-${key} { left: ${value}; }\n`;
      
      // Logical properties
      styles += `.start-${key} { inset-inline-start: ${value}; }\n`;
      styles += `.end-${key} { inset-inline-end: ${value}; }\n`;
    });

    // Auto values
    const autoStyles = [
      '.inset-auto { inset: auto; }',
      '.inset-x-auto { left: auto; right: auto; }',
      '.inset-y-auto { top: auto; bottom: auto; }',
      '.top-auto { top: auto; }',
      '.right-auto { right: auto; }',
      '.bottom-auto { bottom: auto; }',
      '.left-auto { left: auto; }',
      '.start-auto { inset-inline-start: auto; }',
      '.end-auto { inset-inline-end: auto; }'
    ].join('\n');

    styles += autoStyles;

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
}

export default PositionPlugin;
