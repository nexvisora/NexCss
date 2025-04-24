// src/plugins/columns.js
class ColumnsPlugin {
  constructor() {
    this.name = 'columns';
  }

  createUtilities() {
    // Numeric columns (1-12)
    const numericColumns = Array.from({ length: 12 }, (_, i) => i + 1);
    
    // Size-based columns
    const sizeColumns = {
      '3xs': '16rem', // 256px
      '2xs': '18rem', // 288px
      'xs': '20rem',  // 320px
      'sm': '24rem',  // 384px
      'md': '28rem',  // 448px
      'lg': '32rem',  // 512px
      'xl': '36rem',  // 576px
      '2xl': '42rem', // 672px
      '3xl': '48rem', // 768px
      '4xl': '56rem', // 896px
      '5xl': '64rem', // 1024px
      '6xl': '72rem', // 1152px
      '7xl': '80rem'  // 1280px
    };

    let styles = '';

    // Generate numeric column utilities
    numericColumns.forEach(num => {
      styles += `.columns-${num} {
  columns: ${num};
}\n`;
    });

    // Add auto columns
    styles += `.columns-auto {
  columns: auto;
}\n`;

    // Generate size-based column utilities
    Object.entries(sizeColumns).forEach(([size, value]) => {
      styles += `.columns-${size} {
  columns: ${value}; /* ${parseInt(value) * 16}px */
}\n`;
    });

    return styles;
  }

  // Optional: Add column gap utilities
  createColumnGapUtilities() {
    const gaps = {
      '0': '0px',
      '1': '0.25rem',
      '2': '0.5rem',
      '4': '1rem',
      '8': '2rem',
      'normal': 'normal'
    };

    let styles = '';
    Object.entries(gaps).forEach(([key, value]) => {
      styles += `.column-gap-${key} {
  column-gap: ${value};
}\n`;
    });

    return styles;
  }

  // Optional: Add column rule utilities
  createColumnRuleUtilities() {
    return `
.column-rule {
  column-rule: 1px solid currentColor;
}
.column-rule-dashed {
  column-rule-style: dashed;
}
.column-rule-dotted {
  column-rule-style: dotted;
}
.column-rule-none {
  column-rule: none;
}`;
  }
}

export default ColumnsPlugin;
