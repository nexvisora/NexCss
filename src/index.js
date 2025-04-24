import postcss from 'postcss';
import { generateUtilityClasses, createResponsiveClasses, generateDarkModeClasses, generateHoverClasses } from './utilities.js';
import { config } from './config.js';

// Main PostCSS plugin
const nexcss = (options = {}) => {
  // Merge user options with default config
  const finalConfig = {
    ...config,
    ...options
  };

  return {
    postcssPlugin: 'nexcss',
    Once(root) {
      // Generate base utilities
      const baseUtilities = generateUtilityClasses();
      
      // Generate responsive variants
      const withResponsive = createResponsiveClasses(baseUtilities);
      
      // Generate dark mode variants
      const withDarkMode = generateDarkModeClasses(withResponsive);
      
      // Generate hover variants
      const withHover = generateHoverClasses(withDarkMode);
      
      // Parse and append the generated CSS
      const generatedCSS = postcss.parse(withHover);
      root.append(generatedCSS);
    }
  };
};

nexcss.postcss = true;

// Export the plugin
export default nexcss;
