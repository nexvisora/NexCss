import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'fs/promises';
import path from 'path';

export class PerformanceTester {
  constructor(options = {}) {
    this.options = {
      reportsDir: './performance-reports',
      thresholds: {
        FCP: 1800,
        LCP: 2500,
        CLS: 0.1,
        TBT: 300,
        TTI: 3800
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
   * Run performance tests using Lighthouse
   */
  async runLighthouseTests(url) {
    const chrome = await launch({
      chromeFlags: ['--headless', '--no-sandbox']
    });

    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance'],
      port: chrome.port
    };

    const runnerResult = await lighthouse(url, options);
    const reportPath = path.join(
      this.options.reportsDir,
      `lighthouse-${Date.now()}.html`
    );

    await fs.writeFile(reportPath, runnerResult.report);
    await chrome.kill();

    return {
      scores: runnerResult.lhr.categories.performance.score * 100,
      metrics: {
        FCP: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
        LCP: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
        CLS: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
        TBT: runnerResult.lhr.audits['total-blocking-time'].numericValue,
        TTI: runnerResult.lhr.audits['interactive'].numericValue
      }
    };
  }

  /**
   * Measure CSS performance metrics
   */
  async measureCSSMetrics(css) {
    const metrics = {
      size: {
        original: css.length,
        gzipped: await this.getGzippedSize(css)
      },
      selectors: {
        total: 0,
        unique: new Set(),
        specificity: {
          max: 0,
          average: 0
        }
      },
      rules: {
        total: 0,
        mediaQueries: 0,
        animations: 0
      }
    };

    // Parse CSS and collect metrics
    const parser = new (await import('css')).default;
    const ast = parser.parse(css);

    ast.stylesheet.rules.forEach(rule => {
      if (rule.type === 'rule') {
        metrics.rules.total++;
        rule.selectors.forEach(selector => {
          metrics.selectors.total++;
          metrics.selectors.unique.add(selector);
          
          const specificity = this.calculateSelectorComplexity(selector);
          metrics.selectors.specificity.max = Math.max(
            metrics.selectors.specificity.max,
            specificity
          );
        });
      } else if (rule.type === 'media') {
        metrics.rules.mediaQueries++;
      } else if (rule.type === 'keyframes') {
        metrics.rules.animations++;
      }
    });

    metrics.selectors.specificity.average = 
      metrics.selectors.specificity.max / metrics.selectors.total;

    return metrics;
  }

  /**
   * Measure runtime performance
   */
  async measureRuntimePerformance(html, options = {}) {
    const page = await this.browser.newPage();
    await page.setContent(html);

    // Enable CPU and Memory profiling
    const client = await page.target().createCDPSession();
    await client.send('Performance.enable');
    await client.send('HeapProfiler.enable');

    const metrics = {
      timing: {},
      memory: {},
      cpu: {},
      layout: {
        reflows: 0,
        repaints: 0
      }
    };

    // Collect performance timing
    metrics.timing = await page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0];
      return {
        DOMContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        load: timing.loadEventEnd - timing.navigationStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
        firstContentfulPaint: performance
          .getEntriesByName('first-contentful-paint')[0]?.startTime
      };
    });

    // Collect memory metrics
    metrics.memory = await page.evaluate(() => ({
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      usedJSHeapSize: performance.memory.usedJSHeapSize
    }));

    // Collect CPU metrics
    const cpuMetrics = await client.send('Performance.getMetrics');
    metrics.cpu = {
      taskDuration: cpuMetrics.find(m => m.name === 'TaskDuration').value,
      scriptDuration: cpuMetrics.find(m => m.name === 'ScriptDuration').value,
      layoutDuration: cpuMetrics.find(m => m.name === 'LayoutDuration').value
    };

    // Collect layout metrics
    const layoutMetrics = await client.send('Performance.metrics');
    metrics.layout = {
      reflows: layoutMetrics.metrics.find(m => m.name === 'LayoutCount').value,
      repaints: layoutMetrics.metrics.find(m => m.name === 'PaintCount').value
    };

    await page.close();
    return metrics;
  }

  /**
   * Generate performance report
   */
  generateReport(results) {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Performance Test Report</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.5;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .metric-card {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .metric-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .metric-value {
      font-size: 1.25rem;
      color: #1f2937;
    }
    .threshold {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }
    .threshold-pass {
      background: #d1fae5;
      color: #065f46;
    }
    .threshold-fail {
      background: #fee2e2;
      color: #991b1b;
    }
  </style>
</head>
<body>
  <h1>Performance Test Report</h1>
  
  <h2>Core Web Vitals</h2>
  ${Object.entries(results.metrics)
    .map(([metric, value]) => `
    <div class="metric-card">
      <div class="metric-title">${metric}</div>
      <div class="metric-value">
        ${value}
        <span class="threshold ${
  value <= this.options.thresholds[metric]
    ? 'threshold-pass'
    : 'threshold-fail'
}">
          Threshold: ${this.options.thresholds[metric]}
        </span>
      </div>
    </div>
  `).join('')}
  
  <h2>CSS Metrics</h2>
  <div class="metric-card">
    <div class="metric-title">Size</div>
    <div>Original: ${results.cssMetrics.size.original} bytes</div>
    <div>Gzipped: ${results.cssMetrics.size.gzipped} bytes</div>
  </div>
  
  <div class="metric-card">
    <div class="metric-title">Selectors</div>
    <div>Total: ${results.cssMetrics.selectors.total}</div>
    <div>Unique: ${results.cssMetrics.selectors.unique.size}</div>
    <div>Max Specificity: ${results.cssMetrics.selectors.specificity.max}</div>
    <div>Average Specificity: ${results.cssMetrics.selectors.specificity.average.toFixed(2)}</div>
  </div>
  
  <h2>Runtime Performance</h2>
  <div class="metric-card">
    <div class="metric-title">Timing</div>
    <div>DOMContentLoaded: ${results.runtimeMetrics.timing.DOMContentLoaded}ms</div>
    <div>Load: ${results.runtimeMetrics.timing.load}ms</div>
    <div>First Paint: ${results.runtimeMetrics.timing.firstPaint}ms</div>
    <div>First Contentful Paint: ${results.runtimeMetrics.timing.firstContentfulPaint}ms</div>
  </div>
  
  <div class="metric-card">
    <div class="metric-title">Layout</div>
    <div>Reflows: ${results.runtimeMetrics.layout.reflows}</div>
    <div>Repaints: ${results.runtimeMetrics.layout.repaints}</div>
  </div>
</body>
</html>`;
  }

  /**
   * Helper: Calculate selector complexity
   */
  calculateSelectorComplexity(selector) {
    let score = 0;
    
    // Count IDs
    const idCount = (selector.match(/#/g) || []).length;
    score += idCount * 100;
    
    // Count classes, attributes, and pseudo-classes
    const classAndPseudoCount = (selector.match(/\.[^\s.]+|\[[^\]]+\]|:[^:\s]+/g) || []).length;
    score += classAndPseudoCount * 10;
    
    // Count elements and pseudo-elements
    const elementCount = (selector.match(/[a-z]+|::[^\s:]+/g) || []).length;
    score += elementCount;
    
    return score;
  }

  /**
   * Helper: Get gzipped size
   */
  async getGzippedSize(content) {
    const { gzip } = await import('zlib');
    const { promisify } = await import('util');
    const gzipAsync = promisify(gzip);
    
    const compressed = await gzipAsync(Buffer.from(content));
    return compressed.length;
  }
}
