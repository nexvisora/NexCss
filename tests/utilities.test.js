import * as utilities from '../src/utilities.js';

describe('Utilities', () => {
  test('should export an object', () => {
    expect(typeof utilities).toBe('object');
    expect(utilities).not.toBeNull();
  });

  test('should have basic utility categories', () => {
    const categories = Object.keys(utilities);
    expect(categories.length).toBeGreaterThan(0);
  });
});
