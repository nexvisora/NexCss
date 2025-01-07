/**
 * Container Component
 * Provides a centered, max-width container with responsive padding
 */

export const containerStyles = {
  '.container': {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    '@screen sm': {
      maxWidth: '640px',
    },
    '@screen md': {
      maxWidth: '768px',
    },
    '@screen lg': {
      maxWidth: '1024px',
    },
    '@screen xl': {
      maxWidth: '1280px',
    },
    '@screen 2xl': {
      maxWidth: '1536px',
    },
  },
  '.container-fluid': {
    width: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  }
};
