/**
 * Input Component
 * Provides styled form input elements
 */

export const inputStyles = {
  '.form-input': {
    display: 'block',
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--gray-900)',
    backgroundColor: 'white',
    borderWidth: '1px',
    borderColor: 'var(--gray-300)',
    borderRadius: '0.375rem',
    transition: 'all 150ms ease-in-out',
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--primary-500)',
      ringWidth: '1px',
      ringColor: 'var(--primary-500)',
    },
    '&::placeholder': {
      color: 'var(--gray-400)',
    },
    '&:disabled': {
      backgroundColor: 'var(--gray-50)',
      cursor: 'not-allowed',
    },
  },
  '.form-label': {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--gray-700)',
  },
};
