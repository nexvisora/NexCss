import { NexCssPlugin } from './plugin-interface.js';

export class ColorPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('colors', options);
    
    this.defaults = {
      colors: {
        // Base colors
        'black': '#000000',
        'white': '#ffffff',
        'transparent': 'transparent',
        'current': 'currentColor',
        
        // Gray palette
        'gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        
        // Blue palette
        'blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },

        // Green palette
        'green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },

        // Red palette
        'red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },

        // Yellow palette
        'yellow': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12'
        },

        // Purple palette
        'purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87'
        },

        // Pink palette
        'pink': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843'
        },

        // Teal palette
        'teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a'
        }
      },
      opacity: {
        0: '0',
        5: '0.05',
        10: '0.1',
        20: '0.2',
        25: '0.25',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        90: '0.9',
        95: '0.95',
        100: '1'
      }
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';
    
    // Helper function to handle nested color objects
    const generateColorClasses = (colorName, colorValue, prefix = '') => {
      if (typeof colorValue === 'string') {
        // Text color
        styles += `.text-${prefix}${colorName} { color: ${colorValue}; }\n`;
        // Background color
        styles += `.bg-${prefix}${colorName} { background-color: ${colorValue}; }\n`;
        // Border color
        styles += `.border-${prefix}${colorName} { border-color: ${colorValue}; }\n`;
        // Ring color (outline)
        styles += `.ring-${prefix}${colorName} { --tw-ring-color: ${colorValue}; }\n`;
        // Divide color
        styles += `.divide-${prefix}${colorName} > * + * { border-color: ${colorValue}; }\n`;
        // Placeholder color
        styles += `.placeholder-${prefix}${colorName}::placeholder { color: ${colorValue}; }\n`;
        
        // Generate opacity variants
        Object.entries(this.options.opacity).forEach(([opacityKey, opacityValue]) => {
          const rgbaColor = this.hexToRGBA(colorValue, opacityValue);
          styles += `.text-${prefix}${colorName}/${opacityKey} { color: ${rgbaColor}; }\n`;
          styles += `.bg-${prefix}${colorName}/${opacityKey} { background-color: ${rgbaColor}; }\n`;
          styles += `.border-${prefix}${colorName}/${opacityKey} { border-color: ${rgbaColor}; }\n`;
          styles += `.ring-${prefix}${colorName}/${opacityKey} { --tw-ring-color: ${rgbaColor}; }\n`;
        });
      } else {
        // Handle nested color objects (like different shades)
        Object.entries(colorValue).forEach(([shade, value]) => {
          generateColorClasses(colorName, value, `${colorName}-${shade} `);
        });
      }
    };

    // Generate classes for all colors
    Object.entries(this.options.colors).forEach(([colorName, colorValue]) => {
      generateColorClasses(colorName, colorValue);
    });

    return styles;
  }

  // Helper function to convert hex to rgba
  hexToRGBA(hex, alpha) {
    if (hex === 'transparent') return 'transparent';
    if (hex === 'currentColor') return 'currentColor';
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
