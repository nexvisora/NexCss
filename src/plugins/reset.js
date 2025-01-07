import { NexCssPlugin } from './plugin-interface.js';

export class ResetPlugin extends NexCssPlugin {
  constructor(options = {}) {
    super('reset', options);
  }

  generateClasses() {
    return `
/* Modern CSS Reset */

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Remove default margin and padding */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Make images easier to work with */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* Remove built-in form typography styles */
input,
button,
textarea,
select {
  font: inherit;
}

/* Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Remove default button styles */
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

/* Remove default anchor styles */
a {
  text-decoration: none;
  color: inherit;
}

/* Remove default table spacing */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* Modern form reset */
input,
textarea {
  appearance: none;
  border-radius: 0;
}

/* Remove default fieldset styles */
fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

/* Remove default details marker */
details summary {
  cursor: pointer;
}

details summary::-webkit-details-marker {
  display: none;
}

/* Remove tap highlight on mobile */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Improve text rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;
  }
}
