import { NexCssPlugin } from './plugin-interface.js';

export class FlexboxPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('flexbox', options);
    
    this.defaults = {
      variants: ['sm', 'md', 'lg', 'xl']
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';

    // Flex container
    styles += '.flex { display: flex; }\n';
    styles += '.inline-flex { display: inline-flex; }\n';

    // Flex direction
    const directions = {
      'row': 'row',
      'row-reverse': 'row-reverse',
      'col': 'column',
      'col-reverse': 'column-reverse'
    };

    Object.entries(directions).forEach(([key, value]) => {
      styles += `.flex-${key} { flex-direction: ${value}; }\n`;
    });

    // Flex wrap
    const wraps = {
      'wrap': 'wrap',
      'wrap-reverse': 'wrap-reverse',
      'nowrap': 'nowrap'
    };

    Object.entries(wraps).forEach(([key, value]) => {
      styles += `.flex-${key} { flex-wrap: ${value}; }\n`;
    });

    // Justify content
    const justify = {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'between': 'space-between',
      'around': 'space-around',
      'evenly': 'space-evenly'
    };

    Object.entries(justify).forEach(([key, value]) => {
      styles += `.justify-${key} { justify-content: ${value}; }\n`;
    });

    // Align items
    const alignItems = {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'baseline': 'baseline',
      'stretch': 'stretch'
    };

    Object.entries(alignItems).forEach(([key, value]) => {
      styles += `.items-${key} { align-items: ${value}; }\n`;
    });

    // Flex grow & shrink
    [0, 1].forEach(value => {
      styles += `.flex-grow-${value} { flex-grow: ${value}; }\n`;
      styles += `.flex-shrink-${value} { flex-shrink: ${value}; }\n`;
    });

    return styles;
  }
}
