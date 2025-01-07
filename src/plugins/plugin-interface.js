export class NexCssPlugin {
  constructor(name, options = {}) {
    this.name = name;
    this.options = options;
  }

  // Generate utility classes
  generateClasses() {
    throw new Error('Plugin must implement generateClasses method');
  }

  // Hook called before generation starts
  beforeGenerate() {}

  // Hook called after generation ends
  afterGenerate() {}

  // Merge plugin options with defaults
  mergeOptions(defaults) {
    return { ...defaults, ...this.options };
  }
}
