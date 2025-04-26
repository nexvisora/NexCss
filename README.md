# AeroStyle Framework

A modern utility-first CSS framework inspired by Tailwind CSS, providing a comprehensive set of utilities for rapid web development.

[![npm version](https://img.shields.io/npm/v/AeroStyle.svg)](https://www.npmjs.com/package/AeroStyle)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 Utility-First: Build modern websites without leaving your HTML
- 📱 Responsive Design: Mobile-first utilities for any screen size
- 🌙 Dark Mode: Built-in dark mode support
- ⚡ Performance: Minimal bundle size with tree-shaking support
- 🎯 Customizable: Easy to customize and extend
- 🔌 Plugin System: Extend functionality with plugins
- 🚀 Framework Integration: Works with React, Vue, Svelte, and more

## Installation

```bash
npm install AeroStyle
```

Or with Yarn:

```bash
yarn add AeroStyle
```

Make sure to install the peer dependencies:

```bash
npm install postcss autoprefixer --save-dev
```

## Quick Start

1. Create a PostCSS configuration file (postcss.config.js):

```javascript
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("AeroStyle")({
      // Your configuration here
    }),
  ],
};
```

2. Import AeroStyle in your CSS file:

```css
@import "AeroStyle";

/* Your custom CSS here */
```

3. Use the utilities in your HTML:

```html
<div class="flex items-center justify-between p-4">
  <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
    Hello AeroStyle
  </h1>
  <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
    Click me
  </button>
</div>
```

## Available Utilities

### Layout

- Flexbox: `flex`, `items-center`, `justify-between`, etc.
- Grid: `grid`, `grid-cols-{1-12}`, `col-span-{1-12}`
- Spacing: `p-{size}`, `m-{size}`, `gap-{size}`
- Sizing: `w-{size}`, `h-{size}`, `max-w-{size}`

### Typography

- Font Size: `text-xs` to `text-4xl`
- Font Weight: `font-thin` to `font-extrabold`
- Text Color: `text-{color}`
- Text Alignment: `text-left`, `text-center`, `text-right`

### Colors

- Background: `bg-{color}`
- Text: `text-{color}`
- Border: `border-{color}`

### Responsive Design

Prefix any utility with a breakpoint:

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

Example:

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Content -->
</div>
```

### Dark Mode

Prefix utilities with `dark:` for dark mode styles:

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <!-- Content -->
</div>
```

## Framework Integration

AeroStyle works seamlessly with modern JavaScript frameworks:

### React/Next.js

```jsx
// pages/_app.js or App.js
import "AeroStyle/css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### Vue/Nuxt.js

```js
// nuxt.config.js
export default {
  css: ["AeroStyle/css"],
};
```

### SvelteKit

```js
// app.html
<link rel="stylesheet" href="node_modules/AeroStyle/dist/index.css">
```

## CLI Usage

AeroStyle comes with a command-line interface for common tasks:

```bash
# Initialize a new AeroStyle configuration
npx aerostyle init

# Generate custom utility classes
npx aerostyle generate
```

## Configuration

Customize your theme in the PostCSS configuration:

```javascript
module.exports = {
  plugins: [
    require("AeroStyle")({
      theme: {
        colors: {
          primary: "#3490dc",
          secondary: "#ffed4a",
          // ...
        },
        spacing: {
          1: "0.25rem",
          2: "0.5rem",
          // ...
        },
        // ...
      },
      variants: {
        extend: {
          backgroundColor: ["hover", "focus", "dark"],
          // ...
        },
      },
    }),
  ],
};
```

## Examples

Check out the `examples` directory for complete demos showcasing various utilities and components:

- Basic usage
- React/Next.js integration
- Vue/Nuxt integration
- SvelteKit integration

## Components

AeroStyle includes a growing collection of common components. See [COMPONENTS.md](COMPONENTS.md) for details.

## Plugin System

Extend AeroStyle with custom plugins:

```javascript
// my-plugin.js
module.exports = function (options) {
  return {
    name: "my-custom-plugin",
    utilities: {
      ".custom-utility": {
        property: "value",
      },
    },
  };
};

// postcss.config.js
const myPlugin = require("./my-plugin");

module.exports = {
  plugins: [
    require("AeroStyle")({
      plugins: [
        myPlugin({
          /* options */
        }),
      ],
    }),
  ],
};
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## CI/CD and Publishing

AeroStyle uses GitHub Actions for CI/CD:

- Continuous Integration: All PRs and commits to main branch are tested
- Automatic Publishing: New versions are automatically published to npm when a GitHub release is created

## Browser Support

AeroStyle supports all modern browsers:

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT
