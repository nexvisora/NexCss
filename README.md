# NexCSS Framework 🎨

<div align="center">
  <img src="assets/nexcss-logo.png" alt="NexCSS Logo" width="200">
  <p><em>The Next Evolution of Utility-First CSS</em></p>
</div>

[![npm version](https://img.shields.io/npm/v/nexcss-framework.svg)](https://www.npmjs.com/package/nexcss-framework)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/nexcss-framework.svg)](https://www.npmjs.com/package/nexcss-framework)
[![GitHub stars](https://img.shields.io/github/stars/nexcss/nexcss.svg)](https://github.com/nexcss/nexcss/stargazers)
[![Build Status](https://github.com/nexcss/nexcss/workflows/CI/badge.svg)](https://github.com/nexcss/nexcss/actions)

## 🚀 What's New in v1.1.0

### ✨ Major Features

#### 🎯 Border Radius System
Advanced border radius utilities with logical properties and individual corner control.

```html
<!-- Modern border radius system -->
<div class="rounded-lg hover:rounded-none transition-radius">
  Animated corners
</div>

<!-- Logical properties for RTL support -->
<div class="rounded-s-lg rounded-e-sm">
  RTL-aware corners
</div>

<!-- Individual corner control -->
<div class="rounded-tl-xl rounded-br-xl">
  Diagonal corners
</div>
```

#### 🌫️ Advanced Blur Effects
Comprehensive blur utilities with backdrop support and performance optimizations.

```html
<!-- Dynamic blur effects -->
<div class="blur-sm hover:blur-none transition-all">
  Hover to focus
</div>

<!-- Glass morphism -->
<div class="backdrop-blur-md bg-white/30">
  <h2 class="text-shadow-sm">Frosted Glass</h2>
</div>

<!-- Performance optimized -->
<div class="blur-sm will-change-transform">
  Optimized rendering
</div>
```

#### 🎭 Arbitrary Values & CSS Variables
Powerful arbitrary value system with type safety and dynamic variables.

```html
<!-- Type-safe arbitrary values -->
<div class="[--custom-color:theme(colors.blue.500)]">
  Theme-aware variables
</div>

<!-- Complex animations -->
<div class="[animation:bounce_2s_ease-in-out_infinite]">
  Custom animation
</div>

<!-- Responsive design system -->
<div class="[--cols:1] md:[--cols:2] lg:[--cols:3]"
     style="grid-template-columns: repeat(var(--cols), minmax(0, 1fr))">
  Responsive grid
</div>
```

### 🛠️ Advanced Features

#### 🎨 Color Management
```html
<!-- Advanced color utilities -->
<div class="text-[color:var(--brand)] hover:text-[color:var(--brand-hover)]">
  Dynamic branding
</div>

<!-- Color mixing -->
<div class="bg-[color-mix(in_srgb,var(--primary)_70%,var(--accent))]">
  Blended colors
</div>
```

#### 📱 Responsive Design
```html
<!-- Container queries -->
<div class="@container">
  <div class="@lg:text-2xl @sm:text-base">
    Container-based sizing
  </div>
</div>

<!-- Advanced breakpoints -->
<div class="sm:hidden md:(grid grid-cols-2) lg:(grid grid-cols-3)">
  Progressive enhancement
</div>
```

#### 🌙 Dark Mode
```html
<!-- System preference -->
<div class="dark:bg-gray-900 dark:text-white">
  Automatic dark mode
</div>

<!-- Custom color schemes -->
<div class="light:bg-[#fafafa] dark:bg-[#0a0a0a]">
  Theme variants
</div>
```

## 🔧 Installation

### Using npm (Recommended)
```bash
npm install nexcss-framework
```

### Advanced Configuration
```javascript
// nexcss.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--brand-color)',
          hover: 'var(--brand-hover)',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@nexcss/typography'),
    require('@nexcss/forms'),
    require('@nexcss/animations'),
  ],
}
```

## 🎯 Usage Examples

### Advanced Components
```html
<!-- Card with hover effects -->
<div class="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
  <div class="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20"></div>
  <div class="relative p-6">
    <h3 class="text-white text-xl font-bold">Interactive Card</h3>
    <p class="text-white/80">With gradient and overlay</p>
  </div>
</div>

<!-- Advanced form styling -->
<form class="space-y-4 [&_input]:rounded-lg [&_input]:border-gray-300 [&_input:focus]:ring-2">
  <input type="text" class="w-full px-4 py-2 transition-shadow" />
  <button class="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
    Submit
  </button>
</form>
```

### Performance Optimizations
```html
<!-- Optimized animations -->
<div class="animate-[slide-in_0.5s_ease-out] will-change-transform">
  <div class="content-visibility-auto">
    Optimized content
  </div>
</div>
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Generate documentation
npm run docs
```

## 📚 Documentation

Visit our [comprehensive documentation](https://docs.nexcss.com) for:
- Advanced tutorials
- API reference
- Best practices
- Performance guides
- Migration guides

## 🤝 Contributing

We love your input! Check out our [Contributing Guide](CONTRIBUTING.md) for ways to get started.

## 📄 License

MIT © [NexCSS Team](LICENSE)

## 💬 Community

- [Discord](https://discord.gg/nexcss)
- [Twitter](https://twitter.com/nexcss)
- [GitHub Discussions](https://github.com/nexcss/nexcss/discussions)

---

<div align="center">
  <p>Built with ❤️ by the NexCSS Team</p>
  <p>
    <a href="https://github.com/sponsors/nexcss">Support NexCSS</a> •
    <a href="https://nexcss.com/blog">Blog</a> •
    <a href="https://nexcss.com/showcase">Showcase</a>
  </p>
</div>
