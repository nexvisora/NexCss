// filepath: e:\LiveProject\NexCss\aerocss.config.js
module.exports = {
  theme: {
    colors: {
      primary: '#3490dc',
      secondary: '#ffed4a',
      success: '#38c172',
      danger: '#e3342f',
      warning: '#f6993f',
      info: '#6574cd',
    },
    spacing: {
      'auto': 'auto',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '6': '1.5rem',
      '8': '2rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
    },
    // Additional theme configurations
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus', 'dark'],
      textColor: ['hover', 'focus', 'dark'],
      borderColor: ['hover', 'focus'],
      opacity: ['hover', 'focus', 'disabled'],
    }
  },
  plugins: [],
  // Tell the AeroCSS CLI about this configuration
  cliName: 'aerocss'
}