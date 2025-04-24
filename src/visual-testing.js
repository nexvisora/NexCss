import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs/promises';
import path from 'path';

export class VisualTester {
  constructor(options = {}) {
    this.options = {
      snapshotDir: './visual-snapshots',
      diffDir: './visual-diffs',
      threshold: 0.1,
      ...options
    };
  }

  /**
   * Initialize testing environment
   */
  async init() {
    // Create directories if they don't exist
    await fs.mkdir(this.options.snapshotDir, { recursive: true });
    await fs.mkdir(this.options.diffDir, { recursive: true });

    // Launch browser
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  /**
   * Clean up testing environment
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Take a screenshot of an HTML element
   * @param {string} html - HTML content
   * @param {string} selector - CSS selector
   * @param {object} viewport - Viewport dimensions
   * @returns {Promise<Buffer>} Screenshot buffer
   */
  async takeScreenshot(html, selector, viewport = { width: 1024, height: 768 }) {
    const page = await this.browser.newPage();
    await page.setViewport(viewport);
    
    // Set content and wait for any animations/transitions
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.waitForSelector(selector);
    
    // Take screenshot
    const element = await page.$(selector);
    const screenshot = await element.screenshot({
      type: 'png',
      omitBackground: true
    });

    await page.close();
    return screenshot;
  }

  /**
   * Compare two images and generate diff
   * @param {Buffer} img1 - First image buffer
   * @param {Buffer} img2 - Second image buffer
   * @returns {object} Comparison results
   */
  async compareImages(img1, img2) {
    const image1 = PNG.sync.read(img1);
    const image2 = PNG.sync.read(img2);
    
    const { width, height } = image1;
    const diff = new PNG({ width, height });
    
    const pixelDiff = pixelmatch(
      image1.data,
      image2.data,
      diff.data,
      width,
      height,
      {
        threshold: this.options.threshold,
        includeAA: true
      }
    );

    return {
      diffCount: pixelDiff,
      diffPercentage: (pixelDiff / (width * height)) * 100,
      diffImage: PNG.sync.write(diff)
    };
  }

  /**
   * Test a component visually
   * @param {string} name - Test name
   * @param {string} html - Component HTML
   * @param {object} options - Test options
   * @returns {Promise<object>} Test results
   */
  async testComponent(name, html, options = {}) {
    const {
      selector = '.test-component',
      viewports = [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1440, height: 900 }
      ],
      interactions = []
    } = options;

    const results = {
      name,
      viewports: {},
      passed: true
    };

    for (const viewport of viewports) {
      const viewportResults = {
        differences: [],
        interactionResults: []
      };

      // Take base screenshot
      const baseScreenshot = await this.takeScreenshot(html, selector, viewport);
      const baseSnapshotPath = path.join(
        this.options.snapshotDir,
        `${name}-${viewport.name}.png`
      );

      // Compare with existing snapshot if it exists
      try {
        const existingSnapshot = await fs.readFile(baseSnapshotPath);
        const comparison = await this.compareImages(baseScreenshot, existingSnapshot);
        
        viewportResults.differences.push({
          type: 'base',
          ...comparison
        });

        // Save diff if differences exist
        if (comparison.diffCount > 0) {
          const diffPath = path.join(
            this.options.diffDir,
            `${name}-${viewport.name}-diff.png`
          );
          await fs.writeFile(diffPath, comparison.diffImage);
          results.passed = false;
        }
      } catch (error) {
        // No existing snapshot, create one
        await fs.writeFile(baseSnapshotPath, baseScreenshot);
      }

      // Test interactions
      for (const interaction of interactions) {
        const {
          name: interactionName,
          action,
          waitFor = 1000
        } = interaction;

        const page = await this.browser.newPage();
        await page.setViewport(viewport);
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Perform interaction
        await action(page);
        await page.waitForTimeout(waitFor);

        // Take screenshot after interaction
        const interactionScreenshot = await this.takeScreenshot(
          await page.content(),
          selector,
          viewport
        );

        const interactionSnapshotPath = path.join(
          this.options.snapshotDir,
          `${name}-${viewport.name}-${interactionName}.png`
        );

        // Compare with existing interaction snapshot
        try {
          const existingSnapshot = await fs.readFile(interactionSnapshotPath);
          const comparison = await this.compareImages(
            interactionScreenshot,
            existingSnapshot
          );

          viewportResults.interactionResults.push({
            name: interactionName,
            ...comparison
          });

          if (comparison.diffCount > 0) {
            const diffPath = path.join(
              this.options.diffDir,
              `${name}-${viewport.name}-${interactionName}-diff.png`
            );
            await fs.writeFile(diffPath, comparison.diffImage);
            results.passed = false;
          }
        } catch (error) {
          // No existing snapshot, create one
          await fs.writeFile(interactionSnapshotPath, interactionScreenshot);
        }

        await page.close();
      }

      results.viewports[viewport.name] = viewportResults;
    }

    return results;
  }

  /**
   * Generate a visual test report
   * @param {object} results - Test results
   * @returns {string} HTML report
   */
  generateReport(results) {
    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>Visual Regression Test Report</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.5;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .test-case {
      margin-bottom: 2rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
    }
    .test-header {
      padding: 1rem;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }
    .test-content {
      padding: 1rem;
    }
    .viewport-results {
      margin-bottom: 1rem;
    }
    .diff-image {
      max-width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 0.25rem;
    }
    .status {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-weight: 500;
    }
    .status-pass {
      background: #d1fae5;
      color: #065f46;
    }
    .status-fail {
      background: #fee2e2;
      color: #991b1b;
    }
  </style>
</head>
<body>
  <h1>Visual Regression Test Report</h1>
`;

    // Add test results
    html += `
  <div class="test-case">
    <div class="test-header">
      <h2>${results.name}</h2>
      <span class="status ${results.passed ? 'status-pass' : 'status-fail'}">
        ${results.passed ? 'PASSED' : 'FAILED'}
      </span>
    </div>
    <div class="test-content">
`;

    // Add viewport results
    Object.entries(results.viewports).forEach(([viewport, viewportResults]) => {
      html += `
      <div class="viewport-results">
        <h3>${viewport}</h3>
`;

      // Add base comparison results
      viewportResults.differences.forEach(diff => {
        if (diff.diffCount > 0) {
          html += `
        <div class="diff-result">
          <p>Differences detected: ${diff.diffPercentage.toFixed(2)}%</p>
          <img
            class="diff-image"
            src="visual-diffs/${results.name}-${viewport}-diff.png"
            alt="Visual differences"
          >
        </div>
`;
        }
      });

      // Add interaction results
      viewportResults.interactionResults.forEach(interaction => {
        if (interaction.diffCount > 0) {
          html += `
        <div class="diff-result">
          <h4>${interaction.name}</h4>
          <p>Differences detected: ${interaction.diffPercentage.toFixed(2)}%</p>
          <img
            class="diff-image"
            src="visual-diffs/${results.name}-${viewport}-${interaction.name}-diff.png"
            alt="Visual differences"
          >
        </div>
`;
        }
      });

      html += `
      </div>
`;
    });

    html += `
    </div>
  </div>
</body>
</html>
`;

    return html;
  }
}
