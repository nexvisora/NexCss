/**
 * Button Component
 * Provides styled button variants with different states
 */

export const buttonStyles = {
  '.btn': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    borderRadius: '0.375rem',
    transition: 'all 150ms ease-in-out',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
      ringWidth: '2px',
      ringOffset: '2px',
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  '.btn-primary': {
    backgroundColor: 'var(--primary-500)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'var(--primary-600)',
    },
    '&:active': {
      backgroundColor: 'var(--primary-700)',
    },
  },
  '.btn-secondary': {
    backgroundColor: 'var(--gray-500)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'var(--gray-600)',
    },
    '&:active': {
      backgroundColor: 'var(--gray-700)',
    },
  },
  '.btn-outline': {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderColor: 'var(--primary-500)',
    color: 'var(--primary-500)',
    '&:hover': {
      backgroundColor: 'var(--primary-50)',
    },
    '&:active': {
      backgroundColor: 'var(--primary-100)',
    },
  },
};
