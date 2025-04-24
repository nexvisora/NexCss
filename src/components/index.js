/**
 * NexCSS Components
 * Main entry point for all components
 */

// Layout
import { containerStyles } from './container';
export { containerStyles };

// Buttons
import { buttonStyles } from './button';
export { buttonStyles };

// Forms
import { inputStyles } from './input';
export { inputStyles };

// Combine all styles
export const components = {
  ...containerStyles,
  ...buttonStyles,
  ...inputStyles,
};

// Default export
export default components;

class ComponentSystem {
  constructor() {
    this.components = new Map();
  }

  register(name, component) {
    this.components.set(name, component);
  }

  generateStyles() {
    return `
      ${containerStyles}
      ${buttonStyles}
      ${inputStyles}
    `;
  }
}

export { ComponentSystem };
