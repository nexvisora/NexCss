import { NexCssPlugin } from './plugin-interface.js';

export class TransitionsPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('transitions', options);
    
    this.defaults = {
      durations: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms'
      },
      timingFunctions: {
        'linear': 'linear',
        'ease': 'ease',
        'ease-in': 'ease-in',
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out'
      },
      properties: {
        'none': 'none',
        'all': 'all',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform'
      }
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';

    // Transition property
    Object.entries(this.options.properties).forEach(([key, value]) => {
      styles += `.transition-${key} { transition-property: ${value}; }\n`;
    });

    // Transition duration
    Object.entries(this.options.durations).forEach(([key, value]) => {
      styles += `.duration-${key} { transition-duration: ${value}; }\n`;
    });

    // Transition timing function
    Object.entries(this.options.timingFunctions).forEach(([key, value]) => {
      styles += `.ease-${key} { transition-timing-function: ${value}; }\n`;
    });

    // Transition delay
    Object.entries(this.options.durations).forEach(([key, value]) => {
      styles += `.delay-${key} { transition-delay: ${value}; }\n`;
    });

    // Transform utilities
    styles += '.scale-0 { transform: scale(0); }\n';
    styles += '.scale-50 { transform: scale(.5); }\n';
    styles += '.scale-75 { transform: scale(.75); }\n';
    styles += '.scale-90 { transform: scale(.9); }\n';
    styles += '.scale-100 { transform: scale(1); }\n';
    styles += '.scale-110 { transform: scale(1.1); }\n';
    styles += '.scale-125 { transform: scale(1.25); }\n';
    styles += '.scale-150 { transform: scale(1.5); }\n';

    // Rotate utilities
    [-180, -90, -45, 0, 45, 90, 180].forEach(deg => {
      styles += `.rotate-${deg} { transform: rotate(${deg}deg); }\n`;
    });

    // Translate utilities
    const translations = {
      '0': '0px',
      '1': '0.25rem',
      '2': '0.5rem',
      '4': '1rem',
      '8': '2rem',
      '16': '4rem'
    };

    Object.entries(translations).forEach(([key, value]) => {
      styles += `.translate-x-${key} { transform: translateX(${value}); }\n`;
      styles += `.translate-y-${key} { transform: translateY(${value}); }\n`;
      styles += `.translate-x-${key}-neg { transform: translateX(-${value}); }\n`;
      styles += `.translate-y-${key}-neg { transform: translateY(-${value}); }\n`;
    });

    return styles;
  }
}
