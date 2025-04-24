const { config } = require('./config.js');

// Core utility generators
function createUtilityClass(className, styles) {
  return `.${className} { ${Object.entries(styles).map(([prop, value]) => `${prop}: ${value};`).join(' ')} }`;
};

// Spacing utilities (margin, padding)
function generateSpacingClasses() {
  let styles = '';
  const properties = {
    'm': 'margin',
    'p': 'padding'
  };
  const directions = {
    't': 'top',
    'r': 'right',
    'b': 'bottom',
    'l': 'left',
    'x': ['left', 'right'],
    'y': ['top', 'bottom'],
    '': ''
  };

  Object.entries(properties).forEach(([prop, property]) => {
    Object.entries(directions).forEach(([dir, direction]) => {
      Object.entries(config.spacing).forEach(([size, value]) => {
        const className = dir ? `${prop}${dir}-${size}` : `${prop}-${size}`;
        
        if (Array.isArray(direction)) {
          direction.forEach(d => {
            styles += createUtilityClass(className, { [`${property}-${d}`]: value });
          });
        } else if (direction) {
          styles += createUtilityClass(className, { [`${property}-${direction}`]: value });
        } else {
          styles += createUtilityClass(className, { [property]: value });
        }
      });
    });
  });
  
  return styles;
};

// Flexbox utilities
function generateFlexboxClasses() {
  const flexUtilities = {
    'flex': { display: 'flex' },
    'inline-flex': { display: 'inline-flex' },
    'flex-row': { 'flex-direction': 'row' },
    'flex-row-reverse': { 'flex-direction': 'row-reverse' },
    'flex-col': { 'flex-direction': 'column' },
    'flex-col-reverse': { 'flex-direction': 'column-reverse' },
    'flex-wrap': { 'flex-wrap': 'wrap' },
    'flex-nowrap': { 'flex-wrap': 'nowrap' },
    'items-start': { 'align-items': 'flex-start' },
    'items-center': { 'align-items': 'center' },
    'items-end': { 'align-items': 'flex-end' },
    'justify-start': { 'justify-content': 'flex-start' },
    'justify-center': { 'justify-content': 'center' },
    'justify-end': { 'justify-content': 'flex-end' },
    'justify-between': { 'justify-content': 'space-between' },
    'justify-around': { 'justify-content': 'space-around' }
  };

  return Object.entries(flexUtilities)
    .map(([className, styles]) => createUtilityClass(className, styles))
    .join('\n');
};

// Grid utilities
function generateGridClasses() {
  let styles = '';
  const gridUtilities = {
    'grid': { display: 'grid' },
    'inline-grid': { display: 'inline-grid' }
  };

  // Grid template columns
  for (let i = 1; i <= 12; i++) {
    gridUtilities[`grid-cols-${i}`] = {
      'grid-template-columns': `repeat(${i}, minmax(0, 1fr))`
    };
  }

  // Grid column span
  for (let i = 1; i <= 12; i++) {
    gridUtilities[`col-span-${i}`] = {
      'grid-column': `span ${i} / span ${i}`
    };
  }

  return Object.entries(gridUtilities)
    .map(([className, styles]) => createUtilityClass(className, styles))
    .join('\n');
};

// Typography utilities
function generateTypographyClasses() {
  const fontSizes = {
    'xs': '0.75rem',
    'sm': '0.875rem',
    'base': '1rem',
    'lg': '1.125rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  };

  const fontWeights = {
    'thin': '100',
    'light': '300',
    'normal': '400',
    'medium': '500',
    'semibold': '600',
    'bold': '700',
    'extrabold': '800'
  };

  let styles = '';

  // Font sizes
  Object.entries(fontSizes).forEach(([size, value]) => {
    styles += createUtilityClass(`text-${size}`, { 'font-size': value });
  });

  // Font weights
  Object.entries(fontWeights).forEach(([weight, value]) => {
    styles += createUtilityClass(`font-${weight}`, { 'font-weight': value });
  });

  return styles;
};

// Color utilities
function generateColorClasses() {
  let styles = '';
  
  Object.entries(config.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      // Text color
      styles += createUtilityClass(`text-${colorName}`, { color: colorValue });
      // Background color
      styles += createUtilityClass(`bg-${colorName}`, { 'background-color': colorValue });
    } else {
      // Handle color objects with shades
      Object.entries(colorValue).forEach(([shade, value]) => {
        styles += createUtilityClass(`text-${colorName}-${shade}`, { color: value });
        styles += createUtilityClass(`bg-${colorName}-${shade}`, { 'background-color': value });
      });
    }
  });

  return styles;
};

// Generate all utility classes
function generateUtilityClasses() {
  return [
    generateSpacingClasses(),
    generateFlexboxClasses(),
    generateGridClasses(),
    generateTypographyClasses(),
    generateColorClasses()
  ].join('\n');
};

// Generate responsive variants
function createResponsiveClasses(baseUtilities) {
  let responsiveStyles = baseUtilities;
  
  Object.entries(config.breakpoints).forEach(([breakpoint, minWidth]) => {
    const mediaQuery = `@media (min-width: ${minWidth})`;
    const responsiveUtilities = baseUtilities
      .split('\n')
      .map(rule => {
        if (rule.trim().startsWith('.')) {
          const className = rule.split('{')[0].trim();
          return rule.replace(className, `${className.replace('.', `.${breakpoint}:`)}`);
        }
        return rule;
      })
      .join('\n');

    responsiveStyles += `\n${mediaQuery} {\n${responsiveUtilities}\n}`;
  });

  return responsiveStyles;
};

// Dark mode utilities
function generateDarkModeClasses(baseUtilities) {
  const darkModeStyles = baseUtilities
    .split('\n')
    .map(rule => {
      if (rule.trim().startsWith('.')) {
        const className = rule.split('{')[0].trim();
        return rule.replace(className, `${className.replace('.', '.dark:')}`);
      }
      return rule;
    })
    .join('\n');

  return `@media (prefers-color-scheme: dark) {\n${darkModeStyles}\n}`;
};

// Hover state utilities
function generateHoverClasses(baseUtilities) {
  return baseUtilities
    .split('\n')
    .map(rule => {
      if (rule.trim().startsWith('.')) {
        const className = rule.split('{')[0].trim();
        return rule.replace(className, `${className.replace('.', '.hover:')}:hover`);
      }
      return rule;
    })
    .join('\n');
};

// Generate color utilities
function generateColorUtilities() {
  let styles = '';
  
  Object.entries(config.theme.colors).forEach(([colorName, value]) => {
    if (typeof value === 'string') {
      styles += createUtilityClass(`text-${colorName}`, { color: value });
      styles += createUtilityClass(`bg-${colorName}`, { 'background-color': value });
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([shade, color]) => {
        styles += createUtilityClass(`text-${colorName}-${shade}`, { color: color });
        styles += createUtilityClass(`bg-${colorName}-${shade}`, { 'background-color': color });
      });
    }
  });

  return styles;
};

// Generate spacing utilities
function generateSpacingUtilities() {
  let styles = '';
  
  Object.entries(config.theme.spacing).forEach(([key, value]) => {
    styles += createUtilityClass(`p-${key}`, { padding: value });
    styles += createUtilityClass(`px-${key}`, { 'padding-left': value, 'padding-right': value });
    styles += createUtilityClass(`py-${key}`, { 'padding-top': value, 'padding-bottom': value });
    styles += createUtilityClass(`m-${key}`, { margin: value });
    styles += createUtilityClass(`mx-${key}`, { 'margin-left': value, 'margin-right': value });
    styles += createUtilityClass(`my-${key}`, { 'margin-top': value, 'margin-bottom': value });
    styles += createUtilityClass(`gap-${key}`, { gap: value });
  });

  return styles;
};

// Generate font size utilities
function generateFontSizeUtilities() {
  let styles = '';
  
  Object.entries(config.theme.fontSize).forEach(([key, value]) => {
    styles += createUtilityClass(`text-${key}`, { 'font-size': value });
  });

  return styles;
};

// Generate font weight utilities
function generateFontWeightUtilities() {
  let styles = '';
  
  Object.entries(config.theme.fontWeight).forEach(([key, value]) => {
    styles += createUtilityClass(`font-${key}`, { 'font-weight': value });
  });

  return styles;
};

// Generate border radius utilities
function generateBorderRadiusUtilities() {
  let styles = '';
  
  Object.entries(config.theme.borderRadius).forEach(([key, value]) => {
    const className = key === 'DEFAULT' ? 'rounded' : `rounded-${key}`;
    styles += createUtilityClass(className, { 'border-radius': value });
  });

  return styles;
};

// Layout utilities
function generateLayoutUtilities() {
  let styles = '';
  
  styles += createUtilityClass('container', { width: '100%', 'margin-left': 'auto', 'margin-right': 'auto' });
  styles += createUtilityClass('flex', { display: 'flex' });
  styles += createUtilityClass('grid', { display: 'grid' });
  styles += createUtilityClass('hidden', { display: 'none' });
  styles += createUtilityClass('items-center', { 'align-items': 'center' });
  styles += createUtilityClass('justify-between', { 'justify-content': 'space-between' });
  styles += createUtilityClass('grid-cols-1', { 'grid-template-columns': 'repeat(1, minmax(0, 1fr))' });
  styles += createUtilityClass('min-h-screen', { 'min-height': '100vh' });
  styles += createUtilityClass('text-center', { 'text-align': 'center' });

  return styles;
};

// Generate all utility classes
function generateAllUtilities() {
  let styles = '';
  
  styles += generateColorUtilities();
  styles += generateSpacingUtilities();
  styles += generateFontSizeUtilities();
  styles += generateFontWeightUtilities();
  styles += generateBorderRadiusUtilities();
  styles += generateLayoutUtilities();

  return styles;
};

// Generate responsive variants
function createResponsiveUtilities(baseUtilities) {
  let responsiveStyles = baseUtilities;
  
  Object.entries(config.theme.breakpoints).forEach(([breakpoint, value]) => {
    const mediaQuery = `@media (min-width: ${value})`;
    const responsiveUtilities = baseUtilities
      .split('\n')
      .map(rule => {
        if (rule.trim().startsWith('.')) {
          const className = rule.split('{')[0].trim();
          return rule.replace(className, `${className.replace('.', `.${breakpoint}:`)}`);
        }
        return rule;
      })
      .join('\n');

    responsiveStyles += `\n${mediaQuery} {\n${responsiveUtilities}\n}`;
  });

  return responsiveStyles;
};

// Generate dark mode utilities
function generateDarkModeUtilities(baseUtilities) {
  const darkModeStyles = baseUtilities
    .split('\n')
    .map(rule => {
      if (rule.trim().startsWith('.')) {
        const className = rule.split('{')[0].trim();
        return rule.replace(className, `${className.replace('.', '.dark:')}`);
      }
      return rule;
    })
    .join('\n');

  return `@media (prefers-color-scheme: dark) {\n${darkModeStyles}\n}`;
};

// Generate hover utilities
function generateHoverUtilities(baseUtilities) {
  return baseUtilities
    .split('\n')
    .map(rule => {
      if (rule.trim().startsWith('.')) {
        const className = rule.split('{')[0].trim();
        return rule.replace(className, `${className.replace('.', '.hover:')}:hover`);
      }
      return rule;
    })
    .join('\n');
};

module.exports = {
  generateUtilityClasses,
  createResponsiveClasses,
  generateDarkModeClasses,
  generateHoverClasses,
  generateAllUtilities,
  createResponsiveUtilities,
  generateDarkModeUtilities,
  generateHoverUtilities
};
