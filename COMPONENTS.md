# NexCSS Components

## Table of Contents
- [Color System](#color-system)
- [Typography](#typography)
- [Layout](#layout)
- [Forms](#forms)
- [Buttons](#buttons)
- [Navigation](#navigation)
- [Cards](#cards)
- [Utilities](#utilities)

## Color System

### Slate
| Class | Hex | Preview |
|-------|-----|---------|
| slate-50 | #f8fafc | ![](https://via.placeholder.com/15/f8fafc/f8fafc.png) |
| slate-100 | #f1f5f9 | ![](https://via.placeholder.com/15/f1f5f9/f1f5f9.png) |
| slate-200 | #e2e8f0 | ![](https://via.placeholder.com/15/e2e8f0/e2e8f0.png) |
| slate-300 | #cbd5e1 | ![](https://via.placeholder.com/15/cbd5e1/cbd5e1.png) |
| slate-400 | #94a3b8 | ![](https://via.placeholder.com/15/94a3b8/94a3b8.png) |
| slate-500 | #64748b | ![](https://via.placeholder.com/15/64748b/64748b.png) |
| slate-600 | #475569 | ![](https://via.placeholder.com/15/475569/475569.png) |
| slate-700 | #334155 | ![](https://via.placeholder.com/15/334155/334155.png) |
| slate-800 | #1e293b | ![](https://via.placeholder.com/15/1e293b/1e293b.png) |
| slate-900 | #0f172a | ![](https://via.placeholder.com/15/0f172a/0f172a.png) |
| slate-950 | #020617 | ![](https://via.placeholder.com/15/020617/020617.png) |

### Gray
| Class | Hex | Preview |
|-------|-----|---------|
| gray-50 | #f9fafb | ![](https://via.placeholder.com/15/f9fafb/f9fafb.png) |
| gray-100 | #f3f4f6 | ![](https://via.placeholder.com/15/f3f4f6/f3f4f6.png) |
| gray-200 | #e5e7eb | ![](https://via.placeholder.com/15/e5e7eb/e5e7eb.png) |
| gray-300 | #d1d5db | ![](https://via.placeholder.com/15/d1d5db/d1d5db.png) |
| gray-400 | #9ca3af | ![](https://via.placeholder.com/15/9ca3af/9ca3af.png) |
| gray-500 | #6b7280 | ![](https://via.placeholder.com/15/6b7280/6b7280.png) |
| gray-600 | #4b5563 | ![](https://via.placeholder.com/15/4b5563/4b5563.png) |
| gray-700 | #374151 | ![](https://via.placeholder.com/15/374151/374151.png) |
| gray-800 | #1f2937 | ![](https://via.placeholder.com/15/1f2937/1f2937.png) |
| gray-900 | #111827 | ![](https://via.placeholder.com/15/111827/111827.png) |
| gray-950 | #030712 | ![](https://via.placeholder.com/15/030712/030712.png) |

### Zinc
| Class | Hex | Preview |
|-------|-----|---------|
| zinc-50 | #fafafa | ![](https://via.placeholder.com/15/fafafa/fafafa.png) |
| zinc-100 | #f4f4f5 | ![](https://via.placeholder.com/15/f4f4f5/f4f4f5.png) |
| zinc-200 | #e4e4e7 | ![](https://via.placeholder.com/15/e4e4e7/e4e4e7.png) |
| zinc-300 | #d4d4d8 | ![](https://via.placeholder.com/15/d4d4d8/d4d4d8.png) |
| zinc-400 | #a1a1aa | ![](https://via.placeholder.com/15/a1a1aa/a1a1aa.png) |
| zinc-500 | #71717a | ![](https://via.placeholder.com/15/71717a/71717a.png) |
| zinc-600 | #52525b | ![](https://via.placeholder.com/15/52525b/52525b.png) |
| zinc-700 | #3f3f46 | ![](https://via.placeholder.com/15/3f3f46/3f3f46.png) |
| zinc-800 | #27272a | ![](https://via.placeholder.com/15/27272a/27272a.png) |
| zinc-900 | #18181b | ![](https://via.placeholder.com/15/18181b/18181b.png) |
| zinc-950 | #09090b | ![](https://via.placeholder.com/15/09090b/09090b.png) |

## Typography

### Font Sizes
| Class | Size | Example |
|-------|------|---------|
| text-xs | 0.75rem | <span style="font-size: 0.75rem">Extra Small Text</span> |
| text-sm | 0.875rem | <span style="font-size: 0.875rem">Small Text</span> |
| text-base | 1rem | <span style="font-size: 1rem">Base Text</span> |
| text-lg | 1.125rem | <span style="font-size: 1.125rem">Large Text</span> |
| text-xl | 1.25rem | <span style="font-size: 1.25rem">Extra Large Text</span> |
| text-2xl | 1.5rem | <span style="font-size: 1.5rem">2XL Text</span> |
| text-3xl | 1.875rem | <span style="font-size: 1.875rem">3XL Text</span> |
| text-4xl | 2.25rem | <span style="font-size: 2.25rem">4XL Text</span> |

### Font Weights
| Class | Weight |
|-------|--------|
| font-thin | 100 |
| font-light | 300 |
| font-normal | 400 |
| font-medium | 500 |
| font-semibold | 600 |
| font-bold | 700 |
| font-extrabold | 800 |
| font-black | 900 |

### Line Heights
| Class | Line Height |
|-------|-------------|
| leading-none | 1 |
| leading-tight | 1.25 |
| leading-snug | 1.375 |
| leading-normal | 1.5 |
| leading-relaxed | 1.625 |
| leading-loose | 2 |

## Layout

### Container
```html
<!-- Standard Container -->
<div class="container mx-auto px-4">
  <!-- Content -->
</div>

<!-- Container with max-width variants -->
<div class="container max-w-sm"><!-- Small container --></div>
<div class="container max-w-md"><!-- Medium container --></div>
<div class="container max-w-lg"><!-- Large container --></div>
<div class="container max-w-xl"><!-- Extra large container --></div>
```

### Grid System
```html
<!-- Basic Grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Responsive columns -->
</div>

<!-- Auto-fit Grid -->
<div class="grid grid-cols-auto-fit gap-4 min-w-[200px]">
  <!-- Auto-fitting columns -->
</div>
```

### Flexbox
```html
<!-- Basic Flex -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Flex with alignment -->
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</div>

<!-- Flex Column -->
<div class="flex flex-col space-y-4">
  <div>Top</div>
  <div>Middle</div>
  <div>Bottom</div>
</div>
```

## Forms

### Input Fields
```html
<!-- Basic Input -->
<input type="text" class="form-input px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">

<!-- With Label -->
<label class="block">
  <span class="text-gray-700">Username</span>
  <input type="text" class="form-input mt-1 block w-full rounded-md border-gray-300">
</label>

<!-- With Validation -->
<input type="email" class="form-input border-red-500 focus:border-red-500 focus:ring-red-500" aria-invalid="true">
<p class="mt-1 text-sm text-red-500">Please enter a valid email address</p>
```

### Select Menus
```html
<!-- Basic Select -->
<select class="form-select rounded-md border-gray-300">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Multiple Select -->
<select multiple class="form-multiselect rounded-md border-gray-300">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Checkboxes & Radio Buttons
```html
<!-- Checkbox -->
<label class="flex items-center">
  <input type="checkbox" class="form-checkbox rounded text-blue-500">
  <span class="ml-2">Remember me</span>
</label>

<!-- Radio -->
<div class="space-y-2">
  <label class="flex items-center">
    <input type="radio" class="form-radio text-blue-500" name="radio-group">
    <span class="ml-2">Option 1</span>
  </label>
  <label class="flex items-center">
    <input type="radio" class="form-radio text-blue-500" name="radio-group">
    <span class="ml-2">Option 2</span>
  </label>
</div>
```

## Buttons

### Basic Buttons
```html
<!-- Primary Button -->
<button class="btn-primary">
  Primary Button
</button>

<!-- Secondary Button -->
<button class="btn-secondary">
  Secondary Button
</button>

<!-- Outline Button -->
<button class="btn-outline">
  Outline Button
</button>
```

### Button Sizes
```html
<button class="btn-sm">Small Button</button>
<button class="btn">Default Button</button>
<button class="btn-lg">Large Button</button>
```

### Button States
```html
<button class="btn-primary hover:bg-blue-600">Hover State</button>
<button class="btn-primary active:bg-blue-700">Active State</button>
<button class="btn-primary focus:ring-2">Focus State</button>
<button class="btn-primary disabled:opacity-50" disabled>Disabled State</button>
```

## Navigation

### Navbar
```html
<nav class="bg-white shadow">
  <div class="container mx-auto px-4">
    <div class="flex justify-between h-16">
      <div class="flex">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          Logo
        </div>
        <!-- Navigation Links -->
        <div class="hidden md:ml-6 md:flex md:space-x-8">
          <a href="#" class="nav-link">Home</a>
          <a href="#" class="nav-link">About</a>
          <a href="#" class="nav-link">Contact</a>
        </div>
      </div>
    </div>
  </div>
</nav>
```

### Tabs
```html
<div class="border-b border-gray-200">
  <nav class="-mb-px flex space-x-8">
    <a href="#" class="tab-active">Active Tab</a>
    <a href="#" class="tab">Inactive Tab</a>
    <a href="#" class="tab">Another Tab</a>
  </nav>
</div>
```

## Cards

### Basic Card
```html
<div class="card">
  <div class="card-header">
    Card Header
  </div>
  <div class="card-body">
    Card Content
  </div>
  <div class="card-footer">
    Card Footer
  </div>
</div>
```

### Image Card
```html
<div class="card">
  <img src="image.jpg" class="card-img" alt="Card image">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card description text goes here.</p>
  </div>
</div>
```

## Utilities

### Spacing
| Class | Size |
|-------|------|
| p-0 | 0 |
| p-1 | 0.25rem |
| p-2 | 0.5rem |
| p-3 | 0.75rem |
| p-4 | 1rem |
| p-5 | 1.25rem |
| p-6 | 1.5rem |
| p-8 | 2rem |
| p-10 | 2.5rem |
| p-12 | 3rem |

### Margins work the same way:
- m-{size} for all sides
- mt-{size} for top
- mr-{size} for right
- mb-{size} for bottom
- ml-{size} for left
- mx-{size} for horizontal
- my-{size} for vertical

### Responsive Design
All utilities can be prefixed with responsive breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Example:
```html
<div class="text-sm md:text-base lg:text-lg">
  <!-- Text size changes at different breakpoints -->
</div>
```

### Dark Mode
Add `dark:` prefix to any utility class for dark mode styles:
```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <!-- Content adapts to dark mode -->
</div>
```
