// filepath: e:\LiveProject\NexCss\aerostyle.config.js
/** @type {import('./src/types').AeroStyleConfig} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      },
      // Add more color palettes here
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      // Add more spacing values
    },
    fontFamily: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      // Add more font sizes
    },
    animations: {
      // Animation configurations from AnimationsPlugin
      keyframes: {
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        // Add more keyframes
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
      },
    },
    darkMode: {
      strategy: 'class',
      className: 'dark',
      autoDetect: true,
    },
  },
  plugins: [
    'reset',
    'typography',
    'flexbox',
    'grid',
    'colors',
    'animations',
    'transitions',
    'dark-mode',
    'color-manipulation'
  ],
  // Plugin-specific configurations
  pluginOptions: {
    typography: {
      // Typography plugin options
    },
    darkMode: {
      // Dark mode plugin options
    },
    // Add more plugin configurations
  },
  // PostCSS options
  postcss: {
    autoprefixer: {
      // Autoprefixer options
    },
    'postcss-preset-env': {
      // PostCSS Preset Env options
    }
  }
};