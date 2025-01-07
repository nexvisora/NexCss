import { createPlugin } from '../plugin-system.js';

export default createPlugin('responsive-images', {
  init(options = {}) {
    this.options = {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      sizes: {
        'xs': '320w',
        'sm': '640w',
        'md': '768w',
        'lg': '1024w',
        'xl': '1280w',
        '2xl': '1536w',
        'full': '100vw'
      },
      formats: ['webp', 'avif', 'jpg'],
      loading: 'lazy',
      decoding: 'async',
      ...options
    };
  },

  generateClasses(config) {
    let css = '';

    // Base responsive image styles
    css += `
.img-responsive {
  max-width: 100%;
  height: auto;
}

.img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-contain {
  object-fit: contain;
}

.img-fill {
  object-fit: fill;
}

.img-scale-down {
  object-fit: scale-down;
}

/* Aspect ratios */
.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-portrait {
  aspect-ratio: 3 / 4;
}

/* Responsive containers */
.img-container {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
}

.img-container > img,
.img-container > picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Aspect ratio containers */
${Object.entries(this.options.sizes).map(([size, width]) => `
.aspect-${size} {
  padding-bottom: calc(100% * 9 / 16); /* 16:9 default ratio */
}
`).join('\n')}

/* Loading states */
.img-loading {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.img-loaded {
  opacity: 1;
}

/* Blur-up effect */
.img-blur-up {
  filter: blur(5px);
  transition: filter 0.3s ease-in-out;
}

.img-blur-up.img-loaded {
  filter: blur(0);
}

/* Background image utilities */
.bg-responsive {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-contain {
  background-size: contain;
}

/* Responsive background images */
${Object.entries(this.options.breakpoints).map(([breakpoint, width]) => `
@media (min-width: ${width}) {
  .bg-${breakpoint}-cover {
    background-size: cover;
  }
  
  .bg-${breakpoint}-contain {
    background-size: contain;
  }
}
`).join('\n')}
`;

    return css;
  },

  // Example HTML generation helper
  generateResponsiveImage(src, alt, options = {}) {
    const {
      sizes = Object.values(this.options.sizes),
      formats = this.options.formats,
      loading = this.options.loading,
      decoding = this.options.decoding,
      className = 'img-responsive'
    } = options;

    const generateSrcSet = (format) => {
      return sizes
        .map(size => `${src.replace(/\.\w+$/, '')}-${size}.${format} ${size}`)
        .join(', ');
    };

    return `
<picture>
  ${formats.map(format => `
  <source
    type="image/${format}"
    srcset="${generateSrcSet(format)}"
    sizes="${options.sizes || '100vw'}"
  >`).join('\n  ')}
  
  <img
    src="${src}"
    alt="${alt}"
    loading="${loading}"
    decoding="${decoding}"
    class="${className}"
    ${options.width ? `width="${options.width}"` : ''}
    ${options.height ? `height="${options.height}"` : ''}
  >
</picture>`;
  }
});
