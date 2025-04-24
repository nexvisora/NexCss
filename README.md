# NexCSS Framework 

A modern utility-first CSS framework inspired by Tailwind CSS, providing a comprehensive set of utilities for rapid web development.

## Features

- 🎨 Utility-First: Build modern websites without leaving your HTML
- 📱 Responsive Design: Mobile-first utilities for any screen size
- 🌙 Dark Mode: Built-in dark mode support
- ⚡ Performance: Minimal bundle size with tree-shaking support
- 🎯 Customizable: Easy to customize and extend

## Installation

```bash
npm install nexcss-framework
```npm install nexcss-framework postcss autoprefixer

## Quick Start

1. Create a PostCSS configuration file (postcss.config.js):

```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('nexcss-framework')({
      // Your configuration here
    })
  ]
};
```

2. Import NexCSS in your CSS file:

```css
@import 'nexcss-framework';

/* Your custom CSS here */
```

3. Use the utilities in your HTML:

```html
<div class="flex items-center justify-between p-4">
  <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
    Hello NexCSS
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

## Configuration

Customize your theme in the PostCSS configuration:

```javascript
module.exports = {
  plugins: [
    require('nexcss-framework')({
      theme: {
        colors: {
          primary: '#3490dc',
          secondary: '#ffed4a',
          // ...
        },
        spacing: {
          '1': '0.25rem',
          '2': '0.5rem',
          // ...
        },
        // ...
      },
      variants: {
        extend: {
          backgroundColor: ['hover', 'focus', 'dark'],
          // ...
        }
      }
    })
  ]
};
```

## Examples

Check out the `example` directory for a complete demo showcasing various utilities and components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
