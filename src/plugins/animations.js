import { NexCssPlugin } from './plugin-interface.js';

export class AnimationsPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('animations', options);
    
    this.defaults = {
      keyframes: {
        // Basic animations
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        'ping': {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' }
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        },
        'bounce': {
          '0%, 100%': { 
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },

        // Fade animations
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'fade-out': {
          'from': { opacity: '1' },
          'to': { opacity: '0' }
        },
        'fade-in-up': {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-down': {
          'from': { 
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-left': {
          'from': { 
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-in-right': {
          'from': { 
            opacity: '0',
            transform: 'translateX(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },

        // Slide animations
        'slide-in-up': {
          'from': { transform: 'translateY(100%)' },
          'to': { transform: 'translateY(0)' }
        },
        'slide-in-down': {
          'from': { transform: 'translateY(-100%)' },
          'to': { transform: 'translateY(0)' }
        },
        'slide-in-left': {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(0)' }
        },
        'slide-in-right': {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' }
        },

        // Scale animations
        'scale-in': {
          'from': { transform: 'scale(0)' },
          'to': { transform: 'scale(1)' }
        },
        'scale-out': {
          'from': { transform: 'scale(1)' },
          'to': { transform: 'scale(0)' }
        },
        'scale-in-up': {
          'from': { 
            transform: 'scale(0.95) translateY(10px)',
            opacity: '0'
          },
          'to': { 
            transform: 'scale(1) translateY(0)',
            opacity: '1'
          }
        },

        // Attention seekers
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'heartbeat': {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' }
        },
        'jello': {
          '0%, 11.1%, 100%': { transform: 'none' },
          '22.2%': { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
          '33.3%': { transform: 'skewX(6.25deg) skewY(6.25deg)' },
          '44.4%': { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
          '55.5%': { transform: 'skewX(1.5625deg) skewY(1.5625deg)' },
          '66.6%': { transform: 'skewX(-0.78125deg) skewY(-0.78125deg)' },
          '77.7%': { transform: 'skewX(0.390625deg) skewY(0.390625deg)' },
          '88.8%': { transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)' }
        },

        // Special effects
        'flip': {
          '0%': { transform: 'perspective(400px) rotateY(0)' },
          '100%': { transform: 'perspective(400px) rotateY(360deg)' }
        },
        'flip-x': {
          'from': { transform: 'perspective(400px) rotateX(0)' },
          'to': { transform: 'perspective(400px) rotateX(360deg)' }
        },
        'rubber-band': {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      durations: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
        2000: '2000ms',
        3000: '3000ms'
      },
      timingFunctions: {
        'linear': 'linear',
        'ease': 'ease',
        'ease-in': 'ease-in',
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'snappy': 'cubic-bezier(0.37, 0, 0.63, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'soft': 'cubic-bezier(0.4, 0, 0.6, 1)'
      },
      iterations: {
        '1': '1',
        '2': '2',
        '3': '3',
        '5': '5',
        'infinite': 'infinite'
      }
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';

    // Generate keyframes
    Object.entries(this.options.keyframes).forEach(([name, keyframe]) => {
      styles += `@keyframes ${name} {\n`;
      Object.entries(keyframe).forEach(([key, value]) => {
        styles += `  ${key} {\n`;
        Object.entries(value).forEach(([prop, val]) => {
          styles += `    ${prop}: ${val};\n`;
        });
        styles += '  }\n';
      });
      styles += '}\n\n';

      // Generate animation class
      styles += `.animate-${name} {\n`;
      styles += `  animation: ${name} 1s ease-in-out;\n`;
      styles += '}\n';
    });

    // Generate duration classes
    Object.entries(this.options.durations).forEach(([key, value]) => {
      styles += `.duration-${key} { animation-duration: ${value}; }\n`;
    });

    // Generate timing function classes
    Object.entries(this.options.timingFunctions).forEach(([key, value]) => {
      styles += `.ease-${key} { animation-timing-function: ${value}; }\n`;
    });

    // Generate iteration classes
    Object.entries(this.options.iterations).forEach(([key, value]) => {
      styles += `.iterate-${key} { animation-iteration-count: ${value}; }\n`;
    });

    // Animation direction classes
    const directions = {
      'normal': 'normal',
      'reverse': 'reverse',
      'alternate': 'alternate',
      'alternate-reverse': 'alternate-reverse'
    };

    Object.entries(directions).forEach(([key, value]) => {
      styles += `.direction-${key} { animation-direction: ${value}; }\n`;
    });

    // Animation fill mode classes
    const fillModes = {
      'none': 'none',
      'forwards': 'forwards',
      'backwards': 'backwards',
      'both': 'both'
    };

    Object.entries(fillModes).forEach(([key, value]) => {
      styles += `.fill-${key} { animation-fill-mode: ${value}; }\n`;
    });

    // Animation play state classes
    styles += '.running { animation-play-state: running; }\n';
    styles += '.paused { animation-play-state: paused; }\n';

    return styles;
  }
}
