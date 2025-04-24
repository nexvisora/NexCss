import { NexCssPlugin } from './plugin-interface.js';

export class DarkModePlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('dark-mode', options);
    
    this.defaults = {
      strategy: 'class', // 'class' or 'media'
      className: 'dark',
      autoDetect: true,
      variables: {
        colors: {
          // Background colors
          'bg-primary': '#1a1a1a',
          'bg-secondary': '#2d2d2d',
          'bg-tertiary': '#404040',
          
          // Text colors
          'text-primary': '#ffffff',
          'text-secondary': '#a3a3a3',
          'text-tertiary': '#737373',
          
          // Border colors
          'border-primary': '#404040',
          'border-secondary': '#525252',
          
          // Action colors
          'action-primary': '#3b82f6',
          'action-secondary': '#6b7280',
          'action-success': '#22c55e',
          'action-danger': '#ef4444',
          'action-warning': '#eab308'
        },
        shadows: {
          'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
          'shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)',
          'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
          'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)'
        }
      }
    };
    
    this.options = this.mergeOptions(this.defaults);
  }

  generateClasses() {
    let styles = '';
    const { strategy, className, variables } = this.options;

    // Define dark mode selector based on strategy
    const darkModeSelector = strategy === 'class' 
      ? `.${className}`
      : '@media (prefers-color-scheme: dark)';

    // Generate CSS variables for light mode
    styles += ':root {\n';
    Object.entries(variables).forEach(([category, values]) => {
      Object.entries(values).forEach(([name, value]) => {
        styles += `  --${name}: ${value};\n`;
      });
    });
    styles += '}\n\n';

    // Generate dark mode styles
    styles += `${darkModeSelector} {\n`;
    
    // CSS Variables
    Object.entries(variables).forEach(([category, values]) => {
      Object.entries(values).forEach(([name, value]) => {
        styles += `  --${name}: ${value};\n`;
      });
    });

    // Background colors
    styles += `
  .bg-primary { background-color: var(--bg-primary); }
  .bg-secondary { background-color: var(--bg-secondary); }
  .bg-tertiary { background-color: var(--bg-tertiary); }

  /* Text colors */
  .text-primary { color: var(--text-primary); }
  .text-secondary { color: var(--text-secondary); }
  .text-tertiary { color: var(--text-tertiary); }

  /* Border colors */
  .border-primary { border-color: var(--border-primary); }
  .border-secondary { border-color: var(--border-secondary); }

  /* Action colors */
  .action-primary { background-color: var(--action-primary); }
  .action-secondary { background-color: var(--action-secondary); }
  .action-success { background-color: var(--action-success); }
  .action-danger { background-color: var(--action-danger); }
  .action-warning { background-color: var(--action-warning); }

  /* Shadows */
  .shadow-sm { box-shadow: var(--shadow-sm); }
  .shadow { box-shadow: var(--shadow); }
  .shadow-md { box-shadow: var(--shadow-md); }
  .shadow-lg { box-shadow: var(--shadow-lg); }
`;

    styles += '}\n\n';

    // Generate dark mode toggle utilities
    if (strategy === 'class') {
      styles += `
/* Dark mode toggle utilities */
.dark-mode-toggle {
  cursor: pointer;
  user-select: none;
}

[data-dark-mode="true"] {
  display: none;
}

.${className} [data-dark-mode="true"] {
  display: block;
}

.${className} [data-dark-mode="false"] {
  display: none;
}

/* Transition utilities for dark mode */
.transition-dark-mode * {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
`;
    }

    // Auto detection script
    if (this.options.autoDetect && strategy === 'class') {
      styles += `
/* Dark mode auto detection */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    color-scheme: dark;
  }
  
  :root:not(.light) body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
}
`;
    }

    return styles;
  }

  // Method to inject dark mode toggle script
  injectScript() {
    return `
// Dark mode toggle functionality
function toggleDarkMode() {
  document.documentElement.classList.toggle('${this.options.className}');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('${this.options.className}'));
}

// Initialize dark mode from localStorage or system preference
function initDarkMode() {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.documentElement.classList.add('${this.options.className}');
  } else if (darkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('${this.options.className}');
  }
}

// Listen for system dark mode changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.getItem('darkMode') === null) {
    document.documentElement.classList.toggle('${this.options.className}', e.matches);
  }
});

// Initialize dark mode
initDarkMode();
`;
  }
}
