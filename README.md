# NexCSS

[![npm version](https://badge.fury.io/js/nexcss.svg)](https://badge.fury.io/js/nexcss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/nexcss.svg)](https://www.npmjs.com/package/nexcss)

A modern utility-first CSS framework with advanced features and framework integration.

## Key Features

- **Utility-First:** Write styles directly in your markup with atomic classes
- **Performance:** Zero runtime overhead, only ship what you use
- **Extensible:** Robust plugin system for custom functionality
- **Dark Mode:** Built-in dark mode support with easy toggles
- **Responsive:** Mobile-first design with intuitive breakpoints
- **Animations:** Rich set of pre-built animations and transitions
- **Developer Experience:** Comprehensive tooling and IDE support
- **Modern CSS:** Leverages latest CSS features via PostCSS

## Why NexCSS?

- **Modern & Lightweight:** Built for modern web development without bloat
- **Framework Agnostic:** Works with any JavaScript framework or vanilla HTML
- **Developer First:** Excellent documentation and developer experience
- **Community Driven:** Active community and regular updates

## Installation

### Method 1: NPM (Recommended)
```bash
# Create a new project directory and initialize
mkdir my-nexcss-project
cd my-nexcss-project
npm init -y

# Install NexCSS and its dependencies
npm install nexcss-framework postcss postcss-cli --save-dev
```

### Method 2: CDN
```html
<link href="https://unpkg.com/nexcss-framework@latest/dist/nexcss.min.css" rel="stylesheet">
```

## Usage

### 1. Initialize NexCSS
```bash
npx nexcss init
```

### 2. Configure NexCSS
Create or update `nexcss.config.js`:

```javascript
/** @type {import('nexcss-framework').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      // Your custom theme extensions
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media'
}
```

### 3. Set up your CSS
Create a `styles.css` file:

```css
/* Import NexCSS core styles */
@import 'nexcss-framework/base';
@import 'nexcss-framework/components';
@import 'nexcss-framework/utilities';

/* Your custom styles here */
```

### 4. Use in your HTML/JavaScript

```html
<!-- HTML Example -->
<div class="container mx-auto p-4">
  <h1 class="text-4xl font-bold text-primary dark:text-white">
    Hello NexCSS!
  </h1>
  <p class="mt-2 text-gray-600 dark:text-gray-300">
    Start building with utility classes
  </p>
</div>
```

```javascript
// React Example
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-primary dark:text-white">
          Hello NexCSS!
        </h1>
      </div>
    </div>
  );
}
```

### 5. Build Process
Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build:css": "postcss styles.css -o dist/styles.css",
    "watch:css": "postcss styles.css -o dist/styles.css --watch"
  }
}
```

Run the build:
```bash
npm run build:css
```

