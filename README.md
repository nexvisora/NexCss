# NexCSS

[![npm version](https://badge.fury.io/js/nexcss.svg)](https://badge.fury.io/js/nexcss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/nexcss.svg)](https://www.npmjs.com/package/nexcss)

A modern utility-first CSS framework with advanced features and framework integration.

## Key Features

- 🎨 **Utility-First:** Write styles directly in your markup with atomic classes
- 🚀 **Performance:** Zero runtime overhead, only ship what you use
- 🔌 **Extensible:** Robust plugin system for custom functionality
- 🌙 **Dark Mode:** Built-in dark mode support with easy toggles
- 📱 **Responsive:** Mobile-first design with intuitive breakpoints
- 🎭 **Animations:** Rich set of pre-built animations and transitions
- 🔧 **Developer Experience:** Comprehensive tooling and IDE support
- 📦 **Modern CSS:** Leverages latest CSS features via PostCSS

## Why NexCSS?

- **Modern & Lightweight:** Built for modern web development without bloat
- **Framework Agnostic:** Works with any JavaScript framework or vanilla HTML
- **Developer First:** Excellent documentation and developer experience
- **Community Driven:** Active community and regular updates

## Installation

```bash
# Using npm
npm install nexcss

# Using yarn
yarn add nexcss

# Using pnpm
pnpm add nexcss

<link href="https://unpkg.com/nexcss@latest/dist/nexcss.min.css" rel="stylesheet">


Quick Start
Initialize your project:

npx nexcss init

Configure your template paths in nexcss.config.js:

/** @type {import('nexcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

Add NexCSS to your CSS:
@nexcss base;
@nexcss components;
@nexcss utilities;

Start using NexCSS in your project:

export default function Example() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Hello NexCSS!
      </h1>
    </div>
  );
}