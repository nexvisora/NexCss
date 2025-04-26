module.exports = {
  plugins: [
    require('autoprefixer'),
    require('./dist/index.js')({
      // NexCSS configuration inspired by TailwindCSS
      theme: {
        colors: {
          primary: '#3490dc',
          secondary: '#ffed4a',
          danger: '#e3342f',
          success: '#38c172',
          warning: '#f6993f',
          info: '#6574cd',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        spacing: {
          0: '0',
          1: '0.25rem',
          2: '0.5rem',
          3: '0.75rem',
          4: '1rem',
          5: '1.25rem',
          6: '1.5rem',
          8: '2rem',
          10: '2.5rem',
          12: '3rem',
          16: '4rem',
        },
        fontFamily: {
          sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
          serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
          mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        }
      },
      variants: {
        extend: {
          backgroundColor: ['active', 'hover', 'focus', 'dark'],
          textColor: ['active', 'hover', 'focus', 'dark'],
          borderColor: ['focus', 'hover', 'dark'],
          opacity: ['disabled', 'hover', 'focus']
        }
      },
      plugins: [],
      // Control which utilities are generated
      corePlugins: {
        // Configure core plugins if needed
      }
    })
  ]
};
