// src/plugins/aspect-ratio.js
class AspectRatioPlugin {
  constructor() {
    this.name = 'aspect-ratio';
  }

  createUtilities() {
    const ratios = {
      'auto': 'auto',
      'square': '1 / 1',
      'video': '16 / 9',
      'portrait': '3 / 4',
      'landscape': '4 / 3',
      'ultrawide': '21 / 9',
      'golden': '1.618 / 1'
    };

    let styles = '';

    Object.entries(ratios).forEach(([key, value]) => {
      styles += `
.aspect-${key} {
  aspect-ratio: ${value};
}`;
    });

    return styles;
  }

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

  getExamples() {
    return `
    <!-- Basic aspect ratios -->
    <div class="aspect-auto">Automatic ratio</div>
    <div class="aspect-square">1:1 square</div>
    <div class="aspect-video">16:9 video</div>
    <div class="aspect-portrait">3:4 portrait</div>
    <div class="aspect-landscape">4:3 landscape</div>
    <div class="aspect-ultrawide">21:9 ultrawide</div>
    <div class="aspect-golden">Golden ratio (1.618:1)</div>

    <!-- Responsive aspect ratios -->
    <div class="aspect-square md:aspect-video lg:aspect-ultrawide">
      Changes ratio at different breakpoints
    </div>

    <!-- Common use cases -->
    <img class="aspect-video object-cover" src="video-thumbnail.jpg" alt="Video thumbnail">
    <div class="aspect-square bg-gray-100">Square container</div>
    <div class="aspect-portrait">Portrait mode container</div>
    `;
  }
}

export default AspectRatioPlugin;
