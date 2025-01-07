## Components

### Color System

NexCSS provides a sophisticated color system with semantic naming and consistent scaling:

#### Slate
```css
--slate-50:  #f8fafc;  /* Lightest */
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a;
--slate-950: #020617;  /* Darkest */
```

#### Gray
```css
--gray-50:  #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
--gray-950: #030712;
```

#### Zinc
```css
--zinc-50:  #fafafa;
--zinc-100: #f4f4f5;
--zinc-200: #e4e4e7;
--zinc-300: #d4d4d8;
--zinc-400: #a1a1aa;
--zinc-500: #71717a;
--zinc-600: #52525b;
--zinc-700: #3f3f46;
--zinc-800: #27272a;
--zinc-900: #18181b;
--zinc-950: #09090b;
```

### Using Colors

```html
<!-- Background Colors -->
<div class="bg-slate-100">Light slate background</div>
<div class="bg-gray-900">Dark gray background</div>

<!-- Text Colors -->
<p class="text-zinc-700">Zinc colored text</p>
<p class="text-slate-500">Slate colored text</p>

<!-- Border Colors -->
<div class="border-2 border-gray-300">Gray bordered box</div>

<!-- Hover States -->
<button class="bg-slate-600 hover:bg-slate-700">
  Hover Effect Button
</button>

<!-- Dark Mode -->
<div class="text-gray-900 dark:text-gray-100">
  Auto-adjusting text color
</div>
```

### Typography

NexCSS provides comprehensive typography utilities:

```html
<!-- Font Sizes -->
<h1 class="text-4xl">Extra Large Title</h1>
<h2 class="text-2xl">Large Title</h2>
<p class="text-base">Normal Text</p>
<span class="text-sm">Small Text</span>

<!-- Font Weights -->
<p class="font-light">Light Weight</p>
<p class="font-normal">Normal Weight</p>
<p class="font-medium">Medium Weight</p>
<p class="font-bold">Bold Weight</p>

<!-- Line Height -->
<p class="leading-normal">Normal line height</p>
<p class="leading-relaxed">Relaxed line height</p>

<!-- Letter Spacing -->
<h1 class="tracking-wide">Wide Letter Spacing</h1>
```

### Layout Components

#### Container
```html
<div class="container mx-auto px-4">
  <!-- Centered content with padding -->
</div>
```

#### Grid System
```html
<!-- Basic Grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Responsive columns -->
</div>
```

#### Flexbox
```html
<!-- Center Content -->
<div class="flex items-center justify-center">
  <div>Centered Content</div>
</div>

<!-- Space Between -->
<div class="flex justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Interactive Components

#### Buttons
```html
<!-- Primary Button -->
<button class="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700">
  Primary Button
</button>

<!-- Secondary Button -->
<button class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
  Secondary Button
</button>

<!-- Disabled Button -->
<button class="px-4 py-2 bg-gray-300 text-gray-500 cursor-not-allowed">
  Disabled
</button>
```

#### Forms
```html
<!-- Input Field -->
<input 
  type="text" 
  class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-slate-500"
>

<!-- Select Menu -->
<select class="w-full px-3 py-2 border border-gray-300 rounded">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Checkbox -->
<label class="flex items-center">
  <input type="checkbox" class="form-checkbox text-slate-600">
  <span class="ml-2">Checkbox Label</span>
</label>
```

### Responsive Design

All components support responsive prefixes:
- `sm:` (640px and up)
- `md:` (768px and up)
- `lg:` (1024px and up)
- `xl:` (1280px and up)
- `2xl:` (1536px and up)

Example:
```html
<div class="text-sm md:text-base lg:text-lg">
  <!-- Text size changes at different breakpoints -->
</div>
```

For more detailed documentation and examples, visit our [full documentation](https://nexcss.dev/docs).