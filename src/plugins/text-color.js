// src/plugins/text-color.js
class TextColorPlugin {
  constructor() {
    this.name = 'text-color';
  }

  createUtilities() {
    // Special colors
    const specialColors = {
      'text-inherit': 'inherit',
      'text-current': 'currentColor',
      'text-transparent': 'transparent',
      'text-black': 'rgb(0 0 0 / var(--tw-text-opacity, 1))',
      'text-white': 'rgb(255 255 255 / var(--tw-text-opacity, 1))'
    };

    // Color scales
    const colorScales = {
      slate: {
        50: '248 250 252',
        100: '241 245 249',
        200: '226 232 240',
        300: '203 213 225',
        400: '148 163 184',
        500: '100 116 139',
        600: '71 85 105',
        700: '51 65 85',
        800: '30 41 59',
        900: '15 23 42',
        950: '2 6 23'
      },
      gray: {
        50: '249 250 251',
        100: '243 244 246',
        200: '229 231 235',
        300: '209 213 219',
        400: '156 163 175',
        500: '107 114 128',
        600: '75 85 99',
        700: '55 65 81',
        800: '31 41 55',
        900: '17 24 39',
        950: '3 7 18'
      },
      zinc: {
        50: '250 250 250',
        100: '244 244 245',
        200: '228 228 231',
        300: '212 212 216',
        400: '161 161 170',
        500: '113 113 122',
        600: '82 82 91',
        700: '63 63 70',
        800: '39 39 42',
        900: '24 24 27',
        950: '9 9 11'
      },
      red: {
        50: '254 242 242',
        100: '254 226 226',
        200: '254 202 202',
        300: '252 165 165',
        400: '248 113 113',
        500: '239 68 68',
        600: '220 38 38',
        700: '185 28 28',
        800: '153 27 27',
        900: '127 29 29',
        950: '69 10 10'
      },
      blue: {
        50: '239 246 255',
        100: '219 234 254',
        200: '191 219 254',
        300: '147 197 253',
        400: '96 165 250',
        500: '59 130 246',
        600: '37 99 235',
        700: '29 78 216',
        800: '30 64 175',
        900: '30 58 138',
        950: '23 37 84'
      },
      green: {
        50: '240 253 244',
        100: '220 252 231',
        200: '187 247 208',
        300: '134 239 172',
        400: '74 222 128',
        500: '34 197 94',
        600: '22 163 74',
        700: '21 128 61',
        800: '22 101 52',
        900: '20 83 45',
        950: '5 46 22'
      }
      // Add more color scales as needed
    };

    let styles = '';

    // Generate special color utilities
    Object.entries(specialColors).forEach(([className, color]) => {
      styles += `.${className} {
  color: ${color};
}\n`;
    });

    // Generate color scale utilities
    Object.entries(colorScales).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, rgb]) => {
        styles += `.text-${colorName}-${shade} {
  color: rgb(${rgb} / var(--tw-text-opacity, 1));
}\n`;
      });
    });

    // Add CSS variable for text opacity
    styles = `:root {
  --tw-text-opacity: 1;
}\n\n${styles}`;

    return styles;
  }

  // Optional: Add responsive variants
  createResponsiveUtilities(breakpoints) {
    const baseUtilities = this.createUtilities();
    let responsiveStyles = '';

    Object.entries(breakpoints).forEach(([breakpoint, minWidth]) => {
      responsiveStyles += `@media (min-width: ${minWidth}) {\n`;
      responsiveStyles += baseUtilities.split('\n')
        .filter(line => line.trim())
        .map(line => `  .${breakpoint}\\:${line.trim().substring(1)}`)
        .join('\n');
      responsiveStyles += '\n}\n';
    });

    return responsiveStyles;
  }

  // Add usage examples in comments
  getExamples() {
    return `
    <!-- Basic text colors -->
    <p class="text-black">Black text</p>
    <p class="text-white">White text</p>
    <p class="text-transparent">Transparent text</p>

    <!-- Gray scale -->
    <p class="text-gray-50">Lightest gray</p>
    <p class="text-gray-500">Medium gray</p>
    <p class="text-gray-900">Darkest gray</p>

    <!-- Colors with different shades -->
    <p class="text-blue-100">Light blue text</p>
    <p class="text-blue-500">Medium blue text</p>
    <p class="text-blue-900">Dark blue text</p>

    <!-- Red scale -->
    <p class="text-red-300">Light red text</p>
    <p class="text-red-600">Medium red text</p>
    <p class="text-red-900">Dark red text</p>

    <!-- Green scale -->
    <p class="text-green-200">Light green text</p>
    <p class="text-green-500">Medium green text</p>
    <p class="text-green-800">Dark green text</p>

    <!-- Special values -->
    <p class="text-inherit">Inherited color</p>
    <p class="text-current">Current color</p>

    <!-- With opacity -->
    <p class="text-blue-500" style="--tw-text-opacity: 0.5">
      Semi-transparent blue text
    </p>

    <!-- Responsive text colors -->
    <p class="text-blue-500 md:text-green-500 lg:text-red-500">
      Color changes at different breakpoints
    </p>

    <!-- Common combinations -->
    <h1 class="text-gray-900 dark:text-gray-100">
      Dark mode compatible heading
    </h1>

    <button class="text-white hover:text-blue-200">
      Button with hover state
    </button>
    `;
  }
}

export default TextColorPlugin;
