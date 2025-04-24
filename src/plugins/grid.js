import { NexCssPlugin } from './plugin-interface.js';

export class GridPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('grid', options);
    
    this.defaults = {
      gridColumns: 12,
      gridGap: {
        '0': '0px',
        '1': '0.25rem',
        '2': '0.5rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem'
      },
      gridTemplateColumns: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '12': '12'
      }
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';

    // Grid container
    styles += '.grid { display: grid; }\n';
    styles += '.inline-grid { display: inline-grid; }\n';

    // Grid template columns
    Object.entries(this.options.gridTemplateColumns).forEach(([key, value]) => {
      styles += `.grid-cols-${key} { grid-template-columns: repeat(${value}, minmax(0, 1fr)); }\n`;
    });

    // Grid column span
    for (let i = 1; i <= this.options.gridColumns; i++) {
      styles += `.col-span-${i} { grid-column: span ${i} / span ${i}; }\n`;
      styles += `.col-start-${i} { grid-column-start: ${i}; }\n`;
      styles += `.col-end-${i} { grid-column-end: ${i}; }\n`;
    }

    // Grid rows
    const rows = [1, 2, 3, 4, 5, 6];
    rows.forEach(row => {
      styles += `.grid-rows-${row} { grid-template-rows: repeat(${row}, minmax(0, 1fr)); }\n`;
      styles += `.row-span-${row} { grid-row: span ${row} / span ${row}; }\n`;
      styles += `.row-start-${row} { grid-row-start: ${row}; }\n`;
      styles += `.row-end-${row} { grid-row-end: ${row}; }\n`;
    });

    // Grid gap
    Object.entries(this.options.gridGap).forEach(([key, value]) => {
      styles += `.gap-${key} { gap: ${value}; }\n`;
      styles += `.gap-x-${key} { column-gap: ${value}; }\n`;
      styles += `.gap-y-${key} { row-gap: ${value}; }\n`;
    });

    // Grid flow
    const flows = ['row', 'col', 'row-dense', 'col-dense'];
    flows.forEach(flow => {
      styles += `.grid-flow-${flow} { grid-auto-flow: ${flow}; }\n`;
    });

    // Grid auto columns
    const autoSizes = ['auto', 'min', 'max', 'fr'];
    autoSizes.forEach(size => {
      styles += `.auto-cols-${size} { grid-auto-columns: ${size === 'fr' ? 'minmax(0, 1fr)' : size}; }\n`;
      styles += `.auto-rows-${size} { grid-auto-rows: ${size === 'fr' ? 'minmax(0, 1fr)' : size}; }\n`;
    });

    return styles;
  }
}
