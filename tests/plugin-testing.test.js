import { PluginTester } from '../src/plugin-testing.js';

describe('PluginTester', () => {
  let tester;

  beforeEach(() => {
    tester = new PluginTester();
  });

  describe('calculateSpecificity', () => {
    test('should calculate ID selectors correctly', () => {
      expect(tester.calculateSpecificity('#header')).toBe(100);
      expect(tester.calculateSpecificity('#header #nav')).toBe(200);
    });

    test('should calculate class selectors correctly', () => {
      expect(tester.calculateSpecificity('.header')).toBe(10);
      expect(tester.calculateSpecificity('.header.nav')).toBe(20);
    });

    test('should calculate element selectors correctly', () => {
      expect(tester.calculateSpecificity('div')).toBe(1);
      expect(tester.calculateSpecificity('div span')).toBe(2);
    });

    test('should calculate mixed selectors correctly', () => {
      expect(tester.calculateSpecificity('div.header')).toBe(11);
      expect(tester.calculateSpecificity('#main div.header')).toBe(111);
    });

    test('should handle pseudo-classes correctly', () => {
      expect(tester.calculateSpecificity('a:hover')).toBe(11);
      expect(tester.calculateSpecificity('.btn:active')).toBe(20);
    });

    test('should handle pseudo-elements correctly', () => {
      expect(tester.calculateSpecificity('p::before')).toBe(31);
      expect(tester.calculateSpecificity('div.header::after')).toBe(31);
    });

    test('should handle attribute selectors correctly', () => {
      expect(tester.calculateSpecificity('[type="text"]')).toBe(10);
      expect(tester.calculateSpecificity('input[type="text"]')).toBe(11);
    });
  });

  describe('testPlugin', () => {
    test('should initialize with default options', () => {
      expect(tester.options).toBeDefined();
      expect(tester.options.verbose).toBe(false);
    });
  });

  describe('validatePlugin', () => {
    test('should validate plugin structure', async () => {
      const plugin = {
        name: 'test-plugin',
        process: () => {},
        generateClasses: async () => '.test { color: red; }'
      };
      const result = await tester.validatePlugin(plugin);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
    });

    test('should handle invalid plugin', async () => {
      const plugin = {
        name: 'test-plugin'
      };
      const result = await tester.validatePlugin(plugin);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Error in plugin validation: Plugin must have a process method');
    });
  });
});
