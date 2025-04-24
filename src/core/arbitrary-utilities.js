// src/core/arbitrary-utilities.js
class ArbitraryUtilities {
  constructor() {
    this.cssTypes = {
      'color': ['color', 'background-color', 'border-color', 'text-color', 'fill', 'stroke'],
      'length': ['width', 'height', 'padding', 'margin', 'font-size', 'border-width'],
      'percentage': ['width', 'height', 'scale', 'opacity'],
      'url': ['background-image', 'background', 'src'],
      'number': ['opacity', 'order', 'flex', 'z-index']
    };
  }

  // Parse arbitrary value syntax [property:value]
  parseArbitraryValue(value) {
    if (!value.startsWith('[') || !value.endsWith(']')) {
      return null;
    }

    const inner = value.slice(1, -1);
    const [property, ...valueParts] = inner.split(':');
    const propertyValue = valueParts.join(':'); // Rejoin in case value contains colons

    return {
      property: property.trim(),
      value: this.processValue(propertyValue.trim())
    };
  }

  // Process special characters in values
  processValue(value) {
    // Handle underscore to space conversion
    if (!value.includes('url(') && !value.includes('content-[')) {
      value = value.replace(/(?<!\\)_/g, ' ');
    }

    // Handle escaped underscores
    value = value.replace(/\\_/g, '_');

    return value;
  }

  // Determine CSS type for ambiguous properties
  resolveCSSType(property, value) {
    // Check if type is explicitly specified
    const typeMatch = value.match(/^([a-z]+):/);
    if (typeMatch) {
      return typeMatch[1];
    }

    // Infer type from value format
    if (value.endsWith('px') || value.endsWith('rem') || value.endsWith('em')) {
      return 'length';
    }
    if (value.endsWith('%')) {
      return 'percentage';
    }
    if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) {
      return 'color';
    }
    if (value.startsWith('url(')) {
      return 'url';
    }
    if (!isNaN(value)) {
      return 'number';
    }

    // Default to raw value if type can't be determined
    return 'raw';
  }

  // Generate CSS for arbitrary values
  generateArbitraryCss(selector, value) {
    const parsed = this.parseArbitraryValue(value);
    if (!parsed) return '';

    const cssType = this.resolveCSSType(parsed.property, parsed.value);
    const propertyValue = cssType !== 'raw' ? 
      parsed.value.replace(/^[a-z]+:/, '') : 
      parsed.value;

    return `
${selector} {
  ${parsed.property}: ${propertyValue};
}`;
  }

  // Handle layer directives
  generateLayerCss(layer, css) {
    return `@layer ${layer} {
  ${css}
}`;
  }

  // Example usage
  getExamples() {
    return `
    <!-- Arbitrary values -->
    <div class="[mask-type:luminance]">
      Luminance mask
    </div>

    <!-- Arbitrary values with modifiers -->
    <div class="[mask-type:luminance] hover:[mask-type:alpha]">
      Mask type changes on hover
    </div>

    <!-- CSS Variables -->
    <div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
      Responsive CSS variable
    </div>

    <!-- Arbitrary variants -->
    <div class="lg:[&:nth-child(3)]:hover:underline">
      Complex selector
    </div>

    <!-- Handling whitespace -->
    <div class="grid grid-cols-[1fr_500px_2fr]">
      Grid with complex columns
    </div>

    <!-- URLs with underscores -->
    <div class="bg-[url('/my_image.png')]">
      Background image
    </div>

    <!-- Escaped underscores -->
    <div class="before:content-['hello\\_world']">
      Escaped underscore
    </div>

    <!-- Type hints -->
    <div class="text-[length:var(--font-size)]">
      Font size from variable
    </div>
    <div class="text-[color:var(--text-color)]">
      Text color from variable
    </div>

    <!-- Custom CSS with layers -->
    <div class="card rounded-none">
      Card with utilities override
    </div>

    <!-- Responsive modifiers -->
    <div class="content-auto lg:content-visible">
      Content visibility
    </div>
    `;
  }
}

export default ArbitraryUtilities;
