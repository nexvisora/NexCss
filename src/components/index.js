/**
 * NexCSS Components
 * Main entry point for all components
 */

// Layout
export { containerStyles } from './layout/container';

// Buttons
export { buttonStyles } from './buttons/button';

// Forms
export { inputStyles } from './forms/input';

// Combine all styles
export const components = {
  ...containerStyles,
  ...buttonStyles,
  ...inputStyles,
};

// Default export
export default components;
