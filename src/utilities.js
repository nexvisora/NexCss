// Import configuration
import { config } from './config.js';

// Core utility generators
export const generateSpacingClasses = () => {
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
    '': '' // For all sides
  };

  Object.entries(properties).forEach(([prop, property]) => {
    Object.entries(directions).forEach(([dir, direction]) => {
      Object.entries(config.spacing).forEach(([size, value]) => {
        const className = dir ? `${prop}${dir}-${size}` : `${prop}-${size}`;
        
        if (Array.isArray(direction)) {
          direction.forEach(d => {
            styles += `.${className} { ${property}-${d}: ${value}; }\n`;
          });
        } else if (direction) {
          styles += `.${className} { ${property}-${direction}: ${value}; }\n`;
        } else {
          styles += `.${className} { ${property}: ${value}; }\n`;
        }
      });
    });
  });
  
  return styles;
};

// Generate display utilities
export const generateDisplayClasses = () => {
  let styles = '';
  const displays = [
    'block', 'inline-block', 'inline', 'flex', 'inline-flex',
    'grid', 'inline-grid', 'hidden'
  ];

  displays.forEach(display => {
    styles += display === 'hidden'
      ? `.${display} { display: none; }\n`
      : `.${display} { display: ${display}; }\n`;
  });

  return styles;
};

// Generate position utilities
export const generatePositionClasses = () => {
  let styles = '';
  const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

  positions.forEach(position => {
    styles += `.${position} { position: ${position}; }\n`;
  });

  // Z-index utilities
  [0, 10, 20, 30, 40, 50].forEach(z => {
    styles += `.z-${z} { z-index: ${z}; }\n`;
  });

  return styles;
};

// Main utility generator function
export const generateUtilityClasses = () => {
  let styles = '';
  
  // Generate core utilities
  styles += generateSpacingClasses();
  styles += generateDisplayClasses();
  styles += generatePositionClasses();
  
  return styles;
};

// Helper function to apply styles to DOM
export const applyStyles = (element, styles) => {
  Object.assign(element.style, styles);
};

// Generate responsive variants
export const createResponsiveClasses = (utilityClasses) => {
  let styles = utilityClasses;
  
  Object.entries(config.breakpoints).forEach(([breakpoint, value]) => {
    styles += `@media (min-width: ${value}) {\n`;
    styles += utilityClasses.split('\n')
      .filter(line => line.trim())
      .map(line => `  .${breakpoint}\\:${line.trim().substring(1)}`)
      .join('\n');
    styles += '\n}\n';
  });
  
  return styles;
};
