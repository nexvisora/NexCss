import puppeteer from 'puppeteer';
import axe from 'axe-core';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';
import path from 'path';
import wcag from 'wcag-color';
import colorNamer from 'color-namer';

export class AccessibilityTester {
  constructor(options = {}) {
    this.options = {
      reportsDir: './accessibility-reports',
      rules: {
        'color-contrast': { enabled: true },
        'aria-allowed-attr': { enabled: true },
        'aria-required-attr': { enabled: true },
        'aria-roles': { enabled: true },
        'document-title': { enabled: true },
        'html-has-lang': { enabled: true },
        'image-alt': { enabled: true },
        'label': { enabled: true },
        'link-name': { enabled: true },
        'list': { enabled: true },
        'tabindex': { enabled: true }
      },
      ...options
    };
  }

  async init() {
    await fs.mkdir(this.options.reportsDir, { recursive: true });
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Run accessibility tests using axe-core
   */
  async runAxeTests(html) {
    const page = await this.browser.newPage();
    await page.setContent(html);

    // Inject and run axe-core
    await page.evaluate(axe.source);
    const results = await page.evaluate(() => {
      return axe.run();
    });

    await page.close();
    return results;
  }

  /**
   * Test color contrast and color combinations
   */
  async testColors(css) {
    const colors = {
      foreground: new Set(),
      background: new Set(),
      combinations: []
    };

    // Extract colors from CSS
    const colorRegex = /#[0-9a-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)/gi;
    const matches = css.match(colorRegex) || [];

    matches.forEach(color => {
      // Convert color to RGB
      const rgb = this.parseColor(color);
      if (rgb) {
        colors.foreground.add(rgb);
        colors.background.add(rgb);
      }
    });

    // Test all color combinations
    colors.foreground.forEach(fg => {
      colors.background.forEach(bg => {
        const contrast = wcag.contrast(fg, bg);
        const wcagAA = wcag.isReadable(fg, bg, { level: 'AA' });
        const wcagAAA = wcag.isReadable(fg, bg, { level: 'AAA' });

        colors.combinations.push({
          foreground: {
            color: fg,
            name: colorNamer(fg).ntc[0].name
          },
          background: {
            color: bg,
            name: colorNamer(bg).ntc[0].name
          },
          contrast,
          wcagAA,
          wcagAAA
        });
      });
    });

    return colors;
  }

  /**
   * Test semantic HTML structure
   */
  async testSemantics(html) {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    const results = {
      headingStructure: this.checkHeadingStructure(document),
      landmarks: this.checkLandmarks(document),
      lists: this.checkLists(document),
      tables: this.checkTables(document),
      forms: this.checkForms(document)
    };

    return results;
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(html) {
    const page = await this.browser.newPage();
    await page.setContent(html);

    const results = {
      focusableElements: [],
      tabOrder: [],
      issues: []
    };

    // Find all focusable elements
    const focusable = await page.evaluate(() => {
      const selector = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(document.querySelectorAll(selector)).map(el => ({
        tag: el.tagName.toLowerCase(),
        type: el.type || null,
        tabIndex: el.tabIndex,
        visible: el.offsetWidth > 0 && el.offsetHeight > 0,
        hasAccessibleName: el.textContent.trim() || el.getAttribute('aria-label') || el.getAttribute('alt')
      }));
    });

    results.focusableElements = focusable;

    // Test tab order
    for (const el of focusable) {
      if (el.tabIndex < 0) {
        results.issues.push(`Element ${el.tag} has negative tabindex`);
      }
      if (!el.visible) {
        results.issues.push(`Focusable element ${el.tag} is not visible`);
      }
      if (!el.hasAccessibleName) {
        results.issues.push(`Focusable element ${el.tag} has no accessible name`);
      }
      results.tabOrder.push(el);
    }

    await page.close();
    return results;
  }

  /**
   * Generate accessibility report
   */
  generateReport(results) {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Accessibility Test Report</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.5;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .section {
      margin-bottom: 2rem;
    }
    .issue {
      border-left: 4px solid #ef4444;
      padding: 1rem;
      margin-bottom: 1rem;
      background: #fee2e2;
    }
    .warning {
      border-left: 4px solid #f59e0b;
      padding: 1rem;
      margin-bottom: 1rem;
      background: #fef3c7;
    }
    .color-combination {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }
    .color-sample {
      width: 3rem;
      height: 3rem;
      border-radius: 0.25rem;
      margin-right: 1rem;
    }
    .wcag-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      margin-right: 0.5rem;
    }
    .wcag-pass {
      background: #d1fae5;
      color: #065f46;
    }
    .wcag-fail {
      background: #fee2e2;
      color: #991b1b;
    }
  </style>
</head>
<body>
  <h1>Accessibility Test Report</h1>

  <div class="section">
    <h2>Automated Tests (axe-core)</h2>
    ${results.axe.violations.map(violation => `
      <div class="issue">
        <h3>${violation.id}: ${violation.impact} impact</h3>
        <p>${violation.description}</p>
        <ul>
          ${violation.nodes.map(node => `
            <li>${node.html}: ${node.failureSummary}</li>
          `).join('')}
        </ul>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>Color Contrast</h2>
    ${results.colors.combinations.map(combo => `
      <div class="color-combination">
        <div class="color-sample" style="background-color: ${combo.foreground.color}"></div>
        <div class="color-sample" style="background-color: ${combo.background.color}"></div>
        <div>
          <div>Contrast ratio: ${combo.contrast.toFixed(2)}</div>
          <div>
            <span class="wcag-badge ${combo.wcagAA ? 'wcag-pass' : 'wcag-fail'}">
              WCAG AA
            </span>
            <span class="wcag-badge ${combo.wcagAAA ? 'wcag-pass' : 'wcag-fail'}">
              WCAG AAA
            </span>
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>Semantic Structure</h2>
    ${Object.entries(results.semantics).map(([test, issues]) => `
      <div class="warning">
        <h3>${test}</h3>
        <ul>
          ${issues.map(issue => `<li>${issue}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>Keyboard Navigation</h2>
    <h3>Tab Order</h3>
    <ol>
      ${results.keyboard.tabOrder.map(el => `
        <li>
          ${el.tag}
          ${el.type ? `(type: ${el.type})` : ''}
          ${el.tabIndex !== 0 ? `(tabindex: ${el.tabIndex})` : ''}
        </li>
      `).join('')}
    </ol>

    ${results.keyboard.issues.length > 0 ? `
      <h3>Issues</h3>
      <ul>
        ${results.keyboard.issues.map(issue => `
          <li class="issue">${issue}</li>
        `).join('')}
      </ul>
    ` : ''}
  </div>
</body>
</html>`;
  }

  /**
   * Helper: Check heading structure
   */
  checkHeadingStructure(document) {
    const issues = [];
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    
    let previousLevel = 0;
    headings.forEach(heading => {
      const level = parseInt(heading.tagName[1]);
      if (level - previousLevel > 1) {
        issues.push(`Skipped heading level: from h${previousLevel} to h${level}`);
      }
      previousLevel = level;
    });

    return issues;
  }

  /**
   * Helper: Check landmarks
   */
  checkLandmarks(document) {
    const issues = [];
    const landmarks = document.querySelectorAll('main, nav, header, footer, aside, section[aria-label], section[aria-labelledby]');

    if (!document.querySelector('main')) {
      issues.push('No main landmark found');
    }

    if (document.querySelectorAll('main').length > 1) {
      issues.push('Multiple main landmarks found');
    }

    return issues;
  }

  /**
   * Helper: Check lists
   */
  checkLists(document) {
    const issues = [];
    const lists = document.querySelectorAll('ul, ol');

    lists.forEach(list => {
      const items = list.children;
      for (const item of items) {
        if (item.tagName.toLowerCase() !== 'li') {
          issues.push('List contains non-li elements');
          break;
        }
      }
    });

    return issues;
  }

  /**
   * Helper: Check tables
   */
  checkTables(document) {
    const issues = [];
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
      if (!table.querySelector('th')) {
        issues.push('Table missing headers');
      }

      if (!table.querySelector('caption')) {
        issues.push('Table missing caption');
      }
    });

    return issues;
  }

  /**
   * Helper: Check forms
   */
  checkForms(document) {
    const issues = [];
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (!input.getAttribute('id')) {
          issues.push('Form control missing ID');
        }

        const label = document.querySelector(`label[for="${input.getAttribute('id')}"]`);
        if (!label) {
          issues.push('Form control missing associated label');
        }
      });
    });

    return issues;
  }

  /**
   * Helper: Parse color to RGB
   */
  parseColor(color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    return ctx.fillStyle;
  }
}
